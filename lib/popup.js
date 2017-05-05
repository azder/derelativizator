function click(e) {
  if (chrome.runtime.openOptionsPage) {
    // New way to open options pages, if supported (Chrome 42+).
    chrome.runtime.openOptionsPage();
  } else {
    // Reasonable fallback.
    window.open(chrome.runtime.getURL('html/options.html'));
  }
}

document.addEventListener('DOMContentLoaded', function () {
  document.querySelector('#go-to-options').addEventListener('click', click);
});
