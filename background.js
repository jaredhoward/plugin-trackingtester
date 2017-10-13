'use strict';

var ad_pixels = [],
    visits = [],
    unknown_requests = [],
    requests = [];


//chrome.webNavigation.onCompleted.addListener(function(){
//    //alert('hello')
//});

chrome.webRequest.onCompleted.addListener(function(req) {
    var re = /type=([^&])/
    var found = req.url.match(re)

    var txt, req_type;
    if (req.url.match(/\/imp\?/)) {
        txt = "Impression Fired!";
        req_type = "pixel";
    } else if (req.url.match(/\/eng\?/)) {
        txt = "Engagement Fired!";
        req_type = "pixel";
    } else if (req.url.match(/\/act\?/) && found) {
        txt = "Action " + found[1] + " Fired!";
        req_type = "pixel";
    } else if (req.url.match(/\/js\/[0-9]+\/?\?/)) {
        txt = "Site Tracking Fired!";
        req_type = "visit";
    } else {
        txt = "Unknown Tracking Fired!\n" + req.url;
    }

    requests.push({reqtype: req_type, url: req.url, text: txt});

    switch(req_type) {
        case "pixel":
            ad_pixels.push(req.url);
            break;
        case "visit":
            visits.push(req.url);
            break;
        default:
            unknown_requests.push(req.url);
    }
}, {urls: [
    "*://tags.rd.linksynergy.com/*",
    "*://tags.mediaforge.com/*",
]}, []);

chrome.extension.onConnect.addListener(function(port) {
    port.onMessage.addListener(function(msg) {
        port.postMessage(requests);
    });
})
