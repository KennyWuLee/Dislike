var accs, iframe, url;
url = window.location.href;
iframe = document.createElement('iframe');
iframe.src = "https://www.youtube.com/channel_switcher";
document.querySelector(".like-button-renderer-dislike-button").click();
iframe.onload = function() {
  accs = iframe.contentDocument.getElementById("ytcc-existing-channels").querySelectorAll(".yt-uix-sessionlink");
  while(document.body.firstChild)
    document.body.removeChild(document.body.firstChild);
  (function dislikeLoop(i) {
    iframe = document.createElement('iframe');
    iframe.src = accs[i].href.replace(/next=.../, "next=" + encodeURIComponent(/.*(watch.*)/.exec(url)[1]));
    iframe.setAttribute("style", "width: 100%; height: 100%");
    iframe.onload = function() {
      setTimeout(function() {
        iframe.contentDocument.querySelector(".like-button-renderer-dislike-button").click();
        setTimeout(function() {
          if (i > 2) {
            while(document.body.firstChild)
              document.body.removeChild(document.body.firstChild);
            dislikeLoop(i - 1);
          }
          else {
            window.location.href = accs[1].href.replace(/next=.../, "next=" + encodeURIComponent(/.*(watch.*)/.exec(url)[1]));
          }
        }, 2000);
      }, 2000);
    };
    document.body.appendChild(iframe);
  })(accs.length -  1);
}
document.body.appendChild(iframe);
