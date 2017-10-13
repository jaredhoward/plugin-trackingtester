'use strict';

chrome.webNavigation.onCompleted.addListener(function(){
    //alert('hello')
});

var callback = function(details) {
    alert(details.url);
};
var filter = {urls: ["<all_urls>"]};
var opt_extraInfoSpec = [];

chrome.webRequest.onBeforeRequest.addListener(
    callback, filter, opt_extraInfoSpec);
