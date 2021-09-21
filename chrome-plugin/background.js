function openAWSL(tab) {
    var url = chrome.runtime.getURL("dist/index.html");
    chrome.tabs.create({
        "url": url,
        "active": true
    });

}

chrome.action.onClicked.addListener(tab => { openAWSL(tab); });
