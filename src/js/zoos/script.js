// ------------------.....................----------------------------
// BIND FUNCTIONS
// ------------------.....................----------------------------

window.addEventListener("DOMContentLoaded", function () {
  // sidebar

  const sidebarDesktop = new Sidebar(".aside__desktop", ".aside__btn"),
    sidebarMobile = new Sidebar(".aside__mobile", ".aside__btn");

  //sidebar slider
  slider({
    container: ".aside__desktop",
    slide: ".aside__item",
    nextArrow: ".aside__arrow",
    field: ".aside__list",
    numSlidesToChange: 2,
    slidesPerView: 4,
    direction: "vertical",
  });

  slider({
    container: ".aside__mobile",
    slide: ".aside__item",
    nextArrow: ".aside__arrow-mobile",
    field: ".aside__list",
    numSlidesToChange: 2,
    slidesPerView: 4,
    direction: "vertical",
  });



});
