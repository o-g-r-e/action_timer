chrome.webRequest.onCompleted.addListener(function(details){
    if(details.statusCode == 200) {

        chrome.storage.sync.get(["n"]).then((result) => {
            let n = (result.n == undefined || isNaN(result.n)) ? 1 : result.n + 1;
            
            
            if(n == 1) {
                chrome.storage.sync.set({ fistReqTime: Date.now() });
            }

            chrome.storage.sync.set({ n: n });
        });

        
    }
}, {
    urls: ["http://springbookshop.site/search/me"]
});