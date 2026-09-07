# Task 6 report — Deployment, documentation, accessibility, and verification

## Outcome

Implemented Task 6 on `redesign/mobile-tool` and prepared the commit message `docs: finish mobile tool deployment and verification`.

- Added `tests/link-check.ps1`, which validates ten production pages, every local `href`/`src`, GitHub Pages-safe relative paths, preserved-guide links to all four tools, the workflow artifact manifest, and the static server safety self-test.
- Added `tests/serve.ps1`, a dependency-free static server bound only to `127.0.0.1`. Its shared request resolver rejects plain/encoded traversal, Windows-separator traversal, drive paths, and hidden repository paths.
- Added compact four-tool navigation to all three preserved guides and repaired obsolete `index.html#dayN` return links to `itinerary.html?day=N`.
- Expanded the Pages workflow to package the four tools, map, three guides, aquarium detail page, legacy page dependencies, `assets/`, `data/`, and an explicit four-path Tokyo QR image allowlist.
- Rewrote `README.md` with the architecture, exact data/edit locations, preview/test commands, QR naming, Day 4–6 maintenance rules, deployment behavior, and `dist/client` sync instructions.
- Synchronized every production page and dependency into `dist/client`, including complete `assets/` and `data/` trees plus only allowlisted Tokyo QR images that actually exist.
- Fixed the two approved Task 2 low-priority issues: the updated itinerary panel now retains a visible focus ring after day selection, and every map render (including unplanned and invalid days) updates `document.title`.
- Added exact regression assertions for all six phrase category titles.
- Marked only the four documented, intentionally optional Sumida QR `<img>` paths as optional. The link checker permits those exact paths only when the markup explicitly declares the fallback; other missing local assets still fail.

## RED evidence

The first `tests/link-check.ps1` run exited `1` with 23 problems. It failed on the stale workflow, all twelve missing guide-to-tool links, and the four intentionally absent QR image paths. After adding the focus regression assertion, the authoritative pre-production run exited `1` with 24 problems, adding:

```text
FAIL: itinerary day selection does not leave a visible focus indicator on the updated panel
```

The focused WSH additions also produced the expected RED while every earlier assertion stayed green:

```text
FAIL: exposes map document titles (expected function, received undefined)
```

Exit code: `1`.

The initial live server smoke test exposed an environmental compatibility failure before serving any request:

```text
System.Net.HttpListener ... operation is not supported on this platform
```

The server transport was changed to `System.Net.Sockets.TcpListener`; the same loopback smoke test then passed. The traversal-safe resolver was retained.

## GREEN and automated verification

Fresh pre-commit checks:

- `cscript //nologo tests\core-tests.js` — exit `0`; every core/data assertion passed, including map titles and the six exact phrase category titles.
- `powershell -NoProfile -ExecutionPolicy Bypass -File tests\link-check.ps1` — exit `0`; ten source pages, links, guide navigation, server safety, and workflow manifest passed.
- `powershell -NoProfile -ExecutionPolicy Bypass -File tests\link-check.ps1 -SiteRoot dist\client` — exit `0`; the synchronized Sites client passed the same production checks.
- PowerShell parsed both `tests/serve.ps1` and `tests/link-check.ps1` successfully.
- Live HTTP smoke test — `index.html` returned `200` from `http://127.0.0.1:43129/`.
- Raw HTTP safety smoke test — `/%2e%2e/README.md` and `/.git/config` both returned `403 Forbidden` from the loopback server.
- The workflow's exact Bash `mkdir`, `cp`, and `touch` commands built a temporary `_site`; `link-check.ps1 -SiteRoot _site` exited `0`. The validated temporary directory was then removed using an exact, workspace-contained path check.
- Source-to-`dist/client` SHA-256 comparison found `0` mismatches across all required root files, `assets/`, `data/`, and the explicit Tokyo image allowlist.
- `git diff --check` — exit `0`; only Git's existing LF/CRLF working-copy notices were printed.
- `dist/server/index.js` remained byte-identical at Git blob `fd5fa23942081875ae38f4d3e76151082653db26`.
- `.openai/hosting.json` remained byte-identical at Git blob `842a0d58f8ed837ff2684086f34da66273398d24`.

## Browser caveat

No browser viewport or interactive UI claims are made in this report. The controller will perform final Browser QA at 360, 390, 430px and desktop, including overflow, bottom navigation, one-day rendering, Day 4–6 status, both ticket deep-link directions, missing and available QR behavior, map markers, checklist persistence/reset, phrase copy announcement, visible keyboard focus, document titles, and console errors.

The four real aquarium QR files remain absent by design, so the source and deployed artifacts currently exercise the explicit placeholder path. No private or fabricated ticket image was added.

## Scope and protected files

No publish, push, PR, or deployment action was performed. `dist/server/index.js` and `.openai/hosting.json` were not modified.

## Review fix round 1

Review base: `508cce7` (`docs: finish mobile tool deployment and verification`).

### Findings addressed

