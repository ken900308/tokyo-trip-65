var TOKYO_CHECKLIST = {
  groups: [
    {
      id: "documents",
      title: "證件",
      items: [
        {id: "passport", label: "護照"},
        {id: "visit-japan-web", label: "Visit Japan Web 與 QR Code 截圖"},
        {id: "flight-details", label: "航班資料"}
      ]
    },
    {
      id: "accommodation",
      title: "住宿",
      items: [
        {id: "self-check-in", label: "自助入住說明截圖"},
        {id: "door-codes", label: "大門／房門密碼與房號"},
        {id: "hotel-address", label: "住宿地址與房東聯絡方式"}
      ]
    },
    {
      id: "connectivity",
      title: "網路／電子用品",
      items: [
        {id: "esim", label: "eSIM／網路"},
        {id: "power-bank", label: "行動電源"},
        {id: "charging-cables", label: "充電線與插頭"}
      ]
    },
    {
      id: "money-transport",
      title: "交通／金錢",
      items: [
        {id: "yen-cash", label: "日圓現金"},
        {id: "suica", label: "Suica；Day 3 前確認餘額約 ¥2,000"},
        {id: "credit-card", label: "信用卡"}
      ]
    },
    {
      id: "day5-move",
      title: "Day 5｜搬飯店與池上",
      items: [
        {id: "day5-checkout-all", label: "退房巡房，護照與全部行李帶走"},
        {id: "day5-train-stop", label: "押上上車前確認列車停靠穴守稻荷"},
        {id: "day5-luggage-store", label: "MYSTAYS 羽田寄存行李"},
        {id: "day5-breakfast-four", label: "向櫃台預訂 9/30 四人早餐"},
        {id: "day5-kaikan-elevator", label: "導航池上會館；不走 96 階，17:00 前搭電梯離開"},
        {id: "day5-checkin", label: "回飯店取行李、入住、拿房卡"},
        {id: "day5-shuttle-confirm", label: "確認明早 09:30 Shuttle、Lobby 集合處及早餐預訂"},
        {id: "day5-return-pack", label: "整理戰利品與托運，確認 BR191，手機與行動電源充電"}
      ]
    },
    {
      id: "day6-home",
      title: "Day 6｜回台日",
      items: [
        {id: "day6-breakfast", label: "四人早餐，08:45 左右回房"},
        {id: "day6-carry-on", label: "護照、手機、登機資料、行動電源與常用藥放隨身"},
        {id: "day6-room-sweep", label: "巡查保險箱、插座、冰箱、浴室與衣櫃，交回房卡"},
        {id: "day6-lobby", label: "09:20 Lobby 等接駁；預計 09:30 出發"},
        {id: "day6-shuttle-unload", label: "羽田 T3 下車，拿齊四人所有行李"},
        {id: "day6-counter", label: "3F Departures 看 BR191 櫃檯，辦理報到與托運"},
        {id: "day6-security", label: "完成安檢與出境審查"},
        {id: "day6-gate", label: "核對 Gate，12:10 前抵達；更早 Boarding Time 優先"},
        {id: "day6-arrival-bags", label: "松山 T1 入境，領齊全部托運行李"}
      ]
    },
    {
      id: "tickets",
      title: "票券",
      items: [
        {id: "sumida-aquarium-tickets", label: "墨田水族館四人票券"}
      ]
    }
  ]
};

if (typeof window !== "undefined") {
  window.TOKYO_CHECKLIST = TOKYO_CHECKLIST;
}
