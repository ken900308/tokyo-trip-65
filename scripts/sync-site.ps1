# Recreate only the generated static output; never touch dist/server or host configuration.
$ErrorActionPreference = 'Stop'
$root = Split-Path -Parent $PSScriptRoot
$output = [IO.Path]::GetFullPath((Join-Path $root 'dist/client'))
if ($output -ne ([IO.Path]::GetFullPath($root) + [IO.Path]::DirectorySeparatorChar + 'dist' + [IO.Path]::DirectorySeparatorChar + 'client')) { throw 'Invalid output directory' }
$pages = @('index.html','itinerary.html','currency.html','checklist.html','tickets.html','phrases.html','itinerary-map.html','day1-guide.html','day2-guide.html','day3-guide.html','sumida-aquarium.html')
foreach ($path in ($pages + @('assets','data'))) {
    if (!(Test-Path -LiteralPath (Join-Path $root $path))) { throw "Missing source: $path" }
}
if (Test-Path -LiteralPath $output) { Remove-Item -LiteralPath $output -Recurse -Force }
New-Item -ItemType Directory -Path $output | Out-Null
foreach ($path in ($pages + @('assets','data'))) { Copy-Item -LiteralPath (Join-Path $root $path) -Destination $output -Recurse }
foreach ($name in @('me','dad','mom','jin')) {
    $source = Join-Path $root "images/sumida-ticket-$name.png"
    if (Test-Path -LiteralPath $source) {
        New-Item -ItemType Directory -Force -Path (Join-Path $output 'images') | Out-Null
        Copy-Item -LiteralPath $source -Destination (Join-Path $output 'images')
    }
}
Write-Output 'Static output synchronized: dist/client'
