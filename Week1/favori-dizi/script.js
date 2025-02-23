const navElm = document.querySelector(".nav");
const hamburgerElm = document.querySelector(".hamburger");

hamburgerElm.addEventListener("click", () => {
  navElm.classList.toggle("nav--open");
  hamburgerElm.classList.toggle("hamburger--open");
});

navElm.addEventListener("click", () => {
  navElm.classList.remove("nav--open");
  hamburgerElm.classList.remove("hamburger--open");
});


document.querySelector('.slider').addEventListener('wheel', function(e) {
    if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
      e.preventDefault();
    }
  }, { passive: false });
  