let session = document.getElementById("this-session");
chrome.storage.local.get(["session"], (result) => {
    if(result.session == undefined){
        result.session = 0;
        chrome.storage.local.set({"session":0});
    }
    session.innerHTML = result.session;
});
let allTime = document.getElementById("all-time");
chrome.storage.sync.get(["allTime"], (result) => {
    if(result.allTime == undefined){
        chrome.storage.sync.set({"allTime":0});
        result.allTime = 0;
    }
    allTime.innerHTML = result.allTime;
});

let resetStats = function(){
    chrome.storage.sync.set({"allTime":0}, (results) => {
        chrome.storage.sync.get(["allTime"], (result) => {
            allTime.innerHTML = result.allTime;
        });
    });
    chrome.storage.local.set({"session":0}, () => {
        chrome.storage.local.get(["session"], (result) => {
            session.innerHTML = result.session;
        });
    })
}

document.getElementById("reset").addEventListener("click", resetStats);