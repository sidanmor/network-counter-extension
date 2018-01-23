var counter,
    wasCleared = false;

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    if (!wasCleared && changeInfo.status == "loading") {
        counter = 0;
        updateIcon(counter);
        wasCleared = true;
    }
    if (changeInfo.status == "complete") {
        wasCleared = false;
    }
});

chrome.webRequest.onBeforeRequest.addListener(function (details) {
        // check request details here...

        counter++;
        updateIcon(counter);
    },
    { urls : [] },
    ['requestBody'] // for post request body...
);

function updateIcon(num) {
    chrome.browserAction.setBadgeBackgroundColor({ color : [0, 0, 0, 0] });
    chrome.browserAction.setBadgeText({ text : num.toString() });
}
