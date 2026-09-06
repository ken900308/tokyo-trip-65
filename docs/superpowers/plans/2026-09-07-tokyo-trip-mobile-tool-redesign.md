# Tokyo Trip Mobile Tool Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the magazine-style Tokyo trip site with a mobile-first, four-tool travel utility while preserving all Day 1–3 operational content, tickets, maps, and GitHub Pages deployment.

**Architecture:** Keep the project framework-free. Store itinerary, ticket, checklist, and phrase content in focused global data files under `data/`; render the four main tools with vanilla JavaScript under `assets/js/`; and share one accessible visual system in `assets/css/app.css`. Existing long-form Day 1–3 guides and the aquarium information page remain available as detail destinations, while the new pages optimize the street-level actions.

**Tech Stack:** Static HTML, CSS, vanilla JavaScript, Leaflet, Web Storage API, Clipboard API, SpeechSynthesis, GitHub Pages Actions, Windows Script Host tests.

**Spec:** `TOKYO_TRIP_REDESIGN_GOAL.md`

## Global Constraints

- Treat `TOKYO_TRIP_REDESIGN_GOAL.md` as the approved source of truth; do not restart design approval.
- Preserve all practical Day 1–3 information and stable links to the existing detailed guides.
- Day 4–6 must say `尚未安排`; do not invent destinations, reservations, or tickets.
- Keep static HTML/CSS/vanilla JavaScript and GitHub Pages; do not add a large framework or dependency.
- The home page must expose only four primary choices: `行程`, `Checklist`, `票券`, `常用文字`.
- Primary tool pages must share a fixed bottom navigation with active state and iPhone safe-area padding.
- Itinerary selection must show exactly one day; maps and ticket links must follow the selected day.
- Aquarium tickets must preserve the four names and image paths, show a placeholder when absent, and support tap-to-enlarge.
- Checklist state must persist in `localStorage`, show progress, and require confirmation before reset.
- Phrase cards must be grouped by the six specified situations and support one-tap Japanese copy.
- All site-internal URLs and assets must use GitHub Pages-safe relative paths.
- Meet responsive and accessibility checks at 360, 390, 430, and desktop widths with no horizontal overflow or console errors.

---

### Task 1: Shared data contracts, core utilities, and four-choice home

**Files:**
- Create: `data/itinerary.js`
- Create: `data/tickets.js`
- Create: `data/checklist.js`
- Create: `data/phrases.js`
- Create: `assets/js/core.js`
- Create: `assets/css/app.css`
- Create: `tests/core-tests.js`
- Modify: `index.html`

**Interfaces:**
- Produces `window.TOKYO_ITINERARY.days`, with six day records whose first three contain route summaries, map stops, timeline cards, detail-guide URLs, ticket deep links, and official/navigation URLs.
- Produces `window.TOKYO_TICKETS.days`, `window.TOKYO_CHECKLIST.groups`, and `window.TOKYO_PHRASES.categories` for later renderers.
- Produces `window.TripCore.normalizeDay(value, maximum)`, `TripCore.getDay(days, value)`, `TripCore.checklistProgress(items, state)`, `TripCore.updateChecklistState(state, id, checked)`, and `TripCore.mapUrl(day)`.
- The home page links only to `itinerary.html`, `checklist.html`, `tickets.html`, and `phrases.html` as its four primary cards.

- [ ] **Step 1: Write failing pure-behavior tests**

Create `tests/core-tests.js` as a Windows Script Host runner that loads `assets/js/core.js` and asserts these hand-derived results:

```js
assertEqual(TripCore.normalizeDay("2", 6), 2, "accepts valid day");
assertEqual(TripCore.normalizeDay("9", 6), 1, "defaults invalid day");
assertEqual(TripCore.mapUrl(3), "itinerary-map.html?day=3&embed=1", "builds map deep link");
assertEqual(TripCore.checklistProgress([{id:"a"},{id:"b"}], {a:true}).done, 1, "counts checked items");
assertEqual(TripCore.updateChecklistState({a:true}, "b", true).b, true, "stores toggled item");
```

- [ ] **Step 2: Run the tests and verify RED**

Run: `cscript //nologo tests\core-tests.js`

Expected: FAIL because `assets/js/core.js` and `TripCore` do not exist.

- [ ] **Step 3: Implement the minimal core contracts and approved data**

