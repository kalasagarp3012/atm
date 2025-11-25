// Typing animation for heading
const text = "Welcome to DigitalATM";
let index = 0;

function typeEffect() {
  const target = document.getElementById("dynamicText");
  if (index < text.length) {
    target.innerHTML = "Welcome to DigitalATM".substring(0, index + 1);
    index++;
    setTimeout(typeEffect, 80);
  }
}
setTimeout(typeEffect, 500);

// Button click animation
document.getElementById("exploreBtn").addEventListener("click", () => {
  // Open login page in a new tab
  window.open("../login/login.html", "_blank");
});

// Navbar color change on scroll
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar");
  if (window.scrollY > 50) {
    navbar.style.backgroundColor = "#1958a5ff";
    navbar.style.transition = "0.3s";
  } else {
    navbar.style.backgroundColor = "#174c8cff";
  }
});
