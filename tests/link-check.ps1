[CmdletBinding()]
param(
    [string]$SiteRoot
)

$ErrorActionPreference = "Stop"
$projectRoot = Split-Path -Parent $PSScriptRoot

if ([string]::IsNullOrWhiteSpace($SiteRoot)) {
    $resolvedSiteRoot = (Resolve-Path -LiteralPath $projectRoot).Path
} else {
    $resolvedSiteRoot = (Resolve-Path -LiteralPath $SiteRoot).Path
}

$productionPages = @(
    "index.html",
    "itinerary.html",
    "checklist.html",
    "tickets.html",
    "phrases.html",
    "itinerary-map.html",
    "day1-guide.html",
    "day2-guide.html",
    "day3-guide.html",
    "sumida-aquarium.html"
)

$primaryTools = @(
    "itinerary.html",
    "checklist.html",
    "tickets.html",
    "phrases.html"
)

$requiredDirectories = @("assets", "data", "images")
$requiredRootFiles = $productionPages + @("style.css", "guide.css", "aquarium.css", "fx-widget.js")
$optionalImageReferences = @(
    "images/sumida-ticket-me.png",
    "images/sumida-ticket-dad.png",
    "images/sumida-ticket-mom.png",
    "images/sumida-ticket-jin.png"
)
$failures = New-Object System.Collections.Generic.List[string]
$siteRootPrefix = $resolvedSiteRoot.TrimEnd([System.IO.Path]::DirectorySeparatorChar) + [System.IO.Path]::DirectorySeparatorChar

function Add-Failure {
    param([string]$Message)
    $failures.Add($Message)
}

function Get-LocalReferences {
    param([string]$Html)

    $references = New-Object System.Collections.Generic.List[string]
    $pattern = '(?is)\b(?:href|src)\s*=\s*(["''])(.*?)\1'

    foreach ($match in [regex]::Matches($Html, $pattern)) {
        $value = [System.Net.WebUtility]::HtmlDecode($match.Groups[2].Value.Trim())

        if ([string]::IsNullOrWhiteSpace($value) -or
            $value.StartsWith("#") -or
            $value -match '^(?i)(?:https?:)?//' -or
            $value -match '^(?i)(?:mailto|tel|data|javascript):') {
            continue
        }

        $localPath = ($value -split '[?#]', 2)[0]
        if (-not [string]::IsNullOrWhiteSpace($localPath)) {
            $references.Add($localPath)
        }
    }

    return $references
}

$serveScript = Join-Path $PSScriptRoot "serve.ps1"
if (-not (Test-Path -LiteralPath $serveScript -PathType Leaf)) {
    Add-Failure "Missing loopback static server: tests/serve.ps1"
} else {
    & powershell -NoProfile -ExecutionPolicy Bypass -File $serveScript -Root $projectRoot -SelfTest
    if ($LASTEXITCODE -ne 0) {
        Add-Failure "Loopback static server path-safety self-test failed"
    }
}

function Test-IsOptionalImageReference {
    param(
        [string]$Html,
        [string]$Reference
    )

    if ($optionalImageReferences -notcontains $Reference) {
        return $false
    }

    $escapedReference = [regex]::Escape($Reference)
    $beforeMarker = "(?is)<img\b[^>]*\bsrc\s*=\s*([`"'])$escapedReference\1[^>]*\bdata-optional-image(?:\s*=\s*([`"'])true\2)?[^>]*>"
    $afterMarker = "(?is)<img\b[^>]*\bdata-optional-image(?:\s*=\s*([`"'])true\1)?[^>]*\bsrc\s*=\s*([`"'])$escapedReference\2[^>]*>"

    return $Html -match $beforeMarker -or $Html -match $afterMarker
}