Use ES5-compatible syntax in `assets/js/core.js` so the same real code runs in WSH tests and modern browsers. Move Day 1–3 operational facts from the existing home/guides into `data/itinerary.js`; include only `planned:false` and `status:"尚未安排"` for Day 4–6. Define four aquarium holders in `data/tickets.js` with exact image paths `images/sumida-ticket-me.png`, `-dad.png`, `-mom.png`, and `-jin.png`.

- [ ] **Step 4: Replace the home page and shared visual foundation**

Make `index.html` a compact `TOKYO`, `09.25 → 09.30`, optional `6 days · 5 nights` header followed by a 2×2 grid of four large cards. Put no timeline, map, huge hero, or bottom navigation on the home page. In `assets/css/app.css`, define a light tool-like system, 44px minimum targets, visible focus rings, safe-area helpers, responsive cards, and shared bottom-navigation styles.

- [ ] **Step 5: Verify GREEN and inspect home semantics**

Run: `cscript //nologo tests\core-tests.js`

Expected: PASS with five named assertions and exit code 0.

Run: `git diff --check`

Expected: exit code 0.

- [ ] **Step 6: Commit**

```bash
git add index.html assets data tests
git commit -m "feat: establish mobile trip tool foundation"
```

### Task 2: Day-selectable itinerary and day-specific map

**Files:**
- Create: `itinerary.html`
- Create: `assets/js/itinerary.js`
- Modify: `itinerary-map.html`
- Modify: `tests/core-tests.js`

**Interfaces:**
- Consumes `TOKYO_ITINERARY.days`, `TripCore.normalizeDay`, `TripCore.getDay`, and `TripCore.mapUrl` from Task 1.
- Produces shareable `itinerary.html?day=N` views, one selected day panel, collapsed map iframe `itinerary-map.html?day=N&embed=1`, and `itinerary-map.html?day=N` full-screen maps.
- Timeline cards expose `data-day`, transport mode, boarding/transfer/alighting details, Plan B, official link, detailed guide, and ticket deep link only when data provides them.

- [ ] **Step 1: Add failing day-selection tests**

Extend `tests/core-tests.js` with literal cases for the new `TripCore.visibleDayEvents(days, value)` contract: Day 3 returns its exact event count, Day 4 returns an empty array, and invalid input returns Day 1 events. Also assert Day 4 has `planned === false` and `status === "尚未安排"` after loading `data/itinerary.js`.

- [ ] **Step 2: Run and verify RED**

Run: `cscript //nologo tests\core-tests.js`

Expected: FAIL because `TripCore.visibleDayEvents` does not exist.

- [ ] **Step 3: Implement itinerary rendering**

Add `TripCore.visibleDayEvents(days, value)` as a non-mutating lookup and use it in the renderer. Create six accessible day selector buttons. Read `?day=` on load, update the URL with `history.replaceState` on selection, set active/ARIA state, and render exactly one day's route and cards. Planned days show concise action-first cards; unplanned days show only `尚未安排`. Day 2's aquarium card links to `tickets.html?day=2#sumida-aquarium`; all Day 1–3 views link to their preserved guide pages.

- [ ] **Step 4: Refactor the Leaflet page to shared day data**

Load `data/itinerary.js`, parse `?day=`, and draw only that day's ordered `mapStops`. Remove the `全部` default behavior. In embedded mode hide chrome; retain a full-page day selector for direct visits. Reject Day 4–6 and invalid days by showing a clear empty map state rather than fabricated pins.

- [ ] **Step 5: Verify GREEN**

Run: `cscript //nologo tests\core-tests.js`

Expected: all assertions pass.

Run: `git diff --check`

Expected: exit code 0.

- [ ] **Step 6: Commit**

```bash
git add itinerary.html itinerary-map.html assets/js/itinerary.js tests/core-tests.js data/itinerary.js
git commit -m "feat: add day-focused itinerary and maps"
```

### Task 3: Day accordion ticket wallet and aquarium QR enlargement

**Files:**
- Create: `tickets.html`
- Create: `assets/js/tickets.js`
- Modify: `sumida-aquarium.html`
- Modify: `tests/core-tests.js`

**Interfaces:**
- Consumes `TOKYO_TICKETS.days` and `TripCore.normalizeDay`.
- Produces `tickets.html?day=2#sumida-aquarium`, six day accordions, four named ticket cards, image fallback without broken-image UI, a modal/fullscreen QR viewer, and `itinerary.html?day=2` back-link.

