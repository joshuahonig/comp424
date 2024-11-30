const apodForm = document.getElementById("apodForm");
const apodButton = apodForm.querySelector("button");
const apodContainer = document.getElementById("apodContainer");
const apodTitle = document.getElementById("apodTitle");
const apodImage = document.getElementById("apodImage");
const apodExplanation = document.getElementById("apodExplanation");
const noResults = document.getElementById("noresults");

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
                apodTitle.textContent = data.title;
                apodImage.src = data.url;
                apodExplanation.textContent = data.explanation;

                apodContainer.style.display = "block";
            } else {
                // Handle non-image media types or missing data
                noResults.style.display = "block";
            }
        })
        .catch((err) => {
            console.error("Error fetching APOD data:", err);
            noResults.style.display = "block";
        });
});

// Code to execute when the entire page is fully loaded
window.addEventListener('load', function () {
    if (localStorage.getItem("apod.url") && localStorage.getItem("apod.title") && localStorage.getItem("apod.explanation")) {
        apodTitle.textContent = localStorage.getItem("apod.title")
        apodImage.src = localStorage.getItem("apod.url")
        apodExplanation.textContent = localStorage.getItem("apod.explanation")

        apodContainer.style.display = "block";
    }
});