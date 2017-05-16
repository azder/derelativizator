'use strict'; // ALWAYS

chrome.extension.onMessage.addListener(
    (message, sender) => chrome.browserAction.setBadgeText({text: message, tabId: sender.tab.id})
);
