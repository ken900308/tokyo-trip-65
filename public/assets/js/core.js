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

  function swipeDay(current, maximum, deltaX, deltaY) {
    var day = normalizeDay(current, maximum);
    if (Math.abs(deltaX) < 60 || Math.abs(deltaX) < Math.abs(deltaY) * 1.4) {
      return day;
    }
    return Math.max(1, Math.min(maximum, day + (deltaX < 0 ? 1 : -1)));
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

  function visibleDayEvents(days, value) {
    var selected = getDay(days, value);

    return selected && selected.events ? selected.events.slice() : [];
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

  function sanitizeChecklistState(state, validIds) {
    var current = state && typeof state === "object" ? state : {};
    var ids = validIds || [];
    var sanitized = {};
    var index;
    var id;

    for (index = 0; index < ids.length; index += 1) {
      id = ids[index];
      if (Object.prototype.hasOwnProperty.call(current, id) && current[id] === true) {
        sanitized[id] = true;
      }
    }

    return sanitized;
  }

  function mapUrl(day) {
    return "itinerary-map.html?day=" + normalizeDay(day, 6) + "&embed=1";
  }

  function mapDocumentTitle(day) {
    var selected = Number(day);

    if (selected !== Math.floor(selected) || selected < 1 || selected > 6) {
      return "\u627e\u4e0d\u5230\u9019\u4e00\u5929\uff5c\u6771\u4eac\u884c\u7a0b";
    }

    return "Day " + selected + " \u8def\u7dda\u5730\u5716\uff5c\u6771\u4eac\u884c\u7a0b";
  }

  function ticketHash(day, ticketId) {
    return "tickets.html?day=" + normalizeDay(day, 6) + "#" + encodeURIComponent(String(ticketId));
  }

  function findPhrase(categories, id) {
    var list = categories || [];
    var categoryIndex;
    var phraseIndex;
    var phrases;

    for (categoryIndex = 0; categoryIndex < list.length; categoryIndex += 1) {
      phrases = list[categoryIndex].phrases || [];
      for (phraseIndex = 0; phraseIndex < phrases.length; phraseIndex += 1) {
        if (phrases[phraseIndex].id === id) {
          return phrases[phraseIndex];
        }
      }
    }

    return null;
  }

  return {
    normalizeDay: normalizeDay,
    swipeDay: swipeDay,
    getDay: getDay,
    visibleDayEvents: visibleDayEvents,
    checklistProgress: checklistProgress,
    updateChecklistState: updateChecklistState,
    sanitizeChecklistState: sanitizeChecklistState,
    mapUrl: mapUrl,
    mapDocumentTitle: mapDocumentTitle,
    ticketHash: ticketHash,
    findPhrase: findPhrase
  };
}());

if (typeof window !== "undefined") {
  window.TripCore = TripCore;
}
