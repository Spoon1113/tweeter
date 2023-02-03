/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function () {

  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  const renderTweets = function (tweets) {
    // Emptys previous tweets so there are no duplicates
    $(`#tweets-container`).empty();
    for (let tweet of tweets) {
      let $tweet = createTweetElement(tweet);
      $('#tweets-container').prepend($tweet);
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
     <p class="content"><strong>${escape(tweet.content.text)}</strong></p>
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
    const input = $("textarea").val();

    if (input === "" || input === null) {
      $("#display-error").html("<span>&#9888;</span> You can't leave this field blank! <span>&#9888;</span>");
      $("#display-error").slideDown();
    } else if (input.length > 140) {
      $("#display-error").html("You have exceeded the maximum amount of characters");
      $("#display-error").slideDown();
    } else {
      $("#display-error").slideUp()
      $.ajax({
        method: "POST",
        url: "/tweets/",
        data: string,
      })
        .then(function (res) {
          loadTweets()
        });
    }
  });

  const loadTweets = function () {
    $.ajax("/tweets/", { method: "GET" })
      .then(function (res) {
        renderTweets(res);
      });
  }
  loadTweets()
});