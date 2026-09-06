# Tokyo Trip Website Redesign Goal

## 1. 核心目標

把目前的東京旅遊網站從「長篇旅遊文章／行程展示頁」改造成 **手機優先、旅行現場可以快速操作的工具型網站**。

Repo：`ken900308/tokyo-trip-65`

目前網站已經有 Day 1–3、各日街頭指南、墨田水族館票券頁、Leaflet 地圖與 GitHub Pages 部署。這些內容不要丟掉，而是重新整理資訊架構與 UI。

核心原則：

> 首頁回答「我現在要做什麼？」  
> 行程回答「我下一站去哪？」  
> 票券回答「我現在要出示什麼？」  
> Checklist 回答「我還漏了什麼？」  
> 常用文字回答「我現在要怎麼說？」

網站主要使用情境是：**人在東京街頭，用手機單手操作。**

---

## 2. 不可破壞的既有內容

目前 repo 已有的重要內容：

- `index.html`
- `day1-guide.html`
- `day2-guide.html`
- `day3-guide.html`
- `sumida-aquarium.html`
- `itinerary-map.html`
- `style.css`
- `guide.css`
- `aquarium.css`
- `fx-widget.js`
- `images/`
- GitHub Pages workflow

目前已完成：

- Day 1：成田機場 → Welcome Suica → 押上入住
- Day 2：墨田水族館 → 淺草寺 → 上野阿美橫町
- Day 3：日枝神社 → 明治神宮 → HARAKADO → 新宿／歌舞伎町

### 要求

1. **保留 Day 1–3 的實用資訊，不要因 redesign 而刪減內容。**
2. 可以重構舊頁面，但要確保重要資訊都有新入口。
3. 墨田水族館現有四人 QR Code／票券支援必須保留。
4. 既有圖片與地圖資料盡量重用。
5. GitHub Pages 部署不能被破壞。
6. 不要把尚未確定的 Day 4–6 行程內容自行亂補。

---

# 3. 首頁

## 首頁目的

首頁只負責「選工具」，不要再展示完整行程。

畫面上方只需要簡單顯示：

- `TOKYO`
- `09.25 → 09.30`
- `6 days · 5 nights`（可選）

接著直接放 **四個主要入口卡片，2 × 2 grid**：

1. 🗓️ 行程
2. ✅ Checklist
3. 🎫 票券
4. 💬 常用文字

### 設計要求

- 手機第一屏最好可以直接看到四個入口。
- 不要大型 Hero 圖。
- 不要在首頁塞 Day 1、Day 2、Day 3 長內容。
- 不要旅行雜誌風。
- 卡片要大、清楚、好點。
- 主要 tap target 至少約 44px。
- 保留大量留白。

---

# 4. 全站底部導覽

在主要功能頁底部固定一條 mobile bottom navigation：

`🗓️ 行程 | ✅ Checklist | 🎫 票券 | 💬 常用文字`

要求：

- `position: fixed`
- 注意 iPhone safe-area
- 目前頁面要有 active state
- 不遮住正文
- 每個按鈕要容易單手點擊
- 桌機版可調整成較自然的導覽形式

首頁可以不顯示 bottom nav，如果這樣視覺更乾淨。

---

# 5. 行程頁

建議：`itinerary.html`

## 5.1 進入行程後先選 Day

不要一次把六天全部展開。

顯示：

- Day 1 · 09/25
- Day 2 · 09/26
- Day 3 · 09/27
- Day 4 · 09/28
- Day 5 · 09/29
- Day 6 · 09/30

Day 4–6 若尚未完成，可以顯示：

`尚未安排`

不要自行發明行程。

---

## 5.2 選 Day 後只顯示當天

例如選 Day 2：

頂部顯示簡單 route summary：

`住宿 → 墨田水族館 → 淺草寺 → 上野 → 住宿`

然後顯示當天 timeline。

不要同時把其他 Day 的內容塞在下面。

---

## 5.3 行程卡設計

每個行程卡要偏「操作指令」而不是文章。

例如：

### 13:45｜晴空塔 → 淺草

首選：
- 🚌 Skytree Shuttle
- 上車：晴空塔城 3 號乘車處
- 下車：淺草雷門
- 約 10 分鐘

判斷：
- 下一班 ≤ 15 分鐘：搭巴士
- 下一班要等太久：直接搭電車

備案：
- 🚃 東武晴空塔線
- TS02 とうきょうスカイツリー
- → TS01 淺草
- 1 站

按鈕：
- `🗺 今日地圖`
- `📖 詳細指南`
- 若此站有票券：`🎫 查看票券`
- 若有官方資訊：`🌐 官方網站`

### UI 目標

