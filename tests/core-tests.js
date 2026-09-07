var fso = new ActiveXObject("Scripting.FileSystemObject");
var projectRoot = fso.GetParentFolderName(fso.GetParentFolderName(WScript.ScriptFullName));
var corePath = fso.BuildPath(projectRoot, "assets\\js\\core.js");
var itineraryPath = fso.BuildPath(projectRoot, "data\\itinerary.js");
var ticketsPath = fso.BuildPath(projectRoot, "data\\tickets.js");
var phrasesPath = fso.BuildPath(projectRoot, "data\\phrases.js");
var failures = 0;

function readUtf8(path) {
  var stream = new ActiveXObject("ADODB.Stream");

  stream.Type = 2;
  stream.Charset = "utf-8";
  stream.Open();
  stream.LoadFromFile(path);
  var source = stream.ReadText();
  stream.Close();
  return source;
}

function fail(name, detail) {
  failures += 1;
  WScript.Echo("FAIL: " + name + " (" + detail + ")");
}

function assertEqual(actual, expected, name) {
  if (actual === expected) {
    WScript.Echo("PASS: " + name);
  } else {
    fail(name, "expected " + expected + ", received " + actual);
  }
}

function ownPropertyCount(object) {
  var count = 0;
  var key;

  for (key in object) {
    if (Object.prototype.hasOwnProperty.call(object, key)) {
      count += 1;
    }
  }

  return count;
}

if (!fso.FileExists(corePath)) {
  fail("loads TripCore", "assets/js/core.js is missing");
  WScript.Quit(1);
}

eval(readUtf8(corePath));

if (!fso.FileExists(itineraryPath)) {
  fail("loads itinerary data", "data/itinerary.js is missing");
  WScript.Quit(1);
}

eval(readUtf8(itineraryPath));

if (!fso.FileExists(ticketsPath)) {
  fail("loads ticket data", "data/tickets.js is missing");
  WScript.Quit(1);
}

eval(readUtf8(ticketsPath));

if (!fso.FileExists(phrasesPath)) {
  fail("loads phrase data", "data/phrases.js is missing");
  WScript.Quit(1);
}

eval(readUtf8(phrasesPath));

