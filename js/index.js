function setCookie(name, value) {
  var date = new Date();
  date.setTime(date.getTime() + 7 * 24 * 60 * 60 * 1000);
  var expires = "; expires=" + date.toUTCString();
  document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

let loginForm = document.getElementById("apiForm");
loginForm.addEventListener("submit", (e) => {
  e.preventDefault(); // prevent the form from submitting
  /* THE FOLLOWING IS REALLY REALLY DANGEROUS AND SHOULD NEVER BE DONE IN THE REAL WORLD! 
       Storing sensitive information client-side is a HUGE no-no. It pains me to do this. */
  localStorage.setItem("apikey", document.getElementById("apiKeyTextbox").value);
  window.location.href = "/check.html";
});
