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
    var date = form.get("searchDate3");

    localStorage.setItem("rover", rov);
    localStorage.setItem("camera", cam);
    localStorage.setItem("date", date);

    window.location.href = "search.html";
});