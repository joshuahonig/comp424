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

  var logoutBtn = document.getElementById("logoutLink");
  if (logoutBtn !== null) {
    logoutBtn.onclick = function () {
      localStorage.removeItem("apikey");
      window.location.href = "/index.html";
    };
  }
  console.log("Loaded API");
} else {
  console.log("Page has no auth; not loading API");
}

/* todo: implement this on pages beyond rover.html, implement navbar in this script and beyond rover.html; 
         add logic to navbar code that hides logout if not logged in */
/* further todo: implement other common elements, like footer */
