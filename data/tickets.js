var TOKYO_TICKETS = {
  days: [
    {day: 1, date: "09/25", groups: []},
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
    {day: 5, date: "09/29", groups: []},
    {day: 6, date: "09/30", groups: []}
  ]
};

if (typeof window !== "undefined") {
  window.TOKYO_TICKETS = TOKYO_TICKETS;
}
