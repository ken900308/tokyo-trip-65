var fso = new ActiveXObject("Scripting.FileSystemObject");
var projectRoot = fso.GetParentFolderName(fso.GetParentFolderName(WScript.ScriptFullName));
var corePath = fso.BuildPath(projectRoot, "assets\\js\\core.js");
var failures = 0;

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

var coreFile = fso.OpenTextFile(corePath, 1, false, 0);
var coreSource = coreFile.ReadAll();
coreFile.Close();
eval(coreSource);

assertEqual(TripCore.normalizeDay("2", 6), 2, "accepts valid day");
assertEqual(TripCore.normalizeDay("9", 6), 1, "defaults invalid day");
assertEqual(TripCore.mapUrl(3), "itinerary-map.html?day=3&embed=1", "builds map deep link");
assertEqual(TripCore.checklistProgress([{id:"a"},{id:"b"}], {a:true}).done, 1, "counts checked items");
assertEqual(TripCore.updateChecklistState({a:true}, "b", true).b, true, "stores toggled item");

WScript.Quit(failures === 0 ? 0 : 1);
