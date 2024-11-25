function warnInvalid(reason) {
  alert("Bad API key! " + reason);
  localStorage.removeItem("apikey");
  window.location.href = "/";
}

var apikey = localStorage.getItem("apikey");
if (apikey === null) {
  warnInvalid("No API key specified.");
} 
// Test the given API key by attempting to fetch the Astronomy Picture of the Day.
fetch("https://api.nasa.gov/planetary/apod?api_key=" + apikey)
  .then((function (response) {
    return response.json();
  }))
  .then(function (response) {
    console.log(response);
    if (response.hasOwnProperty("error")) {
      // If API response has "error" key.
      warnInvalid('API response: \n"' + response['error']['message'] + '"');
    } else if (response.hasOwnProperty("url")) {
      // If API response contains the expected keys...
      // Store the keys locally
      localStorage.setItem("apod.url", response['url']);
      localStorage.setItem("apod.title", response['title']);
      // Set the background image
      //document.body.style.backgroundImage = "url('" + response['hdurl'] + "')"; 
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
