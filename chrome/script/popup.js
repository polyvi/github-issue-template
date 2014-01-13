var STORAGE_KEY = 'github-repos';

$(function() {
  // Default the list of repos to the polyvi repos if nothing has been
  // submitted yet
  if (localStorage[STORAGE_KEY] === undefined) {
    localStorage[STORAGE_KEY] = 'polyvi/xface-extra-player\n\
polyvi/xface-extra-native-app\n\
polyvi/xface-js\n\
polyvi/xface-test-template\n\
polyvi/xface-default-app\n\
polyvi/xface-mobile-spec\n\
polyvi/xface-android\n\
polyvi/xface-ios\n\
polyvi/xface-wp8\n\
polyvi/xface-cli\n\
polyvi/xplugin\n\
polyvi/xface-extension-zip\n\
polyvi/xface-extension-calendar\n\
polyvi/xface-extension-telephony\n\
polyvi/xface-extension-messaging\n\
polyvi/xface-extension-advanced-file-transfer\n\
polyvi/xface-extension-xml-http-request\n\
polyvi/xface-extension-ams\n\
polyvi/xface-extension-security\n\
polyvi/xface-extension-xapp\n\
polyvi/xface-extension-idle-watcher\n\
polyvi/xface-extension-trafficstats\n\
polyvi/xface-extension-zbar\n\
polyvi/xface-extension-push\n\
polyvi/xface-extension-device-capability\n\
polyvi/xface-extension-umeng\n\
polyvi/xface-extension-setting\n\
polyvi/xface-extension-uppay\n\
polyvi/xface-extension-bluetooth\n\
polyvi/cordova-plugin-battery-status\n\
polyvi/cordova-plugin-camera\n\
polyvi/cordova-plugin-console\n\
polyvi/cordova-plugin-contacts\n\
polyvi/cordova-plugin-device-motion\n\
polyvi/cordova-plugin-device-orientation\n\
polyvi/cordova-plugin-device\n\
polyvi/cordova-plugin-dialogs\n\
polyvi/cordova-plugin-file-transfer\n\
polyvi/cordova-plugin-file\n\
polyvi/cordova-plugin-geolocation\n\
polyvi/cordova-plugin-globalization\n\
polyvi/cordova-plugin-inappbrowser\n\
polyvi/cordova-plugin-media\n\
polyvi/cordova-plugin-media-capture\n\
polyvi/cordova-plugin-network-information\n\
polyvi/cordova-plugin-splashscreen\n\
polyvi/cordova-plugin-vibration\n\
polyvi/cordova-plugins';
  }
  // Create a list of clickable repos, loaded from local storage (saved from
  // the options page)
  var githubRepos = $.trim(localStorage[STORAGE_KEY]).split("\n");
  for (var i = 0, path, user, repo, href; i < githubRepos.length; i++) {
    path = githubRepos[i].split('/');
    user = path[0];
    repo = path[1];
    href = 'https://github.com/' + path[0] + '/' + path[1] + '/issues/new';
    $('#repos').append('<li>' +
      '<a href="' + href + '">' + user + '/<strong>' + repo + '</strong></a>' +
    '</li>');
  }
  // Catch click events on the repo links and communicate with the chrome tabs
  // in order to load the corresponding repo location
  $('#repos a').click(function(e) {
    e.preventDefault();
    var repoLocation = $(e.currentTarget).attr('href');
    // Attempt to fetch the instance of the currently-open tab
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      // Redirect the current tab if one is found, otherwise create a new one
      if (tabs.length) {
        chrome.tabs.update(tabs[0].id, {url: repoLocation});
      } else {
        chrome.tabs.create({url: repoLocation});
      }
    });
  });
});
