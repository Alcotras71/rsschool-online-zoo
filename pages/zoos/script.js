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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJ6b29zL3NjcmlwdC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyAtLS0tLS0tLS0tLS0tLS0tLS0uLi4uLi4uLi4uLi4uLi4uLi4uLi4tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyBCSU5EIEZVTkNUSU9OU1xuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLi4uLi4uLi4uLi4uLi4uLi4uLi4uLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgZnVuY3Rpb24gKCkge1xuICAvLyBzaWRlYmFyXG5cbiAgY29uc3Qgc2lkZWJhckRlc2t0b3AgPSBuZXcgU2lkZWJhcihcIi5hc2lkZV9fZGVza3RvcFwiLCBcIi5hc2lkZV9fYnRuXCIpLFxuICAgIHNpZGViYXJNb2JpbGUgPSBuZXcgU2lkZWJhcihcIi5hc2lkZV9fbW9iaWxlXCIsIFwiLmFzaWRlX19idG5cIik7XG5cbiAgLy9zaWRlYmFyIHNsaWRlclxuICBzbGlkZXIoe1xuICAgIGNvbnRhaW5lcjogXCIuYXNpZGVfX2Rlc2t0b3BcIixcbiAgICBzbGlkZTogXCIuYXNpZGVfX2l0ZW1cIixcbiAgICBuZXh0QXJyb3c6IFwiLmFzaWRlX19hcnJvd1wiLFxuICAgIGZpZWxkOiBcIi5hc2lkZV9fbGlzdFwiLFxuICAgIG51bVNsaWRlc1RvQ2hhbmdlOiAyLFxuICAgIHNsaWRlc1BlclZpZXc6IDQsXG4gICAgZGlyZWN0aW9uOiBcInZlcnRpY2FsXCIsXG4gIH0pO1xuXG4gIHNsaWRlcih7XG4gICAgY29udGFpbmVyOiBcIi5hc2lkZV9fbW9iaWxlXCIsXG4gICAgc2xpZGU6IFwiLmFzaWRlX19pdGVtXCIsXG4gICAgbmV4dEFycm93OiBcIi5hc2lkZV9fYXJyb3ctbW9iaWxlXCIsXG4gICAgZmllbGQ6IFwiLmFzaWRlX19saXN0XCIsXG4gICAgbnVtU2xpZGVzVG9DaGFuZ2U6IDIsXG4gICAgc2xpZGVzUGVyVmlldzogNCxcbiAgICBkaXJlY3Rpb246IFwidmVydGljYWxcIixcbiAgfSk7XG5cblxuXG59KTtcbiJdLCJmaWxlIjoiem9vcy9zY3JpcHQuanMifQ==
