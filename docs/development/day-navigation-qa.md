# Day navigation 修正與驗證（2026-09-11）

## 根本原因

網站原本已在同一頁渲染行程，沒有整頁重新載入。Day click handler 卻呼叫 `panel.scrollIntoView()`；先前版本的 `panel.focus()` 也會觸發捲動。點擊時停用了內容動畫，直接替換 HTML，因此仍有突然切換的感覺。原本只使用 `replaceState`，亦無日期歷史還原。

## 修正

- 移除日期切換路徑內的 `focus`、`scrollIntoView`、`scrollTo`。
- 舊內容淡出 90ms 後更新，新內容淡入 130ms，只位移 4px。
- 切換中保留區塊高度，完成後保留 viewport 所需最低高度，避免短日期觸發瀏覽器捲動範圍縮減；不強制還原 scroll position。
- 日期點擊 pushState；初始化 replaceState；popstate 恢復日期而不新增歷史。
- 快速切換會取消舊動畫，避免過期回呼覆寫最新日期。
- 尊重 prefers-reduced-motion；Day 按鈕維持焦點及輕微顏色 transition。
- 行程 JS 加上版本參數，避免沿用先前快取程式。

## 實際驗證

本機 HTTP 預覽，Codex 內建瀏覽器，桌面 1280×720、手機尺寸 390×844（非實體手機）。

兩種尺寸皆逐次測試：1→2、2→3、3→1、1→6、6→1。

- 每次完成後 scrollY 均為 0；桌面日期列 top 維持 125.03125px，手機為 107.03125px。
- URL、active 日期與內容一致，手機沒有水平頁面溢出。
- Back 回到 Day 6、Forward 回到 Day 1，位置不變。
- `?day=2` 重新整理後正確呈現 Day 2。
- 瀏覽器 console error 紀錄為空。

Node 事件測試另驗證：不呼叫捲動／焦點 API、歷史處理、先淡出再渲染、總長 220ms、區塊高度保留、快速點擊取消、減少動態效果直接更新。連結、既有頁面契約與 JavaScript 語法檢查通過。

瀏覽器工具在點擊回傳時動畫已結束，故沒有量測逐幀平滑度；動畫時序由自動測試驗證。
