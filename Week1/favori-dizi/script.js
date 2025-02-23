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

document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();
  
      const targetId = this.getAttribute('href').substring(1);
      const targetSection = document.getElementById(targetId);
  
      if (targetSection) {
        window.scrollTo({
          top: targetSection.offsetTop - 60,
          behavior: 'smooth'
        });
      }
    });
  });
  


// document.querySelector('.slider').addEventListener('wheel', function(e) {
//     if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
//       e.preventDefault();
//     }
//   }, { passive: false });
  