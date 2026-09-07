var TOKYO_ITINERARY = {
  days: [
    {
      day: 1,
      date: "09/25",
      weekday: "FRI",
      planned: true,
      title: "台灣 → 東京",
      routeSummary: ["桃園 T1", "成田 T1", "押上", "住宿"],
      detailGuideUrl: "day1-guide.html",
      ticketDeepLinks: [],
      officialUrls: [
        {label: "Visit Japan Web", url: "https://www.digital.go.jp/policies/visit_japan_web"},
        {label: "成田 T1 官方地圖", url: "https://www.narita-airport.jp/en/discover/official_guide/"},
        {label: "Welcome Suica", url: "https://www.jreast.co.jp/en/multi/welcomesuica/"}
      ],
      navigationUrls: [
        {label: "成田 T1 → 押上", url: "https://www.google.com/maps/dir/?api=1&origin=Narita+Airport+Terminal+1&destination=Oshiage+Station&travelmode=transit"},
        {label: "前往住宿", url: "https://www.google.com/maps/dir/?api=1&origin=Narita+Airport+Terminal+1&destination=5-chome-1-8+Narihira,+Sumida+City,+Tokyo&travelmode=transit"}
      ],
      mapStops: [
        {time: "20:00", title: "成田國際機場 T1", description: "入境、領行李、購買 Welcome Suica", lat: 35.7647, lng: 140.3864},
        {time: "21:30", title: "成田機場站", description: "搭 Access Express 直達押上", lat: 35.7658, lng: 140.3855},
        {time: "22:20", title: "押上站", description: "抵達 Oshiage / Skytree", lat: 35.7101, lng: 139.8131},
        {time: "22:30", title: "nestay suite 東京天空樹", description: "步行前往住宿、自助入住", lat: 35.7058, lng: 139.8178}
      ],
      events: [
        {
          id: "day-1-flight",
          time: "15:30",
          label: "FLIGHT",
          title: "桃園機場出發",
          summary: "酷航 TR874，預計 20:00 抵達成田國際機場 T1。",
          transport: {mode: "flight", from: "桃園機場 T1", to: "成田機場 T1", service: "酷航 TR874"}
        },
        {
          id: "day-1-arrival",
          time: "20:00",
          label: "ARRIVAL",
          title: "成田入境與領行李",
          summary: "依序完成入國審查、領行李、海關，再到 1F 入境大廳；Visit Japan Web QR Code 先存到手機。預估 20:40–21:15 出關。",
          instruction: "完成海關後跟著「鉄道 / Train」前往 B1F。",
          officialUrl: "https://www.digital.go.jp/policies/visit_japan_web",
          navigationUrl: "https://www.narita-airport.jp/en/discover/official_guide/"
        },
        {
          id: "day-1-suica",
          time: "21:15",
          label: "SUICA",
          title: "B1F 購買 Welcome Suica",
          summary: "每人一張，第一次建議儲值 ¥3,000～¥5,000；不需 ¥500 押金、效期 28 天，餘額不能退款。",
          instruction: "找 Welcome Suica 售票機，或向 JR EAST Travel Service Center 詢問。",
          officialUrl: "https://www.jreast.co.jp/en/multi/welcomesuica/"
        },
        {
          id: "day-1-access-express",
          time: "21:30",
          label: "DIRECT TRAIN",
          title: "Access Express 直達押上",
          summary: "搭京成 Narita SKY ACCESS「アクセス特急」，約 50～60 分鐘，可刷 Suica，不需另買特急券。",
          instruction: "上車前確認電子看板顯示停靠「押上 Oshiage」。",
          transport: {mode: "train", from: "成田空港 T1", to: "押上 Oshiage", service: "Access Express"},
          planB: "直達車要等太久時，在青砥轉一次；向京成站務員詢問最快路線。",
          navigationUrl: "https://www.google.com/maps/dir/?api=1&origin=Narita+Airport+Terminal+1&destination=Oshiage+Station&travelmode=transit"
        },
        {
          id: "day-1-check-in",
          time: "22:30",
          label: "CHECK-IN",
          title: "步行前往住宿",
          summary: "押上站 B1 出口往業平方向，步行約 6～10 分鐘至 nestay suite 東京天空樹；大行李可改走有電梯的 B3。",
          instruction: "超過 23:00 仍可自助入住；先存好大門／房門密碼、房號、房東聯絡方式。",
          address: "東京都墨田区業平5丁目1-8",
          navigationUrl: "https://www.google.com/maps/search/?api=1&query=東京都墨田区業平5丁目1-8"
        }
      ]
    },
    {
      day: 2,
      date: "09/26",
      weekday: "SAT",
      planned: true,
      title: "東京下町散策",
      routeSummary: ["住宿", "墨田水族館", "淺草寺", "上野・阿美橫", "住宿"],
      detailGuideUrl: "day2-guide.html",
      ticketDeepLinks: [
        {id: "sumida-aquarium", label: "墨田水族館票券", url: "tickets.html?day=2#sumida-aquarium"}
      ],
      officialUrls: [
        {label: "墨田水族館交通", url: "https://www.sumida-aquarium.com/about/access/"},
        {label: "Skytree Shuttle", url: "https://www.tobu-bus.com/pc/skytree_shuttle/01.html"},
        {label: "淺草寺交通", url: "https://www.senso-ji.jp/access/"},
        {label: "阿美橫交通", url: "https://www.ameyoko.net/access/"}
      ],
      navigationUrls: [
        {label: "現在去淺草寺", url: "https://www.google.com/maps/dir/?api=1&destination=Senso-ji,+Tokyo&travelmode=transit"},
        {label: "淺草寺 → 阿美橫", url: "https://www.google.com/maps/dir/?api=1&origin=Senso-ji,+Tokyo&destination=Ameyoko+Shopping+District&travelmode=transit"},
        {label: "現在回住宿", url: "https://www.google.com/maps/dir/?api=1&destination=東京都墨田区業平5丁目1-8&travelmode=transit"}
      ],
      mapStops: [
        {time: "10:30", title: "nestay suite 東京天空樹", description: "從住宿步行出發", lat: 35.7058, lng: 139.8178},
        {time: "10:50", title: "墨田水族館", description: "Tokyo Solamachi 5F～6F", lat: 35.7101, lng: 139.8107},
        {time: "14:10", title: "雷門", description: "從雷門開始淺草散步", lat: 35.7107, lng: 139.7966},
        {time: "15:30", title: "淺草寺", description: "仲見世通、寶藏門、五重塔與本堂", lat: 35.7148, lng: 139.7967},
        {time: "17:00", title: "上野・阿美橫町", description: "從上野端一路逛往御徒町", lat: 35.7099, lng: 139.7745},
        {time: "20:00", title: "押上站", description: "銀座線轉都營淺草線返回", lat: 35.7101, lng: 139.8131}
      ],
      events: [
        {
          id: "day-2-aquarium-walk",
          time: "10:30",
          label: "步行出發",
          title: "住宿 → 墨田水族館",
          summary: "導航設定 Sumida Aquarium；進 Solamachi 後走 West Yard 4F，搭水族館專用電梯至 5F Entrance。",
          transport: {mode: "walk", from: "住宿", to: "墨田水族館"},
          navigationUrl: "https://www.google.com/maps/dir/?api=1&destination=Sumida+Aquarium&travelmode=walking"
        },
        {
          id: "day-2-sumida-aquarium",
          time: "10:50",
          label: "約 100 分鐘",
          title: "墨田水族館",
          summary: "位於 Solamachi 5F～6F，10:50 左右出示四人的 QR Code 入場。",
          ticketUrl: "tickets.html?day=2#sumida-aquarium",
          detailUrl: "sumida-aquarium.html",
          officialUrl: "https://www.sumida-aquarium.com/about/ticket/"
        },
        {
          id: "day-2-lunch",
          time: "12:30",
          label: "午餐",
          title: "Tokyo Solamachi",
          summary: "留在晴空塔城附近用餐，最晚 13:45 開始移動。"
        },
        {
          id: "day-2-to-asakusa",
          time: "13:45",
          label: "搭車前往淺草",
          title: "晴空塔 → 淺草雷門",
          summary: "下一班 Skytree Shuttle 在 15 分鐘內就搭；成人 ¥250，可刷 Suica，約 10 分鐘。",
          transport: {mode: "bus", from: "晴空塔城 3 號乘車處", to: "淺草雷門", service: "Skytree Shuttle"},
          planB: "巴士要等更久就搭東武晴空塔線：Tokyo Skytree TS02 → Asakusa TS01，1 站約 3 分鐘。",
          officialUrl: "https://www.tobu-bus.com/pc/skytree_shuttle/01.html",
          navigationUrl: "https://www.google.com/maps/dir/?api=1&destination=Senso-ji,+Tokyo&travelmode=transit"
        },
        {
          id: "day-2-sensoji",
          time: "14:10",
          label: "約 140 分鐘",
          title: "雷門・仲見世通・淺草寺",
          summary: "沿雷門、仲見世通、寶藏門、五重塔走到本堂，不折返；16:00 前抵達本堂。",
          instruction: "本堂正面階梯不方便時，面向本堂往左側找電梯。",
          officialUrl: "https://www.senso-ji.jp/access/"
        },
        {
          id: "day-2-to-ueno",
          time: "16:30",
          label: "搭車前往上野",
          title: "淺草 → 上野",
          summary: "搭東京 Metro 銀座線往澀谷方向，3 站約 5 分鐘，不用轉車。",
          transport: {mode: "train", from: "淺草 G19・Exit 1", to: "上野 G16・Exit 5b", service: "東京 Metro 銀座線"},
          planB: "需要地面電梯走上野 Exit 5a；下一班巴士 10 分鐘內且大家很累才改搭 Shuttle。",
          navigationUrl: "https://www.google.com/maps/dir/?api=1&origin=Senso-ji,+Tokyo&destination=Ameyoko+Shopping+District&travelmode=transit"
        },
        {
          id: "day-2-ameyoko",
          time: "17:00",
          label: "晚餐與逛街",
          title: "上野・阿美橫町",
          summary: "從上野端一路逛往御徒町，阿美橫約 500 公尺；19:30 左右準備回程，不原路折返。",
          officialUrl: "https://www.ameyoko.net/access/"
        },
        {
          id: "day-2-return",
          time: "20:00",
          label: "返回住宿",
          title: "上野 → 淺草 → 押上",
          summary: "銀座線至淺草，跟都營淺草線指標轉至 A18，再搭至押上 A20，約 14～15 分鐘。",
          transport: {mode: "train", from: "上野 G16", transfer: "淺草 G19 → A18", to: "押上 A20"},
          planB: "四人都累或買很多東西時，可從上野／阿美橫搭計程車回住宿；剛好看到都營巴士 上23 也可搭。",
          navigationUrl: "https://www.google.com/maps/dir/?api=1&destination=東京都墨田区業平5丁目1-8&travelmode=transit"
        }
      ]
    },
    {
      day: 3,
      date: "09/27",
      weekday: "SUN",
      planned: true,
      title: "神社與東京西側",
      routeSummary: ["押上", "日枝神社", "明治神宮", "HARAKADO", "新宿", "住宿"],
      detailGuideUrl: "day3-guide.html",
      ticketDeepLinks: [],
      officialUrls: [
        {label: "日枝神社", url: "https://www.hiejinja.net/"},
        {label: "明治神宮", url: "https://www.meijijingu.or.jp/"},
        {label: "HARAKADO", url: "https://www.tokyu-plaza.com/harakado/"},
        {label: "JR 東日本", url: "https://www.jreast.co.jp/"},
        {label: "東京 Metro", url: "https://www.tokyometro.jp/"}
      ],
      navigationUrls: [
        {label: "押上 → 日枝神社", url: "https://www.google.com/maps/dir/?api=1&origin=Oshiage+Station&destination=Hie+Shrine,+Tokyo&travelmode=transit"},
        {label: "日枝神社 → 明治神宮", url: "https://www.google.com/maps/dir/?api=1&origin=Hie+Shrine,+Tokyo&destination=Meiji+Jingu&travelmode=transit"},
        {label: "明治神宮 → HARAKADO", url: "https://www.google.com/maps/dir/?api=1&origin=Meiji+Jingu&destination=Tokyu+Plaza+Harajuku+HARAKADO&travelmode=walking"},
        {label: "原宿 → 新宿", url: "https://www.google.com/maps/dir/?api=1&origin=Harajuku+Station&destination=Shinjuku+Station&travelmode=transit"},
        {label: "新宿 → 住宿", url: "https://www.google.com/maps/dir/?api=1&origin=Shinjuku+Station&destination=東京都墨田区業平5丁目1-8&travelmode=transit"}
      ],
      mapStops: [
        {time: "10:30", title: "押上站", description: "半藏門線至青山一丁目，轉銀座線", lat: 35.7101, lng: 139.8131},
        {time: "11:20", title: "日枝神社", description: "溜池山王 Exit 7，搭山王橋電扶梯", lat: 35.6747, lng: 139.7397},
        {time: "13:30", title: "明治神宮", description: "從原宿口走南參道至御社殿", lat: 35.6764, lng: 139.6993},
        {time: "15:00", title: "HARAKADO", description: "6F Food Hall 休息與 Persona 30 活動", lat: 35.6686, lng: 139.7059},
        {time: "16:40", title: "新宿・歌舞伎町", description: "東口、一番街、Godzilla Head 與晚餐", lat: 35.6948, lng: 139.7028},
        {time: "20:30", title: "JR 新宿站", description: "中央・總武線各站停車往錦糸町", lat: 35.6909, lng: 139.7003},
        {time: "21:10", title: "押上站", description: "錦糸町轉半藏門線 1 站返回", lat: 35.7101, lng: 139.8131}
      ],
      events: [
        {
          id: "day-3-to-hie",
          time: "10:30",
          label: "住宿出發",
          title: "押上 → 溜池山王",
          summary: "半藏門線往澀谷方向，在青山一丁目轉銀座線往淺草方向。",
          transport: {mode: "train", from: "押上 Z14", transfer: "青山一丁目 Z03 → G04", to: "溜池山王 G06・Exit 7"},
          instruction: "Exit 7 出站約 3 分鐘找山王鳥居，旁邊是山王橋・西參道電扶梯。",
          navigationUrl: "https://www.google.com/maps/dir/?api=1&origin=Oshiage+Station&destination=Hie+Shrine,+Tokyo&travelmode=transit"
        },
        {
          id: "day-3-hie-shrine",
          time: "11:20",
          label: "約 55 分鐘",
          title: "日枝神社",
          summary: "搭山王橋電扶梯上去，依序走南神門、本殿、神猿像與稻荷參道紅色鳥居。",
          planB: "不想走鳥居階梯，可到入口拍照後原路返回，再搭電扶梯下去。",
          officialUrl: "https://www.hiejinja.net/"
        },
        {
          id: "day-3-to-harajuku",
          time: "12:15",
          label: "搭車前往原宿",
          title: "赤坂 → 明治神宮前〈原宿〉",
          summary: "從日枝神社步行到赤坂站 Exit 3a，搭千代田線往代代木上原方向，不用轉車。",
          transport: {mode: "train", from: "赤坂 C06", via: "乃木坂 C05・表參道 C04", to: "明治神宮前〈原宿〉C03"},
          navigationUrl: "https://www.google.com/maps/dir/?api=1&origin=Hie+Shrine,+Tokyo&destination=Meiji+Jingu&travelmode=transit"
        },
        {
          id: "day-3-lunch",
          time: "12:40",
          label: "午餐與休息",
          title: "原宿附近午餐",
          summary: "先吃飯、上洗手間、補水和坐一下，再進明治神宮；餐廳依現場人潮選擇。"
        },
        {
          id: "day-3-meiji",
          time: "13:30",
          label: "約 90 分鐘",
          title: "明治神宮",
          summary: "從原宿口進入，走南參道、大鳥居到御社殿後原路返回；距離長且部分為碎石路，不要趕。",
          officialUrl: "https://www.meijijingu.or.jp/"
        },
        {
          id: "day-3-harakado",
          time: "15:00",
          label: "休息＋逛街",
          title: "HARAKADO・Persona 30 週年活動",
          summary: "步行約 5～10 分鐘，先到 6F Food Hall 坐下、補水與上洗手間；有體力再上 7F 屋頂。",
          instruction: "9/27 是活動最後一天，9/26 晚上確認官方公告與營業時間。",
          officialUrl: "https://www.tokyu-plaza.com/harakado/",
          navigationUrl: "https://www.google.com/maps/dir/?api=1&origin=Meiji+Jingu&destination=Tokyu+Plaza+Harajuku+HARAKADO&travelmode=walking"
        },
        {
          id: "day-3-to-shinjuku",
          time: "16:15",
          label: "步行＋JR",
          title: "HARAKADO → 新宿",
          summary: "步行約 5～10 分鐘至 JR 原宿站，搭山手線外回り，認明「新宿・池袋方面」。",
          transport: {mode: "train", from: "JR 原宿 JY19", via: "代代木 JY18", to: "JR 新宿 JY17", service: "山手線外回り・2 站"},
          instruction: "不要搭往澀谷・品川方向。",
          navigationUrl: "https://www.google.com/maps/dir/?api=1&origin=Harajuku+Station&destination=Shinjuku+Station&travelmode=transit"
        },
        {
          id: "day-3-shinjuku",
          time: "16:40",
          label: "晚餐與自由活動",
          title: "新宿東口・歌舞伎町",
          summary: "由東口走歌舞伎町一番街、Godzilla Head、東急歌舞伎町 TOWER；依長輩體力縮短。"
        },
        {
          id: "day-3-return",
          time: "20:30",
          label: "返回住宿",
          title: "新宿 → 錦糸町 → 押上",
          summary: "搭中央・總武線各站停車往御茶之水／千葉方向；錦糸町刷出 JR，再進 Metro 半藏門線。",
          transport: {mode: "train", from: "JR 新宿", transfer: "JR 錦糸町 → Metro Z13", to: "押上 Z14・1 站"},
          instruction: "不要誤搭中央線快速。",
          navigationUrl: "https://www.google.com/maps/dir/?api=1&origin=Shinjuku+Station&destination=東京都墨田区業平5丁目1-8&travelmode=transit"
        }
      ]
    },
    {day: 4, date: "09/28", weekday: "MON", planned: false, status: "尚未安排"},
    {day: 5, date: "09/29", weekday: "TUE", planned: false, status: "尚未安排"},
    {day: 6, date: "09/30", weekday: "WED", planned: false, status: "尚未安排"}
  ]
};

if (typeof window !== "undefined") {
  window.TOKYO_ITINERARY = TOKYO_ITINERARY;
}
