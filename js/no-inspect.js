// Cosmetic deterrent only — NOT real security. Trivially bypassed
// (view-source:, curl, disabling JS, or devtools opened before this script loads).
document.addEventListener('contextmenu', function (e) {
  e.preventDefault();
});

document.addEventListener('keydown', function (e) {
  var key = e.key ? e.key.toUpperCase() : '';
  var blockCombo =
    key === 'F12' ||
    (e.ctrlKey && e.shiftKey && (key === 'I' || key === 'J' || key === 'C')) ||
    (e.ctrlKey && key === 'U');
  if (blockCombo) {
    e.preventDefault();
  }
});
