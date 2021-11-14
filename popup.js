grabArticles.addEventListener("click", async () => {

  // Get and store top Google results
  chrome.tabs.query({
    active: true,
    lastFocusedWindow: true
  }, function(tabs) {
    // and use that tab to fill in out title and url
    var tab = tabs[0];
        searchText = tab.title
});

  searchText = document.getElementById('pagetitle').innerHTML;

  var xhr = new XMLHttpRequest();
  xhr.responseType = 'json';

  googleApiSite = "https://www.googleapis.com/customsearch/v1?"; // key=AIzaSyAheTbz4RTf_KK5ekmeW3wFJxxw5zxZEv8&cx=9e9a4964017775fe7&q=";
  googleApiKey = "AIzaSyD0YhIogKG7NG3NSpMRhFxdDV0PmMUK7FM"; //"AIzaSyAheTbz4RTf_KK5ekmeW3wFJxxw5zxZEv8";
  googleApiCx = "710f599698064056b"; // "9e9a4964017775fe7";
  numResults = "&start=0&num=10";

  var url = new URL(googleApiSite + "key=" + googleApiKey + "&cx=" + googleApiCx + "&q=" + searchText + numResults);
  var results = "";
  var sitesArray = [];
  var allSiteHtml = "Related content: <br>";
  xhr.open('GET', url);
  xhr.onreadystatechange = function (data) {

    if (xhr.response != null) {
      results = xhr.response['items'];
      // console.log(results);

      // store each link result in the sites array
      for (let index = 0; index < results.length; index++) {
        sitesArray[index] = results[index];
        // console.log(index);
        // console.log(results[index]);
      }

      // display results of sites array content
      for (let index = 0; index < sitesArray.length; index++) {
        let site = sitesArray[index];

        // console.log(site['link']);
        // console.log(site['title']);

        allSiteHtml = allSiteHtml + '<a href="'; // add start of link to html
        allSiteHtml = allSiteHtml + site["link"] + '"'; // add link and closing quotes
        allSiteHtml = allSiteHtml +  'target="_blank">'; // makes it open in new tab?
        allSiteHtml = allSiteHtml + site['title'] + "</a><br>"; // add the title of the article
      }

      // console.log(allSiteHtml);

      document.getElementById('pagecontent').innerHTML = allSiteHtml;

    }
  }

  xhr.send();

  });


// Inject the payload.js script into the current tab after the popout has loaded
window.addEventListener('load', function (evt) {
	chrome.extension.getBackgroundPage().chrome.tabs.executeScript(null, {
		file: 'payload.js'
	});;
});

// Listen to messages from the payload.js script and write to popout.html
chrome.runtime.onMessage.addListener(function (message) {
	document.getElementById('pagetitle').innerHTML = message;
});