import assert from 'node:assert/strict';
import {readFileSync, existsSync} from 'node:fs';
import vm from 'node:vm';

const root = new URL('../public/', import.meta.url);
const handlers = {}, windowHandlers = {};
const elements = new Map();
function element() {
  return {style: {}, handlers: {}, hidden: false, clientWidth: 390,
    setAttribute() {}, addEventListener(name, fn) { this.handlers[name] = fn; },
    scrollTo() {}};
}
const dialog = {...element(), open: false,
  querySelector(key) { if (!elements.has(key)) elements.set(key, element()); return elements.get(key); },
  showModal() { this.open = true; }, close() { this.open = false; }};
const opener = {isConnected: true, getAttribute() { return 'narita'; },
  focus(options) { assert.equal(options.preventScroll, true); }};
const history = {state: {}, pushes: [],
  pushState(state, _, url) { this.state = state; this.pushes.push(url); },
  back() { this.state = {}; windowHandlers.popstate({state: this.state}); }};
const document = {body: {style: {overflow: ''}, appendChild() {}},
  createElement() { return dialog; }, querySelectorAll() { return []; },
  querySelector() { return opener; },
  addEventListener(name, fn) { handlers[name] = fn; }};
const location = {href: 'https://example.test/itinerary.html?day=1'};
const window = {addEventListener(name, fn) { windowHandlers[name] = fn; },
  scrollTo() { assert.fail('map closing must not force viewport position'); }};
const context = vm.createContext({window, document, history, location});
for (const file of ['data/visitor-maps.js', 'data/itinerary.js', 'data/tickets.js', 'assets/js/visitor-maps.js']) {
  vm.runInContext(readFileSync(new URL(file, root), 'utf8'), context);
}
const data = window.TOKYO_VISITOR_MAPS;
const eventIds = new Set(window.TOKYO_ITINERARY.days.flatMap(day => (day.events || []).map(e => e.id)));
const mapIds = new Set();
for (const [event, maps] of Object.entries(data.events)) {
  assert.ok(eventIds.has(event), 'maps must attach to a live itinerary event: ' + event);
  for (const map of maps) {
    assert.ok(!mapIds.has(map.id), 'unique viewer ID'); mapIds.add(map.id);
    for (const asset of [map.image, map.thumbnail]) {
      assert.ok(asset.startsWith('assets/maps/') && !asset.includes('..'));
      assert.ok(existsSync(new URL(asset, root)), 'image exists: ' + asset);
    }
    assert.ok(window.VisitorMaps.render(event).includes('data-visitor-map="' + map.id + '"'));
  }
}
for (const event of Object.keys(data.links)) assert.ok(eventIds.has(event));
assert.equal(window.VisitorMaps.render('unknown'), '');
const map = data.events['day-1-access-express'][0];
const title = map.title; map.title = '<unsafe>"';
assert.ok(window.VisitorMaps.render('day-1-access-express').includes('&lt;unsafe&gt;&quot;'));
map.title = title;
handlers.click({target: {closest() { return opener; }}});
assert.equal(dialog.open, true);
assert.equal(elements.get('img').src, map.image);
assert.equal(history.pushes[0], location.href, 'opening a map retains the selected day URL');
assert.equal(document.body.style.overflow, 'hidden');
elements.get('[data-map-in]').handlers.click();
assert.equal(elements.get('output').textContent, '150%');
elements.get('[data-map-fit]').handlers.click();
assert.equal(elements.get('output').textContent, '100%');
elements.get('img').handlers.error();
assert.equal(elements.get('img').hidden, true);
assert.equal(elements.get('[data-map-error]').hidden, false);
elements.get('[data-map-back]').handlers.click();
assert.equal(dialog.open, false);
assert.equal(document.body.style.overflow, '');
windowHandlers.popstate({state: {visitorMap: 'narita'}});
assert.equal(dialog.open, true, 'Forward reopens the map');
assert.equal(elements.get('img').hidden, false, 'reopening retries failed images');
dialog.handlers.cancel({preventDefault() {}});
assert.equal(dialog.open, false, 'Escape closes the map');
const hotel = window.TOKYO_TICKETS.days[0].groups.find(g => g.id === 'hotel-self-checkin');
assert.ok(hotel.checkinCode && hotel.externalUrl, 'authorized lodging details present');
for (const holder of window.TOKYO_TICKETS.days[1].groups[0].holders) {
  assert.ok(existsSync(new URL(holder.image, root)), 'authorized QR asset exists');
}
console.log('PASS: map associations/assets, escaping, viewer zoom/error/Back/Forward/Escape, lodging and QR assets.');
