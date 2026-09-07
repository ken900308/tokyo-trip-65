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
}());

WScript.Quit(failures === 0 ? 0 : 1);
