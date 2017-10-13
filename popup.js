//alert("woo hoo");

document.addEventListener('DOMContentLoaded', function() {
    var pxls = document.getElementById('ad_pixels');
    var tags = document.getElementById('site_tags');
    var unkwn = document.getElementById('unknown');

    var bg = chrome.extension.getBackgroundPage();
    if (bg && bg.requests) {
        for (var i = 0; i < bg.requests.length; i++) {
            req = bg.requests[i];
            var div = document.createElement("div");
            div.innerHTML = req.url;

            if (req.reqtype === "pixel") {
                pxls.appendChild(div);
            } else if (req.reqtype === "visit") {
                tags.appendChild(div);
            } else {
                unkwn.appendChild(div);
            }
        }
    }
});

