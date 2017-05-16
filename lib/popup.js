'use strict'; // ALWAYS

document.addEventListener(
    'DOMContentLoaded',
    () => document
        .querySelector('#go-to-options')
        .addEventListener(
            'click',
            e => chrome.runtime.openOptionsPage
                ? chrome.runtime.openOptionsPage() // New way to open options pages, if supported (Chrome 42+)
                : window.open(chrome.runtime.getURL('html/options.html')) // Reasonable fallback
        )
);
