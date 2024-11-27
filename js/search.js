const availableCams = {
  spirit: ["FHAZ", "RHAZ", "NAVCAM", "PANCAM", "MINITES"],
  opportunity: ["FHAZ", "RHAZ", "NAVCAM", "PANCAM", "MINITES"],
  curiosity: ["FHAZ", "RHAZ", "MAST", "CHEMCAM", "MAHLI", "MARDI", "NAVCAM"],
  perseverance: [
    "EDL_RUCAM",
    "EDL_RDCAM",
    "EDL_DDCAM",
    "EDL_PUCAM1",
    "EDL_PUCAM2",
    "NAVCAM_LEFT",
    "NAVCAM_RIGHT",
    "MCZ_RIGHT",
    "MCZ_LEFT",
    "FRONT_HAZCAM_LEFT_A",
    "FRONT_HAZCAM_RIGHT_A",
    "REAR_HAZCAM_LEFT",
    "REAR_HAZCAM_RIGHT",
    "SKYCAM",
    "SHERLOC_WATSON",
  ],
};

// Handle date range clicks on the caption of the date range caption hint. 
function dateRangeClick(option) {
  if (option == 'oldest') {
    document.getElementById("searchDate").value = document.getElementById("searchDate").min;
  } else {
    document.getElementById("searchDate").value = document.getElementById("searchDate").max;
  }
}

// Handle clicks on the forwards and backwards buttons on the date picker.
function dateButtonClick(option) {
  // Handle actually changing the date
  /* date input values are always yyyy-mm-dd; this isn't locale dependent, so this parsing is safe, if a bit silly */
  var curDateValue = document.getElementById("searchDate").value.split("-");
  var curDate = new Date(curDateValue[0], curDateValue[1] - 1, curDateValue[2]);
  var distance = (option == "l") ? -1 : 1;
  curDate.setDate(curDate.getDate() + distance);
  document.getElementById("searchDate").value = curDate.toISOString().split('T')[0].slice(0, 10); // https://stackoverflow.com/a/64706637

  // Check whether it's okay to load new images, and if so, do it
  if (document.getElementById("roverSelect").value != "unselected") {
    document.getElementById("submit").click();
  }
}

// Enable or disable interaction with the input elements. 
// Also toggles the progress bar.
function toggleInputs(state) {
  var searchInputs = document.getElementsByClassName("searchInput");
  if (state == true) {
    // enable elements
    document.getElementById("loadingBar").style.display = "none";
    for (var x = 0; x < searchInputs.length; x++) searchInputs[x].disabled = false;
  } else {
    // disable elements
    document.getElementById("loadingBar").style.display = "block";
    for (var x = 0; x < searchInputs.length; x++) searchInputs[x].disabled = true;
  }
}

// Code to execute when the entire page is fully loaded
window.addEventListener('load', function () {
  if (localStorage.getItem("rover") && localStorage.getItem("camera")) {
    document.getElementById("roverSelect").value = localStorage.getItem("rover");
    document.getElementById("camSelect").value = localStorage.getItem("camera");
    document.getElementById("submit").click();
  }
});

