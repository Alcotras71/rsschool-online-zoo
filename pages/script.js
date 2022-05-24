// ------------------.....................----------------------------
// Modals
// ------------------.....................----------------------------

function bindModal(btnSelector, popupSelector, closeSelector, selectsArr) {
  const buttons = document.querySelectorAll(btnSelector),
    popup = document.querySelector(popupSelector),
    allPopups = document.querySelectorAll("[data-modal]"),
    donateInput = document.querySelectorAll(".donate-btn__input"),
    donateAmount = document.querySelector(".popup-donation__input-amount"),
    curCashBtn = document.querySelectorAll("[data-curcash]"),
    otherAmountBtn = document.querySelector(".otherAmountBtn"),
    specialPet = document.querySelector(".specialPet"),
    popupInputs = document.querySelectorAll(".popup__input"),
    content1 = document.querySelector(".content-1"),
    content2 = document.querySelector(".content-2"),
    content3 = document.querySelector(".content-3"),
    firstPrev = document.querySelector(".first-prev"),
    secondPrev = document.querySelector(".second-prev"),
    firstNext = document.querySelector(".first-next"),
    secondNext = document.querySelector(".second-next"),
    required = document.querySelectorAll(".required"),
    completeBtn = document.querySelector(".complete"),
    body = document.body;

  let paddingScroll = calcScroll(),
    closeBtn;

  if (closeSelector) {
    closeBtn = document.querySelector(closeSelector);
  }

  function calcScroll() {
    let div = document.createElement("div");

    div.style.width = "50px";
    div.style.height = "50px";
    div.style.overflowY = "scroll";
    div.style.visibility = "hidden";

    document.body.appendChild(div);
    let scrollWidth = div.offsetWidth - div.clientWidth;
    div.remove();

    return scrollWidth;
  }

  function openModal(selector, cash) {
    selector.classList.add("active");
    body.style.paddingRight = `${paddingScroll}px`;
    body.style.overflow = "hidden";

    if (cash === "") {
      donateAmount.value = cash;
      curCashBtn[0].classList.add("active");
      setTimeout(() => {
        donateAmount.focus();
      }, 500);
    } else if (cash) {
      switch (cash) {
        case "20":
          curCashBtn[1].classList.add("active");
          break;
        case "30":
          curCashBtn[2].classList.add("active");
          break;
        case "50":
          curCashBtn[3].classList.add("active");
          break;
        case "80":
          curCashBtn[4].classList.add("active");
          break;
        case "100":
          curCashBtn[5].classList.add("active");
          break;

        default:
          donateAmount.value = cash;
          donateAmount.focus();
          break;
      }
    }
  }

  curCashBtn.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();

      curCashBtn.forEach((btn) => btn.classList.remove("active"));
      e.target.classList.add("active");
    });
  });

  function closeModal(selector) {
    selector.classList.remove("active");
    body.style.paddingRight = "0px";
    body.style.overflow = "visible";

    curCashBtn.forEach((btn) => {
      btn.classList.remove("active");
    });

    popupInputs.forEach((input) => {
      input.value = "";
    });

    if (selectsArr) {
      selectsArr.forEach((select) => {
        select.clear();
      });
    }

    content1.classList.remove("hide");
    content2.classList.add("hide");
    content3.classList.add("hide");
  }

  function checkLength(e, n) {
    if (e.target.value.length > n) {
      e.target.value = e.target.value.slice(0, n);
    }
  }

  popupInputs.forEach((input) => {
    if (input.dataset.limit) {
      input.oninput = (e) => {
        checkLength(e, input.dataset.limit);
      };
    }
  });

  buttons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      if (e.target) e.preventDefault();

      allPopups.forEach((item) => {
        item.classList.remove("active");
      });

      let cash = e.target.dataset.cash;

      if (cash) {
        switch (cash) {
          case "20":
            openModal(popup, cash);
            break;
          case "30":
            openModal(popup, cash);
            break;
          case "50":
            openModal(popup, cash);
            break;
          case "80":
            openModal(popup, cash);
            break;
          case "100":
            openModal(popup, cash);
            break;

          default:
            donateInput.forEach((input) => {
              cash = input.value;
              openModal(popup, cash);
            });
            break;
        }
      } else {
        openModal(popup);
      }
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener("click", (e) => {
      if (e.target) e.preventDefault();

      allPopups.forEach((item) => {
        item.classList.remove("active");
      });

      closeModal(popup);
    });
  }

  function toggleContent(hideContent, showContent) {
    hideContent.classList.add("hide");
    showContent.classList.remove("hide");
  }

  firstNext.addEventListener("click", () => toggleContent(content1, content2));

  secondNext.addEventListener("click", () => toggleContent(content2, content3));

  firstPrev.addEventListener("click", () => toggleContent(content2, content1));

  secondPrev.addEventListener("click", () => toggleContent(content3, content2));

  otherAmountBtn.addEventListener("click", (e) => {
    e.preventDefault();
    donateAmount.focus();
  });

  specialPet.addEventListener("click", (e) => e.preventDefault());

  popup.addEventListener("click", (e) => {
    const closeArea = document.querySelectorAll(".popup__body");

    closeArea.forEach((area) => {
      if (e.target === area && popup.classList.contains("active")) {
        allPopups.forEach((item) => {
          item.classList.remove("active");
        });

        closeModal(popup);
      }
    });
  });
}