assertEqual(TripCore.normalizeDay("2", 6), 2, "accepts valid day");
assertEqual(TripCore.normalizeDay("9", 6), 1, "defaults invalid day");
assertEqual(TripCore.mapUrl(3), "itinerary-map.html?day=3&embed=1", "builds map deep link");
assertEqual(TripCore.checklistProgress([{id:"a"},{id:"b"}], {a:true}).done, 1, "counts checked items");
assertEqual(TripCore.updateChecklistState({a:true}, "b", true).b, true, "stores toggled item");
assertEqual(typeof TripCore.sanitizeChecklistState, "function", "exposes checklist state sanitizer");
if (typeof TripCore.sanitizeChecklistState === "function") {
  var checklistItems = [{id:"passport"},{id:"suica"},{id:"tickets"}];
  var originalChecklistState = {};
  var checkedChecklistState = TripCore.updateChecklistState(originalChecklistState, "passport", true);
  var uncheckedChecklistState = TripCore.updateChecklistState(checkedChecklistState, "passport", false);
  var sanitizedChecklistState = TripCore.sanitizeChecklistState(
    {passport:true, stale:true},
    ["passport", "suica"]
  );

  assertEqual(sanitizedChecklistState.passport, true, "keeps valid checked checklist state");
  assertEqual(Object.prototype.hasOwnProperty.call(sanitizedChecklistState, "stale"), false, "removes stale checklist state");
  assertEqual(ownPropertyCount(sanitizedChecklistState), 1, "returns only valid checked checklist state");
  assertEqual(TripCore.checklistProgress(checklistItems, {}).done + "/" + TripCore.checklistProgress(checklistItems, {}).total, "0/3", "starts checklist progress at zero");
  assertEqual(TripCore.checklistProgress(checklistItems, checkedChecklistState).done + "/" + TripCore.checklistProgress(checklistItems, checkedChecklistState).total, "1/3", "counts checked checklist progress");
  assertEqual(TripCore.checklistProgress(checklistItems, uncheckedChecklistState).done + "/" + TripCore.checklistProgress(checklistItems, uncheckedChecklistState).total, "0/3", "counts unchecked checklist progress");
  assertEqual(Object.prototype.hasOwnProperty.call(originalChecklistState, "passport"), false, "does not mutate original checklist state");
  assertEqual(TripCore.checklistProgress(checklistItems, {stale:true}).done, 0, "ignores stale checklist IDs in progress");
  assertEqual(TripCore.checklistProgress(checklistItems, {stale:true}).total, 3, "keeps checklist total independent of stale state");
}
assertEqual(typeof TripCore.visibleDayEvents, "function", "exposes visible day events lookup");
if (typeof TripCore.visibleDayEvents === "function") {
  assertEqual(TripCore.visibleDayEvents(TOKYO_ITINERARY.days, 3).length, 9, "returns Day 3 events");
  assertEqual(TripCore.visibleDayEvents(TOKYO_ITINERARY.days, 4).length, 0, "returns no events for Day 4");
  assertEqual(TripCore.visibleDayEvents(TOKYO_ITINERARY.days, "not-a-day").length, 5, "defaults invalid event day to Day 1");
}
assertEqual(TOKYO_ITINERARY.days[3].planned, false, "marks Day 4 unplanned");
assertEqual(TOKYO_ITINERARY.days[3].status, "\u5c1a\u672a\u5b89\u6392", "labels Day 4 as unplanned");
assertEqual(typeof TripCore.mapDocumentTitle, "function", "exposes map document titles");
if (typeof TripCore.mapDocumentTitle === "function") {
  assertEqual(TripCore.mapDocumentTitle(4), "Day 4 \u8def\u7dda\u5730\u5716\uff5c\u6771\u4eac\u884c\u7a0b", "titles an unplanned day map");
  assertEqual(TripCore.mapDocumentTitle(null), "\u627e\u4e0d\u5230\u9019\u4e00\u5929\uff5c\u6771\u4eac\u884c\u7a0b", "titles an invalid day map");
}
assertEqual(typeof TripCore.ticketHash, "function", "exposes stable ticket deep links");
if (typeof TripCore.ticketHash === "function") {
  assertEqual(TripCore.ticketHash(2, "sumida-aquarium"), "tickets.html?day=2#sumida-aquarium", "builds ticket deep link");
}
assertEqual(TOKYO_TICKETS.days[1].groups.length, 1, "Day 2 has one ticket group");
assertEqual(TOKYO_TICKETS.days[1].groups[0].id, "sumida-aquarium", "identifies the aquarium ticket group");
assertEqual(TOKYO_TICKETS.days[1].groups[0].holders.length, 4, "aquarium group has four holders");
assertEqual(TOKYO_TICKETS.days[1].groups[0].holders[0].label, "\u6211", "labels my ticket");
assertEqual(TOKYO_TICKETS.days[1].groups[0].holders[1].label, "\u7238\u7238", "labels dad's ticket");
assertEqual(TOKYO_TICKETS.days[1].groups[0].holders[2].label, "\u5abd\u5abd", "labels mom's ticket");
assertEqual(TOKYO_TICKETS.days[1].groups[0].holders[3].label, "\u91d1\u660e\u73b2", "labels Jin's ticket");
assertEqual(TOKYO_TICKETS.days[1].groups[0].holders[0].image, "images/sumida-ticket-me.png", "keeps my ticket image path");
assertEqual(TOKYO_TICKETS.days[1].groups[0].holders[1].image, "images/sumida-ticket-dad.png", "keeps dad's ticket image path");
assertEqual(TOKYO_TICKETS.days[1].groups[0].holders[2].image, "images/sumida-ticket-mom.png", "keeps mom's ticket image path");
assertEqual(TOKYO_TICKETS.days[1].groups[0].holders[3].image, "images/sumida-ticket-jin.png", "keeps Jin's ticket image path");
assertEqual(typeof TripCore.findPhrase, "function", "exposes phrase lookup");
if (typeof TripCore.findPhrase === "function") {
  var transportPhrase = TripCore.findPhrase(TOKYO_PHRASES.categories, "train-to-oshiage");

  assertEqual(transportPhrase && transportPhrase.ja, "\u3053\u306e\u96fb\u8eca\u306f\u62bc\u4e0a\u99c5\u306b\u884c\u304d\u307e\u3059\u304b\uff1f", "finds exact Oshiage transport phrase");
  assertEqual(TripCore.findPhrase(TOKYO_PHRASES.categories, "missing-phrase"), null, "returns null for an unknown phrase");
}
assertEqual(TOKYO_PHRASES.categories.length, 6, "has six phrase categories");

