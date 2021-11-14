let color = '#3aa757';

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ color });
  console.log('Default background color set to %cgreen', `color: ${color}`);
});

// Listen to messages from the payload.js script and write to popout.html
chrome.runtime.onMessage.addListener(function (message) {
  document.getElementById('pagetitle').innerHTML = document.title; // message;

  console.log("the title is");
  console.log(document.title);
});

// Inject the payload.js script into the current tab after the popout has loaded
window.addEventListener('load', function (evt) {
  console.log("background page");
  console.log(chrome.extension.getBackgroundPage());
	chrome.extension.getBackgroundPage().chrome.tabs.executeScript(null, {
		file: 'payload.js'
	});;
});
