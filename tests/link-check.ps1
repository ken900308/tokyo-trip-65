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
    "currency.html",
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

$requiredDirectories = @("assets", "data")
$requiredRootFiles = $productionPages
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

function Test-IsExternalReference {
    param([string]$Reference)

    return [string]::IsNullOrWhiteSpace($Reference) -or
        $Reference.StartsWith("#") -or
        $Reference -match '^(?i)(?:https?:)?//' -or
        $Reference -match '^(?i)(?:mailto|tel|data|javascript):'
}

function Test-LocalReference {
    param(
        [string]$Owner,
        [string]$OwnerPath,
        [string]$Reference,
        [bool]$AllowKnownOptionalImage = $false
    )

    if (Test-IsExternalReference $Reference) {
        return
    }

    $localPath = ($Reference -split '[?#]', 2)[0]
    if ([string]::IsNullOrWhiteSpace($localPath)) {
        return
    }
    if ($localPath.StartsWith("/")) {
        Add-Failure "$Owner uses a GitHub Pages-unsafe root-relative URL: $localPath"
        return
    }

    $decodedReference = [System.Uri]::UnescapeDataString($localPath)
    $targetPath = [System.IO.Path]::GetFullPath((Join-Path (Split-Path -Parent $OwnerPath) $decodedReference))
    if (-not $targetPath.StartsWith($siteRootPrefix, [System.StringComparison]::OrdinalIgnoreCase)) {
        Add-Failure "$Owner references a path outside the deployment root: $localPath"
        return
    }
    if (-not (Test-Path -LiteralPath $targetPath) -and
        -not ($AllowKnownOptionalImage -and $optionalImageReferences -contains $localPath)) {
        Add-Failure "$Owner references missing path: $localPath"
    }
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
        $allowOptional = Test-IsOptionalImageReference -Html $html -Reference $reference
        Test-LocalReference -Owner $relativePage -OwnerPath $pagePath -Reference $reference -AllowKnownOptionalImage $allowOptional
    }

    $scriptSources = @([regex]::Matches($html, '(?is)<script\b[^>]*\bsrc\s*=\s*(["''])(.*?)\1[^>]*>') | ForEach-Object { $_.Groups[2].Value })
    foreach ($duplicate in $scriptSources | Group-Object | Where-Object { $_.Count -gt 1 }) {
        Add-Failure "$relativePage includes script more than once: $($duplicate.Name)"
    }
}

$dataContracts = @(
    @{ Path = "data/tickets.js"; Fields = @("image", "itineraryUrl", "detailUrl") },
    @{ Path = "data/itinerary.js"; Fields = @("detailGuideUrl", "ticketUrl", "detailUrl") }
)

foreach ($contract in $dataContracts) {
    $dataPath = Join-Path $resolvedSiteRoot $contract.Path
    if (-not (Test-Path -LiteralPath $dataPath -PathType Leaf)) {
        Add-Failure "Missing production data file: $($contract.Path)"
        continue
    }

    $fieldPattern = ($contract.Fields | ForEach-Object { [regex]::Escape($_) }) -join '|'
    $dataSource = Get-Content -Raw -Encoding UTF8 -LiteralPath $dataPath
    foreach ($match in [regex]::Matches($dataSource, "(?m)\b(?:$fieldPattern)\s*:\s*([`"'])(.*?)\1")) {
        $reference = $match.Groups[2].Value.Trim()
        $documentBase = Join-Path $resolvedSiteRoot "index.html"
        Test-LocalReference -Owner $contract.Path -OwnerPath $documentBase -Reference $reference -AllowKnownOptionalImage $true
    }
}

$itineraryPath = Join-Path $resolvedSiteRoot "itinerary.html"
if (Test-Path -LiteralPath $itineraryPath -PathType Leaf) {
    $itineraryHtml = Get-Content -Raw -Encoding UTF8 -LiteralPath $itineraryPath
    if ($itineraryHtml -notmatch '(?is)\.day-panel:focus(?:-visible)?\s*\{[^}]*outline\s*:\s*(?!none\b)[^;}]+') {
        Add-Failure "itinerary day selection does not leave a visible focus indicator on the updated panel"
    }
    if (@(Get-LocalReferences $itineraryHtml) -notcontains "currency.html") {
        Add-Failure "itinerary has no literal secondary currency converter link"
    }
    if ($itineraryHtml -notmatch '(?is)\.action-link\s*\{[^}]*min-height\s*:\s*(?:4[4-9]|[5-9]\d|\d{3,})px') {
        Add-Failure "itinerary action links are smaller than 44px"
    }
}

$aquariumHtml = Get-Content -Raw -Encoding UTF8 (Join-Path $resolvedSiteRoot "sumida-aquarium.html")
if ($aquariumHtml -match '(?is)<a\b(?=[^>]*\baria-current\s*=)(?=[^>]*\bhref\s*=\s*(["''])tickets\.html(?:[?#][^"'']*)?\1)[^>]*>') {
    Add-Failure "aquarium incorrectly marks another page as current"
}

foreach ($guide in @("day1-guide.html", "day2-guide.html", "day3-guide.html")) {
    $guidePath = Join-Path $resolvedSiteRoot $guide
    if (-not (Test-Path -LiteralPath $guidePath -PathType Leaf)) {
        continue
    }

    $guideReferences = @(Get-LocalReferences (Get-Content -Raw -Encoding UTF8 -LiteralPath $guidePath))
    $guideHtml = Get-Content -Raw -Encoding UTF8 -LiteralPath $guidePath
    foreach ($tool in $primaryTools) {
        if ($guideReferences -notcontains $tool) {
            Add-Failure "$guide does not link to primary tool: $tool"
        }
    }
    if ($guideHtml -match '(?is)<a\b(?=[^>]*\baria-current\s*=)(?=[^>]*\bhref\s*=\s*(["''])itinerary\.html(?:[?#][^"'']*)?\1)[^>]*>') {
        Add-Failure "$guide incorrectly marks the itinerary tool link as the current page"
    }
}

if ($resolvedSiteRoot -ne (Resolve-Path -LiteralPath $projectRoot).Path) {
    $deployedImageRoot = Join-Path $resolvedSiteRoot "images"
    if (Test-Path -LiteralPath $deployedImageRoot -PathType Container) {
        foreach ($image in Get-ChildItem -LiteralPath $deployedImageRoot -Recurse -File) {
            $relativeImage = $image.FullName.Substring($resolvedSiteRoot.Length + 1).Replace('\', '/')
            if ($optionalImageReferences -notcontains $relativeImage) {
                Add-Failure "Deployment contains non-Tokyo image outside the allowlist: $relativeImage"
            }
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

    if ($workflow -match '(?m)^\s*cp\s+-R\s+images(?:/\.)?\s+_site/images/?\s*$') {
        Add-Failure "GitHub Pages workflow recursively packages the entire images/ tree"
    }
    if ($workflow -notmatch '(?m)^\s*mkdir\s+-p\s+_site(?:\s+_site/images|/images)\s*$') {
        Add-Failure "GitHub Pages workflow does not create the optional Tokyo images directory"
    }
    foreach ($image in $optionalImageReferences) {
        if ($workflow -notmatch [regex]::Escape($image)) {
            Add-Failure "GitHub Pages workflow image allowlist is missing: $image"
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
Write-Output "PASS: data-driven itinerary and ticket references resolve or use the exact QR allowlist."
Write-Output "PASS: preserved guides link to all four primary tools."
Write-Output "PASS: GitHub Pages workflow packages every required page and only allowlisted Tokyo images."