人在路邊只看 3–5 秒，就知道：
- 現在去哪
- 搭什麼
- 從哪站／哪出口
- 有沒有 Plan B
- 要不要拿票

---

# 6. 行程與票券連動

如果某個行程需要票券，該 itinerary card 必須有直接連結。

例如：

`墨田水族館 → 查看票券`

可以導到：

`tickets.html?day=2#sumida-aquarium`

或其他等價、穩定的 deep link。

票券頁也要提供：

`查看 Day 2 行程`

形成雙向連動。

---

# 7. 當日地圖

使用既有 Leaflet 地圖資料。

## 新邏輯

不要預設顯示整趟旅程所有 pin。

在 Day view 內：
- 只顯示目前選擇 Day 的停靠點
- pin 順序與當日行程一致
- 地圖可以預設收合，按「展開今日地圖」再打開
- 提供「全螢幕地圖」按鈕也可以

可以重構 `itinerary-map.html` 支援：

`?day=1`  
`?day=2`  
`?day=3`

或把地圖直接整合進 itinerary page。

選擇最乾淨、最好維護的方案。

---

# 8. 票券頁

建議：`tickets.html`

## UI

以 Day 為下拉式／accordion：

- Day 1 · 09/25
- Day 2 · 09/26
- Day 3 · 09/27
- Day 4 · 09/28
- Day 5 · 09/29
- Day 6 · 09/30

展開後才顯示當日票券。

---

## 墨田水族館

現有 `sumida-aquarium.html` 有四人 QR Code 邏輯。

新票券頁要能直接快速看到這些 QR Code。

要求：

- 每個人的票券清楚標示
- QR Code 要夠大
- 點擊可以放大／全螢幕
- 不要讓票券埋在大量文字中
- 可以保留 `sumida-aquarium.html` 作為「完整館內資訊頁」
- tickets page 主要負責「快速出示票券」

若票券圖片不存在：
- 顯示清楚 placeholder
- 不要 broken image

---

# 9. Checklist

建議：`checklist.html`

設計成類似 Notion 的 checklist。

例如分類：

### 證件
- [ ] 護照
- [ ] Visit Japan Web
- [ ] 航班資料

### 住宿
- [ ] 自助入住說明截圖
- [ ] 大門／房門密碼
- [ ] 飯店地址

### 網路／電子用品
- [ ] eSIM / 網路
- [ ] 行動電源
- [ ] 充電線

### 交通／金錢
- [ ] 日圓現金
- [ ] Suica
- [ ] 信用卡

### 票券
- [ ] 墨田水族館票券

實際內容可從既有網站與資料合理整理，但不要捏造尚未購買的票券或預約。

## 行為

- 點 checkbox 後標記完成
- 已完成項目可淡化＋刪除線
- 使用 `localStorage` 儲存
- reload／關閉瀏覽器後仍保留狀態
- 顯示完成進度，例如 `12 / 18`
- 提供 `重設 Checklist`，但要有確認步驟避免誤觸

---

# 10. 常用文字

建議：`phrases.html`

按照「情境」分類，使用 accordion 或 tabs：

- ✈️ 機場
- 🚆 車站／交通
- 🍜 餐廳
- 🏨 飯店
- 🛍️ 購物
- 🆘 緊急／求助

每張 phrase card：

1. 中文情境／意思
2. **大字日文**
3. 可選的小字讀音／羅馬字
4. `複製`按鈕
5. 如果簡單可靠，可加入 `🔊 播放日文`，使用 browser SpeechSynthesis `ja-JP`

例如：

中文：
`請問這班車有到押上嗎？`

日文：
`この電車は押上駅に行きますか？`

按鈕：
`複製日文`

---

# 11. 資料與程式結構

目前網站是 static HTML/CSS/JS，除非 repo 已經有必要的 framework，**不要為這次 redesign 引入 React/Vue 等大型 framework**。

優先維持：
- static site
- GitHub Pages
- vanilla JS
- 快速載入
- 容易維護

建議將資料與 UI 分離，例如：

```text
index.html
itinerary.html
tickets.html
checklist.html
phrases.html

assets/
  css/
    app.css
  js/
    app.js
    itinerary.js
    tickets.js
    checklist.js
    phrases.js

data/
  itinerary.js / itinerary.json
  tickets.js / tickets.json
  checklist.js / checklist.json
  phrases.js / phrases.json
```

實際結構可依 repo 現況調整，不要為了追求結構而過度重構。

### 重要

GitHub Pages static hosting 若直接 fetch JSON 會受本機 `file://` 影響，但正式網站沒問題。選擇一個既能部署、又方便本機預覽的簡單方案。

---

# 12. Responsive / Accessibility

主要目標裝置：

- iPhone / Android phone
- 次要：桌機

至少檢查：