/* Handle events that occur when the selected rover is changed. */
var roverSelect = document.getElementById("roverSelect");
roverSelect.addEventListener("change", function () {
  toggleInputs(false);
  var selectedRover = roverSelect.options[roverSelect.selectedIndex].value;

  /* Update the available camera options */
  var camSelOptions = document.getElementById("camSelect").options;
  /* Iterate over each camera option, disabling ones not avail for this rover */
  for (var x = 0; x < camSelOptions.length; x++) {
    if (availableCams[selectedRover].includes(camSelOptions[x].value)) {
      /* If this option is listed in the available cams for this rover... */
      camSelOptions[x].disabled = false;
    } else {
      camSelOptions[x].disabled = true;
    }
  }

  /* Get the oldest and newest photo date */
  /* This function is supposed to use the /manifests/ROVERNAME endpoint, but this endpoint
  recently started to return HTTP 500 Internal Server Error. Using the /rovers endpoint 
  is not ideal, but retrieves the intended information. */
  fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers?api_key=${localStorage.getItem("apikey")}`)
    .then((function (response) {
      return response.json();
    }))
    .then(function (response) {
      for (var x = 0; x < response['rovers'].length; x++) {
        if (response['rovers'][x]['name'].toUpperCase() == selectedRover.toUpperCase()) {
          var oldest = response['rovers'][x]['landing_date'];
          var newest = response['rovers'][x]['max_date'];
          document.getElementById("searchDate").min = oldest;
          document.getElementById("searchDate").max = newest;
          document.getElementById("dateCaption").style.display = "block";
          document.getElementById("dateRangeOldest").innerHTML = oldest;
          document.getElementById("dateRangeNewest").innerHTML = newest;
        }
      }
      toggleInputs(true);
    })
    .catch(function (err) {
      warnInvalid("Error connecting to the NASA API: " + err);
    });
});

/* Handle getting the images */
let searchForm = document.getElementById("searchForm");
searchForm.addEventListener("submit", (e) => {
  e.preventDefault(); // prevent the form from submitting
  document.getElementById("photoGallery").innerHTML = ""; // remove all existing photos
  document.getElementById("noresults").style.display = "none"; // hide the "no results" warning
  var rover = document.getElementById("searchForm").elements['roverSelect'].value;
  var cam = document.getElementById("searchForm").elements['camSelect'].value;
  var date = document.getElementById("searchForm").elements['searchDate'].value;
  toggleInputs(false);
  fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/photos?api_key=${localStorage.getItem("apikey")}&earth_date=${date}&camera=${cam}`)
    .then((function (response) {
      return response.json();
    }))
    .then(function (response) {
      var gallery = document.getElementById("photoGallery");

      if (response['photos'].length == 0) {
        document.getElementById("noresults").style.display = "block";
      } else {

        for (var x = 0; x < response['photos'].length; x++) {
          var link = document.createElement("a");
          var img = document.createElement("img");
          img.src = response['photos'][x]['img_src'];
          link.appendChild(img);
          gallery.appendChild(link);
        }
      }

      /* https://stackoverflow.com/a/67816263 */
      var galleryImages = document.querySelectorAll(".gallery a");
      var fullPageViewer = document.querySelector("#fullscreenImageViewer");
      var currentIndex = 0; // Track the currently displayed image

      /* Function to update the full-page viewer */
      function showImage(index) {
        currentIndex = index;
        var imageSrc = galleryImages[currentIndex].children[0].src;
        fullPageViewer.style.backgroundImage = `url(${imageSrc})`;
        fullPageViewer.style.display = "block";
        window.scrollTo(0, 0);
      }

      /* Add click event to each gallery image */
      galleryImages.forEach((link, index) => {
        link.addEventListener('click', function (event) {
          event.preventDefault(); // Prevent default link behavior
          showImage(index);
        });
      });

      /* Add event listener for keyboard navigation */
      document.addEventListener('keydown', function (event) {
        if (fullPageViewer.style.display === "block") {
          if (event.key === "ArrowRight") {
            // Show next image
            currentIndex = (currentIndex + 1) % galleryImages.length; // Wrap around
            showImage(currentIndex);
          } else if (event.key === "ArrowLeft") {
            // Show previous image
            currentIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length; // Wrap around
            showImage(currentIndex);
          } else if (event.key === "Escape") {
            // Close the viewer
            fullPageViewer.style.display = "none";
          }
        }
      });

      /* Close the viewer when clicking outside the image */
      fullPageViewer.addEventListener('click', function () {
        fullPageViewer.style.display = "none";
      });

      toggleInputs(true);
    })
    .catch(function (err) {
      if (rover != "unselected") {
        warnInvalid("Error connecting to the NASA API: " + err);
      } else {
        alert("Please select a rover.");
        window.location.reload();
      }
    });
});