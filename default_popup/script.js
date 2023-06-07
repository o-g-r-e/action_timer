async function getFromLocal(name) {
    return await chrome.storage.sync.get([name]);
}

chrome.storage.sync.get(["n"]).then((result) => {
    let c = (result.n == undefined || isNaN(result.n)) ? 0 : result.n;
    document.getElementById("maxReq").setAttribute("value", Date.getMilliseconds());
});

setInterval( function() {

}, 500);