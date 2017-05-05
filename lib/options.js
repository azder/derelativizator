function save_options() {
  var blacklistedVal = document.getElementById("blacklisted").value;

  chrome.storage.sync.set({
    blacklisted: blacklistedVal
  }, function() {
    var status = document.getElementById('status');
    status.textContent = 'Options saved. Refresh time.mk for changes to take effect!';
    setTimeout(function() {
      status.textContent = '';
    }, 5000);
  });
}

function restore_options() {
  chrome.storage.sync.get({
    blacklisted: ""
  }, function(items) {
    document.getElementById("blacklisted").value = items.blacklisted;
  });
}

document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);
