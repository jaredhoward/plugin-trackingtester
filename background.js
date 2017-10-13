'use strict';

var requests = [];
var current = "rakuten1";

//chrome.webNavigation.onCompleted.addListener(function(){
//    //alert('hello')
//});

chrome.webRequest.onCompleted.addListener(function(req) {
    var re = /type=([^&])/
    var found = req.url.match(re)

    current = "150320_rakuten";
    updateIcon();

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

}, {urls: [
    "*://tags.rd.linksynergy.com/*",
    "*://tags.mediaforge.com/*",
]}, []);

function updateIcon() {
    chrome.browserAction.setIcon({path: current + ".png"});
}