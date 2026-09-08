param([string]$SiteRoot = (Split-Path -Parent $PSScriptRoot))
$ErrorActionPreference = "Stop"
$failures = 0
function Assert-Contract([bool]$Pass, [string]$Name) {
    if ($Pass) { Write-Output "PASS: $Name" }
    else { $script:failures++; Write-Output "FAIL: $Name" }
}
function Read-Site([string]$Path) {
    $file = Join-Path $SiteRoot $Path
    if (Test-Path -LiteralPath $file) { return Get-Content -Raw -Encoding UTF8 -LiteralPath $file }
    return ""
}

# CSS contract: author display rules must never override an element's hidden state.
# The two branches are checked independently; the controller verifies computed styles.
$sharedCss = Read-Site "assets/css/app.css"
foreach ($page in @("tickets.html", "sumida-aquarium.html")) {
    $html = Read-Site $page
    $css = $sharedCss + $html
    if ($page -eq "sumida-aquarium.html") { $css += Read-Site "aquarium.css" }
    Assert-Contract ($html -match 'href="assets/css/app.css"' -and $sharedCss -match '(?is)\[hidden\]\s*\{\s*display\s*:\s*none\s*!important\s*;?\s*\}') "$page hides the missing QR / loaded placeholder despite author display rules"
    $visibleClass = if ($page -eq "tickets.html") { "qr-placeholder" } else { "qr-empty" }
    Assert-Contract ($css -match "(?is)\.$visibleClass\s*\{[^}]*display\s*:\s*grid") "$page shows the placeholder when hidden is absent"
}
$wallet = Read-Site "assets/js/tickets.js"
Assert-Contract ($wallet -match '(?s)naturalWidth\s*>\s*0.*?trigger.hidden\s*=\s*false;\s*placeholder.hidden\s*=\s*true;.*?else\s*\{\s*trigger.hidden\s*=\s*true;\s*placeholder.hidden\s*=\s*false;') "wallet loaded and missing handlers set complementary hidden states"
$aquarium = Read-Site "sumida-aquarium.html"
Assert-Contract ($aquarium -match 'image.hidden = false; empty.hidden = true' -and $aquarium -match 'image.hidden = true; empty.hidden = false') "aquarium loaded and missing handlers set complementary hidden states"
Assert-Contract (@([regex]::Matches($aquarium, '<img\b[^>]*class="ticket-qr"[^>]*\bhidden\b')).Count -eq 4) "aquarium hides all four QR images while pending"
Assert-Contract ($aquarium -match '09:00[\u2013\uff5e\u2014-]21:00' -and $aquarium -match '\u9031\u516d\u4e00\u822c') "aquarium preserves original Saturday general hours"
$itinerary = Read-Site "data/itinerary.js"
Assert-Contract ($itinerary -match '\u9810\u4f30 20:40[\u2013\uff5e\u2014-]21:15 \u51fa\u95dc') "arrival keeps the original estimated immigration exit window"

$guideCss = Read-Site "guide.css"
Assert-Contract ($guideCss -match '[^}]*\.now-card\s*>\s*div\s*\{[^}]*min-width\s*:\s*0') "guide timeline content can shrink around scrollable station flows"

$currency = Read-Site "currency.html"
Assert-Contract ((Read-Site "fx-widget.js") -match 'e.close.addEventListener\("click",\(\)=>\{e.panel.classList.remove\("show"\);e.toggle.setAttribute\("aria-expanded","false"\)') "closing converter synchronizes the toggle expanded state"
Assert-Contract ($currency -match '<script src="fx-widget.js"></script>') "currency page loads the existing converter"
foreach ($id in @("fxToggle", "fxPanel", "fxClose", "fxFrom", "fxTo", "fxAmount", "fxToAmount", "fxSwap", "fxRateNote")) {
    Assert-Contract (@([regex]::Matches($currency, "\bid=`"$id`"")).Count -eq 1) "currency provides one $id element for the existing script"
}
Assert-Contract ($currency -match 'label for="fxAmount"' -and $currency -match 'label for="fxToAmount"') "currency fields have visible amount labels"
Assert-Contract (@([regex]::Matches((Read-Site "index.html"), 'class="home-card"')).Count -eq 4) "homepage retains exactly four primary entries"
exit ([int]($failures -gt 0))
