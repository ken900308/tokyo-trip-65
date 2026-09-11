var TOKYO_TICKETS = {
  days: [
    {
      day: 1,
      date: "09/25",
      groups: [
        {
          id: "flight-tr874",
          kind: "flight",
          label: "OUTBOUND FLIGHT",
          title: "酷航 TR874",
          time: "09/25",
          summary: "台北 → 東京",
          passengers: "四位成人",
          status: "已出票",
          itineraryUrl: "itinerary.html?day=1",
          details: [
            {label: "航線", value: "台北 → 東京"},
            {label: "狀態", value: "已出票"}
          ]
        }
      ]
    },
    {
      day: 2,
      date: "09/26",
      groups: [
        {
          id: "sumida-aquarium",
          title: "墨田水族館",
          time: "09/26 10:50",
          detailUrl: "sumida-aquarium.html",
          itineraryUrl: "itinerary.html?day=2",
          holders: [
            {id: "me", label: "我", image: "images/sumida-ticket-me.png"},
            {id: "dad", label: "爸爸", image: "images/sumida-ticket-dad.png"},
            {id: "mom", label: "媽媽", image: "images/sumida-ticket-mom.png"},
            {id: "jin", label: "金明玲", image: "images/sumida-ticket-jin.png"}
          ]
        }
      ]
    },
    {day: 3, date: "09/27", groups: []},
    {day: 4, date: "09/28", groups: []},
    {
      day: 5,
      date: "09/29",
      groups: [
        {
          id: "hotel-mystays-haneda",
          kind: "hotel",
          label: "AIRPORT HOTEL",
          title: "MYSTAYS 羽田飯店",
          time: "09/29–09/30 · 1 晚",
          summary: "羽田機場旁住宿",
          address: "5 Chome-1-13 Haneda, Ota City, Tokyo 144-0043, Japan",
          externalUrl: "https://www.google.com/maps/search/?api=1&query=HOTEL+MYSTAYS+Haneda",
          itineraryUrl: "itinerary.html?day=5",
          details: [
            {label: "入住", value: "09/29 15:00 後"},
            {label: "退房", value: "09/30 11:00 前"},
            {label: "住宿", value: "四位成人 · 1 晚"},
            {label: "服務", value: "24 小時櫃台 · 免費行李寄存"},
            {label: "早餐待辦", value: "09/29 向櫃台預訂 09/30 四人早餐；尚未確認預訂完成"},
            {label: "機場接駁", value: "09/30 預計 09:20 Lobby 集合、09:30 前往羽田 T3；前一天向櫃台確認，客滿改電車／計程車"}
          ]
        }
      ]
    },
    {
      day: 6,
      date: "09/30",
      groups: [
        {
          id: "flight-br191",
          kind: "flight",
          label: "RETURN FLIGHT",
          title: "長榮航空 BR191",
          time: "09/30 · 12:40 日本 → 15:05 台灣（預定）",
          summary: "東京 → 台北",
          passengers: "四位成人",
          status: "已出票",
          itineraryUrl: "itinerary.html?day=6",
          details: [
            {label: "航線", value: "東京羽田 HND Terminal 3 → 台北松山 TSA Terminal 1"},
            {label: "起飛", value: "09/30 12:40（日本時間；依行程資料）"},
            {label: "抵達", value: "09/30 15:05（台灣時間；依行程資料）"},
            {label: "報到", value: "T3・3F A Island；約 10:10 開櫃，目標 10:40 前完成，櫃檯與時間以現場為準"},
            {label: "登機門", value: "不預先指定；以登機證／看板為準，建議 12:10 前抵達，更早登機時間優先"},
            {label: "狀態", value: "已出票"}
          ]
        }
      ]
    }
  ]
};

if (typeof window !== "undefined") {
  window.TOKYO_TICKETS = TOKYO_TICKETS;
}
