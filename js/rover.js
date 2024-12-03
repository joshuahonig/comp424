// toggle switch
let oppToggle = document.getElementById('opportunity');
// get node in DOM
let oppForm = document.getElementById('opportunityForm');

oppToggle.addEventListener('click', () => {
    if (oppForm.getAttribute('data-visible') === 'false') {
        oppForm.setAttribute('data-visible', 'true');
        oppForm.style.display = 'block';

    } else {
        oppForm.setAttribute('data-visible', 'false');
        oppForm.style.display = 'none'
    }

});

oppForm.addEventListener('submit', () => {
    var form = new FormData(oppForm);
    var rov = form.get("roverSelect1");
    var cam = form.get("camSelect1");

    localStorage.setItem("rover", rov);
    localStorage.setItem("camera", cam);

    window.location.href = "search.html";
});


// toggle switch
let spiritToggle = document.getElementById('spirit');
// get node in DOM
let spiritForm = document.getElementById('spiritForm');

spiritToggle.addEventListener('click', () => {
    if (spiritForm.getAttribute('data-visible') === 'false') {
        spiritForm.setAttribute('data-visible', 'true');
        spiritForm.style.display = 'block';

    } else {
        spiritForm.setAttribute('data-visible', 'false');
        spiritForm.style.display = 'none'
    }

});

spiritForm.addEventListener('submit', () => {
    var form = new FormData(spiritForm);
    var rov = form.get("roverSelect2");
    var cam = form.get("camSelect2");

    localStorage.setItem("rover", rov);
    localStorage.setItem("camera", cam);

    window.location.href = "search.html";
});


// toggle switch
let curiosityToggle = document.getElementById('curiosity');
// get node in DOM
let curiosityForm = document.getElementById('curiosityForm');

curiosityToggle.addEventListener('click', () => {
    if (curiosityForm.getAttribute('data-visible') === 'false') {
        curiosityForm.setAttribute('data-visible', 'true');
        curiosityForm.style.display = 'block';

    } else {
        curiosityForm.setAttribute('data-visible', 'false');
        curiosityForm.style.display = 'none'
    }

});

curiosityForm.addEventListener('submit', () => {
    var form = new FormData(curiosityForm);
    var rov = form.get("roverSelect3");
    var cam = form.get("camSelect3");

    localStorage.setItem("rover", rov);
    localStorage.setItem("camera", cam);

    window.location.href = "search.html";
});


// toggle switch
let perseveranceToggle = document.getElementById('perseverance');
// get node in DOM
let perseveranceForm = document.getElementById('perseveranceForm');

perseveranceToggle.addEventListener('click', () => {
    if (perseveranceForm.getAttribute('data-visible') === 'false') {
        perseveranceForm.setAttribute('data-visible', 'true');
        perseveranceForm.style.display = 'block';

    } else {
        perseveranceForm.setAttribute('data-visible', 'false');
        perseveranceForm.style.display = 'none'
    }

});

perseveranceForm.addEventListener('submit', () => {
    var form = new FormData(perseveranceForm);
    var rov = form.get("roverSelect4");
    var cam = form.get("camSelect4");

    localStorage.setItem("rover", rov);
    localStorage.setItem("camera", cam);

    window.location.href = "search.html";
});

