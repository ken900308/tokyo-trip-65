# Tokyo Trip Mobile Tool

2026 東京六日旅程的手機優先工具站。首頁只提供四個主要入口：行程、Checklist、票券與常用文字；Day 1–3 的長篇街頭指南及墨田水族館完整資訊頁仍保留為細節頁。Day 4–6 尚未規劃，不應自行補入景點或票券。

## 網站結構

| 路徑 | 用途 | 主要編輯位置 |
| --- | --- | --- |
| `index.html` | 四工具首頁 | 頁面本身 |
| `itinerary.html` | 單日行程與地圖入口 | `data/itinerary.js` |
| `currency.html` | 行程頁標頭的次要匯率換算工具 | 頁面本身、`fx-widget.js` |
| `itinerary-map.html` | Leaflet 單日路線地圖 | `data/itinerary.js` 的 `mapStops` |
| `tickets.html` | 依日期展開的票券夾 | `data/tickets.js` |
| `checklist.html` | 會儲存在瀏覽器的旅行清單 | `data/checklist.js` |
| `phrases.html` | 可複製、可朗讀的日文常用文字 | `data/phrases.js` |
| `day1-guide.html`–`day3-guide.html` | 保留的街頭操作長篇指南 | 各 HTML 檔案 |
| `sumida-aquarium.html` | 保留的水族館票券與參觀細節 | 頁面本身、`images/` |
| `assets/css/app.css` | 四個主要工具的共用樣式 | 此 CSS 檔案 |
| `assets/js/*.js` | 四工具的互動行為 | 對應功能的 JS 檔案 |

根目錄的 `style.css`、`guide.css` 與 `aquarium.css` 供保留頁面使用。`currency.html` 沿用 `fx-widget.js`，支援 JPY／TWD／USD 雙向輸入、交換幣別、快取與離線參考匯率；從行程頁標頭的「匯率換算」進入，不增加首頁入口。`japan_day1.md`–`japan_day3.md` 是原始行程筆記。舊 Bali 預覽檔與素材仍保留在 repository，但不屬於東京工具站的正式頁面。

## 本機預覽與檢查

請從 repository 根目錄執行 traversal-safe、只綁定 loopback 的靜態伺服器：

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File tests\serve.ps1
```

預設網址是 `http://127.0.0.1:4173/`。若要改 port：

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File tests\serve.ps1 -Port 8080
```

提交前執行：

```powershell
cscript //nologo tests\core-tests.js
powershell -NoProfile -ExecutionPolicy Bypass -File tests\audit-check.ps1
powershell -NoProfile -ExecutionPolicy Bypass -File tests\link-check.ps1
git diff --check
```

`link-check.ps1` 會檢查正式頁面的相對 `href`／`src`、資料內的行程／票券連結、匯率工具次要入口、保留指南的四工具入口、伺服器 traversal 防護，以及 GitHub Pages artifact 清單。`audit-check.ps1` 檢查 QR hidden 樣式與狀態、保留資訊及匯率工具的 HTML／CSS／JS 整合契約；它不取代瀏覽器 computed-style 與互動測試。兩支 PowerShell 檢查都可傳入 `-SiteRoot <path>` 檢查已組裝站點。

## 新增 Day 4–6 行程

所有日期已在 `data/itinerary.js` 建立。未規劃日期必須維持 `planned: false` 與 `status: "尚未安排"`，不要只為填滿畫面而發明內容。確認行程後：

1. 在對應 day record 改為 `planned: true`，填入 `title`、`routeSummary`、`mapStops` 與 `events`。
2. `mapStops` 依實際行程順序排列；每點提供 `time`、`title`、`description`、`lat`、`lng`。
3. 每個 `events` 提供現場可操作的 `time`、`label`、`title`、`summary`；只有確定存在時才加入交通、備案、官方、導航、指南或票券連結。
4. 若新增長篇指南，建立相對 URL、加入四工具導覽，並把頁面加入 `.github/workflows/deploy-pages.yml` 與 `tests/link-check.ps1` 的 production manifest。
5. 執行完整檢查，並在 360、390、430px 與桌面寬度確認單日顯示、地圖點位與無水平捲動。

## 新增票券與 QR 圖片

在 `data/tickets.js` 的對應 day `groups` 新增票券群組；穩定 `id` 會成為 deep-link hash。票券返回行程的文字由所屬 day 自動產生，`itineraryUrl` 也應指向同一天，例如 Day 4 使用 `itinerary.html?day=4`。行程事件需要票券時，在 `data/itinerary.js` 加入相對 `ticketUrl`，例如 `tickets.html?day=2#sumida-aquarium`。

墨田水族館四張圖片放在 `images/`，檔名必須精確為：

- `sumida-ticket-me.png`
- `sumida-ticket-dad.png`
- `sumida-ticket-mom.png`
- `sumida-ticket-jin.png`

圖片缺少時頁面會顯示明確 placeholder，不會顯示 broken-image UI。GitHub Pages 與 `dist/client` 的東京正式 artifact 只允許上列四個圖片路徑；根目錄 `images/` 內既有的 Bali 素材不會發布。新增其他票券時，建議使用小寫英數與連字號命名，例如 `day4-event-person.png`，同步更新 `data/tickets.js`、workflow 與 `tests/link-check.ps1` 的明確 allowlist，且不要提交含私人資訊的真實票券到公開 repository，除非已確認可公開。

## 修改 Checklist 與常用文字

- Checklist：編輯 `data/checklist.js`。每個 item 的 `id` 必須永久穩定，否則使用者既有的 `localStorage` 勾選狀態無法對應。儲存 key 是 `tokyo-trip-checklist-v1`。
- 常用文字：編輯 `data/phrases.js`。保留六個 category `id`；每句至少需要唯一 `id`、中文 `zh` 與日文 `ja`，讀音 `reading` 可省略。

## 部署與 `dist/client`

`.github/workflows/deploy-pages.yml` 在 `main` push 或手動執行時，將正式頁面、根目錄相依檔案、`assets/`、`data/` 與實際存在的四張 allowlisted QR 圖片組裝到 `_site`，再上傳 GitHub Pages artifact。它不會遞迴發布整個 legacy `images/`。Repository 的 Pages Source 必須設為 **GitHub Actions**。

`dist/client/` 是同一份靜態站點供既有 Sites host 使用。修改 production HTML、CSS、JS 或 data 後，必須同步相同相對路徑至 `dist/client/`；圖片只同步四個 allowlisted QR 路徑中實際存在的檔案，不要複製整個 legacy `images/`。完成後對該目錄執行：

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File tests\link-check.ps1 -SiteRoot dist\client
powershell -NoProfile -ExecutionPolicy Bypass -File tests\audit-check.ps1 -SiteRoot dist\client
```

不要修改 `dist/server/index.js` 或 `.openai/hosting.json`。GitHub Pages 公開網址：`https://ken900308.github.io/tokyo-trip-65/`。
