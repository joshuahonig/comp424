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



