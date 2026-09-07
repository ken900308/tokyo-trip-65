# Task 6 report — Deployment, documentation, accessibility, and verification

## Outcome

Implemented Task 6 on `redesign/mobile-tool` and prepared the commit message `docs: finish mobile tool deployment and verification`.

- Added `tests/link-check.ps1`, which validates ten production pages, every local `href`/`src`, GitHub Pages-safe relative paths, preserved-guide links to all four tools, the workflow artifact manifest, and the static server safety self-test.
- Added `tests/serve.ps1`, a dependency-free static server bound only to `127.0.0.1`. Its shared request resolver rejects plain/encoded traversal, Windows-separator traversal, drive paths, and hidden repository paths.
- Added compact four-tool navigation to all three preserved guides and repaired obsolete `index.html#dayN` return links to `itinerary.html?day=N`.
- Expanded the Pages workflow to package the four tools, map, three guides, aquarium detail page, legacy page dependencies, `assets/`, `data/`, and `images/`.
- Rewrote `README.md` with the architecture, exact data/edit locations, preview/test commands, QR naming, Day 4–6 maintenance rules, deployment behavior, and `dist/client` sync instructions.
- Synchronized every production page and dependency into `dist/client`, including complete `assets/`, `data/`, and `images/` trees.
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
- Source-to-`dist/client` SHA-256 comparison found `0` mismatches across all required root files plus `assets/`, `data/`, and `images/`.
- `git diff --check` — exit `0`; only Git's existing LF/CRLF working-copy notices were printed.
- `dist/server/index.js` remained byte-identical at Git blob `fd5fa23942081875ae38f4d3e76151082653db26`.
- `.openai/hosting.json` remained byte-identical at Git blob `842a0d58f8ed837ff2684086f34da66273398d24`.

## Browser caveat

No browser viewport or interactive UI claims are made in this report. The controller will perform final Browser QA at 360, 390, 430px and desktop, including overflow, bottom navigation, one-day rendering, Day 4–6 status, both ticket deep-link directions, missing and available QR behavior, map markers, checklist persistence/reset, phrase copy announcement, visible keyboard focus, document titles, and console errors.

The four real aquarium QR files remain absent by design, so the source and deployed artifacts currently exercise the explicit placeholder path. No private or fabricated ticket image was added.

## Scope and protected files

No publish, push, PR, or deployment action was performed. `dist/server/index.js` and `.openai/hosting.json` were not modified.
