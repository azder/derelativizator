'use strict'; //ALWAYS


const oneOf = (
    (selector, node) => node.querySelector(selector) || {}
);

const allOf = (
    (selector, node) => Array.from(node.querySelectorAll(selector))
);

const blacklist2array = (
    list => list && list.length ? list.split(',') : []
);

const counter2string = (
    counter => 0 === counter ? '' : `${counter}`
);

const sanitize = (

    blacklisted =>
        Array.from(
            new Set(
                blacklist2array(blacklisted)
                    .map(user => user.trim().toLowerCase())
                    .map(user => user.startsWith('@') ? user : `@${user}`)
            )
        )

);

const hide = (

    (test, tweet) => {
        if (!test) {
            return 0;
        }
        tweet.style.display = 'none';
        return 1;
    }

);

const log = (
    (test, success, fail) => {
        console.log('[DRZ]', test ? success : fail);
        return test;
    }
);

const execute = (

    blacklisted => blacklisted.length
        ? counter2string(
            allOf('.tweets .tweet', document)
                .map(
                    tweet => [
                        tweet,
                        oneOf('.content > .content_top > .nick', tweet).innerHTML
                    ]
                )
                .reduce(
                    (counter, [tweet, user]) => counter + log(
                        hide(blacklisted.includes(user), tweet),
                        `removing blacklisted user: ${user}`,
                        `user '${user}' is not blacklisted.`
                    ),
                    0
                )
        )
        : '?'

);


log(true, 'Derelativizator initialized!');

chrome.storage.sync.get({blacklisted: ''}, items =>

    chrome.extension.sendMessage(execute(log(
        sanitize(items.blacklisted),
        `loading stored blacklist: '${items.blacklisted}'`
    )))
);
