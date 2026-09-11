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
          ticketUrl: "tickets.html?day=1#flight-tr874",
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
    {
      day: 5, date: "09/29", weekday: "TUE", planned: true,
      title: "搬飯店＋池上庭園散步",
      routeSummary: ["押上退房", "MYSTAYS 羽田", "蒲田", "池上梅園", "池上本門寺", "飯店休息"],
      mapStops: [
        {time: "09:30", title: "nestay suite 東京天空樹", description: "全部行李帶走，前往押上站", lat: 35.7058, lng: 139.8178},
        {time: "11:15", title: "HOTEL MYSTAYS Haneda", description: "先寄放行李，預訂四人早餐", lat: 35.55078, lng: 139.74907},
        {time: "12:30", title: "池上站", description: "先用午餐，再搭巴士至本門寺裏", lat: 35.571875, lng: 139.702936},
        {time: "13:40", title: "池上梅園", description: "位置示意；只走舒服園路，不爬階梯", lat: 35.581194, lng: 139.703078},
        {time: "15:00", title: "池上本門寺", description: "寺院位置示意；入口請導航池上會館電梯", lat: 35.578838, lng: 139.705231},
        {time: "18:00", title: "HOTEL MYSTAYS Haneda", description: "正式入住、確認早餐及隔日接駁", lat: 35.55078, lng: 139.74907}
      ],
      events: [
        {id: "day-5-checkout", time: "09:30–10:00", label: "全部行李帶走", title: "nestay suite Tokyo Skytree 退房",
          summary: "住宿：5-chōme-1-8 Narihira, Sumida-ku, Tokyo。今天先搬飯店，再輕裝去池上；爸媽以少走路、少爬樓梯為優先。",
          instruction: "確認護照、手機、充電器、行動電源、錢包、Suica、戰利品與全部行李；巡查冰箱、浴室及插座。"},
        {id: "day-5-to-haneda", time: "10:00–11:15", label: "步行＋電車", title: "押上 → 穴守稻荷 → MYSTAYS 羽田",
          summary: "拉行李到押上站，找都營淺草線，不要進半藏門線月台。優先搭往羽田空港第1・第2ターミナル且停靠穴守稻荷的京急直通車，電車約 45～50 分鐘。",
          transport: {mode: "train", service: "都營淺草線 → 京急本線 → 京急空港線直通", from: "押上 Oshiage", via: "泉岳寺・品川・京急蒲田", to: "穴守稻荷 Anamori-inari / KK14"},
          instruction: "上車前同時確認「羽田空港方向」與「停靠穴守稻荷」，不要只看目的地。直通車不用下車；下車後導航 HOTEL MYSTAYS Haneda，步行約 4 分鐘直接到櫃台。",
          planB: "無合適直通車時，依當天導航在泉岳寺／京急蒲田轉往羽田空港方向、會停穴守稻荷的列車；月台與實際班次以看板為準。",
          navigationUrl: "https://www.google.com/maps/dir/?api=1&origin=Oshiage+Station&destination=HOTEL+MYSTAYS+Haneda&travelmode=transit",
          ticketUrl: "tickets.html?day=5#hotel-mystays-haneda"},
        {id: "day-5-luggage", time: "約 11:00–11:30", label: "寄存＋早餐預訂", title: "飯店寄放行李・訂明天四人早餐",
          summary: "HOTEL MYSTAYS Haneda：5-1-13 Haneda, Ota-ku, Tokyo 144-0043。正式入住 15:00 後，先詢問能否寄存。",
          instruction: "寄存：チェックイン前に荷物を預かっていただけますか？ 早餐：明日の朝食を4名分予約したいです。（Breakfast for four tomorrow, please.）若須入住時才能訂，18:00 務必再處理。順便確認隔日 09:30 接駁班次與集合處。",
          ticketUrl: "tickets.html?day=5#hotel-mystays-haneda",
          officialUrl: "https://iconia.co.jp/location-hotel-mystays-haneda-tokyo"},
        {id: "day-5-bus-kamata", time: "11:30", label: "京急巴士", title: "穴守稻荷巴士站 → 蒲田站",
          summary: "輕裝步行到穴守稻荷站附近的京急巴士站。找車頭／站牌寫「蒲田駅」的班次，約 25～30 分鐘，可用 Suica。行程列蒲32、蒲33、蒲73為候選，當天仍要核對停站。",
          transport: {mode: "bus", service: "京急巴士・往蒲田駅", from: "穴守稻荷巴士站", to: "蒲田駅"},
          instruction: "確認方向再上車。下車找東急線蒲田站，不是 JR 月台，也不是京急蒲田站；避免從京急蒲田再步行轉到蒲田。",
          navigationUrl: "https://www.google.com/maps/dir/?api=1&origin=HOTEL+MYSTAYS+Haneda&destination=Tokyu+Kamata+Station&travelmode=transit"},
        {id: "day-5-train-ikegami", time: "約 12:00–12:30", label: "東急池上線", title: "蒲田 → 池上",
          summary: "從東急蒲田站搭池上線往五反田方向，2 站約 4～5 分鐘；整段飯店至池上預留到 12:30。",
          transport: {mode: "train", service: "東急池上線・往五反田", from: "東急蒲田", via: "蓮沼", to: "池上 Ikegami / IK13"},
          navigationUrl: "https://www.google.com/maps/dir/?api=1&origin=Tokyu+Kamata+Station&destination=Ikegami+Station&travelmode=transit"},
        {id: "day-5-lunch", time: "12:30–13:15", label: "午餐＋休息", title: "池上站附近用餐",
          summary: "不硬排名店，以爸媽吃得舒服為主。可找烏龍麵、蕎麥麵、親子丼、鰻魚飯、茶碗蒸、豆腐或柔軟熟食定食。",
          instruction: "避開生魚片、生蛋、半熟肉、厚切牛排與太有嚼勁的燒肉；點餐確認全熟。"},
        {id: "day-5-to-baien", time: "13:15–13:40", label: "巴士＋步行", title: "池上站 → 本門寺裏 → 池上梅園",
          summary: "不從池上站硬走約 20 分鐘。出站找東急巴士「上池上循環 外回り」，確認停靠本門寺裏；下車後步行約 3 分鐘。",
          transport: {mode: "bus", service: "東急巴士・上池上循環 外回り", from: "池上站", to: "本門寺裏 Honmonji-ura"},
          navigationUrl: "https://www.google.com/maps/dir/?api=1&origin=Ikegami+Station&destination=Ikegami+Baien&travelmode=transit"},
        {id: "day-5-baien", time: "13:40–14:40", label: "庭園散步", title: "池上梅園",
          summary: "09:00–16:30，最後入園 16:00；成人 ¥100，65 歲以上出示年齡證明可免費。9 月不是梅花季，以日式庭園散步、休息為主。",
          instruction: "只走舒服的主要園路，坡道、觀景台及階梯不勉強。園內有輪椅對應廁所，但不是全平地。園址依大田區官方：池上二丁目3番2号；導航請直接搜「池上梅園」。一般週一休園，當日開園仍以公告為準。",
          officialUrl: "https://www.city.ota.tokyo.jp/shisetsu/park/ikegamibaien.html",
          navigationUrl: "https://www.google.com/maps/search/?api=1&query=Ikegami+Baien"},
        {id: "day-5-to-kaikan", time: "14:40–15:00", label: "步行＋電梯", title: "池上梅園 → 池上會館",
          summary: "長輩同行預留 10～15 分鐘找入口。導航「池上会館 Ikegami Kaikan」，地址 1-32-8 Ikegami, Ota City, Tokyo。",
          transport: {mode: "walk", from: "池上梅園", to: "池上會館電梯入口"},
          instruction: "不要導航到本門寺正面石階。進池上會館後搭電梯到寺院境內；官方可利用時間 08:30–17:00。",
          navigationUrl: "https://www.google.com/maps/dir/?api=1&origin=Ikegami+Baien&destination=Ikegami+Kaikan&travelmode=walking",
          officialUrl: "https://honmonji.jp/outline/access.html"},
        {id: "day-5-honmonji", time: "15:00–16:30", label: "慢慢參觀", title: "池上本門寺・避開正面 96 階",
          summary: "慢慢看大堂、仁王門周邊、五重塔與境內，找座位休息；不用走完整個墓園或每條支線。",
          instruction: "不走此經難持坂 96 階，也不要先下階再爬回來。回程仍從池上會館電梯離開，務必在 17:00 前使用。",
          officialUrl: "https://honmonji.jp/outline/access.html"},
        {id: "day-5-to-station", time: "16:30–17:00", label: "電梯＋步行", title: "池上會館 → 池上站",
          summary: "搭池上會館電梯離開，再步行約 10 分鐘到東急池上線池上站；不要走正面 96 階。",
          transport: {mode: "walk", from: "池上本門寺・池上會館電梯", to: "東急池上站"},
          planB: "爸媽累了就改叫計程車。",
          navigationUrl: "https://www.google.com/maps/dir/?api=1&origin=Ikegami+Kaikan&destination=Ikegami+Station&travelmode=walking"},
        {id: "day-5-return", time: "17:00–18:00", label: "電車＋巴士", title: "池上 → 蒲田 → 穴守稻荷 → 飯店",
          summary: "池上線往蒲田搭 2 站，經蓮沼到終點蒲田；出站轉京急巴士，確認是穴守稻荷／羽田方向且停靠穴守稻荷。",
          transport: {mode: "train", service: "東急池上線 → 京急巴士", from: "池上 IK13", transfer: "東急蒲田 → 蒲田駅京急巴士站", to: "穴守稻荷巴士站"},
          instruction: "當天搜尋「蒲田駅 → HOTEL MYSTAYS Haneda」確認回程班次。穴守稻荷下車，步行約 4 分鐘回飯店。",
          navigationUrl: "https://www.google.com/maps/dir/?api=1&origin=Ikegami+Station&destination=HOTEL+MYSTAYS+Haneda&travelmode=transit"},
        {id: "day-5-checkin", time: "約 18:00", label: "正式入住", title: "取回行李・確認早餐和接駁",
          summary: "取回寄存行李、Check-in、拿房卡。確認明天四人早餐已訂妥，並核對 09:30 機場 Shuttle、集合位置及是否先到先搭。",
          instruction: "早餐還沒訂就現在訂：明日の朝食を4名分予約したいです。",
          ticketUrl: "tickets.html?day=5#hotel-mystays-haneda"},
        {id: "day-5-evening", time: "晚上", label: "不排固定景點", title: "晚餐・整理回台行李",
          summary: "吃飯、洗澡、整理戰利品與托運行李；護照放固定位置，確認 BR191、準備隔日衣物，手機／行動電源充電。",
          instruction: "超過隨身限制的液體放托運，行動電源留隨身並核對航空公司規定。有精神才去穴守稻荷神社附近散步、便利商店或宵夜；爸媽累了就留飯店休息。"}
      ]
    },
    {
      day: 6, date: "09/30", weekday: "WED", planned: true,
      title: "羽田 → 台北松山・回台日",
      routeSummary: ["飯店早餐", "09:20 Lobby", "09:30 Shuttle", "羽田 T3", "BR191", "松山 T1"],
      mapStops: [
        {time: "09:20", title: "HOTEL MYSTAYS Haneda", description: "Lobby 集合，確認當日接駁時間", lat: 35.55078, lng: 139.74907},
        {time: "約 09:40", title: "羽田機場第 3 航廈", description: "T3 車站位置示意；下車後依現場指標前往 3F Departures", lat: 35.544917, lng: 139.767889}
      ],
      events: [
        {id: "day-6-wakeup", time: "07:30", label: "起床", title: "早餐前先準備",
          summary: "今天不排景點，時間留給早餐、行李與機場。先別把行李箱完全關死，早餐後還有最後整理時間。"},
        {id: "day-6-breakfast", time: "08:00–08:45", label: "四人早餐", title: "飯店 Buffet 早餐",
          summary: "確認 Day 5 已預訂四人早餐。爸媽挑熟食，吃飽後約 08:45 回房，不要拖太久。"},
        {id: "day-6-packing", time: "08:45–09:10", label: "最後整理", title: "分好托運與隨身行李",
          summary: "托運：衣物、戰利品、超過隨身限制的液體；瓶罐鎖緊、易碎物保護好，行李上鎖。隨身：護照、手機、錢包、Suica、登機資料、行動電源、充電線、常用藥與眼鏡。",
          instruction: "行動電源不要放托運。容量、數量與液體限制依航空公司最新規定；護照及登機資料放容易拿的位置。"},
        {id: "day-6-checkout", time: "09:10–09:20", label: "退房", title: "巡房・全部行李帶到 Lobby",
          summary: "依序看床上、床邊插座、桌面、抽屜、冰箱、浴室、衣櫃及行李架，確認保險箱／桌上沒有護照，牆上沒有充電器。",
          instruction: "所有行李帶到 1F Lobby，房卡交回櫃台，完成 Check-out。"},
        {id: "day-6-shuttle-wait", time: "09:20", label: "重要集合時間", title: "Lobby 等免費接駁車",
          summary: "預計搭 09:30 HOTEL MYSTAYS Shuttle。依行程資料為先到先搭、不能預約，四人加行李請提早到；班次與集合處在前一天向櫃台再次確認。",
          instruction: "不要 09:29 才下樓。給司機看：第3ターミナルです。（我們要去第三航廈。）"},
        {id: "day-6-shuttle", time: "09:30–約 09:40", label: "免費 Shuttle", title: "飯店 → 羽田機場 Terminal 3",
          summary: "行程預估約 7～10 分鐘，依路況而定。預定路線依序 T3 → T2 → T1，務必向司機確認並在 T3 下車，不要坐到 T2／T1。",
          transport: {mode: "bus", service: "HOTEL MYSTAYS 免費機場 Shuttle・預計 09:30", from: "HOTEL MYSTAYS Haneda Lobby 集合處", to: "羽田機場 Terminal 3"},
          instruction: "下車清點四人的行李箱、其他大件及背包，別讓行李跟車去下一航廈。接駁班次以飯店當日公告為準。",
          planB: "客滿不要等下一班：步行約 4 分鐘至穴守稻荷 KK14，搭京急空港線往羽田空港、確認停靠「羽田空港第3ターミナル」後上車，在 T3 站下車。若下雨、爸媽累或行李多，請櫃台叫可容納四人及行李的計程車（必要時分車）：羽田空港第3ターミナルまでタクシーをお願いします。",
          navigationUrl: "https://www.google.com/maps/dir/?api=1&origin=HOTEL+MYSTAYS+Haneda&destination=Haneda+Airport+Terminal+3&travelmode=transit",
          officialUrl: "https://iconia.co.jp/location-hotel-mystays-haneda-tokyo"},
        {id: "day-6-counter", time: "09:45–10:10", label: "找出境大廳", title: "T3・3F Departures 找 BR191",
          summary: "跟著 Departures／出発指標搭電梯或手扶梯到 3F。看電子看板找 EVA AIR、BR191、Taipei Songshan／TSA，行程預定起飛 12:40。",
          instruction: "長榮目前列 BR189／BR191 在 A Island；若電子看板另列櫃檯，以現場為準。確認有無延誤、Counter 和 Gate，登機門不預先寫死。",
          ticketUrl: "tickets.html?day=6#flight-br191",
          officialUrl: "https://www.evaair.com/sc-cn/fly-prepare/at-the-airport/worldwide-airports/?countryCode=HND"},
        {id: "day-6-checkin", time: "10:10–10:40", label: "報到＋托運", title: "EVA BR191 Check-in／Bag Drop",
          summary: "依 12:40 起飛推算，起飛前 2.5 小時約 10:10 開櫃、前 40 分鐘約 12:00 截止；我們以 10:40 前完成為目標，絕不壓截止線。若航班時間變更請重核對。",
          instruction: "準備四人護照、訂位／電子機票資料與行李。已線上報到也要托運；符合資格者可依指示用 KIOSK 印行李條後到 EVA Bag Drop。行程資料列線上報到為起飛前 48～1 小時，實際資格與時間在 EVA App 確認。",
          ticketUrl: "tickets.html?day=6#flight-br191"},
        {id: "day-6-security", time: "10:40–11:20", label: "安檢＋出境", title: "Security Check → 日本出境審查",
          summary: "托運完成跟著 Security Check／保安検査，依序通過安全檢查、日本出境審查，進入國際線管制區。",
          instruction: "護照與登機證隨手可拿；行動電源留隨身，液體按國際線規定整理。"},
        {id: "day-6-free-time", time: "11:20–11:50", label: "有餘裕才逛", title: "廁所・補水・最後購物",
          summary: "流程順利才逛免稅店或買伴手禮，幫爸媽找地方坐，再核對登機門。不要跑遠，沒有想買的就直接往 Gate 走。"},
        {id: "day-6-gate", time: "11:50–12:10", label: "登機門集合", title: "最晚 12:10 前到 Gate 附近",
          summary: "依登機證、EVA App 與電子看板找 BR191 登機門。T3 有些 Gate 距離較遠，預留步行時間。",
          instruction: "若登機證 Boarding Time 更早，以登機證為準；不要把 12:40 起飛時間當成抵達登機門時間。"},
        {id: "day-6-flight", time: "12:40（日本）", label: "BR191", title: "羽田 T3 → 台北松山 T1",
          summary: "長榮航空 BR191，行程預定 2026/09/30 日本時間 12:40 起飛、台灣時間 15:05 抵達。兩地相差 1 小時；實際時間以航空公司通知為準。",
          transport: {mode: "flight", service: "EVA Air BR191", from: "東京羽田 HND Terminal 3", to: "台北松山 TSA Terminal 1"},
          ticketUrl: "tickets.html?day=6#flight-br191"},
        {id: "day-6-arrival", time: "15:05（台灣）", label: "抵達台灣", title: "松山 T1 入境・領齊行李",
          summary: "下飛機 → 入境證照查驗 → 領托運行李 → 海關 → 入境大廳。確認四個人和所有行李都齊了，再離開機場回家。"}
      ]
    }
  ]
};

if (typeof window !== "undefined") {
  window.TOKYO_ITINERARY = TOKYO_ITINERARY;
}
