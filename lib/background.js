chrome.extension.onMessage.addListener(function(message, sender) {
  chrome.browserAction.setBadgeText({
    text: message,
    tabId: sender.tab.id
  });
});