- [ ] **Step 1: Add failing ticket data tests**

Extend `tests/core-tests.js` to load `data/tickets.js` and test a new `TripCore.ticketHash(day, ticketId)` contract. Assert the literal result `tickets.html?day=2#sumida-aquarium`, then assert Day 2 has one `sumida-aquarium` ticket group, exactly four holders, holder labels `我`, `爸爸`, `媽媽`, `金明玲`, and the exact four existing image paths.

- [ ] **Step 2: Run and verify RED**

Run: `cscript //nologo tests\core-tests.js`

Expected: FAIL because `TripCore.ticketHash` does not exist.

- [ ] **Step 3: Implement the ticket wallet**

Add `TripCore.ticketHash(day, ticketId)` with URL-encoded stable output. Render six semantic `<details>` day accordions. Open the query-selected day and scroll/focus the hash-target ticket group. Render each holder with a large QR image; on `error`, hide the image and show a clear placeholder. Clicking or pressing Enter/Space on an available QR opens an accessible full-viewport dialog with close button, backdrop close, and Escape close.

- [ ] **Step 4: Connect the aquarium detail page**

Change its back links to `itinerary.html?day=2`, add a prominent `tickets.html?day=2#sumida-aquarium` wallet link, preserve its four existing image paths and detailed venue content, and add the shared bottom navigation without removing its current fallback handling.

- [ ] **Step 5: Verify GREEN**

Run: `cscript //nologo tests\core-tests.js`

Expected: all ticket and prior assertions pass.

Run: `git diff --check`

Expected: exit code 0.

- [ ] **Step 6: Commit**

```bash
git add tickets.html assets/js/tickets.js data/tickets.js sumida-aquarium.html tests/core-tests.js
git commit -m "feat: add day-linked ticket wallet"
```

### Task 4: Persistent Notion-like checklist

**Files:**
- Create: `checklist.html`
- Create: `assets/js/checklist.js`
- Modify: `tests/core-tests.js`

**Interfaces:**
- Consumes `TOKYO_CHECKLIST.groups`, `TripCore.checklistProgress`, and `TripCore.updateChecklistState`.
- Uses localStorage key `tokyo-trip-checklist-v1`.
- Produces grouped checkboxes, completed styling, text/numeric progress, and a confirmation-guarded reset.

- [ ] **Step 1: Add failing state-transition tests**

Extend `tests/core-tests.js` with a new `TripCore.sanitizeChecklistState(state, validIds)` contract. A fixture containing `{passport:true, stale:true}` with valid IDs `passport, suica` must return only `{passport:true}`. Also prove progress goes `0/3 → 1/3 → 0/3`, updates do not mutate the original state object, and unknown stale IDs do not alter the total.

- [ ] **Step 2: Run and verify RED**

Run: `cscript //nologo tests\core-tests.js`

Expected: FAIL because `TripCore.sanitizeChecklistState` does not exist.

- [ ] **Step 3: Implement checklist UI and persistence**

Add `TripCore.sanitizeChecklistState(state, validIds)` and use it when restoring storage so removed checklist items do not pollute state. Render the five approved categories from data, label each native checkbox, save every change, restore on load, and apply line-through/dimmed styling to completed rows. Update `done / total` and progress bar after each change. The reset button must call `confirm` and clear the key only after confirmation.

- [ ] **Step 4: Verify GREEN**

Run: `cscript //nologo tests\core-tests.js`

Expected: all assertions pass.

Run: `git diff --check`

Expected: exit code 0.

- [ ] **Step 5: Commit**

```bash
git add checklist.html assets/js/checklist.js data/checklist.js tests/core-tests.js
git commit -m "feat: add persistent travel checklist"
```

### Task 5: Categorized phrasebook with copy and speech

**Files:**
- Create: `phrases.html`
- Create: `assets/js/phrases.js`
- Modify: `tests/core-tests.js`

**Interfaces:**
- Consumes `TOKYO_PHRASES.categories`.
- Produces six categories (`機場`, `車站／交通`, `餐廳`, `飯店`, `購物`, `緊急／求助`), large Japanese text, optional reading, copy buttons, live copy feedback, and `ja-JP` SpeechSynthesis buttons when supported.

- [ ] **Step 1: Add failing phrase data tests**

