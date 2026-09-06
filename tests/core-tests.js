var fso = new ActiveXObject("Scripting.FileSystemObject");
var projectRoot = fso.GetParentFolderName(fso.GetParentFolderName(WScript.ScriptFullName));
var corePath = fso.BuildPath(projectRoot, "assets\\js\\core.js");
var itineraryPath = fso.BuildPath(projectRoot, "data\\itinerary.js");
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

WScript.Quit(failures === 0 ? 0 : 1);
