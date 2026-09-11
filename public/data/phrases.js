var TOKYO_PHRASES = {
  categories: [
    {
      id: "airport",
      title: "機場",
      icon: "✈️",
      phrases: [
        {id: "airport-train-station", zh: "請問車站在哪裡？", ja: "駅はどこですか？", reading: "Eki wa doko desu ka?"},
        {id: "airport-immigration", zh: "這是我的入境 QR Code。", ja: "入国手続きのQRコードです。", reading: "Nyūkoku tetsuzuki no kyūāru kōdo desu."}
      ]
    },
    {
      id: "transport",
      title: "車站／交通",
      icon: "🚆",
      phrases: [
        {id: "train-to-oshiage", zh: "請問這班車有到押上嗎？", ja: "この電車は押上駅に行きますか？", reading: "Kono densha wa Oshiage-eki ni ikimasu ka?"},
        {id: "transport-elevator", zh: "請問電梯在哪裡？", ja: "エレベーターはどこですか？", reading: "Erebētā wa doko desu ka?"},
        {id: "transport-fastest", zh: "請問去押上最快的車是哪一班？", ja: "押上まで一番早い電車はどれですか？", reading: "Oshiage made ichiban hayai densha wa dore desu ka?"}
      ]
    },
    {
      id: "restaurant",
      title: "餐廳",
      icon: "🍜",
      phrases: [
        {id: "restaurant-four", zh: "四位，謝謝。", ja: "四人です。", reading: "Yonin desu."},
        {id: "restaurant-menu", zh: "請給我看菜單。", ja: "メニューを見せてください。", reading: "Menyū o misete kudasai."},
        {id: "restaurant-check", zh: "麻煩結帳。", ja: "お会計をお願いします。", reading: "Okaikei o onegai shimasu."}
      ]
    },
    {
      id: "hotel",
      title: "飯店",
      icon: "🏨",
      phrases: [
        {id: "hotel-check-in", zh: "我們要辦理入住。", ja: "チェックインをお願いします。", reading: "Chekkuin o onegai shimasu."},
        {id: "hotel-store-before-checkin", zh: "請問可以在入住前寄放行李嗎？", ja: "チェックイン前に荷物を預かっていただけますか？", reading: "Check-in mae ni nimotsu o azukatte itadakemasu ka?"},
        {id: "hotel-breakfast-four", zh: "我想預訂明天四個人的早餐。", ja: "明日の朝食を4名分予約したいです。", reading: "Ashita no chōshoku o yonmei-bun yoyaku shitai desu."},
        {id: "hotel-taxi-haneda-t3", zh: "麻煩幫我們叫計程車到羽田機場第三航廈。", ja: "羽田空港第3ターミナルまでタクシーをお願いします。", reading: "Haneda Kūkō dai-san tāminaru made takushī o onegaishimasu."},
        {id: "hotel-help-door", zh: "房門打不開，請幫忙。", ja: "部屋のドアが開きません。助けてください。", reading: "Heya no doa ga akimasen. Tasukete kudasai."}
      ]
    },
    {
      id: "shopping",
      title: "購物",
      icon: "🛍️",
      phrases: [
        {id: "shopping-price", zh: "這個多少錢？", ja: "これはいくらですか？", reading: "Kore wa ikura desu ka?"},
        {id: "shopping-tax-free", zh: "可以免稅嗎？", ja: "免税にできますか？", reading: "Menzei ni dekimasu ka?"}
      ]
    },
    {
      id: "emergency",
      title: "緊急／求助",
      icon: "🆘",
      phrases: [
        {id: "emergency-help", zh: "請幫幫我。", ja: "助けてください。", reading: "Tasukete kudasai."},
        {id: "emergency-police", zh: "請幫我叫警察。", ja: "警察を呼んでください。", reading: "Keisatsu o yonde kudasai."},
        {id: "emergency-hospital", zh: "請帶我去醫院。", ja: "病院に連れて行ってください。", reading: "Byōin ni tsurete itte kudasai."}
      ]
    }
  ]
};

if (typeof window !== "undefined") {
  window.TOKYO_PHRASES = TOKYO_PHRASES;
}
