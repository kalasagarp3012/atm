// Simple fade-in animation
document.addEventListener("DOMContentLoaded", () => {
  document.querySelector(".content-box").style.opacity = 0;
  setTimeout(() => {
    document.querySelector(".content-box").style.transition = "1s";
    document.querySelector(".content-box").style.opacity = 1;
  }, 300);
});