- 360px
- 390px
- 430px
- desktop

要求：

- 不出現水平捲動
- 文字不用縮放也看得清楚
- button 易點
- QR Code 不被縮太小
- bottom nav 不擋內容
- 使用 semantic HTML
- keyboard focus visible
- aria-label 用於只有 icon 的按鈕
- 顏色對比不要太弱

---

# 13. 視覺設計方向

要的是：

**乾淨、目的性、工具感。**

參考氣質：
- Apple Wallet
- Notion
- Google Maps
- 現代交通 App

Prefer：
- 淺色背景
- 卡片
- 圓角
- 大量留白
- 單一主色
- 清楚的時間、站名、出口
- restrained shadow/border

Avoid：
- 巨大 Hero
- 旅遊雜誌風標題
- 大面積背景圖片
- 太多裝飾 icon
- 每個區塊不同顏色
- 太多漸層
- 一頁無止境往下滑

---

# 14. Deep link / URL

需要能分享或直接打開指定內容。

至少支援類似：

- `itinerary.html?day=1`
- `itinerary.html?day=2`
- `itinerary.html?day=3`
- `tickets.html?day=2#sumida-aquarium`

若使用 hash router 也可以，只要：
- reload 後仍能正確顯示
- GitHub Pages 不會 404
- URL 可以直接分享

---

# 15. 舊頁面處理

不要一開始就粗暴刪掉舊檔案。

流程：

1. 先確認新網站已完整承接內容。
2. 舊 guide page 若仍有價值，可以保留並由 itinerary 的「詳細指南」連過去。
3. 若某舊頁完全被取代，可以保留簡單 redirect，或確認沒有入口／資料依賴後再整理。
4. 不要破壞現有票券圖片路徑。

---

# 16. 不要做的事

- 不要自行新增 Day 4–6 景點。
- 不要亂改已確定的 Day 1–3 行程。
- 不要刪掉實用交通細節。
- 不要用大量 Lorem Ipsum。
- 不要只做漂亮 mockup，功能要真的能用。
- 不要把 QR Code 做成裝飾小圖。
- 不要讓 checklist refresh 後失效。
- 不要讓票券與 itinerary 互相找不到。
- 不要因為 redesign 改壞 GitHub Pages workflow。
- 不要引入不必要的大型依賴。

---

# 17. 實作流程

Codex 執行時請：

1. 先完整 inspect repo。
2. 找出現有 Day 1–3、guide、ticket、map、images、deployment workflow 的依賴。
3. 先寫簡短 implementation plan。
4. 再開始修改。
5. 優先完成 navigation / information architecture。
6. 再完成 itinerary。
7. 再完成 tickets。
8. 再完成 checklist。
9. 再完成 phrases。
10. 再整理 shared CSS / JS。
11. 最後做 responsive / accessibility / regression check。
12. 啟動本機 static server 實際測試。
13. 若環境允許，做 browser smoke test。
14. 檢查 GitHub Pages 路徑全部使用 relative path，避免部署後 404。

---

# 18. Definition of Done

只有以下全部成立才算完成：

- [ ] 首頁只有四個主要入口，視覺乾淨
- [ ] 四個入口都可正常使用
- [ ] 行程頁可以選 Day
- [ ] Day 1–3 內容完整搬入／可存取
- [ ] Day 4–6 顯示尚未安排，而非虛構內容
- [ ] 每次只顯示目前 Day
- [ ] 交通卡能快速讀懂
- [ ] 當日地圖只顯示當日點位
- [ ] 行程可以直接跳票券
- [ ] 票券可以跳回當日行程
- [ ] 墨田水族館四人 QR Code 可快速出示
- [ ] QR Code 可放大
- [ ] Checklist 可勾選
- [ ] Checklist 狀態存在 localStorage
- [ ] Checklist 有完成進度
- [ ] 常用文字有情境分類
- [ ] 日文可一鍵複製
- [ ] 底部 navigation 正常
- [ ] 360 / 390 / 430px 不破版
- [ ] 桌機版仍正常
- [ ] 沒有明顯 broken links
- [ ] 沒有 console error
- [ ] GitHub Pages deployment 沒被破壞
- [ ] README 更新新架構與後續 Day 4–6 編輯方式

---

# 19. 最終交付時 Codex 要回報

完成後請提供：

1. 修改摘要
2. 新的檔案結構
3. 哪些舊頁被保留／替代
4. 如何新增 Day 4–6
5. 如何新增票券
6. Checklist 資料在哪裡修改
7. 常用文字資料在哪裡修改
8. 測試過哪些 viewport / 功能
9. 尚有任何 limitation 時明確列出

**不要做到一半就停在「下一步建議」。Goal mode 的目標是直接把 redesign 做到可用狀態。**
