/* Some code to be used on many pages, which handles some basic API stuff. */

function warnInvalid(reason) {
  alert("Bad API key! " + reason);
  localStorage.removeItem("apikey");
  window.location.href = "/";
}

// Search document.cookie for the API key.
let apikey = localStorage.getItem("apikey");
if (apikey === null) {
  warnInvalid("No API key specified.");
}