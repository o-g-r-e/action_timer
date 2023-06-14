
async function getFromLocal(name) {
    return await chrome.storage.sync.get([name]);
}

chrome.storage.sync.get(["success_code", "seconds_limit", "queries_limit", "colorStatus"]).then((result) => {
    document.getElementById("successCodeInput").value = result.success_code;
    document.getElementById("secondsLimitInput").value = result.seconds_limit;
    document.getElementById("queriesLimitInput").value = result.queries_limit;
    document.getElementById("colorOfLimit").style = "background-color: "+result.colorStatus;
});

/*chrome.storage.sync.get(["n"]).then((result) => {
    let c = (result.n == undefined || isNaN(result.n)) ? 0 : result.n;
    document.getElementById("maxReq").setAttribute("value", Date.getMilliseconds());
});*/

/*setInterval( function() {

}, 500);*/

document.getElementById("successCodeInput").addEventListener("input", function(e) {
    chrome.storage.sync.set({ success_code: e.target.value });
})