(function assertPhraseData() {
  var seenIds = {};
  var categoryIds = [];
  var categoryIndex;
  var phraseIndex;
  var category;
  var phrase;

  for (categoryIndex = 0; categoryIndex < TOKYO_PHRASES.categories.length; categoryIndex += 1) {
    category = TOKYO_PHRASES.categories[categoryIndex];
    categoryIds.push(category.id);
    for (phraseIndex = 0; phraseIndex < category.phrases.length; phraseIndex += 1) {
      phrase = category.phrases[phraseIndex];
      assertEqual(typeof phrase.id === "string" && phrase.id.length > 0, true, "keeps stable ID for " + phrase.zh);
      assertEqual(typeof phrase.zh === "string" && phrase.zh.length > 0, true, "keeps Chinese text for " + phrase.id);
      assertEqual(typeof phrase.ja === "string" && phrase.ja.length > 0, true, "keeps Japanese text for " + phrase.id);
      assertEqual(Object.prototype.hasOwnProperty.call(seenIds, phrase.id), false, "keeps phrase ID unique: " + phrase.id);
      seenIds[phrase.id] = true;
    }
  }

  assertEqual(categoryIds.join(","), "airport,transport,restaurant,hotel,shopping,emergency", "keeps stable phrase category IDs");
  assertEqual(TOKYO_PHRASES.categories[0].title, "\u6a5f\u5834", "keeps airport category title");
  assertEqual(TOKYO_PHRASES.categories[1].title, "\u8eca\u7ad9\uff0f\u4ea4\u901a", "keeps transport category title");
  assertEqual(TOKYO_PHRASES.categories[2].title, "\u9910\u5ef3", "keeps restaurant category title");
  assertEqual(TOKYO_PHRASES.categories[3].title, "\u98ef\u5e97", "keeps hotel category title");
  assertEqual(TOKYO_PHRASES.categories[4].title, "\u8cfc\u7269", "keeps shopping category title");
  assertEqual(TOKYO_PHRASES.categories[5].title, "\u7dca\u6025\uff0f\u6c42\u52a9", "keeps emergency category title");
}());

(function assertTicketRenderer() {
  // Run the actual renderer with a Day 4 fixture, not a duplicated label builder.
  // WSH lacks browser collections and ES5 array helpers; only those boundaries are supplied.
  if (!Array.prototype.map) Array.prototype.map = function (callback) {
    var result = [], i;
    for (i = 0; i < this.length; i += 1) result.push(callback(this[i], i));
    return result;
  };
  if (!Array.prototype.forEach) Array.prototype.forEach = function (callback) {
    var i;
    for (i = 0; i < this.length; i += 1) callback(this[i], i);
  };
  function noOp() {}
  function imageFixture(width) {
    var placeholder = {hidden:false};
    var trigger = {hidden:true, nextElementSibling:placeholder};
    var handlers = {};
    return {naturalWidth:width, complete:true, trigger:trigger, placeholder:placeholder,
      handlers:handlers, closest:function () { return trigger; },
      addEventListener:function (name, callback) { handlers[name] = callback; }};
  }
  var loaded = imageFixture(240), missing = imageFixture(0);
  var container = {innerHTML:"", querySelectorAll:function () { return [loaded, missing]; }, addEventListener:noOp};
  var control = {addEventListener:noOp};
  var dialog = {querySelector:function () { return control; }, addEventListener:noOp};
  var document = {querySelector:function (selector) { return selector === "[data-ticket-days]" ? container : dialog; }};
  var window = {TOKYO_TICKETS:{days:[{day:4,date:"09/28",groups:[{
    id:"day-four-fixture",title:"Fixture",time:"12:00",itineraryUrl:"itinerary.html?day=4",detailUrl:"day1-guide.html",holders:[]
  }]}]}, TripCore:TripCore, location:{search:"?day=4",hash:""}, setTimeout:noOp};
  function URLSearchParams() { this.get = function () { return "4"; }; }
  eval(readUtf8(fso.BuildPath(projectRoot, "assets\\js\\tickets.js")));
  assertEqual(container.innerHTML.indexOf("\u67e5\u770b Day 4 \u884c\u7a0b") >= 0, true, "ticket return label uses its owning Day 4");
  assertEqual(container.innerHTML.indexOf('href="itinerary.html?day=4"') >= 0, true, "ticket return target retains its owning Day 4");
  assertEqual(loaded.trigger.hidden, false, "loaded QR trigger is available");
  assertEqual(loaded.placeholder.hidden, true, "loaded QR hides missing placeholder");
  assertEqual(missing.trigger.hidden, true, "missing QR trigger is hidden");
  assertEqual(missing.placeholder.hidden, false, "missing QR exposes placeholder");
  loaded.naturalWidth = 0;
  loaded.handlers.error();
  assertEqual(loaded.trigger.hidden, true, "failed replacement image hides old trigger");
  assertEqual(loaded.placeholder.hidden, false, "failed replacement image restores placeholder");
  missing.naturalWidth = 240;
  missing.handlers.load();
  assertEqual(missing.trigger.hidden, false, "late QR load exposes trigger");
  assertEqual(missing.placeholder.hidden, true, "late QR load removes placeholder");
}());

WScript.Quit(failures === 0 ? 0 : 1);
