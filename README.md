# Tokyo Trip｜東京家族旅行工具

2026/09/25–09/30，四位成人的東京旅行網站。Day 1–3、Day 5–6 已安排；Day 4 休息、各自自由活動。Day 5 搬飯店與池上散步，Day 6 羽田回松山。

公開網站：[Tokyo Trip](https://ken900308.github.io/tokyo-trip-65/)

## 唯一編輯入口：public

| 位置 | 用途 |
| --- | --- |
| `public/*.html` | 11 個正式頁面，只有一份原始碼 |
| `public/assets/css/` | 樣式 |
| `public/assets/js/` | 行程、QR、Checklist、匯率等互動 |
| `public/data/` | 行程、票券、Checklist、常用文字資料 |
| `public/images/` | 票券圖片；未放圖時可不存在，規則見 `docs/tickets.md` |
| `docs/itinerary/` | Day 1–3 原始行程筆記 |
| `docs/design/`、`docs/development/`、`docs/superpowers/` | 設計及歷史開發紀錄 |
| `tests/` | 功能檢查及本機伺服器 |
| `scripts/build-site.mjs` | 只供 Sites 發布的建置工具 |
| `.github/workflows/` | GitHub Pages 自動發布 |
| `.openai/`、`dist/server/` | 既有 Sites 主機設定 |

`public/` 對應網站根目錄，公開網址不會多出 `/public/`，既有書籤不變。

以前 `dist/client/` 是重複追蹤的網站副本，現在已從 Git 移除。只有執行 `npm run build` 才會產生此暫存輸出；它已被 Git 忽略，不要編輯或提交。GitHub Pages 直接打包 `public/`，不需要建置或手動同步副本。

## 更新與預覽

1. 修改 `public/` 裡的內容。
2. 執行檢查並預覽。
3. Commit、push 到 `main`，GitHub Actions 自動發布。

```powershell
cscript //nologo tests/core-tests.js
node tests/itinerary-swipe-tests.mjs
node tests/visitor-maps-tests.mjs
powershell -NoProfile -ExecutionPolicy Bypass -File tests/audit-check.ps1
powershell -NoProfile -ExecutionPolicy Bypass -File tests/link-check.ps1
git diff --check
powershell -NoProfile -ExecutionPolicy Bypass -File tests/serve.ps1
```

預覽網址為 `http://127.0.0.1:4173/`，只提供 `public/` 內容。Sites 是獨立部署目標，需要先 `npm run build`，再檢查 `tests/link-check.ps1 -SiteRoot dist/client`；建置不修改原始碼或 `dist/server/`。

## 修改行程

編輯 `public/data/itinerary.js`。`docs/itinerary/day1.md`–`day3.md` 是參考筆記，修改 Markdown 不會自動更新網頁。長篇現場操作資訊放在 `public/day1-guide.html`–`day3-guide.html`。

確認行程後才設 `planned: true`，填入 `title`、`routeSummary`、`events` 與 `mapStops`。交通提示放在實際出發的事件內，包含上下車站與轉乘方式。未安排日期保留 `planned: false`，不要自行補景點。

行程可左滑看下一天、右滑看前一天，仍可點日期按鈕；不循環，也不攔截地圖、路線列和連結的操作。日期切換使用 220ms 淡出／淡入，不自動捲動或移動焦點；支援瀏覽器上一頁／下一頁。減少動態效果模式直接更新，不播放動畫。

票券連結例：`tickets.html?day=2#sumida-aquarium`。新增頁面時，同步更新 workflow、`scripts/build-site.mjs` 與 `tests/link-check.ps1` 的正式頁面清單。

## 票券、飯店與航班

編輯 `public/data/tickets.js`。群組 `id` 是穩定錨點，`itineraryUrl` 應指向同一天。航班／住宿使用 `kind: "flight"`／`"hotel"`，搭配 `title`、`time`、`summary`、`details`；住宿可加 `address` 與 Google Maps `externalUrl`。

四張 QR 圖片的檔名見 `docs/tickets.md`，缺圖時顯示提示。QR 點擊全螢幕，再點可放大。新增圖片路徑須更新部署、建置工具與連結檢查的允許清單。

本次依旅程擁有者明確授權，公開四張水族館 QR 與住宿入住碼（`checkinCode`）。公開網址、repository 與 Git 歷史中的資料都可能被搜尋、複製或轉傳，折疊不等於存取保護。未授權的 PNR、電子機票號碼、其他訂單 PIN 與訂位截圖仍不要放入。若日後撤回公開，需一併處理已發布檔案與 Git 歷史；撤下也不能收回他人副本。

Day 1 優先 Access 特急往押上，至少保留每人 ¥1,200 Suica 餘額。`public/assets/css/arrival.css` 管理七步驟排版。整合匯出網站時保留原有 Day 5、6、Checklist 與無捲動日期切換，不以匯出檔整包覆蓋。

導覽圖資料在 `public/data/visitor-maps.js`，圖片在 `public/assets/maps/`；各圖以行程事件 `id` 關聯，由 `visitor-maps.js` 提供放大、縮放與返回。只匯入有使用的圖片；來源、圖片語言與整理日期均顯示在卡片內，最新現場指標優先。

## 其他內容

- `public/data/checklist.js`：保留穩定 item `id`，才能延續已勾選狀態；儲存 key 為 `tokyo-trip-checklist-v1`。
- `public/data/phrases.js`：每句保留唯一 `id`、中文 `zh`、日文 `ja`；讀音 `reading` 可省略。
- `public/currency.html`、`public/assets/js/fx-widget.js`：匯率工具。

舊峇里島頁面及素材已刪除；已追蹤檔案可從 Git 歷史還原。歷史開發紀錄裡的舊路徑僅供參考，以本 README 為準。