// ------------------.....................----------------------------
// Select
// ------------------.....................----------------------------

const getTemplate = (data = [], placeholder) => {
  const items = data.map((item) => {
    return `
      <li class="select__item" data-type="item" data-id="${item.id}">${item.value}</li>
    `;
  });

  return `
    <div class="select__backdrop" data-type="backdrop"></div>
    <div class="select__input-wrap" data-type="input">
      <input class="popup__input select__input text" type="text" placeholder="${placeholder}" readonly data-value="" data-type="input"/>
    </div>
    <div class="select__dropdown">
      <ul class="select__list">
        ${items.join("")}
      </ul>
    </div>
    `;
};

class Select {
  constructor(selector, options) {
    this.$el = document.querySelector(selector);
    this.options = options;
    this.selectedId = null;
    this.$button = document.querySelector(".specialPet");

    this.#render();
    this.#setup();
  }

  #render() {
    const { placeholder, data } = this.options;
    this.$el.classList.add("select");
    this.$el.innerHTML = getTemplate(data, placeholder);
  }

  #setup() {
    this.clickHandler = this.clickHandler.bind(this);
    this.$el.addEventListener("click", this.clickHandler);
    this.$value = this.$el.querySelector("[data-value]");
  }

  clickHandler(e) {
    const { type } = e.target.dataset;
    if (type === "input") {
      this.toggle();
    } else if (type === "item") {
      const id = e.target.dataset.id;
      this.select(id);
    } else if (type === "backdrop") {
      this.close();
    }
  }

  get isOpen() {
    return this.$el.classList.contains("open");
  }

  get current() {
    return this.options.data.find((item) => item.id === this.selectedId);
  }

  select(id) {
    this.selectedId = id;
    this.$value.value = this.current.value;

    this.$el.querySelectorAll('[data-type="item"]').forEach((el) => {
      el.classList.remove("selected");
    });
    this.$el.querySelector(`[data-id="${id}"]`).classList.add("selected");
    this.$button.classList.add("active");

    this.close();
  }

  toggle() {
    this.isOpen ? this.close() : this.open();
  }

  open() {
    this.$el.classList.add("open");
  }

  close() {
    this.$el.classList.remove("open");
  }

  clear() {
    this.$value.value = "";
  }
}

// ------------------.....................----------------------------
// Slider
// ------------------.....................----------------------------

function slider({
  container,
  slide,
  prevArrow,
  nextArrow,
  field,
  numSlidesToChange,
  slidesPerView,
  interval = false,
  timer,
  timerDelay,
  direction = "horizontal",
}) {
  const slider = document.querySelector(container),
    slidesField = slider.querySelectorAll(field),
    slides = slidesField[0].querySelectorAll(slide),
    next = document.querySelector(nextArrow);

  const slideWidth = deleteNotDigits(window.getComputedStyle(slides[0]).width),
    slideMargin = deleteNotDigits(
      window.getComputedStyle(slides[0]).marginRight
    );

  const slideHeight = deleteNotDigits(
    window.getComputedStyle(slides[0]).height
  );

  let offset = 0,
    sliderInterval,
    value,
    prev;

  if (direction === "horizontal") {
    value = (slideWidth + slideMargin) * numSlidesToChange;
  } else if (direction === "vertical") {
    value = slideHeight * numSlidesToChange;
  }

  if (prevArrow) {
    prev = document.querySelector(prevArrow);
  }

  function moveSlide() {
    slidesField.forEach((field) => {
      if (direction === "horizontal") {
        field.style.transform = `translateX(-${offset}px)`;
      } else if (direction === "vertical") {
        field.style.transform = `translateY(-${offset}px)`;
      }
    });
  }

  function deleteNotDigits(str) {
    return +str.replace(/\D/g, "");
  }

  function moveForward() {
    if (
      offset ==
      (value * (slides.length - slidesPerView)) / numSlidesToChange
    ) {
      offset = 0;
    } else {
      offset += value;
    }
    moveSlide();
  }

  function moveBack() {
    if (offset == 0) {
      offset = (value * (slides.length - slidesPerView)) / numSlidesToChange;
    } else {
      offset -= value;
    }

    moveSlide();
  }

  function sliderTimeout() {
    setTimeout(() => {
      moveForward();
      sliderInterval = setInterval(moveForward, timer * 1000);
    }, timerDelay * 1000);
  }

  if (interval) {
    sliderInterval = setInterval(moveForward, timer * 1000);

    slider.addEventListener("click", (e) => {
      let currSlide = e.target.closest(slide);

      if (slider.contains(currSlide)) {
        clearInterval(sliderInterval);
        sliderTimeout();
      }
    });
  }

  next.addEventListener("click", (e) => {
    if (interval) {
      clearInterval(sliderInterval);
      sliderTimeout();
    }

    moveForward();
  });

  if (prevArrow) {
    prev.addEventListener("click", () => {
      if (interval) {
        clearInterval(sliderInterval);
        sliderTimeout();
      }

      moveBack();
    });
  }
}

