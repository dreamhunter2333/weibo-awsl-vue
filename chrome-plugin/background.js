function openAWSL() {
    var url = chrome.extension.getURL("dist/index.html");
    chrome.tabs.create({ "url": url, "selected": true });
}

chrome.browserAction.onClicked.addListener(function (tab) {
    openAWSL();
});
