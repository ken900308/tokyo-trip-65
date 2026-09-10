import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import vm from 'node:vm';

// Lightweight DOM boundary; exercise the actual itinerary event handlers and renderer.
const handlers = {};
const navigationCalls = [];
let reducedMotion = false;
const buttons = Array.from({length: 6}, (_, i) => ({
  day: i + 1, offsetLeft: i * 70, offsetWidth: 60,
  classList: {toggle() {}}, attributes: {},
  getAttribute() { return String(this.day); },
  setAttribute(name, value) { this.attributes[name] = value; }
}));
const panel = {
  innerHTML: '', setAttribute() {},
  focus(options) { navigationCalls.push(['focus', options?.preventScroll]); },
  scrollIntoView(options) { navigationCalls.push(['scroll', options.behavior, options.block]); },
  setPointerCapture() {},
  getBoundingClientRect() { return {top: 200}; },
  addEventListener(name, handler) { handlers[name] = handler; }
};
const selector = {
  clientWidth: 360, offsetLeft: 0, scrollTo() {}, scrollIntoView() {},
  querySelectorAll() { return buttons; },
  querySelector(query) { return buttons[Number(query.match(/\d/)[0]) - 1]; },
  addEventListener(name, handler) { this[name] = handler; }
};
const ticketNav = {};
const document = {
  querySelector(query) {
    return query === '#day-panel' ? panel : query === '[data-day-selector]' ? selector : ticketNav;
  }
};
const window = {
  innerWidth: 390, location: {href: 'https://example.test/itinerary.html?day=2', search: '?day=2'},
  history: {replaceState(_, __, path) { this.path = path; }},
  getSelection() { return ''; }, matchMedia() { return {matches: reducedMotion}; }
};
const context = vm.createContext({window, document, URL, URLSearchParams, Date});
for (const path of ['assets/js/core.js', 'data/itinerary.js', 'assets/js/itinerary.js']) {
  vm.runInContext(readFileSync(new URL('../public/' + path, import.meta.url), 'utf8'), context);
}
const target = {closest() { return null; }};
function event(x, y, extra = {}) {
  return {clientX: x, clientY: y, pointerId: 1, pointerType: 'touch', isPrimary: true,
    button: 0, target, ...extra};
}
function swipe(start, end) { handlers.pointerdown(start); handlers.pointerup(end); }
function day(number) {
  assert.equal(window.history.path, '/itinerary.html?day=' + number);
  assert.equal(ticketNav.href, 'tickets.html?day=' + number);
  assert.equal(buttons[number - 1].attributes['aria-pressed'], 'true');
}
day(2);
swipe(event(300, 200), event(100, 210));
day(3);
assert.match(panel.innerHTML, /DAY 3/);
swipe(event(100, 200), event(300, 210));
day(2);
swipe(event(300, 200), event(290, 350));
day(2);
swipe(event(300, 200, {target: {closest() { return {}; }}}), event(100, 200));
day(2); // Routes, maps, links and controls must keep their own gestures.
swipe(event(5, 200), event(200, 200));
day(2); // Browser edge navigation remains native.
handlers.pointerdown(event(300, 200));
handlers.pointercancel();
handlers.pointerup(event(100, 200));
day(2);
handlers.pointerdown(event(300, 200));
handlers.pointerdown(event(200, 200, {pointerId: 2, isPrimary: false}));
handlers.pointerup(event(100, 200));
day(2); // Pinch / multiple pointers cannot change days.
selector.click({target: {closest() { return buttons[5]; }}});
day(6);
assert.deepEqual(navigationCalls, [['focus', true], ['scroll', 'smooth', 'start']],
  'clicking Day must prevent the focus jump before smoothly scrolling to the itinerary');
navigationCalls.length = 0;
reducedMotion = true;
selector.click({target: {closest() { return buttons[5]; }}});
assert.deepEqual(navigationCalls, [['focus', true], ['scroll', 'instant', 'start']],
  'reduced-motion preference must avoid animated scrolling');
swipe(event(300, 200), event(100, 200));
day(6);
assert.match(panel.innerHTML, /尚未安排/);
console.log('PASS: swipe updates content, URL, date and tickets; scroll, controls, edges, cancellation and pinch are preserved.');
