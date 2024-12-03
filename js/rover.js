// get node in DOM
let oppForm = document.getElementById('opportunityForm');
oppForm.addEventListener('submit', () => {
    var form = new FormData(oppForm);
    var rov = form.get("roverSelect1");
    var cam = form.get("camSelect1");

    localStorage.setItem("rover", rov);
    localStorage.setItem("camera", cam);

    window.location.href = "search.html";
});

// get node in DOM
let spiritForm = document.getElementById('spiritForm');
spiritForm.addEventListener('submit', () => {
    var form = new FormData(spiritForm);
    var rov = form.get("roverSelect2");
    var cam = form.get("camSelect2");

    localStorage.setItem("rover", rov);
    localStorage.setItem("camera", cam);

    window.location.href = "search.html";
});

// get node in DOM
let curiosityForm = document.getElementById('curiosityForm');
curiosityForm.addEventListener('submit', () => {
    var form = new FormData(curiosityForm);
    var rov = form.get("roverSelect3");
    var cam = form.get("camSelect3");

    localStorage.setItem("rover", rov);
    localStorage.setItem("camera", cam);

    window.location.href = "search.html";
});

// get node in DOM
let perseveranceForm = document.getElementById('perseveranceForm');
perseveranceForm.addEventListener('submit', () => {
    var form = new FormData(perseveranceForm);
    var rov = form.get("roverSelect4");
    var cam = form.get("camSelect4");

    localStorage.setItem("rover", rov);
    localStorage.setItem("camera", cam);

    window.location.href = "search.html";
});

