$(document).ready(function () {
  $("#tweet-text").on("input", function () {
    let $input = $(this).val().length;
    let charCount = 140 - $input;
    let $counter = $(this).parent().find(".counter");
    $counter.html(charCount);

    if (charCount < 0) {
      $counter.addClass("redChar");
    } else {
      $counter.removeClass("redChar");
    }
  });
});