Extend `tests/core-tests.js` with a new `TripCore.findPhrase(categories, id)` contract and assert it returns the exact Japanese string `この電車は押上駅に行きますか？` for the stable transport phrase ID. Also assert the six category IDs and that every phrase has non-empty `zh`, `ja`, and stable `id` values.

- [ ] **Step 2: Run and verify RED**

Run: `cscript //nologo tests\core-tests.js`

Expected: FAIL because `TripCore.findPhrase` does not exist.

- [ ] **Step 3: Implement tabs/accordion and actions**

Add `TripCore.findPhrase(categories, id)` as a pure lookup. Render accessible category tabs with one visible panel, large Japanese copy, reading where present, and at least a 44px copy target. Use `navigator.clipboard.writeText` with a textarea/`execCommand('copy')` fallback. Announce success via an `aria-live` region. Add speech buttons only when `speechSynthesis` exists and set utterance language to `ja-JP`.

- [ ] **Step 4: Verify GREEN**

Run: `cscript //nologo tests\core-tests.js`

Expected: all assertions pass.

Run: `git diff --check`

Expected: exit code 0.

- [ ] **Step 5: Commit**

```bash
git add phrases.html assets/js/phrases.js data/phrases.js tests/core-tests.js
git commit -m "feat: add Japanese travel phrasebook"
```

### Task 6: Deployment, documentation, accessibility, and end-to-end verification

**Files:**
- Create: `tests/serve.ps1`
- Create: `tests/link-check.ps1`
- Modify: `day1-guide.html`
- Modify: `day2-guide.html`
- Modify: `day3-guide.html`
- Modify: `.github/workflows/deploy-pages.yml`
- Modify: `README.md`
- Modify: `dist/client/**`

**Interfaces:**
- Consumes all pages and assets from Tasks 1–5.
- Produces a local static-server command, repeatable internal-link validation, shared navigation from preserved guides, a complete GitHub Pages artifact, and contributor instructions for Days 4–6, tickets, checklist, and phrases.

- [ ] **Step 1: Write a failing internal-link and deployment artifact test**

Create `tests/link-check.ps1` that parses every `href`/`src` on the production HTML pages, ignores `http`, `mailto`, `tel`, and hash-only targets, strips query/hash, and fails when the relative file is missing. It must also verify the workflow packages `index.html`, all four tool pages, the map, guide/aquarium pages, `assets/`, `data/`, and `images/`.

- [ ] **Step 2: Run and verify RED**

Run: `powershell -NoProfile -ExecutionPolicy Bypass -File tests\link-check.ps1`

Expected: FAIL because the workflow still packages the old file list and preserved guides lack the new main-tool navigation.

- [ ] **Step 3: Finish navigation, static serving, deployment, and docs**

Add compact links from the three preserved guides into the four primary tools without deleting detail content. Add `tests/serve.ps1` as a traversal-safe loopback-only static server. Update the Pages workflow to package the four tool pages, map, legacy detail pages, shared `assets/`, `data/`, and `images/`. Rewrite README with the new architecture, exact edit locations, local preview/test commands, image naming, and Day 4–6 instructions. Copy the validated production files into `dist/client` for the existing Sites host without altering `dist/server/index.js` or `.openai/hosting.json`.

- [ ] **Step 4: Run automated verification**

Run:

```powershell
cscript //nologo tests\core-tests.js
powershell -NoProfile -ExecutionPolicy Bypass -File tests\link-check.ps1
git diff --check
```

Expected: all commands exit 0 with no failed assertions or missing paths.

- [ ] **Step 5: Run browser verification**

Start `tests/serve.ps1` on loopback. At 360px, 390px, 430px, and desktop verify: no horizontal overflow; home shows four cards; bottom nav does not obscure content; Day 1–6 selection shows one day; Day 4–6 say `尚未安排`; Day 2 ticket deep links both ways; QR placeholders do not show broken images; an available fixture QR enlarges and closes; map query limits points to one day; checklist survives reload and reset confirmation; phrases copy and announce; keyboard focus is visible; and console has no application errors.

- [ ] **Step 6: Verify deployment configuration and commit**

Run the same copy commands as the workflow into a temporary `_site` directory and run `tests/link-check.ps1` against it. Confirm `git status --short` contains only intended files.

```bash
git add .github README.md day1-guide.html day2-guide.html day3-guide.html dist tests
git commit -m "docs: finish mobile tool deployment and verification"
```
