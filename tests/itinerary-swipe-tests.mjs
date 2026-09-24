import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import vm from 'node:vm';

// Lightweight DOM boundary; exercise the actual itinerary event handlers and renderer.
const handlers = {};
const windowHandlers = {};
const navigationCalls = [];
let reducedMotion = false;
const buttons = Array.from({length: 6}, (_, i) => ({
  day: i + 1, offsetLeft: i * 70, offsetWidth: 60,
  classList: {toggle() {}}, attributes: {},
  getAttribute() { return String(this.day); },
  setAttribute(name, value) { this.attributes[name] = value; }
}));
const panel = {
  style: {},
  innerHTML: '', setAttribute() {},
  focus(options) { navigationCalls.push(['focus', options?.preventScroll]); },
  scrollIntoView(options) { navigationCalls.push(['scroll', options.behavior, options.block]); },
  setPointerCapture() {},
  getBoundingClientRect() { return {top: 200, height: 1200}; },
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
  innerWidth: 390, innerHeight: 800, location: {href: 'https://example.test/itinerary.html?day=2', search: '?day=2'},
  addEventListener(name, handler) { windowHandlers[name] = handler; },
  history: {
    pushes: [],
    replaceState(_, __, path) { this.path = path; },
    pushState(_, __, path) { this.path = path; this.pushes.push(path); }
  },
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
assert.deepEqual(navigationCalls, [], 'clicking Day must not focus or scroll the panel');
navigationCalls.length = 0;
reducedMotion = true;
selector.click({target: {closest() { return buttons[5]; }}});
assert.deepEqual(navigationCalls, [], 'reduced motion must not scroll either');
swipe(event(300, 200), event(100, 200));
day(6);
assert.match(panel.innerHTML, /DAY 6/);
console.log('PASS: swipe updates content, URL, date and tickets; scroll, controls, edges, cancellation and pinch are preserved.');
for (const number of [1, 2, 3, 1, 6, 1]) {
  selector.click({target: {closest() { return buttons[number - 1]; }}});
  day(number);
}
assert.equal(window.history.pushes.at(-1), '/itinerary.html?day=1');
const pushCount = window.history.pushes.length;
for (const number of [6, 1]) {
  window.location.search = '?day=' + number;
  window.history.path = '/itinerary.html?day=' + number;
  windowHandlers.popstate();
  day(number);
}
assert.equal(window.history.pushes.length, pushCount, 'Back/Forward cannot add history entries');
assert.deepEqual(navigationCalls, [], 'all requested transitions retain viewport and focus');
console.log('PASS: requested date sequence, Back/Forward and no-scroll navigation.');
const animations = [];
panel.animate = (frames, options) => {
  let finish;
  let reject;
  const finished = new Promise((resolve, fail) => { finish = resolve; reject = fail; });
  const animation = {frames, options, finished, finish, cancel() { reject(new Error('cancelled')); }};
  animations.push(animation);
  return animation;
};
reducedMotion = false;
const oldContent = panel.innerHTML;
selector.click({target: {closest() { return buttons[1]; }}});
assert.equal(panel.innerHTML, oldContent, 'old content remains until fade-out finishes');
assert.equal(panel.style.minHeight, '1200px', 'hold layout height during transition');
animations[0].finish();
await new Promise(setImmediate);
assert.match(panel.innerHTML, /DAY 2/);
assert.equal(animations[0].options.duration + animations[1].options.duration, 220);
assert.equal(animations[0].frames[1].opacity, 0);
assert.equal(animations[1].frames[1].opacity, 1);
animations[1].finish();
await new Promise(setImmediate);
assert.equal(panel.style.minHeight, '600px', 'keep viewport floor without retaining the whole old day');
selector.click({target: {closest() { return buttons[2]; }}});
selector.click({target: {closest() { return buttons[5]; }}});
animations.at(-1).finish();
await new Promise(setImmediate);
assert.match(panel.innerHTML, /DAY 6/, 'rapid selections cannot render stale content');
animations.at(-1).finish();
await new Promise(setImmediate);
reducedMotion = true;
const animationCount = animations.length;
selector.click({target: {closest() { return buttons[0]; }}});
assert.match(panel.innerHTML, /DAY 1/);
assert.equal(animations.length, animationCount, 'reduced motion skips both animation phases');
assert.deepEqual(navigationCalls, []);
console.log('PASS: two-phase fade, height stability, cancellation and reduced-motion rendering.');

// Arrival instructions must be rendered in the actual Day 1 panel, not just stored.
assert.match(panel.innerHTML, /class="arrival-steps"/);
assert.match(panel.innerHTML, /至少[^<]*¥1,200/);
assert.match(panel.innerHTML, /成田空港.*Narita Airport/);
assert.match(panel.innerHTML, /押上.*Oshiage/);
assert.match(panel.innerHTML, /hotel-self-checkin/);
assert.match(panel.innerHTML, /約 1 小時/);
assert.equal(window.TOKYO_ITINERARY.days[0].arrivalSteps.length, 7);
assert.equal(window.TOKYO_ITINERARY.days[4].planned, true);
assert.equal(window.TOKYO_ITINERARY.days[5].planned, true);
assert.match(JSON.stringify(window.TOKYO_ITINERARY.days[4]), /Nishio/);
console.log('PASS: seven-step arrival route, balance warning and preserved later days.');

// Catch missing guides, omitted ride prices, double-counted transfers/alternatives,
// and totals that do not follow their underlying fares.
for (const [number, perPerson, fourAdults] of [[2,714,2856], [3,973,3892], [5,1569,6276]]) {
  selector.click({target: {closest() { return buttons[number - 1]; }}});
  assert.match(panel.innerHTML, /class="arrival-steps"/, 'daily guide is visible');
  assert.ok(panel.innerHTML.includes('data-fare-person="' + perPerson + '"'));
  assert.ok(panel.innerHTML.includes('data-fare-group="' + fourAdults + '"'));
  const dayData = window.TOKYO_ITINERARY.days[number - 1];
  for (const ride of dayData.events.filter(e => ['train','bus'].includes(e.transport?.mode))) {
    assert.ok(panel.innerHTML.includes('data-event-fare="' + ride.id + '"'), 'fare beside every ride');
  }
}
const fareFixture = {legs:[{label:'A',yen:178},{label:'B',yen:178}], adjustments:[{label:'Transfer',yen:-70}], alternativeYen:157};
assert.equal(window.TripCore.fareAmount(fareFixture), 286);
assert.equal(window.TripCore.fareAmount({legs:[{yen:0}]}), 0, 'walking stays free');
assert.equal(window.TripCore.fareAmount({legs:[{yen:null}]}), null, 'unknown is never free');
assert.equal(window.TripCore.dayFareTotal({events:[{fare:fareFixture},{fare:{legs:[{yen:250}]}}]}),536);
assert.equal(window.TripCore.dayFareTotal({events:[{transport:{mode:'train'}}]}),null,'missing ride fare cannot understate a total');
const mutableFare = window.TOKYO_ITINERARY.days[1].events.find(e=>e.id==='day-2-to-asakusa').fare.legs[0];
const oldFare = mutableFare.yen;
mutableFare.yen = 300;
selector.click({target:{closest(){return buttons[1];}}});
assert.ok(panel.innerHTML.includes('data-fare-person="764"'), 'changing a ride updates the total');
assert.ok(panel.innerHTML.includes('data-fare-group="3056"'));
mutableFare.yen = oldFare;
assert.deepEqual(navigationCalls, [], 'new guides must not add scrolling');
console.log('PASS: Day 2/3/5 guides, individual ride fares, transfer discount and derived adult totals.');

// Catch a missing evening stop or a navigation button pointing at a vague city.
selector.click({target:{closest(){return buttons[2];}}});
const revisedDay3 = window.TOKYO_ITINERARY.days[2];
assert.equal(revisedDay3.quickGuide.steps.length, 10, 'all ten steps reach the itinerary');
for (const name of ['花園神社', '思出橫丁', '13 號月台', '2 號月台']) {
  assert.ok(panel.innerHTML.includes(name), name + ' is visible in the rendered day');
}
const evening = revisedDay3.events.slice(5);
assert.equal(evening.length, 6);
for (const event of evening) {
  const link = new URL(event.navigationUrl);
  assert.equal(link.hostname, 'www.google.com');
  assert.equal(link.pathname, '/maps/dir/');
  assert.ok(link.searchParams.get('destination'));
  assert.notEqual(link.searchParams.get('destination'), 'Shinjuku');
  assert.ok(panel.innerHTML.includes(event.navigationUrl.replace(/&/g, '&amp;')), 'navigation rendered');
}
assert.equal(new URL(evening[3].navigationUrl).searchParams.get('travelmode'), 'walking');
assert.match(new URL(evening[3].navigationUrl).searchParams.get('waypoints'), /Godzilla/);
assert.ok(panel.innerHTML.includes('data-fare-person="973"'));
console.log('PASS: Day 3 evening route, specific navigation and retained transit total.');
