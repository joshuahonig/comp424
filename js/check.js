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
// Test the given API key by attempting to fetch the Astronomy Picture of the Day.
var test = "";
fetch("https://api.nasa.gov/planetary/apod?api_key=" + apikey)
  .then((function (response) {
    return response.json();
  }))
  .then(function (response) {
    console.log(response);
    if (response.hasOwnProperty("error")){
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
    } else {
        warnInvalid("API returned unexpected response.")
    }
  })
  .catch(function (err) {
    warnInvalid("Error connecting to the NASA API: " + err);
  });
