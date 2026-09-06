var TripCore = (function () {
  "use strict";

  function normalizeDay(value, maximum) {
    var day = Number(value);
    var limit = Number(maximum);

    if (day !== Math.floor(day) || day < 1 || day > limit) {
      return 1;
    }

    return day;
  }

  function getDay(days, value) {
    var list = days || [];
    var selected = normalizeDay(value, list.length);
    var index;

    for (index = 0; index < list.length; index += 1) {
      if (list[index].day === selected) {
        return list[index];
      }
    }

    return list.length ? list[0] : null;
  }

  function checklistProgress(items, state) {
    var list = items || [];
    var saved = state || {};
    var done = 0;
    var index;

    for (index = 0; index < list.length; index += 1) {
      if (saved[list[index].id] === true) {
        done += 1;
      }
    }

    return {
      done: done,
      total: list.length,
      percent: list.length ? Math.round((done / list.length) * 100) : 0
    };
  }

  function updateChecklistState(state, id, checked) {
    var current = state || {};
    var updated = {};
    var key;

    for (key in current) {
      if (Object.prototype.hasOwnProperty.call(current, key)) {
        updated[key] = current[key];
      }
    }

    updated[id] = checked === true;
    return updated;
  }

  function mapUrl(day) {
    return "itinerary-map.html?day=" + normalizeDay(day, 6) + "&embed=1";
  }

  return {
    normalizeDay: normalizeDay,
    getDay: getDay,
    checklistProgress: checklistProgress,
    updateChecklistState: updateChecklistState,
    mapUrl: mapUrl
  };
}());

if (typeof window !== "undefined") {
  window.TripCore = TripCore;
}
