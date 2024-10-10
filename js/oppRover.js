// toggle switch
let oppToggle = document.getElementById('opportunity');
// get node in DOM
let oppForm = document.getElementById('opportunityForm');

oppToggle.addEventListener('click', () => {
    if (oppForm.getAttribute('data-visible') === 'false') {
        oppForm.setAttribute('data-visible', 'true');
        oppForm.style.display = 'block';

        var roverSelect = document.getElementById("roverSelect1");
        var selectedRover = roverSelect.options[roverSelect.selectedIndex].value;

        if (document.getElementById("dateCaption1").innerHTML) {
            document.getElementById("loadingBar1").style.display = "none";
        } else {
            document.getElementById("loadingBar1").style.display = "block";
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
                        document.getElementById("searchDate1").min = oldest;
                        document.getElementById("searchDate1").max = newest;
                        document.getElementById("dateCaption1").innerHTML = `Range of available dates: ${oldest} to ${newest}`
                    }
                }
                document.getElementById("loadingBar1").style.display = "none";
            })
            .catch(function (err) {
                warnInvalid("Error connecting to the NASA API: " + err);
            });


    } else {
        oppForm.setAttribute('data-visible', 'false');
        oppForm.style.display = 'none'
    }

});

oppForm.addEventListener('submit', () => {
    var form = new FormData(oppForm);
    var rov = form.get("roverSelect1");
    var cam = form.get("camSelect1");
    var date = form.get("searchDate1");

    localStorage.setItem("rover", rov);
    localStorage.setItem("camera", cam);
    localStorage.setItem("date", date);

    window.location.href = "search.html";
});



