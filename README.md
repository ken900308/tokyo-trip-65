# Bali Trip Site - Editing Guide

This site is a static HTML/CSS project. Edit the files directly and refresh your browser.

## Files
- index.html: Main itinerary page and overview map embed.
- itinerary-map.html: Dynamic itinerary map and animation logic.
- food.html: Food map page (by area/date).
- visa.html: Visa instructions page.
- style.css: Global styles for all pages.
- images/: Local images used across pages.

## Edit the itinerary (index.html)
- Daily summary table is near the top ("每日行程總表").
- Detailed day-by-day schedule is under the "每日詳細行程" section.
- Keep the summary and detailed schedule aligned.

## Edit the dynamic map (itinerary-map.html)
- The map data is in the `days` array.
- Each day has:
  - id, title, subtitle
  - stops: list of locations in order
- Each stop has:
  - id, time, title, desc, image, lat, lng, type
- Types used: hotel | attraction | transport

### Map embed mode
- The homepage uses embed mode: `itinerary-map.html?embed=1`.
- Embed mode hides the header/left list and shows map only.

### Animation behavior
- Route animates and loops after a short pause.
- Popup auto-open pauses for 10 seconds after manual popup actions.
- To adjust speed: update the interval in `startRouteTimer`.

## Edit the food map (food.html)
- Content is grouped by area/date sections.
- Each card contains image, restaurant name, description, and a suggested day.

## Images
- Put new images into images/.
- Use relative paths like `images/your_file.jpg`.
- Prefer local images over external links.

## Quick edits checklist
- Update text: edit the HTML directly.
- Update map points: edit the `days` array in itinerary-map.html.
- Update styles: edit style.css.

## View locally
- Open index.html in your browser.
- Refresh after changes.

---

# 中文版 - 編輯指南

這是一個靜態 HTML/CSS 專案，直接修改檔案後重新整理瀏覽器即可。

## 檔案說明
- index.html：主行程頁與地圖總覽嵌入。
- itinerary-map.html：動態地圖與路徑動畫。
- food.html：美食地圖頁（依地區/日期）。
- visa.html：簽證申請頁。
- style.css：全站共用樣式。
- images/：本地圖片放置處。

## 編輯行程 (index.html)
- 每日行程總表在頁面上方（「每日行程總表」）。
- 詳細行程在「每日詳細行程」區段。
- 請保持總表與詳細行程內容一致。

## 編輯動態地圖 (itinerary-map.html)
- 地圖資料在 `days` 陣列。
- 每一天包含：
  - id, title, subtitle
  - stops：當天的點位清單
- 每個 stop 包含：
  - id, time, title, desc, image, lat, lng, type
- type 可用：hotel | attraction | transport

### 地圖嵌入模式
- 首頁使用 `itinerary-map.html?embed=1`。
- embed 模式會隱藏標題與左側清單，只顯示地圖。

### 動畫行為
- 路徑會播放並在短暫停頓後重播。
- 手動關閉或點擊圖標後，10 秒內不會自動彈出 popup。
- 想調整速度：修改 `startRouteTimer` 的間隔。

## 編輯美食地圖 (food.html)
- 內容依地區/日期分段。
- 每張卡包含圖片、餐廳名稱、特色與建議日期。

## 圖片
- 新圖片放在 images/。
- 路徑使用 `images/你的檔名.jpg`。
- 優先使用本地圖片。

## 快速修改清單
- 文字：直接改 HTML。
- 地圖點位：改 itinerary-map.html 的 `days`。
- 樣式：改 style.css。

## 本機查看
- 用瀏覽器開啟 index.html。
- 修改後重新整理。
