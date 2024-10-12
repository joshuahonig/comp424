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

// Code to execute when the entire page is fully loaded
window.addEventListener('load', function () {
  console.log("Page fully loaded");
  if (localStorage.getItem("rover") && localStorage.getItem("camera") && localStorage.getItem("date")) {
    document.getElementById("roverSelect").value = localStorage.getItem("rover");
    document.getElementById("camSelect").value = localStorage.getItem("camera");
    document.getElementById("searchDate").value = localStorage.getItem("date");
    document.getElementById("submit").click();
  }
});

/* Handle events that occur when the selected rover is changed. */
var roverSelect = document.getElementById("roverSelect");

roverSelect.addEventListener("change", function () {
  document.getElementById("loadingBar").style.display = "block";
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
  fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers?api_key=${apikey}`)
    .then((function (response) {
      return response.json();
    }))
    .then(function (response) {
      console.log(response);
      for (var x = 0; x < response['rovers'].length; x++) {
        if (response['rovers'][x]['name'].toUpperCase() == selectedRover.toUpperCase()) {
          console.log(response['rovers'][x]);
          var oldest = response['rovers'][x]['landing_date'];
          var newest = response['rovers'][x]['max_date'];
          document.getElementById("searchDate").min = oldest;
          document.getElementById("searchDate").max = newest;
          document.getElementById("dateCaption").innerHTML = `Range of available dates: ${oldest} to ${newest}`
        }
      }
      document.getElementById("loadingBar").style.display = "none";
    })
    .catch(function (err) {
      warnInvalid("Error connecting to the NASA API: " + err);
    });
});

/* Handle getting the images */
let searchForm = document.getElementById("searchForm");
searchForm.addEventListener("submit", (e) => {
  e.preventDefault(); // prevent the form from submitting
  document.getElementById("loadingBar").style.display = "block";
  document.getElementById("photos").innerHTML = ""; // remove all existing photos
  document.getElementById("noresults").style.display = "none"; // hide the "no results" warning
  var rover = document.getElementById("searchForm").elements['roverSelect'].value;
  var cam = document.getElementById("searchForm").elements['camSelect'].value;
  var date = document.getElementById("searchForm").elements['searchDate'].value;
  fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/photos?api_key=${apikey}&earth_date=${date}&camera=${cam}`)
    .then((function (response) {
      return response.json();
    }))
    .then(function (response) {
      console.log(response['photos']);
      var ul = document.getElementById("photos");

      if (response['photos'].length == 0) {
        var query = document.createElement("p");
        query.innerHTML = "No search results"
        ul.appendChild(query)
      } else {

        for (var x = 0; x < response['photos'].length; x++) {
          var li = document.createElement("li");
          var img = document.createElement("img");
          img.src = response['photos'][x]['img_src'];
          li.appendChild(img);
          ul.appendChild(li);
        }
      }
      if (response['photos'].length == 0){
        document.getElementById("noresults").style.display = "block";
      }

      document.getElementById("loadingBar").style.display = "none";
    })
    .catch(function (err) {
      warnInvalid("Error connecting to the NASA API: " + err);
    });
});