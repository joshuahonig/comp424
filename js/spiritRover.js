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
    var date = form.get("searchDate2");

    localStorage.setItem("rover", rov);
    localStorage.setItem("camera", cam);
    localStorage.setItem("date", date);

    window.location.href = "search.html";
});