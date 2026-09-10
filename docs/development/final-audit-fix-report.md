# Final audit fix report

Branch: `redesign/mobile-tool`. Audit base: `bb7e7e6`.

## Changes

- Added authoritative shared `[hidden] { display: none !important; }` so wallet placeholders and aquarium images/placeholders respect the loaded, missing, and pending states despite their author display rules. Aquarium QR images now start hidden until their load result is known. Both pages load the shared stylesheet.
- Restored the original Day 1 estimated immigration exit window, **20:40–21:15**, in the arrival event. Evidence: `git show a5b2440:index.html` arrival paragraph.
- Restored aquarium **Saturday general hours 09:00–21:00** beside the existing venue details. Evidence: original index's Saturday closing-time paragraph and `japan_day2.md:87` for the complete window. These are preserved planning details, not newly researched opening hours.
- Added compact `currency.html`, reached by a literal secondary link in the itinerary header. It uses the existing `fx-widget.js` and JPY/TWD/USD conversion, reverse amount entry, exchange, cached rates, and offline reference rates. The homepage still has four entries. No framework or dependency was added.
- The currency script was already valid UTF-8. Inspection did expose a close-handler defect: closing removed the panel's `show` class without clearing `aria-expanded`, and left keyboard focus inside the hidden panel. The minimal handler correction clears the attribute and focuses the toggle; conversion logic is unchanged.
- Ticket return labels now use the owning day's number. The existing data-driven `itineraryUrl` remains the link target.
- Raised itinerary action links from 40px to 44px.
- Replaced the aquarium ticket link's incorrect `aria-current="page"` with a visual `is-active` class.
- Added the converter to the workflow and link-check manifests, documented its maintenance/access path, and synchronized every changed production file to `dist/client`.

## Focused RED evidence

Tests were added and run before the corresponding production changes.

`tests/link-check.ps1` exited **1** with five expected failures: missing `currency.html`, missing literal itinerary converter link, 40px itinerary actions, incorrect aquarium current-page semantics, and missing converter workflow inclusion.

`tests/audit-check.ps1` exited **1** for the missing authoritative hidden rule on both pages, initially visible aquarium images, missing original planning details, absent converter integration, and the converter close handler's stale expanded state. The existing complementary loaded/missing state handlers and exactly four homepage entries already passed. The initial PowerShell test-file encoding issue was corrected using ASCII regex Unicode escapes before recording these RED results.

`cscript //nologo tests\core-tests.js` exited **1** with the precise regression:

```text
FAIL: ticket return label uses its owning Day 4 (expected true, received false)
```

The renderer test executes the real `assets/js/tickets.js` with a small browser-boundary fixture containing a Day 4 ticket group. Its expected label is a literal independent of production rendering. The same fixture exercises the real cached-image, late-load, and error handlers: loaded images expose the QR and hide the placeholder; missing/replacement failures hide the QR and expose the placeholder. These existing state transitions passed during RED, isolating the CSS cascade as the visibility fault.

Windows Script Host was initially denied inside the sandbox; the approved elevated rerun supplied the actual RED and GREEN evidence.

## GREEN and deployment verification

- `cscript //nologo tests\core-tests.js`: **exit 0**, all existing assertions and the ten new renderer/state assertions pass.
- Source `tests/link-check.ps1`: **exit 0**, 11 production pages; relative document/data references, secondary converter access, navigation, server safety, and workflow coverage pass.
- Source `tests/audit-check.ps1`: **exit 0**, all focused audit integration contracts pass.
- Both PowerShell checks against `dist/client`: **exit 0**.
- Executed the workflow's actual Bash assembly block locally, including its exact four-path optional QR allowlist, producing `_site`. Both PowerShell checks against `_site`: **exit 0**.
- SHA-256 comparison across source, `dist/client`, and workflow output: **25 production files**, zero mismatches (excluding generated `.nojekyll`).
- `git diff --check`: **exit 0**; only existing Git LF/CRLF notices.

The generated, worktree-local `_site` verification artifact was removed after validating its exact resolved path. No source image, private ticket, host configuration, or server file was removed or changed. No publish, push, PR, or deployment was performed.

## Remaining controller verification

This report makes **no browser-verification claim**. `audit-check.ps1` checks source integration contracts, not computed browser layout. The controller must rerun expanded browser QA, especially:

- Actual loaded/missing/pending QR computed display in both pages, wallet enlargement, and focus restoration.
- Currency JPY/TWD/USD conversion, reverse editing, swap, cached/offline behavior, close/reopen expanded state and focus.
- Itinerary and converter at 360/390/430px and desktop; action target sizes and secondary header navigation.
- The Day 4 ticket fixture label/return URL, preserved planning details, and aquarium current-page semantics.

No real aquarium QR files are present; temporary browser fixtures must remain disposable and must not be committed.
