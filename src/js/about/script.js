// ------------------.....................----------------------------
// BIND FUNCTIONS
// ------------------.....................----------------------------

window.addEventListener("DOMContentLoaded", function () {
  //select
  const select = new Select("#select", {
    placeholder: "Choose your favorite",
    data: [
      { id: "1", value: "Lukas the Panda" },
      { id: "2", value: "Andy the Lemur" },
      { id: "3", value: "Glen the Gorilla" },
      { id: "4", value: "Sam & Lora the eagles family" },
    ],
  });
  const selectMonth = new Select("#select-month", {
    placeholder: "Month",
    data: [
      { id: "1", value: "01" },
      { id: "2", value: "02" },
      { id: "3", value: "03" },
      { id: "4", value: "04" },
      { id: "5", value: "05" },
      { id: "6", value: "06" },
      { id: "7", value: "07" },
      { id: "8", value: "08" },
      { id: "9", value: "09" },
      { id: "10", value: "10" },
      { id: "11", value: "11" },
      { id: "12", value: "12" },
    ],
  });
  const selectYear = new Select("#select-year", {
    placeholder: "Year",
    data: [
      { id: "1", value: "21" },
      { id: "2", value: "22" },
      { id: "3", value: "23" },
      { id: "4", value: "24" },
      { id: "5", value: "25" },
      { id: "6", value: "26" },
    ],
  });

  //modals
  bindModal(".popup-btn-care", ".popupCare", ".popup__close");
  bindModal(".popup-btn-donate", ".popupDonate", "", [
    select,
    selectMonth,
    selectYear,
  ]);

  //slider
  slider({
    container: ".pets-slider",
    slide: ".pets-slider__slide",
    nextArrow: ".pets-slider__navigation-next",
    prevArrow: ".pets-slider__navigation-prev",
    field: ".pets-slider__inner",
    numSlidesToChange: 2,
    slidesPerView: 3,
  });

  slider({
    container: ".think-slider",
    slide: ".think-slider__slide",
    nextArrow: ".think-slider__nav-next",
    prevArrow: ".think-slider__nav-prev",
    field: ".think-slider__inner",
    numSlidesToChange: 2,
    slidesPerView: 2,
    interval: true,
    timer: 15,
    timerDelay: 60,
  });
});
