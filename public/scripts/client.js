/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function () {

  const data = [
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png"
        ,
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd" },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    }
  ]
  const renderTweets = function (tweets) {
    for (let tweet of tweets) {
      let $tweet = createTweetElement(tweet);
      $('#tweets-container').append($tweet);
    }
  };
  const createTweetElement = function (tweet) {
    let $tweet = $(`
  <article class="tweet">
    <header>
      <div class="tweetheader">
      <img src= ${tweet.user.avatars} />
        <h2>${tweet.user.name}</h2> 
    </div>
    <h2>${tweet.user.handle}</h2>
    </header> 
     <p class="content"><strong>${tweet.content.text}</strong></p>
    <footer>
      <p>${timeago.format(tweet.created_at)}</p>
      <div id="icons">
        <i class="fa-solid fa-flag"></i>
        <i class="fa-sharp fa-solid fa-retweet"></i>
        <i class="fa-solid fa-heart"></i>
    </div>
    </footer>
  </article>`);
    return $tweet;
  };

  
  $('#tweet-box').submit(function (event) {
    event.preventDefault();
    const string = $(this).serialize();
    const input = $("textarea").val()

    if (input === "" || input === null) {
      alert("You must enter something in here")
    } else if (input.length > 140) {
      alert("You have exceeded the maximum amount of characters")
    } else {
      $.post('/tweets/', string)
    } 
  });

  const loadTweets = function () {
    $.ajax("/tweets/", { method: "GET" })
      .then(function (res) {
        renderTweets(res)
      });
  }
  loadTweets(); 
});