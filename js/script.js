// KT

/* ================================================= */
/* Smooth scrolling */
/* ================================================= */

const navLinks = document.querySelectorAll("a:link.smooth-scroll");
navLinks.forEach((link) => link.addEventListener("click", smoothScroll));

function smoothScroll(e) {
  e.preventDefault();
  const href = this.getAttribute("href");
  document.querySelector(href).scrollIntoView({
    behavior: "smooth",
  });
}
seamless.polyfill();

/* ================================================= */
/* Switch theme function */
/* ================================================= */

const switchTheme = () => {
  // Get root element and data-theme value
  const rootElem = document.documentElement;
  let dataTheme = rootElem.getAttribute("data-theme"),
    newTheme;
  newTheme = dataTheme === "light" ? "dark" : "light";

  // Set the new HTML attribute
  rootElem.setAttribute("data-theme", newTheme);

  // Set the new local storage item
  localStorage.setItem("theme", newTheme);

  // Toggle class
  const bgGradient = document.querySelector(".bg");
  newTheme === "dark"
    ? bgGradient.classList.add("radial-gradient")
    : bgGradient.classList.remove("radial-gradient");
};

// Add event listener for the switchTheme
document
  .querySelector(".theme-switcher")
  .addEventListener("click", switchTheme);

/* ================================================= */
/* Gradient following mouse  */
/* ================================================= */

const gradMouse = function () {
  const rootElem = document.documentElement;
  const dataTheme = rootElem.getAttribute("data-theme");
  const bgGradient = document.querySelector(".bg");

  dataTheme === "dark"
    ? bgGradient.classList.add("radial-gradient")
    : bgGradient.classList.remove("radial-gradient");

  if (!dataTheme === "dark") return;

  $(document).mousemove(function (event) {
    windowWidth = $(window).width();
    windowHeight = $(window).height();

    mouseXpercentage = Math.round((event.pageX / windowWidth) * 100);
    mouseYpercentage = Math.round((event.pageY / windowHeight) * 100);

    $(".radial-gradient").css(
      "background",
      "radial-gradient(at " +
        mouseXpercentage +
        "% " +
        mouseYpercentage +
        "%, var(--page-bg-light), var(--page-bg-dark))"
    );
  });
};

/* ================================================= */
/* Modal window */
/* ================================================= */

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");

const openModal = function (e) {
  e.preventDefault();

  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");

  const certImg = document.createElement("img");
  certImg.classList.add("certificate");
  certImg.src = e.target.dataset.certificate;

  modal.append(certImg);
};

const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
  const el = document.querySelector(".certificate");
  el.remove();
};

btnsOpenModal.forEach((btn) => btn.addEventListener("click", openModal));

btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});

/* ================================================= */
/* Tracking image hover effect */
/* ================================================= */

//Creates an event that fires every time the mouse moves over any div with the class of "img".
$(".img").mousemove(function (event) {
  //Both the x and y value are calculated by taking the mouse x,y position on the page and subtracting it from the x,y position of the image on the page. "this" is the hovered element with the class of "img"
  var mousex = event.pageX - $(this).offset().left;
  var mousey = event.pageY - $(this).offset().top;

  //If you just used the mouse position values the translation effect will only go up and to the right, by subtracting half of the length / width of the imagevfrom the values  we get either a positive or negitive number so that the image will move in any direction.

  //The 40 controls the amount of "movement" that will happen by giving us a smaller number, feel free to change it to get the effect that you want.
  var imgx = (mousex - 300) / 40;
  var imgy = (mousey - 200) / 40;

  //Adds a translation css styles to the image element
  $(this).css("transform", "translate(" + imgx + "px," + imgy + "px)");
});

//This function will fire every time the user mouses off of the image. It resets the translation back to 0.
$(".img").mouseout(function () {
  $(this).css("transform", "translate(0px,0px)");
});

/* ================================================= */
/* Current year */
/* ================================================= */

const yearEl = document.querySelector(".year");
const currentYear = new Date().getFullYear();
yearEl.textContent = currentYear;
