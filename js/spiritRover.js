// toggle switch
let spiritToggle = document.getElementById('spirit');
// get node in DOM
let spiritForm = document.getElementById('spiritForm');

spiritToggle.addEventListener('click', () => {
    if (spiritForm.getAttribute('data-visible') === 'false') {
        spiritForm.setAttribute('data-visible', 'true');
        spiritForm.style.display = 'block';

        var roverSelect = document.getElementById("roverSelect2");
        var selectedRover = roverSelect.options[roverSelect.selectedIndex].value;

        if (document.getElementById("dateCaption2").innerHTML) {
            document.getElementById("loadingBar2").style.display = "none";
        } else {
            document.getElementById("loadingBar2").style.display = "block";
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
                        document.getElementById("searchDate2").min = oldest;
                        document.getElementById("searchDate2").max = newest;
                        document.getElementById("dateCaption2").innerHTML = `Range of available dates: ${oldest} to ${newest}`
                    }
                }
                document.getElementById("loadingBar2").style.display = "none";
            })
            .catch(function (err) {
                warnInvalid("Error connecting to the NASA API: " + err);
            });



    } else {
        spiritForm.setAttribute('data-visible', 'false');
        spiritForm.style.display = 'none'
    }

});

spiritForm.addEventListener('submit', () => {
    var form = new FormData(spiritForm);
    var rov = form.get("roverSelect2");
    var cam = form.get("camSelect2");
    var date = form.get("searchDate2");

    localStorage.setItem("rover", rov);
    localStorage.setItem("camera", cam);
    localStorage.setItem("date", date);

    window.location.href = "search.html";
});