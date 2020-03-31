chrome.storage.local.set({"session":0});
chrome.runtime.onInstalled.addListener(function() {
    chrome.browserAction.setBadgeBackgroundColor({"color":"#f00"});
});
chrome.runtime.onMessage.addListener(function(message, callback) {
    if(message.type == "update"){
        chrome.browserAction.getBadgeText({}, function(b){
            if(b != undefined && b != null && b != ""){
                let i = parseInt(b)+1;
                chrome.browserAction.setBadgeText({"text":i.toString()});

                chrome.storage.local.get(["session"], (result) => {
                    chrome.storage.local.set({"session":result.session+1});
                });
                chrome.storage.sync.get(["allTime"], (result) => {
                    chrome.storage.sync.set({"allTime":result.allTime+1});
                });
            } else chrome.browserAction.setBadgeText({"text":"1"});
        });
    }
});
chrome.browserAction.onClicked.addListener(() => {
    chrome.browserAction.setBadgeText({"text":""});
});