(function () {
  "use strict";

  var storageKey = "tokyo-trip-checklist-v1";
  var groups = window.TOKYO_CHECKLIST.groups;
  var groupContainer = document.querySelector("[data-checklist-groups]");
  var progressText = document.querySelector("[data-progress-text]");
  var progressBar = document.querySelector("[data-progress-bar]");
  var storageStatus = document.querySelector("[data-storage-status]");
  var resetButton = document.querySelector("[data-checklist-reset]");
  var items = [];
  var validIds = [];
  var state;

  groups.forEach(function (group) {
    group.items.forEach(function (item) {
      items.push(item);
      validIds.push(item.id);
    });
  });

  function showStorageError() {
    storageStatus.textContent = "此瀏覽器目前無法儲存進度；本頁仍可繼續勾選。";
  }

  function loadState() {
    var saved;

    try {
      saved = window.localStorage.getItem(storageKey);
      if (!saved) {
        return {};
      }
      return window.TripCore.sanitizeChecklistState(JSON.parse(saved), validIds);
    } catch (error) {
      showStorageError();
      return {};
    }
  }

  function saveState() {
    try {
      window.localStorage.setItem(storageKey, JSON.stringify(state));
    } catch (error) {
      showStorageError();
    }
  }

  function createChecklistRow(item) {
    var row = document.createElement("li");
    var label = document.createElement("label");
    var checkbox = document.createElement("input");
    var labelText = document.createElement("span");
    var checkboxId = "checklist-" + item.id;

    row.className = "checklist-row";
    checkbox.type = "checkbox";
    checkbox.id = checkboxId;
    checkbox.setAttribute("data-checklist-id", item.id);
    checkbox.checked = state[item.id] === true;
    label.htmlFor = checkboxId;
    labelText.className = "checklist-row__label";
    labelText.textContent = item.label;
    label.appendChild(checkbox);
    label.appendChild(labelText);
    row.appendChild(label);
    row.classList.toggle("is-complete", checkbox.checked);

    return row;
  }

  function renderGroups() {
    var fragment = document.createDocumentFragment();

    groups.forEach(function (group) {
      var section = document.createElement("section");
      var heading = document.createElement("h2");
      var list = document.createElement("ul");

      section.className = "checklist-group surface-card";
      section.setAttribute("data-checklist-group", group.id);
      heading.textContent = group.title;
      list.className = "checklist-list";
      group.items.forEach(function (item) {
        list.appendChild(createChecklistRow(item));
      });
      section.appendChild(heading);
      section.appendChild(list);
      fragment.appendChild(section);
    });

    groupContainer.textContent = "";
    groupContainer.appendChild(fragment);
  }

  function updateProgress() {
    var progress = window.TripCore.checklistProgress(items, state);

    progressText.textContent = progress.done + " / " + progress.total;
    progressBar.max = progress.total || 1;
    progressBar.value = progress.done;
    progressBar.textContent = progress.percent + "%";
    progressBar.setAttribute("aria-valuetext", progress.done + " / " + progress.total + " 已完成");
  }

  function syncRows() {
    groupContainer.querySelectorAll("[data-checklist-id]").forEach(function (checkbox) {
      var checked = state[checkbox.getAttribute("data-checklist-id")] === true;

      checkbox.checked = checked;
      checkbox.closest(".checklist-row").classList.toggle("is-complete", checked);
    });
  }

  state = loadState();
  renderGroups();
  updateProgress();

  groupContainer.addEventListener("change", function (event) {
    var checkbox = event.target.closest("[data-checklist-id]");

    if (!checkbox || checkbox.type !== "checkbox") {
      return;
    }

    state = window.TripCore.updateChecklistState(
      state,
      checkbox.getAttribute("data-checklist-id"),
      checkbox.checked
    );
    state = window.TripCore.sanitizeChecklistState(state, validIds);
    checkbox.closest(".checklist-row").classList.toggle("is-complete", checkbox.checked);
    updateProgress();
    saveState();
  });

  resetButton.addEventListener("click", function () {
    if (!window.confirm("確定要重設所有 Checklist 項目嗎？")) {
      return;
    }

    state = {};
    try {
      window.localStorage.removeItem(storageKey);
    } catch (error) {
      showStorageError();
    }
    syncRows();
    updateProgress();
  });
}());
