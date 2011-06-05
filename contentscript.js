/*
 * Copyright (c) 2010 The Chromium Authors. All rights reserved.  Use of this
 * source code is governed by a BSD-style license that can be found in the
 * LICENSE file.
 */
var addPlusOne = function(tweet) {
    if (tweet.querySelector('span.plusone')) {
        return;
    }
    var hrefSource = tweet.querySelector('a.tweet-timestamp');
    var href = 'http://twitter.com' + hrefSource.getAttribute('href').substring(3);
    var plusone = document.createElement('span');
    plusone.classList.add('plusone');
    
    // I want to do this, but size and href aren't respected
    //plusone.innerHTML = '<div class="g-plusone" data-size="small" data-count="true" style="display:inline" data-href="' + href + '"></div>';
    plusone.innerHTML = '<g:plusone size="small" count="true" href="' + href + '"></g:plusone>';
    
    var plusOneDest = tweet.querySelector('div.extra-icons');
    plusOneDest.appendChild(plusone);
}

var findTweets = function(event) {
    var node = event.target;
    if (node.webkitMatchesSelector && node.webkitMatchesSelector('div[data-item-type=tweet]')) {
        addPlusOne(node);
    } else if (node.querySelectorAll) {
        var tweets = node.querySelectorAll('div[data-item-type=tweet]');
        for (var i = 0; i < tweets.length; i++) {
            addPlusOne(tweets[i]);
        }
    }
}

var plusOneScript = document.createElement('script');
plusOneScript.setAttribute("src", "https://apis.google.com/js/plusone.js");
plusOneScript.textContent = '{"parsetags": "explicit"}';
plusOneScript.addEventListener("load", function() {
    var script = document.createElement("script");
    script.textContent = "var addPlusOne = function(){gapi.plusone.go();setTimeout(addPlusOne, 1000);};setTimeout(addPlusOne, 1000);";
    document.body.appendChild(script);
}, false);
document.body.appendChild(plusOneScript);
document.body.addEventListener("DOMNodeInserted", findTweets, false);