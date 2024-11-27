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
    if (localStorage.getItem("apikey") === null) {
      document.getElementById("roverLink").style.display = "none";
      document.getElementById("searchLink").style.display = "none";
      document.getElementById("aboutLink").style.display = "none";
      document.getElementById("logoutLink").style.display = "none";
      document.getElementById("darkModeToggle").style.display = "none";
    }

    DarkModeToggleSetUp();

    /* Set the page title. */
    if (document.querySelector('meta[name="page-title"]') !== null) {
      document.getElementById("pageTitle").innerHTML = document.querySelector('meta[name="page-title"]').content;
    }
  }
};
navbarRequest.send();

/* Load the footer. */
var footerRequest = new XMLHttpRequest();
footerRequest.open("GET", "/parts/footer.html", true);
footerRequest.onload = function () {
  if (footerRequest.status >= 200 && footerRequest.status < 400) {
    /* Set the footer element content. */
    document.getElementById("footer").innerHTML = footerRequest.responseText;
    document.getElementById("year").textContent = new Date().getFullYear();
  }
};
footerRequest.send();


function DarkModeToggleSetUp() {
  const darkModeToggle = document.getElementById('darkModeToggle');

  if (darkModeToggle) {
    darkModeToggle.addEventListener('click', () => {
      // Toggle the 'dark-mode' class on the body
      document.body.classList.toggle('dark-mode');

      const isDarkMode = document.body.classList.contains('dark-mode');

      // Update button text
      darkModeToggle.textContent = isDarkMode ? 'Light Mode' : 'Dark Mode';

      // Save the user's preference in localStorage
      localStorage.setItem('darkMode', isDarkMode);
    });

    // Apply user's preference on page load
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    if (isDarkMode) {
      document.body.classList.add('dark-mode');
      darkModeToggle.textContent = 'Light Mode';
    } else {
      darkModeToggle.textContent = 'Dark Mode';
    }
  } else {
    console.warn("Dark mode toggle button not found on this page.");
  }
};

