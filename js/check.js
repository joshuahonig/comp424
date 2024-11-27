// This script will be loaded after the common API script, so things like apikey and warnInvalid will already be defined.
if (localStorage.getItem("apikey") === null) {
  warnInvalid("No API key specified.");
} 
// Test the given API key by attempting to fetch the Astronomy Picture of the Day.
fetch("https://api.nasa.gov/planetary/apod?api_key=" + localStorage.getItem("apikey"))
  .then((function (response) {
    return response.json();
  }))
  .then(function (response) {
    if (response.hasOwnProperty("error")) {
      // If API response has "error" key.
      warnInvalid('API response: \n"' + response['error']['message'] + '"');
    } else if (response.hasOwnProperty("url")) {
      // If API response contains the expected keys...
      // Store the keys locally
      localStorage.setItem("apod.url", response['url']);
      localStorage.setItem("apod.title", response['title']);
      // Show success text
      document.getElementById("textWait").style.display = "none";
      document.getElementById("textSuccess").style.display = "block";
      window.location.href = "/rover.html";
    } else {
      warnInvalid("API returned unexpected response.")
    }
  })
  .catch(function (err) {
    warnInvalid("Error connecting to the NASA API: " + err);
  });
