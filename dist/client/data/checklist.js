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
