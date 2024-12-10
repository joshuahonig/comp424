const apodForm = document.getElementById("apodForm");
const apodButton = apodForm.querySelector("button");
const apodContainer = document.getElementById("apodContainer");
const apodTitle = document.getElementById("apodTitle");
const apodImage = document.getElementById("apodImage");
const apodExplanation = document.getElementById("apodExplanation");
const noResults = document.getElementById("noresults");
const apodImageLink = document.getElementById("apodImageLink");

apodButton.addEventListener("click", () => {
    const date = document.getElementById("searchDate").value;
    if (!date) {
        alert("Please select a date before submitting.");
        dateInput.focus();
        return;
    }
    // Clear any existing content
    apodContainer.style.display = "none";
    noResults.style.display = "none";

    // Fetch the APOD data
    fetch(`https://api.nasa.gov/planetary/apod?api_key=${localStorage.getItem("apikey")}&date=${date}`)
        .then((response) => response.json())
        .then((data) => {
            if (data.media_type === "image") {
                apodTitle.textContent = `Astronomy Picture of the Day: ${data.title}`;
                apodImage.src = data.url;
                apodImageLink.href = data.url;
                apodExplanation.textContent = data.explanation;

                apodContainer.style.display = "block";
                apodTitle.classList.remove("error");
            } else {
                // Handle non-image media types or missing data
                noResults.style.display = "block";
                apodTitle.textContent = "Error!"
                apodTitle.classList.add("error");
                apodImage.src = "/img/notFound.png";
                apodExplanation.textContent = "No image was found for the selected date. Please try searching for another day."
            }
        })
        .catch((err) => {
            console.warn("Error fetching APOD data:", err);
            noResults.style.display = "block";
        });
});

// Code to execute when the entire page is fully loaded
window.addEventListener('load', function () {
    if (localStorage.getItem("apod.url") && localStorage.getItem("apod.title") && localStorage.getItem("apod.explanation")) {
        apodTitle.textContent = `Astronomy Picture of the Day: ${localStorage.getItem("apod.title")}`
        apodImage.src = localStorage.getItem("apod.url");
        apodImageLink.href = localStorage.getItem("apod.url");
        apodExplanation.textContent = localStorage.getItem("apod.explanation");

        apodContainer.style.display = "block";

        const today = new Date();
        this.document.getElementById("searchDate").value = today.getFullYear().toString() + '-' + (today.getMonth() + 1).toString().padStart(2, 0) + '-' + today.getDate().toString().padStart(2, 0);

        var pswpGallery = new PhotoSwipeLightbox({
            gallery: '#apodContainer',
            children: 'a',
            initialZoomLevel: 1.25,
            secondaryZoomLevel: 3.5,
            pswpModule: PhotoSwipe 
        });
        pswpGallery.init();

        apodImage.onload = function(){
            document.getElementById("apodImageLink").setAttribute("data-pswp-width", this.width);
            document.getElementById("apodImageLink").setAttribute("data-pswp-height", this.height);
            
        }
    }
});