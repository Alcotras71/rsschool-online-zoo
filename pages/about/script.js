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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJhYm91dC9zY3JpcHQuanMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gLS0tLS0tLS0tLS0tLS0tLS0tLi4uLi4uLi4uLi4uLi4uLi4uLi4uLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gQklORCBGVU5DVElPTlNcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS4uLi4uLi4uLi4uLi4uLi4uLi4uLi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsIGZ1bmN0aW9uICgpIHtcbiAgLy9zZWxlY3RcbiAgY29uc3Qgc2VsZWN0ID0gbmV3IFNlbGVjdChcIiNzZWxlY3RcIiwge1xuICAgIHBsYWNlaG9sZGVyOiBcIkNob29zZSB5b3VyIGZhdm9yaXRlXCIsXG4gICAgZGF0YTogW1xuICAgICAgeyBpZDogXCIxXCIsIHZhbHVlOiBcIkx1a2FzIHRoZSBQYW5kYVwiIH0sXG4gICAgICB7IGlkOiBcIjJcIiwgdmFsdWU6IFwiQW5keSB0aGUgTGVtdXJcIiB9LFxuICAgICAgeyBpZDogXCIzXCIsIHZhbHVlOiBcIkdsZW4gdGhlIEdvcmlsbGFcIiB9LFxuICAgICAgeyBpZDogXCI0XCIsIHZhbHVlOiBcIlNhbSAmIExvcmEgdGhlIGVhZ2xlcyBmYW1pbHlcIiB9LFxuICAgIF0sXG4gIH0pO1xuICBjb25zdCBzZWxlY3RNb250aCA9IG5ldyBTZWxlY3QoXCIjc2VsZWN0LW1vbnRoXCIsIHtcbiAgICBwbGFjZWhvbGRlcjogXCJNb250aFwiLFxuICAgIGRhdGE6IFtcbiAgICAgIHsgaWQ6IFwiMVwiLCB2YWx1ZTogXCIwMVwiIH0sXG4gICAgICB7IGlkOiBcIjJcIiwgdmFsdWU6IFwiMDJcIiB9LFxuICAgICAgeyBpZDogXCIzXCIsIHZhbHVlOiBcIjAzXCIgfSxcbiAgICAgIHsgaWQ6IFwiNFwiLCB2YWx1ZTogXCIwNFwiIH0sXG4gICAgICB7IGlkOiBcIjVcIiwgdmFsdWU6IFwiMDVcIiB9LFxuICAgICAgeyBpZDogXCI2XCIsIHZhbHVlOiBcIjA2XCIgfSxcbiAgICAgIHsgaWQ6IFwiN1wiLCB2YWx1ZTogXCIwN1wiIH0sXG4gICAgICB7IGlkOiBcIjhcIiwgdmFsdWU6IFwiMDhcIiB9LFxuICAgICAgeyBpZDogXCI5XCIsIHZhbHVlOiBcIjA5XCIgfSxcbiAgICAgIHsgaWQ6IFwiMTBcIiwgdmFsdWU6IFwiMTBcIiB9LFxuICAgICAgeyBpZDogXCIxMVwiLCB2YWx1ZTogXCIxMVwiIH0sXG4gICAgICB7IGlkOiBcIjEyXCIsIHZhbHVlOiBcIjEyXCIgfSxcbiAgICBdLFxuICB9KTtcbiAgY29uc3Qgc2VsZWN0WWVhciA9IG5ldyBTZWxlY3QoXCIjc2VsZWN0LXllYXJcIiwge1xuICAgIHBsYWNlaG9sZGVyOiBcIlllYXJcIixcbiAgICBkYXRhOiBbXG4gICAgICB7IGlkOiBcIjFcIiwgdmFsdWU6IFwiMjFcIiB9LFxuICAgICAgeyBpZDogXCIyXCIsIHZhbHVlOiBcIjIyXCIgfSxcbiAgICAgIHsgaWQ6IFwiM1wiLCB2YWx1ZTogXCIyM1wiIH0sXG4gICAgICB7IGlkOiBcIjRcIiwgdmFsdWU6IFwiMjRcIiB9LFxuICAgICAgeyBpZDogXCI1XCIsIHZhbHVlOiBcIjI1XCIgfSxcbiAgICAgIHsgaWQ6IFwiNlwiLCB2YWx1ZTogXCIyNlwiIH0sXG4gICAgXSxcbiAgfSk7XG5cbiAgLy9tb2RhbHNcbiAgYmluZE1vZGFsKFwiLnBvcHVwLWJ0bi1jYXJlXCIsIFwiLnBvcHVwQ2FyZVwiLCBcIi5wb3B1cF9fY2xvc2VcIik7XG4gIGJpbmRNb2RhbChcIi5wb3B1cC1idG4tZG9uYXRlXCIsIFwiLnBvcHVwRG9uYXRlXCIsIFwiXCIsIFtcbiAgICBzZWxlY3QsXG4gICAgc2VsZWN0TW9udGgsXG4gICAgc2VsZWN0WWVhcixcbiAgXSk7XG5cbiAgLy9zbGlkZXJcbiAgc2xpZGVyKHtcbiAgICBjb250YWluZXI6IFwiLnBldHMtc2xpZGVyXCIsXG4gICAgc2xpZGU6IFwiLnBldHMtc2xpZGVyX19zbGlkZVwiLFxuICAgIG5leHRBcnJvdzogXCIucGV0cy1zbGlkZXJfX25hdmlnYXRpb24tbmV4dFwiLFxuICAgIHByZXZBcnJvdzogXCIucGV0cy1zbGlkZXJfX25hdmlnYXRpb24tcHJldlwiLFxuICAgIGZpZWxkOiBcIi5wZXRzLXNsaWRlcl9faW5uZXJcIixcbiAgICBudW1TbGlkZXNUb0NoYW5nZTogMixcbiAgICBzbGlkZXNQZXJWaWV3OiAzLFxuICB9KTtcblxuICBzbGlkZXIoe1xuICAgIGNvbnRhaW5lcjogXCIudGhpbmstc2xpZGVyXCIsXG4gICAgc2xpZGU6IFwiLnRoaW5rLXNsaWRlcl9fc2xpZGVcIixcbiAgICBuZXh0QXJyb3c6IFwiLnRoaW5rLXNsaWRlcl9fbmF2LW5leHRcIixcbiAgICBwcmV2QXJyb3c6IFwiLnRoaW5rLXNsaWRlcl9fbmF2LXByZXZcIixcbiAgICBmaWVsZDogXCIudGhpbmstc2xpZGVyX19pbm5lclwiLFxuICAgIG51bVNsaWRlc1RvQ2hhbmdlOiAyLFxuICAgIHNsaWRlc1BlclZpZXc6IDIsXG4gICAgaW50ZXJ2YWw6IHRydWUsXG4gICAgdGltZXI6IDE1LFxuICAgIHRpbWVyRGVsYXk6IDYwLFxuICB9KTtcbn0pO1xuIl0sImZpbGUiOiJhYm91dC9zY3JpcHQuanMifQ==
