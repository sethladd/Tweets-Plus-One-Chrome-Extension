/*
 * Copyright 2011 Seth Ladd
 * 
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * 
 *     http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
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
    plusOneDest.insertBefore(plusone, plusOneDest.firstChild);
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

var plusOneStyles = document.createElement('link');
plusOneStyles.setAttribute('href', chrome.extension.getURL('styles.css'));
plusOneStyles.setAttribute('rel', 'stylesheet');
plusOneStyles.setAttribute('type', 'text/css');
document.head.appendChild(plusOneStyles);

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