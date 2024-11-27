/* Common code for each page goes here. */

/* API code. Only loaded if authentication isn't required. */
let apikey;
if (typeof authNotRequired === "undefined") {
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

  console.log("Loaded API");
} else {
  console.log("Page has no auth; not loading API");
}

/* Load the navbar. */
var navbarRequest = new XMLHttpRequest();
navbarRequest.open("GET", "/parts/nav.html", true);
navbarRequest.onload = function () {
  if (navbarRequest.status >= 200 && navbarRequest.status < 400) {

    /* Set the navbar element content. */
    document.getElementById("navbar").innerHTML = navbarRequest.responseText;

    /* Now that the navbar is loaded, set up the logout button. */
    var logoutBtn = document.getElementById("logoutLink");
    if (logoutBtn !== null) {
      logoutBtn.onclick = function () {
        localStorage.removeItem("apikey");
        window.location.href = "/index.html";
      }
    } 
    /* If we're not logged in, don't show buttons that require auth. */
    if (localStorage.getItem("apikey") === null){
      document.getElementById("roverLink").style.display = "none";
      document.getElementById("searchLink").style.display = "none";
      document.getElementById("aboutLink").style.display = "none";
      document.getElementById("logoutLink").style.display = "none";
    }


  }
};
navbarRequest.send();

/* todo: implement this on pages beyond rover.html, implement navbar in this script and beyond rover.html; 
         add logic to navbar code that hides logout if not logged in */
/* further todo: implement other common elements, like footer */
