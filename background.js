'use strict';

//chrome.webNavigation.onCompleted.addListener(function(){
//    //alert('hello')
//});

chrome.webRequest.onCompleted.addListener(function(req) {
    var re = /type=([^&])/
    var found = req.url.match(re)

    if (req.url.match(/\/imp\?/)) {
        alert("Impression Fired!");
    } else if (req.url.match(/\/eng\?/)) {
        alert("Engagement Fired!");
    } else if (req.url.match(/\/act\?/) && found) {
        alert("Action " + found[1] + " Fired!");
    } else {
        alert("Tracking Fired!\n" + req.url);
    }
}, {urls: [
    "*://tags.rd.linksynergy.com/*",
    "*://tags.mediaforge.com/*",
]}, []);
