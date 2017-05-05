console.log('---- Derelativizator initialized!');
// var path = window.location.pathname;
// console.log('---- Path: ' + path);

chrome.storage.sync.get({
  blacklisted: ""
}, function(items) {
  var blacklisted = items.blacklisted;
  blacklisted = sanitize(blacklisted);
  console.log("---- Loading stored blacklist: '" + blacklisted + "'");

  if (blacklisted.length > 0) {
    message = execute(blacklisted);
  }
  else {
    message = '?';
  }

  chrome.extension.sendMessage(message);
});

function execute(blacklisted) {
  var counter = 0;

  var tweets = document.getElementsByClassName("tweets");
  tweets[0].childNodes.forEach((tweet, index) => {
    var content = tweets[0].childNodes[index].getElementsByClassName("content")
    var content_top = content[0].getElementsByClassName("content_top");
    var nickElm = content_top[0].getElementsByClassName("nick");
    var user = nickElm[0].innerHTML;

    if(blacklisted.includes(user)) {
      console.log("---- Removing blacklisted user: " + user);
      tweet.style.display = "none";
      counter++;
    }
    else {
      console.log("---- User '" + user + "' is not blacklisted.");
    }
  });

  return counter === 0 ? '' : counter.toString();
}

function sanitize(blacklisted) {
  blacklisted = ( typeof blacklisted === 'undefined' || blacklisted.length === 0 ) ? [] : blacklisted.split(',');

  blacklisted.forEach(function(user, index, arr) {
        user = user.trim().toLowerCase();
        if(!user.startsWith('@')) {
            arr[index] = '@' + user;
        }
        else {
            arr[index] = user;
        }
    });

    return Array.from(new Set(blacklisted))
}
