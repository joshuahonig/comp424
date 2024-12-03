let loginForm = document.getElementById("apiForm");
loginForm.addEventListener("submit", (e) => {
  e.preventDefault(); // prevent the form from submitting
  localStorage.setItem("apikey", document.getElementById("apiKeyTextbox").value);
  window.location.href = "/check.html";
});

if (localStorage.getItem("apikey") !== null) {
  // User is already logged in. Redirect.
  window.location.href = "/rover.html"
}
