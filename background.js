chrome.webRequest.onCompleted.addListener(function(details){
    if(details.statusCode == 200) {
        
    }
}, {
    urls: ["http://springbookshop.site/search/*"]
}, ["responseHeaders"]);