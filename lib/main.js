var urls = require("sdk/url");
var widgets = require("sdk/widget");
var tabs = require("sdk/tabs");
var prefs = require('sdk/simple-prefs').prefs;
var data = require("sdk/self").data;
var pageMod = require("sdk/page-mod");

// Add button if enabled
if (prefs['addInlineButton']) {
  pageMod.PageMod({
    include: ["http://www.rdio.com/*", "https://www.rdio.com/*"],
    contentStyleFile: data.url("openRdio.css"),
    contentScriptFile: data.url("openRdio.js")
  })
}

function openRdio(tab, fromIcon) {
  var url = urls.URL(tab.url.toString())

  // if this is called from the ready event, check if we can auto open it
  if (!fromIcon && !prefs['autoOpen']) {
    return
  }

  if (url.host.match('www\.rdio\.com')) {
    tab.url = url.toString().replace(url.scheme, 'rdio');

    // Close the tab if configured
    if (prefs['closeTab']) {
      tab.close()
    }
  } else {
    console.error('Not on www.rdio.com!')
    return
  }
}

if (prefs['addBarButton']) {
  // The small icon in the status bar, which is also able to open the current URL
  var widget = widgets.Widget({
    id: "rdio-link",
    label: "Open in Rdio app",
    contentURL: "http://www.rdio.com/favicon.ico",
    onClick: function() {openRdio(tabs.activeTab, true)}
  });
};

// Hook into the ready event of the tab
tabs.on("ready", openRdio);
