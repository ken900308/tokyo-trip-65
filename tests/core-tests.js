var fso = new ActiveXObject("Scripting.FileSystemObject");
var projectRoot = fso.GetParentFolderName(fso.GetParentFolderName(WScript.ScriptFullName));
var corePath = fso.BuildPath(projectRoot, "assets\\js\\core.js");
var itineraryPath = fso.BuildPath(projectRoot, "data\\itinerary.js");
var ticketsPath = fso.BuildPath(projectRoot, "data\\tickets.js");
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

assertEqual(TripCore.normalizeDay("2", 6), 2, "accepts valid day");
assertEqual(TripCore.normalizeDay("9", 6), 1, "defaults invalid day");
assertEqual(TripCore.mapUrl(3), "itinerary-map.html?day=3&embed=1", "builds map deep link");
assertEqual(TripCore.checklistProgress([{id:"a"},{id:"b"}], {a:true}).done, 1, "counts checked items");
assertEqual(TripCore.updateChecklistState({a:true}, "b", true).b, true, "stores toggled item");
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

WScript.Quit(failures === 0 ? 0 : 1);
