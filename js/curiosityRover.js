// toggle switch
let curiosityToggle = document.getElementById('curiosity');
// get node in DOM
let curiosityForm = document.getElementById('curiosityForm');

curiosityToggle.addEventListener('click', () => {
    if (curiosityForm.getAttribute('data-visible') === 'false') {
        curiosityForm.setAttribute('data-visible', 'true');
        curiosityForm.style.display = 'block';

        var roverSelect = document.getElementById("roverSelect3");
        var selectedRover = roverSelect.options[roverSelect.selectedIndex].value;

        if (document.getElementById("dateCaption3").innerHTML) {
            document.getElementById("loadingBar3").style.display = "none";
        } else {
            document.getElementById("loadingBar3").style.display = "block";
        }
        fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers?api_key=${apikey}`)

            .then((function (response) {
                return response.json();
            }))
            .then(function (response) {
                for (var x = 0; x < response['rovers'].length; x++) {
                    if (response['rovers'][x]['name'].toUpperCase() == selectedRover.toUpperCase()) {
                        console.log(response['rovers'][x]);
                        var oldest = response['rovers'][x]['landing_date'];
                        var newest = response['rovers'][x]['max_date'];
                        document.getElementById("searchDate3").min = oldest;
                        document.getElementById("searchDate3").max = newest;
                        document.getElementById("dateCaption3").innerHTML = `Range of available dates: ${oldest} to ${newest}`
                    }
                }
                document.getElementById("loadingBar3").style.display = "none";
            })
            .catch(function (err) {
                warnInvalid("Error connecting to the NASA API: " + err);
            });

    } else {
        curiosityForm.setAttribute('data-visible', 'false');
        curiosityForm.style.display = 'none'
    }

});

curiosityForm.addEventListener('submit', () => {
    var form = new FormData(curiosityForm);
    var rov = form.get("roverSelect3");
    var cam = form.get("camSelect3");
    var date = form.get("searchDate3");

    localStorage.setItem("rover", rov);
    localStorage.setItem("camera", cam);
    localStorage.setItem("date", date);

    window.location.href = "search.html";
});