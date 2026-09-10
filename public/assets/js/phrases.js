(function () {
  "use strict";

  var categories = window.TOKYO_PHRASES.categories;
  var tabList = document.querySelector("[data-phrase-tabs]");
  var panelContainer = document.querySelector("[data-phrase-panels]");
  var copyStatus = document.querySelector("[data-copy-status]");
  var speechAvailable = "speechSynthesis" in window && typeof window.SpeechSynthesisUtterance === "function";

  function fallbackCopy(text) {
    var textarea = document.createElement("textarea");
    var copied = false;

    textarea.value = text;
    textarea.setAttribute("readonly", "");
    textarea.setAttribute("aria-hidden", "true");
    textarea.style.position = "fixed";
    textarea.style.left = "-9999px";
    textarea.style.opacity = "0";
    document.body.appendChild(textarea);
    textarea.focus();
    textarea.select();

    try {
      copied = document.execCommand("copy");
    } catch (error) {
      copied = false;
    }

    document.body.removeChild(textarea);
    return copied;
  }

  function reportCopy(phrase, copied) {
    copyStatus.textContent = copied ? "已複製日文：" + phrase.ja : "無法自動複製，請長按日文選取複製。";
  }

  function copyPhrase(phrase, trigger) {
    var clipboard = window.navigator.clipboard;

    if (clipboard && typeof clipboard.writeText === "function") {
      try {
        clipboard.writeText(phrase.ja).then(function () {
          reportCopy(phrase, true);
          trigger.focus();
        }, function () {
          reportCopy(phrase, fallbackCopy(phrase.ja));
          trigger.focus();
        });
        return;
      } catch (error) {
        reportCopy(phrase, fallbackCopy(phrase.ja));
        trigger.focus();
        return;
      }
    }

    reportCopy(phrase, fallbackCopy(phrase.ja));
    trigger.focus();
  }

  function speakPhrase(phrase) {
    var utterance = new window.SpeechSynthesisUtterance(phrase.ja);

    utterance.lang = "ja-JP";
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  }

  function createAction(label, className, handler) {
    var button = document.createElement("button");

    button.type = "button";
    button.className = "phrase-action " + className;
    button.textContent = label;
    button.addEventListener("click", handler);
    return button;
  }

  function createPhraseCard(phrase) {
    var article = document.createElement("article");
    var context = document.createElement("p");
    var japanese = document.createElement("p");
    var actions = document.createElement("div");

    article.className = "phrase-card surface-card";
    article.id = "phrase-" + phrase.id;
    context.className = "phrase-card__context";
    context.textContent = phrase.zh;
    japanese.className = "phrase-card__japanese";
    japanese.lang = "ja";
    japanese.textContent = phrase.ja;
    actions.className = "phrase-actions";
    var copyButton = createAction("複製日文", "phrase-action--copy", function (event) {
      copyPhrase(phrase, event.currentTarget);
    });
    copyButton.setAttribute("aria-label", "複製日文：" + phrase.ja);
    actions.appendChild(copyButton);

    if (speechAvailable) {
      var speechButton = createAction("🔊 播放日文", "phrase-action--speech", function () {
        speakPhrase(phrase);
      });
      speechButton.setAttribute("aria-label", "播放日文：" + phrase.ja);
      actions.appendChild(speechButton);
    }

    article.appendChild(context);
    article.appendChild(japanese);
    if (phrase.reading) {
      var reading = document.createElement("p");
      reading.className = "phrase-card__reading";
      reading.textContent = phrase.reading;
      article.appendChild(reading);
    }
    article.appendChild(actions);
    return article;
  }

  function selectCategory(categoryIndex, moveFocus) {
    var tabs = tabList.querySelectorAll("[role='tab']");
    var panels = panelContainer.querySelectorAll("[role='tabpanel']");
    var index;
    var selected;

    for (index = 0; index < tabs.length; index += 1) {
      selected = index === categoryIndex;
      tabs[index].setAttribute("aria-selected", selected ? "true" : "false");
      tabs[index].tabIndex = selected ? 0 : -1;
      panels[index].hidden = !selected;
    }

    if (moveFocus) {
      tabs[categoryIndex].focus();
    }
  }

  function renderPhrasebook() {
    var tabFragment = document.createDocumentFragment();
    var panelFragment = document.createDocumentFragment();

    categories.forEach(function (category, categoryIndex) {
      var tab = document.createElement("button");
      var panel = document.createElement("section");
      var list = document.createElement("div");
      var tabId = "phrase-tab-" + category.id;
      var panelId = "phrase-panel-" + category.id;

      tab.type = "button";
      tab.className = "phrase-tab";
      tab.id = tabId;
      tab.setAttribute("role", "tab");
      tab.setAttribute("aria-controls", panelId);
      tab.setAttribute("aria-selected", categoryIndex === 0 ? "true" : "false");
      tab.tabIndex = categoryIndex === 0 ? 0 : -1;
      tab.textContent = category.icon + " " + category.title;
      tab.addEventListener("click", function () {
        selectCategory(categoryIndex, false);
      });

      panel.className = "phrase-panel";
      panel.id = panelId;
      panel.setAttribute("role", "tabpanel");
      panel.setAttribute("aria-labelledby", tabId);
      panel.tabIndex = 0;
      panel.hidden = categoryIndex !== 0;
      list.className = "phrase-list";
      category.phrases.forEach(function (phrase) {
        list.appendChild(createPhraseCard(phrase));
      });
      panel.appendChild(list);
      tabFragment.appendChild(tab);
      panelFragment.appendChild(panel);
    });

    tabList.appendChild(tabFragment);
    panelContainer.textContent = "";
    panelContainer.appendChild(panelFragment);
  }

  tabList.addEventListener("keydown", function (event) {
    var tabs = tabList.querySelectorAll("[role='tab']");
    var current = Array.prototype.indexOf.call(tabs, document.activeElement);
    var next = current;

    if (current < 0) {
      return;
    }
    if (event.key === "ArrowRight") {
      next = (current + 1) % tabs.length;
    } else if (event.key === "ArrowLeft") {
      next = (current - 1 + tabs.length) % tabs.length;
    } else if (event.key === "Home") {
      next = 0;
    } else if (event.key === "End") {
      next = tabs.length - 1;
    } else {
      return;
    }

    event.preventDefault();
    selectCategory(next, true);
  });

  renderPhrasebook();
}());