// ------------------.....................----------------------------
// Sidebar
// ------------------.....................----------------------------
class Sidebar {
  constructor(selector, arrow) {
    this.$sidebar = document.querySelector(selector);
    this.$el = this.$sidebar.querySelector(arrow);

    this.#setup();
  }

  #setup() {
    this.clickHandler = this.clickHandler.bind(this);
    this.$el.addEventListener("click", this.clickHandler);
  }

  clickHandler() {
    this.toggle();
  }

  get isOpen() {
    return this.$sidebar.classList.contains("open");
  }

  toggle() {
    this.isOpen ? this.close() : this.open();
  }

  open() {
    this.$sidebar.classList.add("open");
  }

  close() {
    this.$sidebar.classList.remove("open");
  }
}

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJzY3JpcHQuanMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gLS0tLS0tLS0tLS0tLS0tLS0tLi4uLi4uLi4uLi4uLi4uLi4uLi4uLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gTW9kYWxzXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0uLi4uLi4uLi4uLi4uLi4uLi4uLi4tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbmZ1bmN0aW9uIGJpbmRNb2RhbChidG5TZWxlY3RvciwgcG9wdXBTZWxlY3RvciwgY2xvc2VTZWxlY3Rvciwgc2VsZWN0c0Fycikge1xuICBjb25zdCBidXR0b25zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChidG5TZWxlY3RvciksXG4gICAgcG9wdXAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHBvcHVwU2VsZWN0b3IpLFxuICAgIGFsbFBvcHVwcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCJbZGF0YS1tb2RhbF1cIiksXG4gICAgZG9uYXRlSW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmRvbmF0ZS1idG5fX2lucHV0XCIpLFxuICAgIGRvbmF0ZUFtb3VudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucG9wdXAtZG9uYXRpb25fX2lucHV0LWFtb3VudFwiKSxcbiAgICBjdXJDYXNoQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIltkYXRhLWN1cmNhc2hdXCIpLFxuICAgIG90aGVyQW1vdW50QnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5vdGhlckFtb3VudEJ0blwiKSxcbiAgICBzcGVjaWFsUGV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zcGVjaWFsUGV0XCIpLFxuICAgIHBvcHVwSW5wdXRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5wb3B1cF9faW5wdXRcIiksXG4gICAgY29udGVudDEgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmNvbnRlbnQtMVwiKSxcbiAgICBjb250ZW50MiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY29udGVudC0yXCIpLFxuICAgIGNvbnRlbnQzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5jb250ZW50LTNcIiksXG4gICAgZmlyc3RQcmV2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5maXJzdC1wcmV2XCIpLFxuICAgIHNlY29uZFByZXYgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnNlY29uZC1wcmV2XCIpLFxuICAgIGZpcnN0TmV4dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZmlyc3QtbmV4dFwiKSxcbiAgICBzZWNvbmROZXh0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zZWNvbmQtbmV4dFwiKSxcbiAgICByZXF1aXJlZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIucmVxdWlyZWRcIiksXG4gICAgY29tcGxldGVCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmNvbXBsZXRlXCIpLFxuICAgIGJvZHkgPSBkb2N1bWVudC5ib2R5O1xuXG4gIGxldCBwYWRkaW5nU2Nyb2xsID0gY2FsY1Njcm9sbCgpLFxuICAgIGNsb3NlQnRuO1xuXG4gIGlmIChjbG9zZVNlbGVjdG9yKSB7XG4gICAgY2xvc2VCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGNsb3NlU2VsZWN0b3IpO1xuICB9XG5cbiAgZnVuY3Rpb24gY2FsY1Njcm9sbCgpIHtcbiAgICBsZXQgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcblxuICAgIGRpdi5zdHlsZS53aWR0aCA9IFwiNTBweFwiO1xuICAgIGRpdi5zdHlsZS5oZWlnaHQgPSBcIjUwcHhcIjtcbiAgICBkaXYuc3R5bGUub3ZlcmZsb3dZID0gXCJzY3JvbGxcIjtcbiAgICBkaXYuc3R5bGUudmlzaWJpbGl0eSA9IFwiaGlkZGVuXCI7XG5cbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGRpdik7XG4gICAgbGV0IHNjcm9sbFdpZHRoID0gZGl2Lm9mZnNldFdpZHRoIC0gZGl2LmNsaWVudFdpZHRoO1xuICAgIGRpdi5yZW1vdmUoKTtcblxuICAgIHJldHVybiBzY3JvbGxXaWR0aDtcbiAgfVxuXG4gIGZ1bmN0aW9uIG9wZW5Nb2RhbChzZWxlY3RvciwgY2FzaCkge1xuICAgIHNlbGVjdG9yLmNsYXNzTGlzdC5hZGQoXCJhY3RpdmVcIik7XG4gICAgYm9keS5zdHlsZS5wYWRkaW5nUmlnaHQgPSBgJHtwYWRkaW5nU2Nyb2xsfXB4YDtcbiAgICBib2R5LnN0eWxlLm92ZXJmbG93ID0gXCJoaWRkZW5cIjtcblxuICAgIGlmIChjYXNoID09PSBcIlwiKSB7XG4gICAgICBkb25hdGVBbW91bnQudmFsdWUgPSBjYXNoO1xuICAgICAgY3VyQ2FzaEJ0blswXS5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpO1xuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIGRvbmF0ZUFtb3VudC5mb2N1cygpO1xuICAgICAgfSwgNTAwKTtcbiAgICB9IGVsc2UgaWYgKGNhc2gpIHtcbiAgICAgIHN3aXRjaCAoY2FzaCkge1xuICAgICAgICBjYXNlIFwiMjBcIjpcbiAgICAgICAgICBjdXJDYXNoQnRuWzFdLmNsYXNzTGlzdC5hZGQoXCJhY3RpdmVcIik7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCIzMFwiOlxuICAgICAgICAgIGN1ckNhc2hCdG5bMl0uY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcIjUwXCI6XG4gICAgICAgICAgY3VyQ2FzaEJ0blszXS5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwiODBcIjpcbiAgICAgICAgICBjdXJDYXNoQnRuWzRdLmNsYXNzTGlzdC5hZGQoXCJhY3RpdmVcIik7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCIxMDBcIjpcbiAgICAgICAgICBjdXJDYXNoQnRuWzVdLmNsYXNzTGlzdC5hZGQoXCJhY3RpdmVcIik7XG4gICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICBkb25hdGVBbW91bnQudmFsdWUgPSBjYXNoO1xuICAgICAgICAgIGRvbmF0ZUFtb3VudC5mb2N1cygpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGN1ckNhc2hCdG4uZm9yRWFjaCgoYnRuKSA9PiB7XG4gICAgYnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT4ge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICBjdXJDYXNoQnRuLmZvckVhY2goKGJ0bikgPT4gYnRuLmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIikpO1xuICAgICAgZS50YXJnZXQuY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKTtcbiAgICB9KTtcbiAgfSk7XG5cbiAgZnVuY3Rpb24gY2xvc2VNb2RhbChzZWxlY3Rvcikge1xuICAgIHNlbGVjdG9yLmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIik7XG4gICAgYm9keS5zdHlsZS5wYWRkaW5nUmlnaHQgPSBcIjBweFwiO1xuICAgIGJvZHkuc3R5bGUub3ZlcmZsb3cgPSBcInZpc2libGVcIjtcblxuICAgIGN1ckNhc2hCdG4uZm9yRWFjaCgoYnRuKSA9PiB7XG4gICAgICBidG4uY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKTtcbiAgICB9KTtcblxuICAgIHBvcHVwSW5wdXRzLmZvckVhY2goKGlucHV0KSA9PiB7XG4gICAgICBpbnB1dC52YWx1ZSA9IFwiXCI7XG4gICAgfSk7XG5cbiAgICBpZiAoc2VsZWN0c0Fycikge1xuICAgICAgc2VsZWN0c0Fyci5mb3JFYWNoKChzZWxlY3QpID0+IHtcbiAgICAgICAgc2VsZWN0LmNsZWFyKCk7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBjb250ZW50MS5jbGFzc0xpc3QucmVtb3ZlKFwiaGlkZVwiKTtcbiAgICBjb250ZW50Mi5jbGFzc0xpc3QuYWRkKFwiaGlkZVwiKTtcbiAgICBjb250ZW50My5jbGFzc0xpc3QuYWRkKFwiaGlkZVwiKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNoZWNrTGVuZ3RoKGUsIG4pIHtcbiAgICBpZiAoZS50YXJnZXQudmFsdWUubGVuZ3RoID4gbikge1xuICAgICAgZS50YXJnZXQudmFsdWUgPSBlLnRhcmdldC52YWx1ZS5zbGljZSgwLCBuKTtcbiAgICB9XG4gIH1cblxuICBwb3B1cElucHV0cy5mb3JFYWNoKChpbnB1dCkgPT4ge1xuICAgIGlmIChpbnB1dC5kYXRhc2V0LmxpbWl0KSB7XG4gICAgICBpbnB1dC5vbmlucHV0ID0gKGUpID0+IHtcbiAgICAgICAgY2hlY2tMZW5ndGgoZSwgaW5wdXQuZGF0YXNldC5saW1pdCk7XG4gICAgICB9O1xuICAgIH1cbiAgfSk7XG5cbiAgYnV0dG9ucy5mb3JFYWNoKChidG4pID0+IHtcbiAgICBidG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB7XG4gICAgICBpZiAoZS50YXJnZXQpIGUucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgYWxsUG9wdXBzLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgaXRlbS5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xuICAgICAgfSk7XG5cbiAgICAgIGxldCBjYXNoID0gZS50YXJnZXQuZGF0YXNldC5jYXNoO1xuXG4gICAgICBpZiAoY2FzaCkge1xuICAgICAgICBzd2l0Y2ggKGNhc2gpIHtcbiAgICAgICAgICBjYXNlIFwiMjBcIjpcbiAgICAgICAgICAgIG9wZW5Nb2RhbChwb3B1cCwgY2FzaCk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlIFwiMzBcIjpcbiAgICAgICAgICAgIG9wZW5Nb2RhbChwb3B1cCwgY2FzaCk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlIFwiNTBcIjpcbiAgICAgICAgICAgIG9wZW5Nb2RhbChwb3B1cCwgY2FzaCk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlIFwiODBcIjpcbiAgICAgICAgICAgIG9wZW5Nb2RhbChwb3B1cCwgY2FzaCk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlIFwiMTAwXCI6XG4gICAgICAgICAgICBvcGVuTW9kYWwocG9wdXAsIGNhc2gpO1xuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgZG9uYXRlSW5wdXQuZm9yRWFjaCgoaW5wdXQpID0+IHtcbiAgICAgICAgICAgICAgY2FzaCA9IGlucHV0LnZhbHVlO1xuICAgICAgICAgICAgICBvcGVuTW9kYWwocG9wdXAsIGNhc2gpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgb3Blbk1vZGFsKHBvcHVwKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfSk7XG5cbiAgaWYgKGNsb3NlQnRuKSB7XG4gICAgY2xvc2VCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB7XG4gICAgICBpZiAoZS50YXJnZXQpIGUucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgYWxsUG9wdXBzLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgaXRlbS5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xuICAgICAgfSk7XG5cbiAgICAgIGNsb3NlTW9kYWwocG9wdXApO1xuICAgIH0pO1xuICB9XG5cbiAgZnVuY3Rpb24gdG9nZ2xlQ29udGVudChoaWRlQ29udGVudCwgc2hvd0NvbnRlbnQpIHtcbiAgICBoaWRlQ29udGVudC5jbGFzc0xpc3QuYWRkKFwiaGlkZVwiKTtcbiAgICBzaG93Q29udGVudC5jbGFzc0xpc3QucmVtb3ZlKFwiaGlkZVwiKTtcbiAgfVxuXG4gIGZpcnN0TmV4dC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4gdG9nZ2xlQ29udGVudChjb250ZW50MSwgY29udGVudDIpKTtcblxuICBzZWNvbmROZXh0LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB0b2dnbGVDb250ZW50KGNvbnRlbnQyLCBjb250ZW50MykpO1xuXG4gIGZpcnN0UHJldi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4gdG9nZ2xlQ29udGVudChjb250ZW50MiwgY29udGVudDEpKTtcblxuICBzZWNvbmRQcmV2LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB0b2dnbGVDb250ZW50KGNvbnRlbnQzLCBjb250ZW50MikpO1xuXG4gIG90aGVyQW1vdW50QnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT4ge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICBkb25hdGVBbW91bnQuZm9jdXMoKTtcbiAgfSk7XG5cbiAgc3BlY2lhbFBldC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IGUucHJldmVudERlZmF1bHQoKSk7XG5cbiAgcG9wdXAuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB7XG4gICAgY29uc3QgY2xvc2VBcmVhID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5wb3B1cF9fYm9keVwiKTtcblxuICAgIGNsb3NlQXJlYS5mb3JFYWNoKChhcmVhKSA9PiB7XG4gICAgICBpZiAoZS50YXJnZXQgPT09IGFyZWEgJiYgcG9wdXAuY2xhc3NMaXN0LmNvbnRhaW5zKFwiYWN0aXZlXCIpKSB7XG4gICAgICAgIGFsbFBvcHVwcy5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgICAgaXRlbS5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xuICAgICAgICB9KTtcblxuICAgICAgICBjbG9zZU1vZGFsKHBvcHVwKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfSk7XG59XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS4uLi4uLi4uLi4uLi4uLi4uLi4uLi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIFNlbGVjdFxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLi4uLi4uLi4uLi4uLi4uLi4uLi4uLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5jb25zdCBnZXRUZW1wbGF0ZSA9IChkYXRhID0gW10sIHBsYWNlaG9sZGVyKSA9PiB7XG4gIGNvbnN0IGl0ZW1zID0gZGF0YS5tYXAoKGl0ZW0pID0+IHtcbiAgICByZXR1cm4gYFxuICAgICAgPGxpIGNsYXNzPVwic2VsZWN0X19pdGVtXCIgZGF0YS10eXBlPVwiaXRlbVwiIGRhdGEtaWQ9XCIke2l0ZW0uaWR9XCI+JHtpdGVtLnZhbHVlfTwvbGk+XG4gICAgYDtcbiAgfSk7XG5cbiAgcmV0dXJuIGBcbiAgICA8ZGl2IGNsYXNzPVwic2VsZWN0X19iYWNrZHJvcFwiIGRhdGEtdHlwZT1cImJhY2tkcm9wXCI+PC9kaXY+XG4gICAgPGRpdiBjbGFzcz1cInNlbGVjdF9faW5wdXQtd3JhcFwiIGRhdGEtdHlwZT1cImlucHV0XCI+XG4gICAgICA8aW5wdXQgY2xhc3M9XCJwb3B1cF9faW5wdXQgc2VsZWN0X19pbnB1dCB0ZXh0XCIgdHlwZT1cInRleHRcIiBwbGFjZWhvbGRlcj1cIiR7cGxhY2Vob2xkZXJ9XCIgcmVhZG9ubHkgZGF0YS12YWx1ZT1cIlwiIGRhdGEtdHlwZT1cImlucHV0XCIvPlxuICAgIDwvZGl2PlxuICAgIDxkaXYgY2xhc3M9XCJzZWxlY3RfX2Ryb3Bkb3duXCI+XG4gICAgICA8dWwgY2xhc3M9XCJzZWxlY3RfX2xpc3RcIj5cbiAgICAgICAgJHtpdGVtcy5qb2luKFwiXCIpfVxuICAgICAgPC91bD5cbiAgICA8L2Rpdj5cbiAgICBgO1xufTtcblxuY2xhc3MgU2VsZWN0IHtcbiAgY29uc3RydWN0b3Ioc2VsZWN0b3IsIG9wdGlvbnMpIHtcbiAgICB0aGlzLiRlbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3IpO1xuICAgIHRoaXMub3B0aW9ucyA9IG9wdGlvbnM7XG4gICAgdGhpcy5zZWxlY3RlZElkID0gbnVsbDtcbiAgICB0aGlzLiRidXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnNwZWNpYWxQZXRcIik7XG5cbiAgICB0aGlzLiNyZW5kZXIoKTtcbiAgICB0aGlzLiNzZXR1cCgpO1xuICB9XG5cbiAgI3JlbmRlcigpIHtcbiAgICBjb25zdCB7IHBsYWNlaG9sZGVyLCBkYXRhIH0gPSB0aGlzLm9wdGlvbnM7XG4gICAgdGhpcy4kZWwuY2xhc3NMaXN0LmFkZChcInNlbGVjdFwiKTtcbiAgICB0aGlzLiRlbC5pbm5lckhUTUwgPSBnZXRUZW1wbGF0ZShkYXRhLCBwbGFjZWhvbGRlcik7XG4gIH1cblxuICAjc2V0dXAoKSB7XG4gICAgdGhpcy5jbGlja0hhbmRsZXIgPSB0aGlzLmNsaWNrSGFuZGxlci5iaW5kKHRoaXMpO1xuICAgIHRoaXMuJGVsLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCB0aGlzLmNsaWNrSGFuZGxlcik7XG4gICAgdGhpcy4kdmFsdWUgPSB0aGlzLiRlbC5xdWVyeVNlbGVjdG9yKFwiW2RhdGEtdmFsdWVdXCIpO1xuICB9XG5cbiAgY2xpY2tIYW5kbGVyKGUpIHtcbiAgICBjb25zdCB7IHR5cGUgfSA9IGUudGFyZ2V0LmRhdGFzZXQ7XG4gICAgaWYgKHR5cGUgPT09IFwiaW5wdXRcIikge1xuICAgICAgdGhpcy50b2dnbGUoKTtcbiAgICB9IGVsc2UgaWYgKHR5cGUgPT09IFwiaXRlbVwiKSB7XG4gICAgICBjb25zdCBpZCA9IGUudGFyZ2V0LmRhdGFzZXQuaWQ7XG4gICAgICB0aGlzLnNlbGVjdChpZCk7XG4gICAgfSBlbHNlIGlmICh0eXBlID09PSBcImJhY2tkcm9wXCIpIHtcbiAgICAgIHRoaXMuY2xvc2UoKTtcbiAgICB9XG4gIH1cblxuICBnZXQgaXNPcGVuKCkge1xuICAgIHJldHVybiB0aGlzLiRlbC5jbGFzc0xpc3QuY29udGFpbnMoXCJvcGVuXCIpO1xuICB9XG5cbiAgZ2V0IGN1cnJlbnQoKSB7XG4gICAgcmV0dXJuIHRoaXMub3B0aW9ucy5kYXRhLmZpbmQoKGl0ZW0pID0+IGl0ZW0uaWQgPT09IHRoaXMuc2VsZWN0ZWRJZCk7XG4gIH1cblxuICBzZWxlY3QoaWQpIHtcbiAgICB0aGlzLnNlbGVjdGVkSWQgPSBpZDtcbiAgICB0aGlzLiR2YWx1ZS52YWx1ZSA9IHRoaXMuY3VycmVudC52YWx1ZTtcblxuICAgIHRoaXMuJGVsLnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLXR5cGU9XCJpdGVtXCJdJykuZm9yRWFjaCgoZWwpID0+IHtcbiAgICAgIGVsLmNsYXNzTGlzdC5yZW1vdmUoXCJzZWxlY3RlZFwiKTtcbiAgICB9KTtcbiAgICB0aGlzLiRlbC5xdWVyeVNlbGVjdG9yKGBbZGF0YS1pZD1cIiR7aWR9XCJdYCkuY2xhc3NMaXN0LmFkZChcInNlbGVjdGVkXCIpO1xuICAgIHRoaXMuJGJ1dHRvbi5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpO1xuXG4gICAgdGhpcy5jbG9zZSgpO1xuICB9XG5cbiAgdG9nZ2xlKCkge1xuICAgIHRoaXMuaXNPcGVuID8gdGhpcy5jbG9zZSgpIDogdGhpcy5vcGVuKCk7XG4gIH1cblxuICBvcGVuKCkge1xuICAgIHRoaXMuJGVsLmNsYXNzTGlzdC5hZGQoXCJvcGVuXCIpO1xuICB9XG5cbiAgY2xvc2UoKSB7XG4gICAgdGhpcy4kZWwuY2xhc3NMaXN0LnJlbW92ZShcIm9wZW5cIik7XG4gIH1cblxuICBjbGVhcigpIHtcbiAgICB0aGlzLiR2YWx1ZS52YWx1ZSA9IFwiXCI7XG4gIH1cbn1cblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLi4uLi4uLi4uLi4uLi4uLi4uLi4uLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gU2xpZGVyXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0uLi4uLi4uLi4uLi4uLi4uLi4uLi4tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbmZ1bmN0aW9uIHNsaWRlcih7XG4gIGNvbnRhaW5lcixcbiAgc2xpZGUsXG4gIHByZXZBcnJvdyxcbiAgbmV4dEFycm93LFxuICBmaWVsZCxcbiAgbnVtU2xpZGVzVG9DaGFuZ2UsXG4gIHNsaWRlc1BlclZpZXcsXG4gIGludGVydmFsID0gZmFsc2UsXG4gIHRpbWVyLFxuICB0aW1lckRlbGF5LFxuICBkaXJlY3Rpb24gPSBcImhvcml6b250YWxcIixcbn0pIHtcbiAgY29uc3Qgc2xpZGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcihjb250YWluZXIpLFxuICAgIHNsaWRlc0ZpZWxkID0gc2xpZGVyLnF1ZXJ5U2VsZWN0b3JBbGwoZmllbGQpLFxuICAgIHNsaWRlcyA9IHNsaWRlc0ZpZWxkWzBdLnF1ZXJ5U2VsZWN0b3JBbGwoc2xpZGUpLFxuICAgIG5leHQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKG5leHRBcnJvdyk7XG5cbiAgY29uc3Qgc2xpZGVXaWR0aCA9IGRlbGV0ZU5vdERpZ2l0cyh3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShzbGlkZXNbMF0pLndpZHRoKSxcbiAgICBzbGlkZU1hcmdpbiA9IGRlbGV0ZU5vdERpZ2l0cyhcbiAgICAgIHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKHNsaWRlc1swXSkubWFyZ2luUmlnaHRcbiAgICApO1xuXG4gIGNvbnN0IHNsaWRlSGVpZ2h0ID0gZGVsZXRlTm90RGlnaXRzKFxuICAgIHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKHNsaWRlc1swXSkuaGVpZ2h0XG4gICk7XG5cbiAgbGV0IG9mZnNldCA9IDAsXG4gICAgc2xpZGVySW50ZXJ2YWwsXG4gICAgdmFsdWUsXG4gICAgcHJldjtcblxuICBpZiAoZGlyZWN0aW9uID09PSBcImhvcml6b250YWxcIikge1xuICAgIHZhbHVlID0gKHNsaWRlV2lkdGggKyBzbGlkZU1hcmdpbikgKiBudW1TbGlkZXNUb0NoYW5nZTtcbiAgfSBlbHNlIGlmIChkaXJlY3Rpb24gPT09IFwidmVydGljYWxcIikge1xuICAgIHZhbHVlID0gc2xpZGVIZWlnaHQgKiBudW1TbGlkZXNUb0NoYW5nZTtcbiAgfVxuXG4gIGlmIChwcmV2QXJyb3cpIHtcbiAgICBwcmV2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihwcmV2QXJyb3cpO1xuICB9XG5cbiAgZnVuY3Rpb24gbW92ZVNsaWRlKCkge1xuICAgIHNsaWRlc0ZpZWxkLmZvckVhY2goKGZpZWxkKSA9PiB7XG4gICAgICBpZiAoZGlyZWN0aW9uID09PSBcImhvcml6b250YWxcIikge1xuICAgICAgICBmaWVsZC5zdHlsZS50cmFuc2Zvcm0gPSBgdHJhbnNsYXRlWCgtJHtvZmZzZXR9cHgpYDtcbiAgICAgIH0gZWxzZSBpZiAoZGlyZWN0aW9uID09PSBcInZlcnRpY2FsXCIpIHtcbiAgICAgICAgZmllbGQuc3R5bGUudHJhbnNmb3JtID0gYHRyYW5zbGF0ZVkoLSR7b2Zmc2V0fXB4KWA7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBmdW5jdGlvbiBkZWxldGVOb3REaWdpdHMoc3RyKSB7XG4gICAgcmV0dXJuICtzdHIucmVwbGFjZSgvXFxEL2csIFwiXCIpO1xuICB9XG5cbiAgZnVuY3Rpb24gbW92ZUZvcndhcmQoKSB7XG4gICAgaWYgKFxuICAgICAgb2Zmc2V0ID09XG4gICAgICAodmFsdWUgKiAoc2xpZGVzLmxlbmd0aCAtIHNsaWRlc1BlclZpZXcpKSAvIG51bVNsaWRlc1RvQ2hhbmdlXG4gICAgKSB7XG4gICAgICBvZmZzZXQgPSAwO1xuICAgIH0gZWxzZSB7XG4gICAgICBvZmZzZXQgKz0gdmFsdWU7XG4gICAgfVxuICAgIG1vdmVTbGlkZSgpO1xuICB9XG5cbiAgZnVuY3Rpb24gbW92ZUJhY2soKSB7XG4gICAgaWYgKG9mZnNldCA9PSAwKSB7XG4gICAgICBvZmZzZXQgPSAodmFsdWUgKiAoc2xpZGVzLmxlbmd0aCAtIHNsaWRlc1BlclZpZXcpKSAvIG51bVNsaWRlc1RvQ2hhbmdlO1xuICAgIH0gZWxzZSB7XG4gICAgICBvZmZzZXQgLT0gdmFsdWU7XG4gICAgfVxuXG4gICAgbW92ZVNsaWRlKCk7XG4gIH1cblxuICBmdW5jdGlvbiBzbGlkZXJUaW1lb3V0KCkge1xuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgbW92ZUZvcndhcmQoKTtcbiAgICAgIHNsaWRlckludGVydmFsID0gc2V0SW50ZXJ2YWwobW92ZUZvcndhcmQsIHRpbWVyICogMTAwMCk7XG4gICAgfSwgdGltZXJEZWxheSAqIDEwMDApO1xuICB9XG5cbiAgaWYgKGludGVydmFsKSB7XG4gICAgc2xpZGVySW50ZXJ2YWwgPSBzZXRJbnRlcnZhbChtb3ZlRm9yd2FyZCwgdGltZXIgKiAxMDAwKTtcblxuICAgIHNsaWRlci5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IHtcbiAgICAgIGxldCBjdXJyU2xpZGUgPSBlLnRhcmdldC5jbG9zZXN0KHNsaWRlKTtcblxuICAgICAgaWYgKHNsaWRlci5jb250YWlucyhjdXJyU2xpZGUpKSB7XG4gICAgICAgIGNsZWFySW50ZXJ2YWwoc2xpZGVySW50ZXJ2YWwpO1xuICAgICAgICBzbGlkZXJUaW1lb3V0KCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBuZXh0LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT4ge1xuICAgIGlmIChpbnRlcnZhbCkge1xuICAgICAgY2xlYXJJbnRlcnZhbChzbGlkZXJJbnRlcnZhbCk7XG4gICAgICBzbGlkZXJUaW1lb3V0KCk7XG4gICAgfVxuXG4gICAgbW92ZUZvcndhcmQoKTtcbiAgfSk7XG5cbiAgaWYgKHByZXZBcnJvdykge1xuICAgIHByZXYuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgIGlmIChpbnRlcnZhbCkge1xuICAgICAgICBjbGVhckludGVydmFsKHNsaWRlckludGVydmFsKTtcbiAgICAgICAgc2xpZGVyVGltZW91dCgpO1xuICAgICAgfVxuXG4gICAgICBtb3ZlQmFjaygpO1xuICAgIH0pO1xuICB9XG59XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS4uLi4uLi4uLi4uLi4uLi4uLi4uLi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIFNpZGViYXJcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS4uLi4uLi4uLi4uLi4uLi4uLi4uLi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbmNsYXNzIFNpZGViYXIge1xuICBjb25zdHJ1Y3RvcihzZWxlY3RvciwgYXJyb3cpIHtcbiAgICB0aGlzLiRzaWRlYmFyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihzZWxlY3Rvcik7XG4gICAgdGhpcy4kZWwgPSB0aGlzLiRzaWRlYmFyLnF1ZXJ5U2VsZWN0b3IoYXJyb3cpO1xuXG4gICAgdGhpcy4jc2V0dXAoKTtcbiAgfVxuXG4gICNzZXR1cCgpIHtcbiAgICB0aGlzLmNsaWNrSGFuZGxlciA9IHRoaXMuY2xpY2tIYW5kbGVyLmJpbmQodGhpcyk7XG4gICAgdGhpcy4kZWwuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHRoaXMuY2xpY2tIYW5kbGVyKTtcbiAgfVxuXG4gIGNsaWNrSGFuZGxlcigpIHtcbiAgICB0aGlzLnRvZ2dsZSgpO1xuICB9XG5cbiAgZ2V0IGlzT3BlbigpIHtcbiAgICByZXR1cm4gdGhpcy4kc2lkZWJhci5jbGFzc0xpc3QuY29udGFpbnMoXCJvcGVuXCIpO1xuICB9XG5cbiAgdG9nZ2xlKCkge1xuICAgIHRoaXMuaXNPcGVuID8gdGhpcy5jbG9zZSgpIDogdGhpcy5vcGVuKCk7XG4gIH1cblxuICBvcGVuKCkge1xuICAgIHRoaXMuJHNpZGViYXIuY2xhc3NMaXN0LmFkZChcIm9wZW5cIik7XG4gIH1cblxuICBjbG9zZSgpIHtcbiAgICB0aGlzLiRzaWRlYmFyLmNsYXNzTGlzdC5yZW1vdmUoXCJvcGVuXCIpO1xuICB9XG59XG4iXSwiZmlsZSI6InNjcmlwdC5qcyJ9
