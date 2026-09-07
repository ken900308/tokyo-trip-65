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

  function ticketHash(day, ticketId) {
    return "tickets.html?day=" + normalizeDay(day, 6) + "#" + encodeURIComponent(String(ticketId));
  }

  return {
    normalizeDay: normalizeDay,
    getDay: getDay,
    visibleDayEvents: visibleDayEvents,
    checklistProgress: checklistProgress,
    updateChecklistState: updateChecklistState,
    sanitizeChecklistState: sanitizeChecklistState,
    mapUrl: mapUrl,
    ticketHash: ticketHash
  };
}());

if (typeof window !== "undefined") {
  window.TripCore = TripCore;
}
