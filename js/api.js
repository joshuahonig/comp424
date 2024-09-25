/* Some code to be used on many pages, which handles some basic API stuff. */

function warnInvalid(reason) {
    alert("Bad API key! " + reason);
    document.cookie = "apikey=; expires="+ new Date(0).toUTCString(); // force apikey cookie to expire
    window.location.href = "/";
  }
  
  // Search document.cookie for the API key.
  var match = document.cookie.match(new RegExp("(^| )apikey=([^;]+)"));
  let apikey;
  if (match) {
    apikey = match[2];
  } else {
    warnInvalid("No API key specified.");
  }