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

