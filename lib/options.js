'use strict'; // ALWAYS

document
    .addEventListener(
        'DOMContentLoaded',
        () => chrome.storage.sync.get(
            {
                blacklisted: ""
            },
            items => document.querySelector('#blacklisted').value = items.blacklisted
        )
    );

document
    .querySelector('#save')
    .addEventListener(
        'click',
        () => chrome.storage.sync.set(
            {
                blacklisted: document.querySelector('#blacklisted').value
            },
            () => {
                const status = document.querySelector('#status');
                status.textContent = 'Options saved. Refresh time.mk for changes to take effect!';
                setTimeout(() => status.textContent = '', 5000);
            }
        )
    );
