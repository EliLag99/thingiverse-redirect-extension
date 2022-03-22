function shouldConsiderUrl(url) {
   const regex = /^.*:\/\/.*thingiverse\.com\/thing:\d*\/files$/;
   return regex.test(url);
}

function adjustUrl(url){
   return url.replace("files", "zip")
}

function injectUrl(url) {
   chrome.tabs.query({currentWindow: true, active: true}, function (tab) {
      chrome.tabs.update(tab.id, {url: url});
   });
}

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {

    if (changeInfo.url && shouldConsiderUrl(changeInfo.url)) 
    {
	let newUrl = adjustUrl(changeInfo.url);

	injectUrl(newUrl);
    }
});