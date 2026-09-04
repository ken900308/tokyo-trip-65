# Tokyo Trip Site

2026 東京六日旅遊網站。目前完成 Day 1–2，內容來源為：

- `japan_day1.md`：台灣出發、成田入境、Welcome Suica、押上入住
- `japan_day2.md`：墨田水族館、淺草寺、上野阿美橫町

## 主要檔案

- `index.html`：行程首頁
- `sumida-aquarium.html`：墨田水族館分頁（四人 QR Code、館內資訊與參觀動線）
- `itinerary-map.html`：Leaflet 互動地圖與停靠點資料
- `style.css`：共用版面與響應式樣式
- `fx-widget.js`：JPY／TWD／USD 匯率換算

## 墨田水族館 QR Code

將四張票券圖片放入 `images` 資料夾並命名為 `sumida-ticket-me.png`、`sumida-ticket-dad.png`、`sumida-ticket-mom.png`、`sumida-ticket-jin.png`，分頁會自動顯示。

## 本機預覽

請透過本機 HTTP server 開啟，不建議直接使用 `file://`，否則外部地圖與匯率服務可能受到瀏覽器限制。

首頁：`http://127.0.0.1:<port>/`

地圖：`http://127.0.0.1:<port>/itinerary-map.html`

## 加入後續日期

1. 在 `index.html` 增加新的每日行程區塊。
2. 在 `itinerary-map.html` 的 `days` 資料加入當日停靠點。
3. 每個地點需提供時間、名稱、說明、緯度及經度。

舊有 Bali HTML 與素材暫時保留，但不會出現在新版首頁導覽。
