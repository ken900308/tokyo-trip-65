(function () {
  "use strict";

  var days = window.TOKYO_TICKETS.days;
  var container = document.querySelector("[data-ticket-days]");
  var dialog = document.querySelector("[data-qr-dialog]");
  var dialogImage = dialog.querySelector("[data-dialog-image]");
  var dialogTitle = dialog.querySelector("[data-dialog-title]");
  var closeButton = dialog.querySelector("[data-dialog-close]");
  var lastTrigger = null;

  function escapeHtml(value) {
    return String(value == null ? "" : value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function renderHolder(holder, groupTitle) {
    var label = holder.label + "的" + groupTitle + "票券";

    return "<article class=\"holder-card\"><h3>" + escapeHtml(holder.label) + "</h3>" +
      "<button class=\"qr-image-button\" type=\"button\" data-qr-trigger hidden" +
      " data-holder=\"" + escapeHtml(holder.label) + "\" aria-label=\"放大" + escapeHtml(label) + "\">" +
      "<img src=\"" + escapeHtml(holder.image) + "\" alt=\"" + escapeHtml(label) + " QR Code\"></button>" +
      "<div class=\"qr-placeholder\" data-qr-placeholder role=\"status\"><span aria-hidden=\"true\">▦</span>" +
      "<strong>QR Code 尚未放入</strong><small>" + escapeHtml(holder.image) + "</small></div></article>";
  }

  function renderGroup(group) {
    var holders = group.holders.map(function (holder) {
      return renderHolder(holder, group.title);
    }).join("");

    return "<article class=\"ticket-group surface-card\" id=\"" + escapeHtml(group.id) + "\" tabindex=\"-1\">" +
      "<header class=\"ticket-group__header\"><div><p class=\"eyebrow\">MOBILE TICKET</p><h2>" +
      escapeHtml(group.title) + "</h2><p class=\"ticket-time\">" + escapeHtml(group.time) + "</p>" +
      "<nav class=\"ticket-links\" aria-label=\"" + escapeHtml(group.title) + "相關連結\">" +
      "<a href=\"" + escapeHtml(group.itineraryUrl) + "\">查看 Day 2 行程</a>" +
      "<a href=\"" + escapeHtml(group.detailUrl) + "\">完整館內資訊</a></nav></div></header>" +
      "<div class=\"holder-grid\">" + holders + "</div></article>";
  }

  function renderDay(day, selectedDay) {
    var content = day.groups.length ? day.groups.map(renderGroup).join("") :
      "<p class=\"empty-tickets\">尚無票券</p>";

    return "<details class=\"day-accordion surface-card\" data-day=\"" + day.day + "\"" +
      (day.day === selectedDay ? " open" : "") + "><summary><span class=\"day-label\">Day " + day.day +
      "<small>" + escapeHtml(day.date) + "</small></span><span class=\"visually-hidden\">切換 Day " + day.day +
      " 票券</span></summary><div class=\"day-content\">" + content + "</div></details>";
  }

  function setImageState(image) {
    var trigger = image.closest("[data-qr-trigger]");
    var placeholder = trigger.nextElementSibling;

    if (image.naturalWidth > 0) {
      trigger.hidden = false;
      placeholder.hidden = true;
    } else {
      trigger.hidden = true;
      placeholder.hidden = false;
    }
  }

  function prepareImages() {
    container.querySelectorAll("[data-qr-trigger] img").forEach(function (image) {
      image.addEventListener("load", function () {
        setImageState(image);
      });
      image.addEventListener("error", function () {
        setImageState(image);
      });

      if (image.complete) {
        setImageState(image);
      }
    });
  }

  function openDialog(trigger) {
    var image = trigger.querySelector("img");
    var holder = trigger.getAttribute("data-holder");

    if (trigger.hidden || !image.naturalWidth) {
      return;
    }

    lastTrigger = trigger;
    dialogImage.src = image.src;
    dialogImage.alt = image.alt;
    dialogTitle.textContent = holder + "的票券";
    dialog.showModal();
    closeButton.focus();
  }

  function closeDialog() {
    if (dialog.open) {
      dialog.close();
    }
  }

  function focusHashTarget() {
    var hash = window.location.hash.slice(1);
    var target;
    var parentDay;

    if (!hash) {
      return;
    }

    try {
      target = document.getElementById(decodeURIComponent(hash));
    } catch (error) {
      return;
    }

    if (!target) {
      return;
    }

    parentDay = target.closest("details[data-day]");
    if (parentDay) {
      parentDay.open = true;
    }
    target.focus({preventScroll: true});
    target.scrollIntoView({behavior: "smooth", block: "start"});
  }

  var selectedDay = window.TripCore.normalizeDay(new URLSearchParams(window.location.search).get("day"), days.length);
  container.innerHTML = days.map(function (day) {
    return renderDay(day, selectedDay);
  }).join("");
  prepareImages();

  container.addEventListener("click", function (event) {
    var trigger = event.target.closest("[data-qr-trigger]");

    if (trigger) {
      openDialog(trigger);
    }
  });

  closeButton.addEventListener("click", closeDialog);
  dialog.addEventListener("click", function (event) {
    if (event.target === dialog || event.target.classList.contains("qr-dialog__inner")) {
      closeDialog();
    }
  });
  dialog.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      event.preventDefault();
      closeDialog();
    }
  });
  dialog.addEventListener("close", function () {
    dialogImage.removeAttribute("src");
    if (lastTrigger) {
      lastTrigger.focus();
    }
  });

  window.setTimeout(focusHashTarget, 0);
}());
