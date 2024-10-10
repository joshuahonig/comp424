// toggle switch
let perseveranceToggle = document.getElementById('perseverance');
// get node in DOM
let perseveranceForm = document.getElementById('perseveranceForm');

perseveranceToggle.addEventListener('click', () => {
    if (perseveranceForm.getAttribute('data-visible') === 'false') {
        perseveranceForm.setAttribute('data-visible', 'true');
        perseveranceForm.style.display = 'block';

        var roverSelect = document.getElementById("roverSelect4");
        var selectedRover = roverSelect.options[roverSelect.selectedIndex].value;

        if (document.getElementById("dateCaption4").innerHTML) {
            document.getElementById("loadingBar4").style.display = "none";
        } else {
            document.getElementById("loadingBar4").style.display = "block";
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
                        document.getElementById("searchDate4").min = oldest;
                        document.getElementById("searchDate4").max = newest;
                        document.getElementById("dateCaption4").innerHTML = `Range of available dates: ${oldest} to ${newest}`
                    }
                }
                document.getElementById("loadingBar4").style.display = "none";
            })
            .catch(function (err) {
                warnInvalid("Error connecting to the NASA API: " + err);
            });


    } else {
        perseveranceForm.setAttribute('data-visible', 'false');
        perseveranceForm.style.display = 'none'
    }

});

perseveranceForm.addEventListener('submit', () => {
    var form = new FormData(perseveranceForm);
    var rov = form.get("roverSelect4");
    var cam = form.get("camSelect4");
    var date = form.get("searchDate4");

    localStorage.setItem("rover", rov);
    localStorage.setItem("camera", cam);
    localStorage.setItem("date", date);

    window.location.href = "search.html";
});

