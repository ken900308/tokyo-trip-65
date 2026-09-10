# Tokyo Trip｜東京家族旅行工具

2026/09/25–09/30，四位成人的東京旅行網站。Day 1–3 已安排；票券頁另有 Day 5 飯店與 Day 6 回程航班，其餘未安排內容保留空白。

公開網站：[Tokyo Trip](https://ken900308.github.io/tokyo-trip-65/)

## 專案結構

| 位置 | 用途 |
| --- | --- |
| 根目錄的 11 個 HTML | 正式網頁；保留既有網址與書籤 |
| `assets/css/` | 共用樣式、指南與水族館樣式 |
| `assets/js/` | 頁面互動與匯率換算程式 |
| `data/` | 行程、票券、Checklist、常用文字資料 |
| `images/` | 日本旅遊票券圖片；檔名規則見該目錄 README |
| `docs/itinerary/` | Day 1–3 原始行程筆記 |
| `docs/design/` | 網站設計規格 |
| `docs/development/` | 東京網站開發與驗證紀錄 |
| `docs/superpowers/` | 既有東京網站開發計畫 |
| `tests/` | 檢查腳本與本機預覽伺服器 |
| `scripts/` | 部署輸出同步工具 |
| `dist/client/` | 自動產生的 Sites 靜態輸出，請勿直接編輯 |
| `dist/server/`、`.openai/` | 既有 Sites 主機設定 |
| `.github/workflows/` | GitHub Pages 自動發布流程 |

## 平常如何更新

1. 修改 `data/`、根目錄 HTML 或 `assets/`。
2. 執行同步指令，產生相同內容的 Sites 輸出。
3. 執行檢查並預覽。
4. Commit 並 push 到 `main`，GitHub Actions 會自動發布 GitHub Pages；Sites 是另一個獨立部署目標。

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File scripts/sync-site.ps1
cscript //nologo tests/core-tests.js
powershell -NoProfile -ExecutionPolicy Bypass -File tests/audit-check.ps1
powershell -NoProfile -ExecutionPolicy Bypass -File tests/link-check.ps1
powershell -NoProfile -ExecutionPolicy Bypass -File tests/link-check.ps1 -SiteRoot dist/client
git diff --check
powershell -NoProfile -ExecutionPolicy Bypass -File tests/serve.ps1
```

本機預覽網址為 `http://127.0.0.1:4173/`。同步工具只重建 `dist/client/`，不會修改主機設定或 `dist/server/`。

## 修改行程

日常編輯入口是 `data/itinerary.js`；`docs/itinerary/day1.md`–`day3.md` 是參考筆記，修改 Markdown 不會自動更新網頁。長篇現場操作資訊放在 `day1-guide.html`–`day3-guide.html`。

只有確認行程後才將對應日期改成 `planned: true`，填入 `title`、`routeSummary`、`events` 與 `mapStops`。交通提示寫在實際出發的事件內，包含上車站、下車站及轉乘方式，不另外集中到獨立欄位。未安排日期保留 `planned: false`，不要自行補景點。

票券連結例：`tickets.html?day=2#sumida-aquarium`。新增 HTML 頁面時，同步更新 workflow、`scripts/sync-site.ps1` 與 `tests/link-check.ps1` 的正式頁面清單。

## 票券、飯店與航班

編輯 `data/tickets.js`。群組的 `id` 是穩定的頁面錨點，`itineraryUrl` 應指向同一天。航班與住宿使用 `kind: "flight"` 或 `kind: "hotel"`，搭配 `title`、`time`、`summary`、`details`；住宿可加 `address` 與 Google Maps `externalUrl`。

公開網站及公開 repository 不應放入 PNR、電子機票號碼、訂單編號、PIN 或原始訂位截圖。折疊內容並不等於隱私保護。

水族館四張 QR 圖片使用 `images/README.md` 指定的檔名；缺圖時會顯示提示。QR 點擊可全螢幕開啟，再點可放大。新增圖片路徑時同步更新部署、同步工具及連結檢查的允許清單。真實票券也可能被公開讀取，請確認可公開後再提交。

## Checklist、常用文字與匯率

- `data/checklist.js`：保留穩定 item `id`，才能延續瀏覽器已勾選狀態；儲存 key 為 `tokyo-trip-checklist-v1`。
- `data/phrases.js`：每句保留唯一 `id`、中文 `zh`、日文 `ja`；讀音 `reading` 可省略。
- `currency.html` 與 `assets/js/fx-widget.js`：由行程頁次要入口開啟的匯率工具。

## 清理與還原

已移除舊峇里島頁面、圖片、報價與菜單 PDF，以及不再使用的舊樣式。已追蹤檔案可從 Git 歷史還原。正式頁面網址保持不變。
