
let sucessStatus = 200;
let secondsLimit = 32;
let queriesLimit = 16;

chrome.runtime.onInstalled.addListener(function() {
    chrome.storage.sync.set({success_code: 200, seconds_limit: 10, queries_limit: 7, colorStatus: "#00FF00", request_count: 0});
});

chrome.storage.sync.get(["success_code", "seconds_limit", "queries_limit"]).then((result) => {
    sucessStatus = result.success_code;
    secondsLimit = result.seconds_limit;
    queriesLimit = result.queries_limit;
});

chrome.webRequest.onCompleted.addListener(function(details){
    if(details.statusCode == sucessStatus) {

        chrome.storage.sync.get(["request_count"]).then((result) => {
            let requestCount = result.request_count + 1;

            if(requestCount > queriesLimit){
                requestCount = queriesLimit;
            } else {
                chrome.storage.sync.set({ request_count: requestCount });
            }

            if(requestCount == 1) {
                let ct = getCurrentSeconds();
                chrome.storage.sync.set({ fistRequestTimestamp: ct });
            } else {
                (async () => {
                    let currentSeconds = getCurrentSeconds();
                    let result = await chrome.storage.sync.get(["fistRequestTimestamp"]);
                    let startRequestSeconds = result.fistRequestTimestamp;
                    
                    if(currentSeconds - startRequestSeconds <= secondsLimit) {
                        let redFactor = Math.floor(255*requestCount/queriesLimit);
                        let greenFactor = 255 - redFactor;
                        chrome.storage.sync.set({ colorStatus: "#"+(redFactor<10?0:"")+redFactor.toString(16)+(greenFactor<10?0:"")+greenFactor.toString(16)+"00" });
                    } else {
                        await chrome.storage.sync.set({ request_count: 0, colorStatus: "#00FF00" });
                    }
                })()
            }
        });
    }
}, {
    urls: ["http://springbookshop.site/search/me"]
});

function getCurrentSeconds() {
    return Math.floor(Date.now()/1000);
}

async function getFromLocalSync(name) {
    let result = await chrome.storage.sync.get([name]);
    console.log("result");
    console.log(result[name]);
    return result[name];
}