(function () {
  "use strict";

  var days = window.TOKYO_ITINERARY.days;
  var selector = document.querySelector("[data-day-selector]");
  var panel = document.querySelector("#day-panel");
  var ticketNav = document.querySelector("[data-ticket-nav]");
  var selectedDay = null;
  var gesture = null;
  var suppressClickUntil = 0;
  var dayAnimation = null;
  var transitionId = 0;

  function escapeHtml(value) {
    return String(value == null ? "" : value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function transportLabel(mode) {
    var labels = {bus: "巴士", flight: "航班", train: "電車", walk: "步行"};
    return labels[mode] || mode;
  }

  function renderTransport(transport) {
    var rows = [];

    if (!transport) {
      return "";
    }

    if (transport.service) {
      rows.push("<div><dt>路線</dt><dd>" + escapeHtml(transport.service) + "</dd></div>");
    }
    if (transport.from) {
      rows.push("<div><dt>上車</dt><dd>" + escapeHtml(transport.from) + "</dd></div>");
    }
    if (transport.transfer) {
      rows.push("<div><dt>轉乘</dt><dd>" + escapeHtml(transport.transfer) + "</dd></div>");
    }
    if (transport.via) {
      rows.push("<div><dt>途中</dt><dd>" + escapeHtml(transport.via) + "</dd></div>");
    }
    if (transport.to) {
      rows.push("<div><dt>下車</dt><dd>" + escapeHtml(transport.to) + "</dd></div>");
    }

    return "<section class=\"transport\" aria-label=\"交通方式\">" +
      "<p class=\"transport__mode\" data-transport-mode=\"" + escapeHtml(transport.mode) + "\">" +
      escapeHtml(transportLabel(transport.mode)) + "</p><dl>" + rows.join("") + "</dl></section>";
  }

  function actionLink(url, label, className) {
    if (!url) {
      return "";
    }

    return "<a class=\"" + escapeHtml(className || "action-link") + "\" href=\"" +
      escapeHtml(url) + "\">" + escapeHtml(label) + " <span aria-hidden=\"true\">→</span></a>";
  }

  function renderActions(event) {
    var links = [
      actionLink(event.navigationUrl, "開啟導航", "action-link action-link--primary"),
      actionLink(event.ticketUrl, "開啟票券", "action-link action-link--ticket"),
      actionLink(event.officialUrl, "官方資訊", "action-link"),
      actionLink(event.detailUrl, "詳細資訊", "action-link")
    ].filter(Boolean);

    return links.length ? "<nav class=\"event-actions\" aria-label=\"" +
      escapeHtml(event.title) + "相關連結\">" + links.join("") + "</nav>" : "";
  }

  function renderEvent(event, dayNumber) {
    return "<li class=\"timeline-card surface-card\" data-day=\"" + dayNumber + "\"" +
      (event.transport ? " data-transport-mode=\"" + escapeHtml(event.transport.mode) + "\"" : "") + ">" +
      "<div class=\"timeline-card__time\"><time>" + escapeHtml(event.time) + "</time><span>" +
      escapeHtml(event.label) + "</span></div><div class=\"timeline-card__body\"><h3>" +
      escapeHtml(event.title) + "</h3><p>" + escapeHtml(event.summary) + "</p>" +
      (event.instruction ? "<p class=\"instruction\"><strong>到現場：</strong>" + escapeHtml(event.instruction) + "</p>" : "") +
      renderTransport(event.transport) +
      (event.planB ? "<details class=\"plan-b\"><summary>Plan B</summary><p>" + escapeHtml(event.planB) + "</p></details>" : "") +
      renderActions(event) + (window.VisitorMaps ? window.VisitorMaps.render(event.id) : "") + "</div></li>";
  }

  function renderArrival(day) {
    if (!day.arrivalSteps) { return ""; }
    return '<section class="arrival-guide surface-card" aria-label="機場到住宿操作步驟">' +
      '<h3>下飛機後，照著走</h3><p class="arrival-notice"><strong>' + escapeHtml(day.arrivalNotice) +
      '</strong></p><ol class="arrival-steps">' + day.arrivalSteps.map(function (step) {
        return '<li><strong>' + escapeHtml(step.title) + '</strong><span>' + escapeHtml(step.detail) + '</span></li>';
      }).join('') + '</ol></section>';
  }

  function renderPlannedDay(day) {
    var events = window.TripCore.visibleDayEvents(days, day.day);
    var route = day.routeSummary.map(function (stop) {
      return "<li>" + escapeHtml(stop) + "</li>";
    }).join("");
    var cards = events.map(function (event) {
      return renderEvent(event, day.day);
    }).join("");
    var mapUrl = window.TripCore.mapUrl(day.day);

    return "<header class=\"day-header\"><div><p class=\"eyebrow\">DAY " + day.day + " · " +
      escapeHtml(day.weekday) + "</p><h2>" + escapeHtml(day.title) + "</h2><p class=\"day-date\">" +
      escapeHtml(day.date) + "</p></div>" + actionLink(day.detailGuideUrl, "查看 Day " + day.day + " 詳細行程", "guide-link") +
      "</header><ol class=\"route-summary\" aria-label=\"今日路線\">" + route + "</ol>" +
      "<details class=\"map-preview surface-card\"><summary><span>路線地圖</span><small>點一下展開</small></summary>" +
      "<div class=\"map-preview__frame\"><iframe loading=\"lazy\" title=\"Day " + day.day + " 路線地圖\" src=\"" +
      escapeHtml(mapUrl) + "\"></iframe></div><a href=\"itinerary-map.html?day=" + day.day + "\">開啟全螢幕地圖</a></details>" +
      renderArrival(day) + "<ol class=\"timeline\" aria-label=\"Day " + day.day + " 行程\">" + cards + "</ol>";
  }

  function renderDay(day) {
    panel.setAttribute("data-day", day.day);
    panel.innerHTML = day.planned ? renderPlannedDay(day) :
      "<p class=\"empty-state surface-card\">" + escapeHtml(day.status) + "</p>";
    document.title = "Day " + day.day + "｜東京行程";
  }

  function setSelectedButton(dayNumber) {
    selector.querySelectorAll("button[data-day]").forEach(function (button) {
      var active = Number(button.getAttribute("data-day")) === dayNumber;
      button.classList.toggle("is-active", active);
      button.setAttribute("aria-pressed", active ? "true" : "false");
    });
  }

  function updateDayInUrl(dayNumber, mode) {
    var url = new URL(window.location.href);
    url.searchParams.set("day", dayNumber);
    window.history[mode === "push" ? "pushState" : "replaceState"]({}, "", url.pathname + url.search + url.hash);
  }

  function selectDay(value, animate, historyMode) {
    var dayNumber = window.TripCore.normalizeDay(value, days.length);
    var day = window.TripCore.getDay(days, dayNumber);
    if (selectedDay === dayNumber) { return; }
    selectedDay = dayNumber;
    var requestId = ++transitionId;
    if (dayAnimation) { dayAnimation.cancel(); dayAnimation = null; }

    setSelectedButton(dayNumber);
    if (historyMode !== "none") { updateDayInUrl(dayNumber, historyMode || "push"); }
    ticketNav.href = "tickets.html?day=" + dayNumber;
    // Keep the visible page tall enough when switching to a short/unplanned day.
    // This prevents native scroll clamping; no scroll-position restoration is needed.
    var bounds = panel.getBoundingClientRect();
    var viewportFloor = Math.max(0, window.innerHeight - bounds.top);
    var shouldAnimate = animate && panel.animate &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!shouldAnimate) {
      panel.style.minHeight = viewportFloor + "px";
      renderDay(day);
      return;
    }
    panel.style.minHeight = Math.max(bounds.height, viewportFloor) + "px";
    dayAnimation = panel.animate([
      {opacity: 1, transform: "translateY(0)"},
      {opacity: 0, transform: "translateY(4px)"}
    ], {duration: 90, easing: "ease-in", fill: "forwards"});
    dayAnimation.finished.then(function () {
      if (requestId !== transitionId) { return; }
      dayAnimation.cancel();
      renderDay(day);
      dayAnimation = panel.animate([
        {opacity: 0, transform: "translateY(4px)"},
        {opacity: 1, transform: "translateY(0)"}
      ], {duration: 130, easing: "ease-out", fill: "forwards"});
      return dayAnimation.finished.then(function () {
        if (requestId !== transitionId) { return; }
        dayAnimation.cancel();
        dayAnimation = null;
        panel.style.minHeight = viewportFloor + "px";
      });
    }).catch(function () { /* A newer selection cancelled this transition. */ });
  }

  selector.addEventListener("click", function (event) {
    var button = event.target.closest("button[data-day]");

    if (!button) {
      return;
    }

    selectDay(button.getAttribute("data-day"), true);
  });

  // Keep vertical scrolling, pinch zoom, links, maps and horizontal route lists native.
  panel.addEventListener("pointerdown", function (event) {
    if (!event.isPrimary) { gesture = null; return; }
    if (event.pointerType === "mouse" || event.button !== 0 ||
        event.clientX < 24 || event.clientX > window.innerWidth - 24 ||
        event.target.closest("a, button, input, textarea, select, summary, .map-preview, .route-summary") ||
        String(window.getSelection())) { return; }
    gesture = {id: event.pointerId, x: event.clientX, y: event.clientY};
    panel.setPointerCapture(event.pointerId);
  });

  panel.addEventListener("pointermove", function (event) {
    if (!gesture || gesture.id !== event.pointerId) { return; }
    var dx = event.clientX - gesture.x;
    var dy = event.clientY - gesture.y;
    if (Math.abs(dy) > 12 && Math.abs(dy) > Math.abs(dx)) { gesture = null; }
  });

  panel.addEventListener("pointerup", function (event) {
    if (!gesture || gesture.id !== event.pointerId) { return; }
    var start = gesture;
    gesture = null;
    var nextDay = window.TripCore.swipeDay(selectedDay, days.length,
      event.clientX - start.x, event.clientY - start.y);
    if (nextDay === selectedDay || String(window.getSelection())) { return; }
    suppressClickUntil = Date.now() + 400;
    selectDay(nextDay, true);
  });

  panel.addEventListener("pointercancel", function () { gesture = null; });
  panel.addEventListener("lostpointercapture", function () { gesture = null; });
  panel.addEventListener("click", function (event) {
    if (Date.now() < suppressClickUntil) { event.preventDefault(); event.stopPropagation(); }
  }, true);

  window.history.scrollRestoration = "manual";
  window.addEventListener("popstate", function () {
    selectDay(new URLSearchParams(window.location.search).get("day"), true, "none");
  });
  selectDay(new URLSearchParams(window.location.search).get("day"), false, "replace");
}());
