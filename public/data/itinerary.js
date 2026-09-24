var TOKYO_ITINERARY = {
  days: [
    {
      "day": 1,
      "date": "09/25",
      "weekday": "FRI",
      "planned": true,
      "title": "台灣 → 東京",
      "routeSummary": [
        "桃園 T1",
        "成田 T1",
        "押上",
        "住宿"
      ],
      "detailGuideUrl": "day1-guide.html",
      "ticketDeepLinks": [
        {
          "id": "hotel-self-checkin",
          "label": "住宿入住碼",
          "url": "tickets.html?day=1#hotel-self-checkin"
        }
      ],
      "officialUrls": [
        {
          "label": "Visit Japan Web",
          "url": "https://www.digital.go.jp/policies/visit_japan_web"
        },
        {
          "label": "成田 T1 官方地圖",
          "url": "https://www.narita-airport.jp/en/discover/official_guide/"
        },
        {
          "label": "Welcome Suica",
          "url": "https://www.jreast.co.jp/en/multi/welcomesuica/"
        },
        {
          "label": "京成 Access 特急官方票價",
          "url": "https://www.keisei.co.jp/keisei/tetudou/skyliner/jp/traffic/express_fares.php"
        }
      ],
      "navigationUrls": [
        {
          "label": "成田 T1 → 押上",
          "url": "https://www.google.com/maps/dir/?api=1&origin=Narita+Airport+Terminal+1&destination=Oshiage+Station&travelmode=transit"
        },
        {
          "label": "前往住宿",
          "url": "https://www.google.com/maps/dir/?api=1&origin=Oshiage+Station&destination=東京都墨田区業平5丁目1-8&travelmode=walking"
        }
      ],
      "mapStops": [
        {
          "time": "20:00",
          "title": "成田國際機場 T1",
          "description": "入境、領行李、購買 Welcome Suica",
          "lat": 35.7647,
          "lng": 140.3864
        },
        {
          "time": "約 21:30",
          "title": "成田機場站",
          "description": "Access 特急往押上；直通班次依當晚看板",
          "lat": 35.7658,
          "lng": 140.3855
        },
        {
          "time": "約 22:30",
          "title": "押上站",
          "description": "抵達 Oshiage / Skytree",
          "lat": 35.7101,
          "lng": 139.8131
        },
        {
          "time": "約 22:40",
          "title": "nestay suite 東京天空樹",
          "description": "步行前往住宿、自助入住",
          "lat": 35.7058,
          "lng": 139.8178
        }
      ],
      "events": [
        {
          "id": "day-1-before-leaving",
          "time": "出門前",
          "label": "行前確認",
          "title": "確認 TR874 航班與四人證件",
          "summary": "9/25 酷航 TR874：桃園 TPE 第一航廈 → 成田 NRT 第一航廈。依提供的航班截圖：台灣 15:30 起飛、日本 20:00 抵達；日本比台灣快 1 小時。以下為建議安排，若航班異動請同步調整。",
          "instruction": "護照、電子機票／訂位資料、手機與日圓隨身帶；四人都確認 Visit Japan Web 入境資料。櫃檯與登機門依當天機場看板。",
          "ticketUrl": "tickets.html?day=1#flight-tr874",
          "detailUrl": "day1-guide.html#departure"
        },
        {
          "id": "day-1-airport-mrt",
          "time": "11:15",
          "label": "建議・台灣時間",
          "title": "台北車站轉機捷 → A12 第一航廈",
          "summary": "以台北車站出發為例：跟「桃園機場捷運／Taoyuan Airport MRT」指標走到 A1，預留 15～20 分鐘站內步行，再搭往機場的直達車；A1 → A12 車程約 35 分鐘，另留候車及走到報到大廳的時間。",
          "instruction": "在 A12「機場第一航廈」下車；出站跟「出境／Departures」到第一航廈 1F 報到大廳。若搭計程車／接送，目的地設「桃園機場第一航廈出境大廳」。",
          "transport": {
            "mode": "train",
            "from": "機場捷運 A1 台北車站",
            "to": "A12 機場第一航廈",
            "service": "直達車・往機場"
          },
          "officialUrl": "https://www.tymetro.com.tw/tymetro-new/tw/_pages/travel-guide/timetable-search.php",
          "navigationUrl": "https://www.google.com/maps/dir/?api=1&destination=Taoyuan+Airport+Terminal+1&travelmode=transit"
        },
        {
          "id": "day-1-airport-checkin",
          "time": "12:30",
          "label": "建議・起飛前 3 小時",
          "title": "第一航廈 1F・酷航報到櫃檯 3、5",
          "summary": "提供的航班截圖顯示登機報到櫃檯為 3、5，報到截止為台灣時間 14:30。到第一航廈 1F 後，先看 TR874／Scoot／Tokyo Narita 的現場看板確認櫃檯，再排隊報到。準備四人護照與訂位資料，領登機證；有加購託運才辦理交運。",
          "instruction": "核對登機證的姓名、航班、登機時間、登機門與座位。報到櫃檯起飛前 60 分鐘關閉；若 15:30 起飛，14:30 截止，不要壓線抵達。",
          "officialUrl": "https://www.flyscoot.com/zhtw/plan/before-you-fly/checking-in"
        },
        {
          "id": "day-1-security",
          "time": "13:15",
          "label": "建議・台灣時間",
          "title": "安檢 → 出境證照查驗 → 找登機門",
          "summary": "完成報到後跟「出境／Departures」上樓，依現場動線完成安檢與證照查驗。護照與登機證放好拿的位置，安檢時依人員指示取出物品。",
          "instruction": "進管制區先找 TR874 最新登機門，確認步行距離，再安排吃飯、補水與洗手間；登機門可能更改。"
        },
        {
          "id": "day-1-boarding",
          "time": "14:30",
          "label": "建議・起飛前 60 分鐘",
          "title": "四人一起抵達登機門候機",
          "summary": "確認看板是 TR874、目的地 Tokyo Narita，依登機證與廣播分批登機。護照、登機證拿在手邊，上機後找座位並依空服員指示收好行李。",
          "instruction": "酷航登機門在起飛前 15 分鐘關閉；若 15:30 起飛，15:15 關門。這是截止時間，不是建議抵達時間。",
          "officialUrl": "https://www.flyscoot.com/en/plan/before-you-fly/checking-in"
        },
        {
          "id": "day-1-flight",
          "time": "15:30",
          "label": "FLIGHT",
          "title": "桃園機場出發",
          "summary": "酷航 TR874，預計 20:00 抵達成田國際機場 T1。",
          "ticketUrl": "tickets.html?day=1#flight-tr874",
          "transport": {
            "mode": "flight",
            "from": "桃園機場 T1",
            "to": "成田機場 T1",
            "service": "酷航 TR874"
          }
        },
        {
          "id": "day-1-arrival",
          "time": "20:00",
          "label": "ARRIVAL",
          "title": "成田入境與領行李",
          "summary": "依序完成入國審查、領行李、海關，再到 1F 入境大廳；Visit Japan Web QR Code 先存到手機。預估 20:40–21:15 出關。",
          "instruction": "完成海關後跟著「鉄道 / Train」前往 B1F。",
          "officialUrl": "https://www.digital.go.jp/policies/visit_japan_web",
          "navigationUrl": "https://www.narita-airport.jp/en/discover/official_guide/"
        },
        {
          "id": "day-1-suica",
          "time": "21:15",
          "label": "SUICA",
          "title": "購買／設定 Suica，再確認餘額",
          "summary": "每人一張 Suica（西瓜卡），實體卡或已設定完成的手機 Suica 都可以。搭車前卡內至少 ¥1,200；建議儲值 ¥2,000 以上留餘裕。",
          "instruction": "先完成購卡或手機設定，再看餘額；不足就到儲值機選 Charge／チャージ，加值完成才進站。晚間櫃檯可能已關，請找售票機或詢問現場人員。",
          "officialUrl": "https://www.jreast.co.jp/en/multi/welcomesuica/",
          "detailUrl": "https://matcha-jp.com/tw/30"
        },
        {
          "id": "day-1-access-express",
          "time": "約 21:30",
          "label": "預估・依實際班次",
          "title": "推薦：Access 特急 → 押上",
          "summary": "搭 Narita SKY ACCESS「アクセス特急 / Access Express」往東京方向，車程約 1 小時，車資約 ¥1,200。可直接使用 Suica，不需要購買 Skyliner 指定席券。",
          "instruction": "跟「京成電鉄 / Keisei」指標進站。確認列車種類是 Access 特急，且停靠「押上〈スカイツリー前〉 / Oshiage (Skytree)」，優先搭不需轉車的班次。約 21:30 是預估，不是確認班次；直通與否以當晚看板為準。",
          "transport": {
            "mode": "train",
            "from": "成田機場 T1｜成田空港 / Narita Airport Terminal 1",
            "to": "押上站｜押上〈スカイツリー前〉 / Oshiage (Skytree)",
            "service": "Narita SKY ACCESS・アクセス特急 / Access Express"
          },
          "planB": "沒有合適直通車時，請京成站務員確認經青砥（青砥 / Aoto）或京成高砂（京成高砂 / Keisei-Takasago）轉往押上的班次與末班銜接。Skyliner 雖較快到上野／日暮里，但本次住宿在押上／晴空塔附近，還需額外轉車，因此不列首選。",
          "navigationUrl": "https://www.google.com/maps/dir/?api=1&origin=Narita+Airport+Terminal+1&destination=Oshiage+Station&travelmode=transit",
          "officialUrl": "https://www.keisei.co.jp/keisei/tetudou/skyliner/jp/traffic/express_fares.php"
        },
        {
          "id": "day-1-check-in",
          "time": "約 22:40",
          "label": "CHECK-IN",
          "title": "押上 → nestay suite 東京天空樹",
          "summary": "抵達押上後步行前往住宿：東京都墨田區業平 5-1-8（日文：東京都墨田区業平5丁目1-8）。預留約 10 分鐘，實際依出口與步速調整。",
          "instruction": "跟出口與電梯指標到地面，再開步行導航；大行李以電梯優先。點「開啟票券」查看入住碼與住宿方入住說明，房號及門鎖操作依住宿方指示。",
          "address": "東京都墨田区業平5丁目1-8",
          "navigationUrl": "https://www.google.com/maps/dir/?api=1&origin=Oshiage+Station&destination=東京都墨田区業平5丁目1-8&travelmode=walking",
          "ticketUrl": "tickets.html?day=1#hotel-self-checkin"
        }
      ],
      "arrivalSteps": [
        {
          "title": "下飛機",
          "detail": "TR874 抵達成田 T1（日本時間）"
        },
        {
          "title": "入境／領行李",
          "detail": "入國審查 → 行李 → 海關"
        },
        {
          "title": "Suica 儲值",
          "detail": "每人卡內至少 ¥1,200；不足先加值"
        },
        {
          "title": "找京成線",
          "detail": "鉄道 / Train → B1F → 京成電鉄 / Keisei"
        },
        {
          "title": "搭 Access 特急",
          "detail": "アクセス特急 / Access Express；確認直通押上"
        },
        {
          "title": "押上下車",
          "detail": "押上〈スカイツリー前〉 / Oshiage (Skytree)"
        },
        {
          "title": "步行到住宿",
          "detail": "nestay suite 東京天空樹｜東京都墨田区業平5丁目1-8"
        }
      ],
      "arrivalNotice": "搭車前請逐一確認：四個人的 Suica 餘額都至少 ¥1,200，不是四人合計！車資約 ¥1,200，建議先儲 ¥2,000 以上留餘裕。"
    },
    {
      day: 2,
      date: "09/26",
      weekday: "SAT",
      planned: true,
      quickGuide: {
        "title": "今天照著走・下町散策",
        "notice": "先確認四張水族館 QR 都能開啟。晴空塔去淺草：巴士 15 分鐘內有車才等；回程淺草轉線要在 60 分鐘內完成，四人各用自己的同一張 Suica。",
        "steps": [
          {
            "title": "步行到水族館",
            "detail": "住宿 → Solamachi West Yard 4F → 專用電梯至 5F；10:50 出示四人 QR。",
            "eventIds": [
              "day-2-aquarium-walk"
            ]
          },
          {
            "title": "晴空塔城吃午餐",
            "detail": "12:30 留在 Solamachi 用餐、上洗手間，13:45 開始移動。"
          },
          {
            "title": "搭車到淺草",
            "detail": "晴空塔城 3 號乘車處 → 淺草雷門；Skytree Shuttle。",
            "eventIds": [
              "day-2-to-asakusa"
            ]
          },
          {
            "title": "參拜淺草寺",
            "detail": "雷門 → 仲見世通 → 寶藏門 → 本堂；16:00 前到本堂，階梯不便就找左側電梯。"
          },
          {
            "title": "銀座線到上野",
            "detail": "淺草 G19（Asakusa）→ 上野 G16（Ueno），往澀谷方向；逛阿美橫、吃晚餐。",
            "eventIds": [
              "day-2-to-ueno"
            ]
          },
          {
            "title": "轉淺草線回押上",
            "detail": "上野 G16 → 淺草 G19／A18 → 押上 A20（Oshiage），再步行回住宿。",
            "eventIds": [
              "day-2-return"
            ]
          }
        ],
        "fareNote": "以晴空塔→淺草搭 Shuttle、回程享轉乘折扣計算。若第一段改搭東武普通電車，當日每人 ¥621／四人 ¥2,484（少 ¥93／人）。若回程超過轉乘時限，每人另加 ¥70。其他臨時改線或計程車另計。",
        "sources": [
          {
            "label": "Skytree Shuttle",
            "url": "https://www.tobu-bus.com/pc/skytree_shuttle/01.html"
          },
          {
            "label": "東武電車票價表",
            "url": "https://www.tobu.co.jp/pdf/ticket/unchinTable.pdf"
          },
          {
            "label": "東京 Metro 普通票價",
            "url": "https://www.tokyometro.jp/ticket/types/regular/index.html"
          },
          {
            "label": "都營地下鐵票價",
            "url": "https://www.kotsu.metro.tokyo.jp/subway/fare/regular.html"
          },
          {
            "label": "Metro／都營轉乘折扣",
            "url": "https://ssl.tokyometro.jp/support/faq_answer?faqno=OpenFAQ-000205&lang=ja"
          },
          {
            "label": "改札外轉乘 60 分鐘限制",
            "url": "https://www.tokyometro.jp/ticket/guide/transfertime/index.html"
          }
        ],
        "checked": "2026-09-24"
      },
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
          fare: {"legs":[{"label":"住宿 → 墨田水族館・步行","yen":0}]},
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
          fare: {"legs":[{"label":"晴空塔城 → 淺草雷門・Shuttle","yen":250}],"note":"替代：東武東京晴空塔站 TS02 → 淺草 TS01，普通電車 IC ¥157／人（四人 ¥628），不需特急券；與巴士二選一，不重複計入。"},
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
          fare: {"legs":[{"label":"淺草 → 上野・銀座線","yen":178}],"note":"若改搭 Shuttle，成人 ¥250／人，不含在此路線總額。"},
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
          fare: {"legs":[{"label":"上野 → 淺草・Metro 銀座線","yen":178},{"label":"淺草 → 押上・都營淺草線","yen":178}],"adjustments":[{"label":"Metro／都營轉乘折扣","yen":-70}],"note":"每人以同一張 Suica 在淺草出閘後 60 分鐘內轉入都營線，合計 ¥286。超時或分開計費為 ¥356／人。臨時計程車按實際計價，未列入總額。"},
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
      quickGuide: {
        "title": "今天照著走・神社與東京西側",
        "notice": "今天步行較多，先吃飯、補水再進明治神宮。原宿→新宿認明山手線「新宿・池袋方面」；回程新宿→錦糸町搭黃色總武線各站停車，不是中央線快速。",
        "steps": [
          {
            "title": "押上出發到日枝神社",
            "detail": "押上 Z14 → 青山一丁目 Z03／G04 → 溜池山王 G06（Tameike-sanno）；全程 Metro、轉乘不出站。",
            "eventIds": [
              "day-3-to-hie"
            ]
          },
          {
            "title": "搭電扶梯參拜",
            "detail": "溜池山王 Exit 7 → 山王鳥居 → 西參道電扶梯；不想爬鳥居階梯就原路搭電扶梯下來。"
          },
          {
            "title": "千代田線到原宿",
            "detail": "步行到赤坂 C06（Akasaka），搭往代代木上原 → 明治神宮前〈原宿〉C03；先吃午餐休息。",
            "eventIds": [
              "day-3-to-harajuku"
            ]
          },
          {
            "title": "明治神宮慢慢走",
            "detail": "從原宿口入場 → 南參道 → 御社殿，原路返回；碎石路不用趕。"
          },
          {
            "title": "HARAKADO 坐下休息",
            "detail": "步行到 HARAKADO 6F Food Hall，補水、洗手間；有體力再逛 7F。"
          },
          {
            "title": "搭 JR 到新宿",
            "detail": "步行至 JR 原宿 JY19（Harajuku）→ 新宿 JY17（Shinjuku）；逛東口、歌舞伎町與晚餐。",
            "eventIds": [
              "day-3-to-shinjuku"
            ]
          },
          {
            "title": "經錦糸町回住宿",
            "detail": "JR 新宿 → JR 錦糸町（Kinshicho）；出 JR 閘門再進 Metro Z13 → 押上 Z14。",
            "eventIds": [
              "day-3-return"
            ]
          }
        ],
        "fareNote": "以每段刷 Suica 計算，未扣任何交通套票。押上→溜池山王全程 Metro、不出改札，按最短計費路徑收費；不要拆買兩段票。JR 使用 2026/03/14 調整後票價。",
        "sources": [
          {
            "label": "東京 Metro 普通票價",
            "url": "https://www.tokyometro.jp/ticket/types/regular/index.html"
          },
          {
            "label": "JR 2026/03/14 改定票價",
            "url": "https://www.jreast.co.jp/2026unchin-kaitei/assets/pdf/kansen.pdf"
          }
        ],
        "checked": "2026-09-24"
      },
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
          fare: {"legs":[{"label":"押上 → 青山一丁目 → 溜池山王・Metro 聯程","yen":209}],"note":"全程不出改札，按最短計費路徑計算；半藏門線轉銀座線不另外加一筆起跳價。"},
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
          fare: {"legs":[{"label":"赤坂 → 明治神宮前〈原宿〉・千代田線","yen":178}]},
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
          fare: {"legs":[{"label":"原宿 → 新宿・JR 山手線","yen":155}],"note":"採 2026/03/14 改定後成人 IC 票價。"},
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
          fare: {"legs":[{"label":"新宿 → 錦糸町・JR 總武線","yen":253},{"label":"錦糸町 → 押上・Metro 半藏門線","yen":178}],"note":"JR 與 Metro 分別計費，合計 ¥431／人；錦糸町要刷出 JR 再刷入 Metro。"},
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
    {day: 4, date: "09/28", weekday: "MON", planned: false, status: "休息日・各自自由活動"},
    {
      day: 5, date: "09/29", weekday: "TUE", planned: true,
      quickGuide: {
        "title": "今天照著走・搬飯店與池上散步",
        "notice": "退房時全部行李帶走，先到 MYSTAYS 羽田寄放再輕裝出門。本門寺不要走正面 96 階；去回都走池上會館電梯，務必在 17:00 前離開。",
        "steps": [
          {
            "title": "退房・帶齊行李",
            "detail": "09:30 巡房：護照、手機、Suica、充電器、冰箱與浴室；拖行李到押上站。"
          },
          {
            "title": "搭車到羽田飯店",
            "detail": "押上都營淺草線 → 京急直通 → 穴守稻荷 KK14（Anamori-inari）。確認會停穴守稻荷，下車步行到飯店。",
            "eventIds": [
              "day-5-to-haneda"
            ]
          },
          {
            "title": "寄放行李・訂早餐",
            "detail": "MYSTAYS 羽田櫃台寄存，預訂明天四人早餐；確認隔日 09:30 接駁和集合處。"
          },
          {
            "title": "巴士到蒲田",
            "detail": "穴守稻荷巴士站 → 蒲田駅（Kamata）。下車找東急蒲田，不是京急蒲田，也不是 JR 月台。",
            "eventIds": [
              "day-5-bus-kamata"
            ]
          },
          {
            "title": "池上線・先吃午餐",
            "detail": "東急蒲田 → 池上 IK13（Ikegami），往五反田方向 2 站。先找舒服的熟食午餐、休息。",
            "eventIds": [
              "day-5-train-ikegami"
            ]
          },
          {
            "title": "搭巴士去池上梅園",
            "detail": "池上站 → 本門寺裏（Honmonji-ura），上池上循環外回り；下車步行入園，不勉強走坡道。",
            "eventIds": [
              "day-5-to-baien"
            ]
          },
          {
            "title": "搭電梯上本門寺",
            "detail": "步行至池上會館（Ikegami Kaikan）搭電梯；參拜後 17:00 前搭電梯下來，再步行到池上站。"
          },
          {
            "title": "原路回飯店入住",
            "detail": "池上 → 東急蒲田；轉往穴守稻荷的京急巴士 → 步行回 MYSTAYS，取行李、拿房卡。",
            "eventIds": [
              "day-5-return"
            ]
          },
          {
            "title": "步行吃鰻魚飯",
            "detail": "Nishio no unagi／西尾の鰻晚餐候選；先確認四人座位與營業，再步行回飯店整理行李。"
          }
        ],
        "fareNote": "包含搬飯店單程，以及穴守稻荷↔蒲田巴士、蒲田↔池上電車的去回程。景點間與鰻魚飯晚餐按步行計；東急巴士 IC ¥240（現金 ¥250）。不含臨時計程車。",
        "sources": [
          {
            "label": "都營地下鐵票價",
            "url": "https://www.kotsu.metro.tokyo.jp/subway/fare/regular.html"
          },
          {
            "label": "京急穴守稻荷票價表",
            "url": "https://www.keikyu.co.jp/ride/ticket/pdf/KK14.pdf"
          },
          {
            "label": "京急巴士 2026/03 票價",
            "url": "https://www.keikyu-bus.co.jp/8f71300e9f4d0212933bf9637b5f8e00e6b17948.pdf"
          },
          {
            "label": "東急電車票價",
            "url": "https://www.tokyu.co.jp/railway/ticket/fares/"
          },
          {
            "label": "東急巴士票價",
            "url": "https://www.tokyubus.co.jp/route/ticket/fare/table.html"
          }
        ],
        "checked": "2026-09-24"
      },
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
          fare: {"legs":[{"label":"押上 → 泉岳寺・都營淺草線","yen":272},{"label":"泉岳寺 → 穴守稻荷・京急","yen":277}],"note":"直通車不用在泉岳寺下車，但跨兩家公司，合計 ¥549／人；中途不要出站。"},
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
          fare: {"legs":[{"label":"穴守稻荷 → 蒲田駅・京急巴士","yen":250}]},
          summary: "輕裝步行到穴守稻荷站附近的京急巴士站。找車頭／站牌寫「蒲田駅」的班次，約 25～30 分鐘，可用 Suica。行程列蒲32、蒲33、蒲73為候選，當天仍要核對停站。",
          transport: {mode: "bus", service: "京急巴士・往蒲田駅", from: "穴守稻荷巴士站", to: "蒲田駅"},
          instruction: "確認方向再上車。下車找東急線蒲田站，不是 JR 月台，也不是京急蒲田站；避免從京急蒲田再步行轉到蒲田。",
          navigationUrl: "https://www.google.com/maps/dir/?api=1&origin=HOTEL+MYSTAYS+Haneda&destination=Tokyu+Kamata+Station&travelmode=transit"},
        {id: "day-5-train-ikegami", time: "約 12:00–12:30", label: "東急池上線", title: "蒲田 → 池上",
          fare: {"legs":[{"label":"東急蒲田 → 池上・池上線","yen":140}]},
          summary: "從東急蒲田站搭池上線往五反田方向，2 站約 4～5 分鐘；整段飯店至池上預留到 12:30。",
          transport: {mode: "train", service: "東急池上線・往五反田", from: "東急蒲田", via: "蓮沼", to: "池上 Ikegami / IK13"},
          navigationUrl: "https://www.google.com/maps/dir/?api=1&origin=Tokyu+Kamata+Station&destination=Ikegami+Station&travelmode=transit"},
        {id: "day-5-lunch", time: "12:30–13:15", label: "午餐＋休息", title: "池上站附近用餐",
          summary: "不硬排名店，以爸媽吃得舒服為主。可找烏龍麵、蕎麥麵、親子丼、鰻魚飯、茶碗蒸、豆腐或柔軟熟食定食。",
          instruction: "避開生魚片、生蛋、半熟肉、厚切牛排與太有嚼勁的燒肉；點餐確認全熟。"},
        {id: "day-5-to-baien", time: "13:15–13:40", label: "巴士＋步行", title: "池上站 → 本門寺裏 → 池上梅園",
          fare: {"legs":[{"label":"池上站 → 本門寺裏・東急巴士","yen":240}],"note":"IC 成人 ¥240，現金 ¥250；用 Suica 計入總額。"},
          summary: "不從池上站硬走約 20 分鐘。出站找東急巴士「上池上循環 外回り」，確認停靠本門寺裏；下車後步行約 3 分鐘。",
          transport: {mode: "bus", service: "東急巴士・上池上循環 外回り", from: "池上站", to: "本門寺裏 Honmonji-ura"},
          navigationUrl: "https://www.google.com/maps/dir/?api=1&origin=Ikegami+Station&destination=Ikegami+Baien&travelmode=transit"},
        {id: "day-5-baien", time: "13:40–14:40", label: "庭園散步", title: "池上梅園",
          summary: "09:00–16:30，最後入園 16:00；成人 ¥100，65 歲以上出示年齡證明可免費。9 月不是梅花季，以日式庭園散步、休息為主。",
          instruction: "只走舒服的主要園路，坡道、觀景台及階梯不勉強。園內有輪椅對應廁所，但不是全平地。園址依大田區官方：池上二丁目3番2号；導航請直接搜「池上梅園」。一般週一休園，當日開園仍以公告為準。",
          officialUrl: "https://www.city.ota.tokyo.jp/shisetsu/park/ikegamibaien.html",
          navigationUrl: "https://www.google.com/maps/search/?api=1&query=Ikegami+Baien"},
        {id: "day-5-to-kaikan", time: "14:40–15:00", label: "步行＋電梯", title: "池上梅園 → 池上會館",
          fare: {"legs":[{"label":"池上梅園 → 池上會館・步行","yen":0}]},
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
          fare: {"legs":[{"label":"池上會館 → 池上站・步行","yen":0}],"note":"若改搭計程車，依跳表另計，未含在當日總額。"},
          summary: "搭池上會館電梯離開，再步行約 10 分鐘到東急池上線池上站；不要走正面 96 階。",
          transport: {mode: "walk", from: "池上本門寺・池上會館電梯", to: "東急池上站"},
          planB: "爸媽累了就改叫計程車。",
          navigationUrl: "https://www.google.com/maps/dir/?api=1&origin=Ikegami+Kaikan&destination=Ikegami+Station&travelmode=walking"},
        {id: "day-5-return", time: "17:00–18:00", label: "電車＋巴士", title: "池上 → 蒲田 → 穴守稻荷 → 飯店",
          fare: {"legs":[{"label":"池上 → 東急蒲田・池上線","yen":140},{"label":"蒲田駅 → 穴守稻荷・京急巴士","yen":250}],"note":"電車＋巴士合計 ¥390／人。"},
          summary: "池上線往蒲田搭 2 站，經蓮沼到終點蒲田；出站轉京急巴士，確認是穴守稻荷／羽田方向且停靠穴守稻荷。",
          transport: {mode: "train", service: "東急池上線 → 京急巴士", from: "池上 IK13", transfer: "東急蒲田 → 蒲田駅京急巴士站", to: "穴守稻荷巴士站"},
          instruction: "當天搜尋「蒲田駅 → HOTEL MYSTAYS Haneda」確認回程班次。穴守稻荷下車，步行約 4 分鐘回飯店。",
          navigationUrl: "https://www.google.com/maps/dir/?api=1&origin=Ikegami+Station&destination=HOTEL+MYSTAYS+Haneda&travelmode=transit"},
        {id: "day-5-checkin", time: "約 18:00", label: "正式入住", title: "取回行李・確認早餐和接駁",
          summary: "取回寄存行李、Check-in、拿房卡。確認明天四人早餐已訂妥，並核對 09:30 機場 Shuttle、集合位置及是否先到先搭。",
          instruction: "早餐還沒訂就現在訂：明日の朝食を4名分予約したいです。",
          ticketUrl: "tickets.html?day=5#hotel-mystays-haneda"},
        {id: "day-5-dinner", time: "約 18:30–19:30", label: "晚餐候選", title: "Nishio no unagi・西尾の鰻",
          fare: {"legs":[{"label":"飯店 ↔ 西尾の鰻・步行","yen":0}]},
          summary: "入住、放好行李後，步行前往吃鰻魚飯。地址：東京都大田区羽田4-20-7 須山ビル1F，位於穴守稻荷站附近。四位成人同行，先確認是否有四人座位。",
          instruction: "店家刊載晚間營業 17:00–20:30，最後點餐 20:00；可能臨時休業，出發前請再確認。若客滿、休息或爸媽累了，就改在飯店附近簡單吃，不必硬等。用餐後回 MYSTAYS 羽田整理行李。",
          navigationUrl: "https://www.google.com/maps/dir/?api=1&origin=HOTEL+MYSTAYS+Haneda&destination=Nishio+no+unagi+Haneda+4-20-7&travelmode=walking",
          officialUrl: "https://r.gnavi.co.jp/5abmz6ju0000/"},
        {id: "day-5-evening", time: "晚餐後", label: "不排固定景點", title: "回飯店・整理回台行李",
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
