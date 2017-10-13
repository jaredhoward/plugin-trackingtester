//alert("woo hoo");

document.addEventListener('DOMContentLoaded', function() {
    var pxls = document.getElementById('ad_pixels');
    var tags = document.getElementById('site_tags');
    var unkwn = document.getElementById('unknown');

    var port = chrome.extension.connect({
        name: "Sample Communication"
    });
    port.postMessage("Hi Background");
    port.onMessage.addListener(function(msg) {
        if (msg) {
            for (var i = 0; i < msg.length; i++) {
                req = msg[i];
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
});

