(function () {
  "use strict";
  var data = window.TOKYO_VISITOR_MAPS;
  var all = {};
  Object.keys(data.events).forEach(function (key) {
    data.events[key].forEach(function (map) { all[map.id] = map; });
  });
  function escape(value) {
    return String(value).replace(/[&<>"']/g, function (c) {
      return {"&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#39;"}[c];
    });
  }
  window.VisitorMaps = {render: function (eventId) {
    var maps = data.events[eventId] || [];
    var links = data.links[eventId] || [];
    if (!maps.length && !links.length) return "";
    return '<section class="visitor-maps" aria-label="遊客導覽圖"><h4>遊客導覽圖</h4>' +
      (maps.length ? '<p class="visitor-maps__hint">點圖放大 · 可縮放查看細節 · 返回後保留行程位置</p>' : '') +
      '<div class="visitor-maps__grid">' + maps.map(function (map) {
        return '<figure class="visitor-map"><button type="button" class="visitor-map__open" data-visitor-map="' + escape(map.id) + '" aria-haspopup="dialog" aria-label="放大' + escape(map.title) + '"><img loading="lazy" decoding="async" src="' + escape(map.thumbnail) + '" alt="' + escape(map.title) + '"><span>放大地圖 ↗</span></button><figcaption><strong>' + escape(map.title) + '</strong><p>' + escape(map.note) + '</p><a href="' + escape(map.source) + '" target="_blank" rel="noopener noreferrer">來源：' + escape(map.credit) + ' ↗</a></figcaption></figure>';
      }).join('') + '</div>' + links.map(function (link) {
        return '<p>' + (link.note ? escape(link.note) + '<br>' : '') + '<a class="action-link" href="' + escape(link.url) + '" target="_blank" rel="noopener noreferrer">' + escape(link.title) + ' ↗</a></p>';
      }).join('') + '<p class="visitor-maps__date">匯入圖資整理日期 ' + data.checked + ' · 圖片版權屬各官方單位，現場指標與最新官方圖優先。</p></section>';
  }};

  document.querySelectorAll('[data-visitor-maps]').forEach(function (element) {
    element.innerHTML = window.VisitorMaps.render(element.getAttribute('data-visitor-maps'));
  });

  var dialog = document.createElement('dialog');
  dialog.className = 'visitor-map-viewer';
  dialog.setAttribute('aria-labelledby', 'visitor-map-title');
  dialog.innerHTML = '<header class="visitor-map-viewer__header"><button type="button" data-map-back autofocus>← 返回行程</button><h2 id="visitor-map-title"></h2></header><nav class="visitor-map-viewer__tools" aria-label="地圖縮放"><button type="button" data-map-out aria-label="縮小地圖">−</button><output aria-live="polite">100%</output><button type="button" data-map-in aria-label="放大地圖">＋</button><button type="button" data-map-fit>適合螢幕</button><a data-map-source target="_blank" rel="noopener noreferrer">官方原圖 ↗</a></nav><p class="visitor-map-viewer__hint">放大後可上下左右滑動查看。按「返回行程」或瀏覽器返回鍵關閉。</p><div class="visitor-map-viewer__canvas" tabindex="0" aria-label="可捲動的地圖"><img alt=""><p data-map-error hidden>圖片暫時無法顯示，請使用上方「官方原圖」。</p></div>';
  document.body.appendChild(dialog);
  var img = dialog.querySelector('img');
  var canvas = dialog.querySelector('.visitor-map-viewer__canvas');
  var zoom = 1;
  var opener;
  var previousOverflow = '';
  function resize() {
    img.style.width = Math.round(Math.max(280, canvas.clientWidth - 24) * zoom) + 'px';
    dialog.querySelector('output').textContent = Math.round(zoom * 100) + '%';
    dialog.querySelector('[data-map-out]').disabled = zoom <= 1;
    dialog.querySelector('[data-map-in]').disabled = zoom >= 5;
  }
  function show(id, button) {
    var map = all[id];
    if (!map) return;
    if (!dialog.open) {
      opener = button || document.querySelector('[data-visitor-map="' + id + '"]');
      previousOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      dialog.showModal();
    }
    zoom = 1;
    dialog.querySelector('h2').textContent = map.title;
    dialog.querySelector('[data-map-source]').href = map.original;
    dialog.querySelector('[data-map-error]').hidden = true;
    img.hidden = false;
    img.alt = map.title + '；來源：' + map.credit;
    img.src = map.image;
    resize();
    canvas.scrollTop = 0;
    canvas.scrollLeft = 0;
  }
  function hide() {
    if (!dialog.open) return;
    dialog.close();
    document.body.style.overflow = previousOverflow;
    if (opener && opener.isConnected) opener.focus({preventScroll: true});
  }
  function back() {
    if (history.state && history.state.visitorMap) history.back();
    else hide();
  }
  document.addEventListener('click', function (event) {
    var button = event.target.closest('[data-visitor-map]');
    if (!button) return;
    var id = button.getAttribute('data-visitor-map');
    if (!all[id]) return;
    history.pushState(Object.assign({}, history.state || {}, {visitorMap: id}), '', location.href);
    show(id, button);
  });
  dialog.querySelector('[data-map-back]').addEventListener('click', back);
  dialog.addEventListener('cancel', function (event) { event.preventDefault(); back(); });
  dialog.querySelector('[data-map-in]').addEventListener('click', function () { zoom = Math.min(5, zoom + 0.5); resize(); });
  dialog.querySelector('[data-map-out]').addEventListener('click', function () { zoom = Math.max(1, zoom - 0.5); resize(); });
  dialog.querySelector('[data-map-fit]').addEventListener('click', function () { zoom = 1; resize(); canvas.scrollTo(0, 0); });
  img.addEventListener('error', function () { img.hidden = true; dialog.querySelector('[data-map-error]').hidden = false; });
  document.addEventListener('error', function (event) {
    if (event.target.matches && event.target.matches('.visitor-map__open img')) {
      event.target.hidden = true;
      event.target.nextElementSibling.textContent = '縮圖未載入，點此開啟地圖 ↗';
    }
  }, true);
  window.addEventListener('popstate', function (event) {
    if (event.state && event.state.visitorMap) show(event.state.visitorMap);
    else hide();
  });
  window.addEventListener('resize', function () { if (dialog.open) resize(); });
}());