foreach ($relativePage in $productionPages) {
    $pagePath = Join-Path $resolvedSiteRoot $relativePage

    if (-not (Test-Path -LiteralPath $pagePath -PathType Leaf)) {
        Add-Failure "Missing production page: $relativePage"
        continue
    }

    $html = Get-Content -Raw -Encoding UTF8 -LiteralPath $pagePath
    foreach ($reference in Get-LocalReferences $html) {
        if ($reference.StartsWith("/")) {
            Add-Failure "$relativePage uses a GitHub Pages-unsafe root-relative URL: $reference"
            continue
        }

        $decodedReference = [System.Uri]::UnescapeDataString($reference)
        $targetPath = [System.IO.Path]::GetFullPath((Join-Path (Split-Path -Parent $pagePath) $decodedReference))
        if (-not $targetPath.StartsWith($siteRootPrefix, [System.StringComparison]::OrdinalIgnoreCase)) {
            Add-Failure "$relativePage references a path outside the deployment root: $reference"
            continue
        }
        if (-not (Test-Path -LiteralPath $targetPath) -and
            -not (Test-IsOptionalImageReference -Html $html -Reference $reference)) {
            Add-Failure "$relativePage references missing path: $reference"
        }
    }
}

$itineraryPath = Join-Path $resolvedSiteRoot "itinerary.html"
if (Test-Path -LiteralPath $itineraryPath -PathType Leaf) {
    $itineraryHtml = Get-Content -Raw -Encoding UTF8 -LiteralPath $itineraryPath
    if ($itineraryHtml -notmatch '(?is)\.day-panel:focus(?:-visible)?\s*\{[^}]*outline\s*:\s*(?!none\b)[^;}]+') {
        Add-Failure "itinerary day selection does not leave a visible focus indicator on the updated panel"
    }
}

foreach ($guide in @("day1-guide.html", "day2-guide.html", "day3-guide.html")) {
    $guidePath = Join-Path $resolvedSiteRoot $guide
    if (-not (Test-Path -LiteralPath $guidePath -PathType Leaf)) {
        continue
    }

    $guideReferences = @(Get-LocalReferences (Get-Content -Raw -Encoding UTF8 -LiteralPath $guidePath))
    foreach ($tool in $primaryTools) {
        if ($guideReferences -notcontains $tool) {
            Add-Failure "$guide does not link to primary tool: $tool"
        }
    }
}

foreach ($directory in $requiredDirectories) {
    if (-not (Test-Path -LiteralPath (Join-Path $resolvedSiteRoot $directory) -PathType Container)) {
        Add-Failure "Missing deployment directory: $directory/"
    }
}

$workflowPath = Join-Path $projectRoot ".github\workflows\deploy-pages.yml"
if (-not (Test-Path -LiteralPath $workflowPath -PathType Leaf)) {
    Add-Failure "Missing GitHub Pages workflow: .github/workflows/deploy-pages.yml"
} else {
    $workflow = Get-Content -Raw -Encoding UTF8 -LiteralPath $workflowPath
    foreach ($file in $requiredRootFiles) {
        $escapedFile = [regex]::Escape($file)
        if ($workflow -notmatch "(?m)^\s*cp\s+[^`r`n]*\b$escapedFile\b[^`r`n]*\s+_site/?\s*$") {
            Add-Failure "GitHub Pages workflow does not package: $file"
        }
    }

    foreach ($directory in $requiredDirectories) {
        $escapedDirectory = [regex]::Escape($directory)
        if ($workflow -notmatch "(?m)^\s*cp\s+-R\s+$escapedDirectory(?:/\.)?\s+_site/$escapedDirectory/?\s*$") {
            Add-Failure "GitHub Pages workflow does not package directory: $directory/"
        }
    }
}

if ($failures.Count -gt 0) {
    foreach ($failure in $failures) {
        Write-Output "FAIL: $failure"
    }
    Write-Output ("FAIL: link/deployment check found {0} problem(s)." -f $failures.Count)
    exit 1
}

Write-Output ("PASS: checked {0} production pages under {1}." -f $productionPages.Count, $resolvedSiteRoot)
Write-Output "PASS: all internal href/src targets exist and use relative paths."
Write-Output "PASS: preserved guides link to all four primary tools."
Write-Output "PASS: GitHub Pages workflow packages every required page and asset directory."