1. Replaced recursive `images/` publication with four exact optional paths: `sumida-ticket-me.png`, `sumida-ticket-dad.png`, `sumida-ticket-mom.png`, and `sumida-ticket-jin.png`. The workflow always creates `_site/images`, but copies each allowlisted file only when it exists.
2. Removed 45 unrelated Bali files totaling 19,428,499 bytes from `dist/client/images`. The legacy root `images/` source directory was preserved; only the Tokyo deployment mirror was narrowed.
3. Extended `tests/link-check.ps1` to extract and resolve `image` / `detailUrl` values from `data/tickets.js` plus `detailGuideUrl` / `ticketUrl` / `detailUrl` values from `data/itinerary.js`. Browser-facing data URLs are correctly resolved from the document root. Missing-file exceptions are restricted to the four exact optional QR paths.
4. Added deployment-image enforcement: non-allowlisted files in `_site/images` or `dist/client/images` fail validation, recursive workflow image copies fail, and every allowlist path must appear explicitly in the workflow.
5. Removed the duplicated `assets/js/core.js` script element from the source map page and its `dist/client` mirror; exactly one inclusion remains.
6. Removed inaccurate `aria-current="page"` attributes from the itinerary links in the three guide tool navs and their `dist/client` mirrors. Each guide's Day switch continues to identify the actual current guide.
7. Updated README deployment and maintenance instructions to describe the explicit image allowlist and to forbid copying the complete legacy image tree into `dist/client`.

### Focused RED and mutation evidence

Before production fixes, the expanded source check exited `1` with 10 focused failures: one duplicate script, three inaccurate guide current-page states, recursive image publishing, missing `_site/images` creation, and four absent workflow allowlist entries. The `dist/client` check additionally identified all 45 non-Tokyo deployed images and exited `1` with 61 total failures.

Two deliberate data mutations demonstrated that the new data-driven validation is live rather than a source-presence check:

```text
FAIL: data/tickets.js references missing path: missing-ticket-detail.html
FAIL: link/deployment check found 1 problem(s).
```

After restoring that fixture, replacing an allowlisted QR path with `images/not-allowlisted.png` produced:

```text
FAIL: data/tickets.js references missing path: images/not-allowlisted.png
FAIL: link/deployment check found 1 problem(s).
```

Both mutations were restored before final verification; `data/tickets.js` has no diff.

### Review-fix GREEN evidence

- `cscript //nologo tests\core-tests.js` — exit `0`; all core and data assertions passed.
- Source, `dist/client`, and freshly workflow-assembled `_site` link/deployment checks — exit `0` for all three, including data-driven references and image allowlist enforcement.
- Workflow assembly reported `WORKFLOW_IMAGE_COUNT=0`, expected because none of the four optional private QR files is currently present.
- Production-to-`dist/client` SHA-256 parity passed for all root pages/dependencies, `assets/`, `data/`, and the four-path image allowlist.
- `git diff --check` — exit `0`; only line-ending notices were printed.
- Protected host files retained blobs `fd5fa23942081875ae38f4d3e76151082653db26` (`dist/server/index.js`) and `842a0d58f8ed837ff2684086f34da66273398d24` (`.openai/hosting.json`).

Browser QA remains assigned to the controller; this fix round makes no new browser claim.

## Review fix round 2

Review base: `2ce01d0` (`fix: tighten Tokyo deployment artifact`).

The remaining review finding identified `itineraryUrl` as a ticket-renderer dependency that was absent from the data-driven link contract. `assets/js/tickets.js` consumes exactly three path-bearing ticket fields: holder `image`, group `itineraryUrl`, and group `detailUrl`. `tests/link-check.ps1` now validates all three.

### Focused RED → GREEN

With only `data/tickets.js` temporarily mutated from `itinerary.html?day=2` to `missing-itinerary.html?day=2`, the pre-fix checker incorrectly exited `0`. This established the missing regression coverage.

After adding `itineraryUrl` to the ticket data contract, the same still-mutated fixture exited `1` with the intended single failure:

```text
FAIL: data/tickets.js references missing path: missing-itinerary.html
FAIL: link/deployment check found 1 problem(s).
```

The fixture was restored before final verification; `data/tickets.js` has no diff. Source and `dist/client` link checks then both exited `0`. No production or `dist/client` file changed in this round.

## Controller browser QA

The local static server was exercised in Chrome against `http://127.0.0.1:4173/`. The primary browser-control session completed responsive layout, itinerary, deep-link, placeholder, and persistence checks before its isolated JavaScript worker became unavailable at the operating-system sandbox boundary (`CreateProcessWithLogonW failed: 2`). A fresh worker failed on the independent expression `1 + 1`, confirming an environment failure rather than an application failure.

The remaining checks were completed in a separate temporary Chrome profile through the browser's local DevTools protocol. The harness and a non-ticket image used solely to exercise the successful QR path were removed immediately afterward; no fixture, profile, or private image remains in the worktree.

Browser result: **54 / 54 assertions passed**.

- 360 px, 390 px, 430 px, and 1280 px: no horizontal overflow on the home and four primary tools.
- Every primary tool exposed the four-link fixed bottom navigation with 104 px content clearance over a 67–68 px navigation bar.
- Home exposed exactly four tool entries.
- Day 4 showed only `尚未安排`, kept a single day panel, updated the URL, and moved focus to a visible 3 px outline.
- The Day 2 ticket deep link opened the correct accordion and target; the return URL was `itinerary.html?day=2`.
- Four ticket holders rendered. Missing images produced placeholders without visible broken-image elements. A temporary valid image opened in a 390 px full-viewport dialog and closed with Escape.
- A checked Checklist item survived a page recreation/reload and changed progress to `1 / 13`; declining the reset confirmation preserved it.
- Six phrase categories rendered; Japanese text measured 25.35 px. Copy failure correctly announced the manual-copy fallback.
- Day 1 and Day 2 maps rendered only their own stop layers; Day 4 rendered zero markers and the empty state. All three document titles matched the selected day.
- No application `error` or `unhandledrejection` event was observed during the harness interactions.
