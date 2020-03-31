var port = chrome.runtime.connect();

var hotWords = ["covid-19", "covid", "covid-a","corona virus", "coronavirus", "korona","korone", "koronavirus", "koronavirusa","pandemic", "pandemija", "epidemija", "epidemije", "epidemiološka","karantin", "karantinu","samoizolacija", "samoizolaciju", "izolacija", "izolaciju","quarantine", "self-isolation", "self isolation", "wuhan virus", "vuhan virus", "zariste", "žarište","zarista", "zaristem", "žarišta","žarištem","masovno testiranje", "epicentar", "virus", "virusa", "virusi","oboljevaju","oboljevanje","2019-ncov", "epidemioloski", "epidemiološki", "epidemiolog", "epidemiolozi", "vanredna", "vanredno", "vanredni", "vanredne", "varedne","varedna","varedno","varedni","zaraza","zarazeni","zarazenih","zaraženih","zaraženi","policijski cas","policijski čas", "sirenje epidemije", "sirenje pandemije", "širenje epidemije", "širenje pandemije","корона","короне", "коронавирус","коронавируса", "пандемија", "епидемија", "епидемије", "карантин", "карантину","самоизолација", "изолација","вирус", "вируса", "вируси","вирусу","обољевају","обољевање","епидемиолошки", "епидемиолог", "епидемиолози", "ванредна", "ванредно", "ванредни", "ванредне", "варедне","варедна","варедно","варедни","зараза","заражених","заражени","полицијски час","ширење епидемије", "ширење пандемије"];

let detectFacebook = function (){
    let elements = document.getElementsByClassName("_5jmm");
    for(let i = 0; i < elements.length; i++){

        let text = elements[i].textContent;
        if(text != undefined && text != null && text.length > 0){
            text = text.toLowerCase();
            for(let p = 0; p < hotWords.length; p++){
                if(text.includes(hotWords[p])){
                    elements[i].remove();
                    chrome.runtime.sendMessage({"type":"update"});
                    break;
                }
            }
        }
    }
}
let detectReddit = function(){
    let elements = document.getElementsByClassName("Post");

    for(let i = 0; i < elements.length; i++){
        let text = elements[i].textContent;
        if(text != undefined && text != null && text.length > 0){
            text = text.toLowerCase();
            for(let p = 0; p < hotWords.length; p++){
                if(text.includes(hotWords[p])){
                    elements[i].parentElement.parentElement.remove();
                    chrome.runtime.sendMessage({"type":"update"});
                    break;
                }
            }
        }
    }
}
let detectTwitter = function(){
    let elements = document.getElementsByTagName("article");

    for(let i = 0; i < elements.length; i++){
        let text = elements[i].textContent;
        if(text != undefined && text != null && text.length > 0){
            text = text.toLowerCase();
            for(let p = 0; p < hotWords.length; p++){
                if(text.includes(hotWords[p])){
                    elements[i].remove();
                    chrome.runtime.sendMessage({"type":"update"});
                    break;
                }
            }
        }
    }
}

let observer;
if(window.location.hostname == "www.facebook.com"){
observer = new MutationObserver(detectFacebook);
observer.observe(document, {childList:true, subtree:true});
} else if(window.location.hostname == "www.reddit.com"){
observer = new MutationObserver(detectReddit);
observer.observe(document, {childList:true, subtree:true});
} else if(window.location.hostname == "twitter.com"){
observer = new MutationObserver(detectTwitter);
observer.observe(document, {childList:true, subtree:true});
}

chrome.storage.local.set({"session":0});