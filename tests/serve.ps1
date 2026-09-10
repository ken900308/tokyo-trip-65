[CmdletBinding()]
param(
    [string]$Root,
    [ValidateRange(1, 65535)]
    [int]$Port = 4173,
    [switch]$SelfTest
)

$ErrorActionPreference = "Stop"
if ([string]::IsNullOrWhiteSpace($Root)) {
    $Root = Join-Path (Split-Path -Parent $PSScriptRoot) 'public'
}
$resolvedRoot = (Resolve-Path -LiteralPath $Root).Path.TrimEnd([System.IO.Path]::DirectorySeparatorChar)
$rootPrefix = $resolvedRoot + [System.IO.Path]::DirectorySeparatorChar

function Resolve-RequestFile {
    param([string]$RawUrl)

    if ([string]::IsNullOrWhiteSpace($RawUrl)) {
        return $null
    }

    $pathOnly = ($RawUrl -split '\?', 2)[0]
    try {
        $decoded = [System.Uri]::UnescapeDataString($pathOnly).Replace('\', '/')
    } catch {
        return $null
    }

    if ($decoded.IndexOf([char]0) -ge 0) {
        return $null
    }

    $segments = New-Object System.Collections.Generic.List[string]
    foreach ($segment in $decoded.Split('/')) {
        if ([string]::IsNullOrWhiteSpace($segment) -or $segment -eq '.') {
            continue
        }
        if ($segment -eq '..' -or $segment.StartsWith('.') -or $segment.Contains(':')) {
            return $null
        }
        $segments.Add($segment)
    }

    $relativePath = if ($segments.Count -eq 0) { "index.html" } else { $segments -join [System.IO.Path]::DirectorySeparatorChar }
    $candidate = [System.IO.Path]::GetFullPath((Join-Path $resolvedRoot $relativePath))

    if (-not $candidate.StartsWith($rootPrefix, [System.StringComparison]::OrdinalIgnoreCase)) {
        return $null
    }

    if (Test-Path -LiteralPath $candidate -PathType Container) {
        $candidate = Join-Path $candidate "index.html"
    }

    return $candidate
}

function Get-ContentType {
    param([string]$Path)

    switch ([System.IO.Path]::GetExtension($Path).ToLowerInvariant()) {
        ".html" { return "text/html; charset=utf-8" }
        ".css" { return "text/css; charset=utf-8" }
        ".js" { return "application/javascript; charset=utf-8" }
        ".json" { return "application/json; charset=utf-8" }
        ".svg" { return "image/svg+xml" }
        ".png" { return "image/png" }
        ".jpg" { return "image/jpeg" }
        ".jpeg" { return "image/jpeg" }
        ".webp" { return "image/webp" }
        ".gif" { return "image/gif" }
        ".ico" { return "image/x-icon" }
        ".pdf" { return "application/pdf" }
        default { return "application/octet-stream" }
    }
}

if ($SelfTest) {
    $cases = @(
        @{ Url = "/"; Expected = (Join-Path $resolvedRoot "index.html") },
        @{ Url = "/assets/js/core.js?cache=1"; Expected = (Join-Path $resolvedRoot "assets\js\core.js") },
        @{ Url = "/../README.md"; Expected = $null },
        @{ Url = "/%2e%2e/README.md"; Expected = $null },
        @{ Url = "/..%5cREADME.md"; Expected = $null },
        @{ Url = "/.git/config"; Expected = $null }
    )
    $failed = 0

    foreach ($case in $cases) {
        $actual = Resolve-RequestFile $case.Url
        if ($actual -ne $case.Expected) {
            Write-Output ("FAIL: {0} resolved to {1}" -f $case.Url, $actual)
            $failed += 1
        }
    }

    if ($failed -gt 0) {
        exit 1
    }

    Write-Output "PASS: static server path resolution stays inside the selected root."
    Write-Output "PASS: encoded traversal and hidden paths are rejected."
    exit 0
}

$prefix = "http://127.0.0.1:$Port/"
$loopback = [System.Net.IPAddress]::Parse("127.0.0.1")
$listener = New-Object System.Net.Sockets.TcpListener($loopback, $Port)

function Send-HttpResponse {
    param(
        [System.IO.Stream]$Stream,
        [int]$StatusCode,
        [string]$Reason,
        [byte[]]$Body = @(),
        [string]$ContentType = "text/plain; charset=utf-8",
        [switch]$HeadOnly,
        [string]$Allow
    )

    $headers = "HTTP/1.1 $StatusCode $Reason`r`n" +
        "Content-Type: $ContentType`r`n" +
        "Content-Length: $($Body.LongLength)`r`n" +
        "Cache-Control: no-store`r`n" +
        "X-Content-Type-Options: nosniff`r`n" +
        "Connection: close`r`n"
    if (-not [string]::IsNullOrWhiteSpace($Allow)) {
        $headers += "Allow: $Allow`r`n"
    }
    $headers += "`r`n"

    $headerBytes = [System.Text.Encoding]::ASCII.GetBytes($headers)
    $Stream.Write($headerBytes, 0, $headerBytes.Length)
    if (-not $HeadOnly -and $Body.Length -gt 0) {
        $Stream.Write($Body, 0, $Body.Length)
    }
}

try {
    $listener.Start()
    Write-Output "Serving $resolvedRoot at $prefix"
    Write-Output "Press Ctrl+C to stop."

    while ($true) {
        $client = $listener.AcceptTcpClient()
        $reader = $null
        try {
            $stream = $client.GetStream()
            $reader = New-Object System.IO.StreamReader($stream, [System.Text.Encoding]::ASCII, $false, 1024, $true)
            $requestLine = $reader.ReadLine()
            while (($headerLine = $reader.ReadLine()) -ne $null -and $headerLine -ne "") { }

            if ($requestLine -notmatch '^(?<method>[A-Z]+)\s+(?<target>\S+)\s+HTTP/1\.[01]$') {
                Send-HttpResponse -Stream $stream -StatusCode 400 -Reason "Bad Request"
                continue
            }

            $method = $matches.method
            $requestTarget = $matches.target
            if ($method -ne "GET" -and $method -ne "HEAD") {
                Send-HttpResponse -Stream $stream -StatusCode 405 -Reason "Method Not Allowed" -Allow "GET, HEAD" -HeadOnly:($method -eq "HEAD")
                continue
            }

            $filePath = Resolve-RequestFile $requestTarget
            if ($null -eq $filePath) {
                Send-HttpResponse -Stream $stream -StatusCode 403 -Reason "Forbidden" -HeadOnly:($method -eq "HEAD")
                continue
            }
            if (-not (Test-Path -LiteralPath $filePath -PathType Leaf)) {
                Send-HttpResponse -Stream $stream -StatusCode 404 -Reason "Not Found" -HeadOnly:($method -eq "HEAD")
                continue
            }

            $bytes = [System.IO.File]::ReadAllBytes($filePath)
            Send-HttpResponse -Stream $stream -StatusCode 200 -Reason "OK" -Body $bytes -ContentType (Get-ContentType $filePath) -HeadOnly:($method -eq "HEAD")
        } catch {
            Write-Warning ("Request failed: {0}" -f $_.Exception.Message)
        } finally {
            if ($null -ne $reader) {
                $reader.Dispose()
            }
            $client.Close()
        }
    }
} finally {
    $listener.Stop()
}
