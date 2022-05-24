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
    const {placeholder, data} = this.options;
    this.$el.classList.add("select");
    this.$el.innerHTML = getTemplate(data, placeholder);
  }

  #setup() {
    this.clickHandler = this.clickHandler.bind(this);
    this.$el.addEventListener("click", this.clickHandler);
    this.$value = this.$el.querySelector("[data-value]");
  }

  clickHandler(e) {
    const {type} = e.target.dataset;
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


/// Activate burger

const burger = document.querySelector('.burger');
const headerMenu = document.querySelector('.header__menu')

burger.addEventListener('click', () => {
  burger.classList.toggle('burger--active');
  headerMenu.classList.toggle('active')
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJzY3JpcHQuanMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gLS0tLS0tLS0tLS0tLS0tLS0tLi4uLi4uLi4uLi4uLi4uLi4uLi4uLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gTW9kYWxzXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0uLi4uLi4uLi4uLi4uLi4uLi4uLi4tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbmZ1bmN0aW9uIGJpbmRNb2RhbChidG5TZWxlY3RvciwgcG9wdXBTZWxlY3RvciwgY2xvc2VTZWxlY3Rvciwgc2VsZWN0c0Fycikge1xuICBjb25zdCBidXR0b25zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChidG5TZWxlY3RvciksXG4gICAgcG9wdXAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHBvcHVwU2VsZWN0b3IpLFxuICAgIGFsbFBvcHVwcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCJbZGF0YS1tb2RhbF1cIiksXG4gICAgZG9uYXRlSW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmRvbmF0ZS1idG5fX2lucHV0XCIpLFxuICAgIGRvbmF0ZUFtb3VudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucG9wdXAtZG9uYXRpb25fX2lucHV0LWFtb3VudFwiKSxcbiAgICBjdXJDYXNoQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIltkYXRhLWN1cmNhc2hdXCIpLFxuICAgIG90aGVyQW1vdW50QnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5vdGhlckFtb3VudEJ0blwiKSxcbiAgICBzcGVjaWFsUGV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zcGVjaWFsUGV0XCIpLFxuICAgIHBvcHVwSW5wdXRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5wb3B1cF9faW5wdXRcIiksXG4gICAgY29udGVudDEgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmNvbnRlbnQtMVwiKSxcbiAgICBjb250ZW50MiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY29udGVudC0yXCIpLFxuICAgIGNvbnRlbnQzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5jb250ZW50LTNcIiksXG4gICAgZmlyc3RQcmV2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5maXJzdC1wcmV2XCIpLFxuICAgIHNlY29uZFByZXYgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnNlY29uZC1wcmV2XCIpLFxuICAgIGZpcnN0TmV4dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZmlyc3QtbmV4dFwiKSxcbiAgICBzZWNvbmROZXh0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zZWNvbmQtbmV4dFwiKSxcbiAgICByZXF1aXJlZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIucmVxdWlyZWRcIiksXG4gICAgY29tcGxldGVCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmNvbXBsZXRlXCIpLFxuICAgIGJvZHkgPSBkb2N1bWVudC5ib2R5O1xuXG4gIGxldCBwYWRkaW5nU2Nyb2xsID0gY2FsY1Njcm9sbCgpLFxuICAgIGNsb3NlQnRuO1xuXG4gIGlmIChjbG9zZVNlbGVjdG9yKSB7XG4gICAgY2xvc2VCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGNsb3NlU2VsZWN0b3IpO1xuICB9XG5cbiAgZnVuY3Rpb24gY2FsY1Njcm9sbCgpIHtcbiAgICBsZXQgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcblxuICAgIGRpdi5zdHlsZS53aWR0aCA9IFwiNTBweFwiO1xuICAgIGRpdi5zdHlsZS5oZWlnaHQgPSBcIjUwcHhcIjtcbiAgICBkaXYuc3R5bGUub3ZlcmZsb3dZID0gXCJzY3JvbGxcIjtcbiAgICBkaXYuc3R5bGUudmlzaWJpbGl0eSA9IFwiaGlkZGVuXCI7XG5cbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGRpdik7XG4gICAgbGV0IHNjcm9sbFdpZHRoID0gZGl2Lm9mZnNldFdpZHRoIC0gZGl2LmNsaWVudFdpZHRoO1xuICAgIGRpdi5yZW1vdmUoKTtcblxuICAgIHJldHVybiBzY3JvbGxXaWR0aDtcbiAgfVxuXG4gIGZ1bmN0aW9uIG9wZW5Nb2RhbChzZWxlY3RvciwgY2FzaCkge1xuICAgIHNlbGVjdG9yLmNsYXNzTGlzdC5hZGQoXCJhY3RpdmVcIik7XG4gICAgYm9keS5zdHlsZS5wYWRkaW5nUmlnaHQgPSBgJHtwYWRkaW5nU2Nyb2xsfXB4YDtcbiAgICBib2R5LnN0eWxlLm92ZXJmbG93ID0gXCJoaWRkZW5cIjtcblxuICAgIGlmIChjYXNoID09PSBcIlwiKSB7XG4gICAgICBkb25hdGVBbW91bnQudmFsdWUgPSBjYXNoO1xuICAgICAgY3VyQ2FzaEJ0blswXS5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpO1xuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIGRvbmF0ZUFtb3VudC5mb2N1cygpO1xuICAgICAgfSwgNTAwKTtcbiAgICB9IGVsc2UgaWYgKGNhc2gpIHtcbiAgICAgIHN3aXRjaCAoY2FzaCkge1xuICAgICAgICBjYXNlIFwiMjBcIjpcbiAgICAgICAgICBjdXJDYXNoQnRuWzFdLmNsYXNzTGlzdC5hZGQoXCJhY3RpdmVcIik7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCIzMFwiOlxuICAgICAgICAgIGN1ckNhc2hCdG5bMl0uY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcIjUwXCI6XG4gICAgICAgICAgY3VyQ2FzaEJ0blszXS5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwiODBcIjpcbiAgICAgICAgICBjdXJDYXNoQnRuWzRdLmNsYXNzTGlzdC5hZGQoXCJhY3RpdmVcIik7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCIxMDBcIjpcbiAgICAgICAgICBjdXJDYXNoQnRuWzVdLmNsYXNzTGlzdC5hZGQoXCJhY3RpdmVcIik7XG4gICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICBkb25hdGVBbW91bnQudmFsdWUgPSBjYXNoO1xuICAgICAgICAgIGRvbmF0ZUFtb3VudC5mb2N1cygpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGN1ckNhc2hCdG4uZm9yRWFjaCgoYnRuKSA9PiB7XG4gICAgYnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT4ge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICBjdXJDYXNoQnRuLmZvckVhY2goKGJ0bikgPT4gYnRuLmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIikpO1xuICAgICAgZS50YXJnZXQuY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKTtcbiAgICB9KTtcbiAgfSk7XG5cbiAgZnVuY3Rpb24gY2xvc2VNb2RhbChzZWxlY3Rvcikge1xuICAgIHNlbGVjdG9yLmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIik7XG4gICAgYm9keS5zdHlsZS5wYWRkaW5nUmlnaHQgPSBcIjBweFwiO1xuICAgIGJvZHkuc3R5bGUub3ZlcmZsb3cgPSBcInZpc2libGVcIjtcblxuICAgIGN1ckNhc2hCdG4uZm9yRWFjaCgoYnRuKSA9PiB7XG4gICAgICBidG4uY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKTtcbiAgICB9KTtcblxuICAgIHBvcHVwSW5wdXRzLmZvckVhY2goKGlucHV0KSA9PiB7XG4gICAgICBpbnB1dC52YWx1ZSA9IFwiXCI7XG4gICAgfSk7XG5cbiAgICBpZiAoc2VsZWN0c0Fycikge1xuICAgICAgc2VsZWN0c0Fyci5mb3JFYWNoKChzZWxlY3QpID0+IHtcbiAgICAgICAgc2VsZWN0LmNsZWFyKCk7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBjb250ZW50MS5jbGFzc0xpc3QucmVtb3ZlKFwiaGlkZVwiKTtcbiAgICBjb250ZW50Mi5jbGFzc0xpc3QuYWRkKFwiaGlkZVwiKTtcbiAgICBjb250ZW50My5jbGFzc0xpc3QuYWRkKFwiaGlkZVwiKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNoZWNrTGVuZ3RoKGUsIG4pIHtcbiAgICBpZiAoZS50YXJnZXQudmFsdWUubGVuZ3RoID4gbikge1xuICAgICAgZS50YXJnZXQudmFsdWUgPSBlLnRhcmdldC52YWx1ZS5zbGljZSgwLCBuKTtcbiAgICB9XG4gIH1cblxuICBwb3B1cElucHV0cy5mb3JFYWNoKChpbnB1dCkgPT4ge1xuICAgIGlmIChpbnB1dC5kYXRhc2V0LmxpbWl0KSB7XG4gICAgICBpbnB1dC5vbmlucHV0ID0gKGUpID0+IHtcbiAgICAgICAgY2hlY2tMZW5ndGgoZSwgaW5wdXQuZGF0YXNldC5saW1pdCk7XG4gICAgICB9O1xuICAgIH1cbiAgfSk7XG5cbiAgYnV0dG9ucy5mb3JFYWNoKChidG4pID0+IHtcbiAgICBidG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB7XG4gICAgICBpZiAoZS50YXJnZXQpIGUucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgYWxsUG9wdXBzLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgaXRlbS5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xuICAgICAgfSk7XG5cbiAgICAgIGxldCBjYXNoID0gZS50YXJnZXQuZGF0YXNldC5jYXNoO1xuXG4gICAgICBpZiAoY2FzaCkge1xuICAgICAgICBzd2l0Y2ggKGNhc2gpIHtcbiAgICAgICAgICBjYXNlIFwiMjBcIjpcbiAgICAgICAgICAgIG9wZW5Nb2RhbChwb3B1cCwgY2FzaCk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlIFwiMzBcIjpcbiAgICAgICAgICAgIG9wZW5Nb2RhbChwb3B1cCwgY2FzaCk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlIFwiNTBcIjpcbiAgICAgICAgICAgIG9wZW5Nb2RhbChwb3B1cCwgY2FzaCk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlIFwiODBcIjpcbiAgICAgICAgICAgIG9wZW5Nb2RhbChwb3B1cCwgY2FzaCk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlIFwiMTAwXCI6XG4gICAgICAgICAgICBvcGVuTW9kYWwocG9wdXAsIGNhc2gpO1xuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgZG9uYXRlSW5wdXQuZm9yRWFjaCgoaW5wdXQpID0+IHtcbiAgICAgICAgICAgICAgY2FzaCA9IGlucHV0LnZhbHVlO1xuICAgICAgICAgICAgICBvcGVuTW9kYWwocG9wdXAsIGNhc2gpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgb3Blbk1vZGFsKHBvcHVwKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfSk7XG5cbiAgaWYgKGNsb3NlQnRuKSB7XG4gICAgY2xvc2VCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB7XG4gICAgICBpZiAoZS50YXJnZXQpIGUucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgYWxsUG9wdXBzLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgaXRlbS5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xuICAgICAgfSk7XG5cbiAgICAgIGNsb3NlTW9kYWwocG9wdXApO1xuICAgIH0pO1xuICB9XG5cbiAgZnVuY3Rpb24gdG9nZ2xlQ29udGVudChoaWRlQ29udGVudCwgc2hvd0NvbnRlbnQpIHtcbiAgICBoaWRlQ29udGVudC5jbGFzc0xpc3QuYWRkKFwiaGlkZVwiKTtcbiAgICBzaG93Q29udGVudC5jbGFzc0xpc3QucmVtb3ZlKFwiaGlkZVwiKTtcbiAgfVxuXG4gIGZpcnN0TmV4dC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4gdG9nZ2xlQ29udGVudChjb250ZW50MSwgY29udGVudDIpKTtcblxuICBzZWNvbmROZXh0LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB0b2dnbGVDb250ZW50KGNvbnRlbnQyLCBjb250ZW50MykpO1xuXG4gIGZpcnN0UHJldi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4gdG9nZ2xlQ29udGVudChjb250ZW50MiwgY29udGVudDEpKTtcblxuICBzZWNvbmRQcmV2LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB0b2dnbGVDb250ZW50KGNvbnRlbnQzLCBjb250ZW50MikpO1xuXG4gIG90aGVyQW1vdW50QnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT4ge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICBkb25hdGVBbW91bnQuZm9jdXMoKTtcbiAgfSk7XG5cbiAgc3BlY2lhbFBldC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IGUucHJldmVudERlZmF1bHQoKSk7XG5cbiAgcG9wdXAuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB7XG4gICAgY29uc3QgY2xvc2VBcmVhID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5wb3B1cF9fYm9keVwiKTtcblxuICAgIGNsb3NlQXJlYS5mb3JFYWNoKChhcmVhKSA9PiB7XG4gICAgICBpZiAoZS50YXJnZXQgPT09IGFyZWEgJiYgcG9wdXAuY2xhc3NMaXN0LmNvbnRhaW5zKFwiYWN0aXZlXCIpKSB7XG4gICAgICAgIGFsbFBvcHVwcy5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgICAgaXRlbS5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xuICAgICAgICB9KTtcblxuICAgICAgICBjbG9zZU1vZGFsKHBvcHVwKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfSk7XG59XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS4uLi4uLi4uLi4uLi4uLi4uLi4uLi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIFNlbGVjdFxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLi4uLi4uLi4uLi4uLi4uLi4uLi4uLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5jb25zdCBnZXRUZW1wbGF0ZSA9IChkYXRhID0gW10sIHBsYWNlaG9sZGVyKSA9PiB7XG4gIGNvbnN0IGl0ZW1zID0gZGF0YS5tYXAoKGl0ZW0pID0+IHtcbiAgICByZXR1cm4gYFxuICAgICAgPGxpIGNsYXNzPVwic2VsZWN0X19pdGVtXCIgZGF0YS10eXBlPVwiaXRlbVwiIGRhdGEtaWQ9XCIke2l0ZW0uaWR9XCI+JHtpdGVtLnZhbHVlfTwvbGk+XG4gICAgYDtcbiAgfSk7XG5cbiAgcmV0dXJuIGBcbiAgICA8ZGl2IGNsYXNzPVwic2VsZWN0X19iYWNrZHJvcFwiIGRhdGEtdHlwZT1cImJhY2tkcm9wXCI+PC9kaXY+XG4gICAgPGRpdiBjbGFzcz1cInNlbGVjdF9faW5wdXQtd3JhcFwiIGRhdGEtdHlwZT1cImlucHV0XCI+XG4gICAgICA8aW5wdXQgY2xhc3M9XCJwb3B1cF9faW5wdXQgc2VsZWN0X19pbnB1dCB0ZXh0XCIgdHlwZT1cInRleHRcIiBwbGFjZWhvbGRlcj1cIiR7cGxhY2Vob2xkZXJ9XCIgcmVhZG9ubHkgZGF0YS12YWx1ZT1cIlwiIGRhdGEtdHlwZT1cImlucHV0XCIvPlxuICAgIDwvZGl2PlxuICAgIDxkaXYgY2xhc3M9XCJzZWxlY3RfX2Ryb3Bkb3duXCI+XG4gICAgICA8dWwgY2xhc3M9XCJzZWxlY3RfX2xpc3RcIj5cbiAgICAgICAgJHtpdGVtcy5qb2luKFwiXCIpfVxuICAgICAgPC91bD5cbiAgICA8L2Rpdj5cbiAgICBgO1xufTtcblxuY2xhc3MgU2VsZWN0IHtcbiAgY29uc3RydWN0b3Ioc2VsZWN0b3IsIG9wdGlvbnMpIHtcbiAgICB0aGlzLiRlbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3IpO1xuICAgIHRoaXMub3B0aW9ucyA9IG9wdGlvbnM7XG4gICAgdGhpcy5zZWxlY3RlZElkID0gbnVsbDtcbiAgICB0aGlzLiRidXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnNwZWNpYWxQZXRcIik7XG5cbiAgICB0aGlzLiNyZW5kZXIoKTtcbiAgICB0aGlzLiNzZXR1cCgpO1xuICB9XG5cbiAgI3JlbmRlcigpIHtcbiAgICBjb25zdCB7cGxhY2Vob2xkZXIsIGRhdGF9ID0gdGhpcy5vcHRpb25zO1xuICAgIHRoaXMuJGVsLmNsYXNzTGlzdC5hZGQoXCJzZWxlY3RcIik7XG4gICAgdGhpcy4kZWwuaW5uZXJIVE1MID0gZ2V0VGVtcGxhdGUoZGF0YSwgcGxhY2Vob2xkZXIpO1xuICB9XG5cbiAgI3NldHVwKCkge1xuICAgIHRoaXMuY2xpY2tIYW5kbGVyID0gdGhpcy5jbGlja0hhbmRsZXIuYmluZCh0aGlzKTtcbiAgICB0aGlzLiRlbC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgdGhpcy5jbGlja0hhbmRsZXIpO1xuICAgIHRoaXMuJHZhbHVlID0gdGhpcy4kZWwucXVlcnlTZWxlY3RvcihcIltkYXRhLXZhbHVlXVwiKTtcbiAgfVxuXG4gIGNsaWNrSGFuZGxlcihlKSB7XG4gICAgY29uc3Qge3R5cGV9ID0gZS50YXJnZXQuZGF0YXNldDtcbiAgICBpZiAodHlwZSA9PT0gXCJpbnB1dFwiKSB7XG4gICAgICB0aGlzLnRvZ2dsZSgpO1xuICAgIH0gZWxzZSBpZiAodHlwZSA9PT0gXCJpdGVtXCIpIHtcbiAgICAgIGNvbnN0IGlkID0gZS50YXJnZXQuZGF0YXNldC5pZDtcbiAgICAgIHRoaXMuc2VsZWN0KGlkKTtcbiAgICB9IGVsc2UgaWYgKHR5cGUgPT09IFwiYmFja2Ryb3BcIikge1xuICAgICAgdGhpcy5jbG9zZSgpO1xuICAgIH1cbiAgfVxuXG4gIGdldCBpc09wZW4oKSB7XG4gICAgcmV0dXJuIHRoaXMuJGVsLmNsYXNzTGlzdC5jb250YWlucyhcIm9wZW5cIik7XG4gIH1cblxuICBnZXQgY3VycmVudCgpIHtcbiAgICByZXR1cm4gdGhpcy5vcHRpb25zLmRhdGEuZmluZCgoaXRlbSkgPT4gaXRlbS5pZCA9PT0gdGhpcy5zZWxlY3RlZElkKTtcbiAgfVxuXG4gIHNlbGVjdChpZCkge1xuICAgIHRoaXMuc2VsZWN0ZWRJZCA9IGlkO1xuICAgIHRoaXMuJHZhbHVlLnZhbHVlID0gdGhpcy5jdXJyZW50LnZhbHVlO1xuXG4gICAgdGhpcy4kZWwucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtdHlwZT1cIml0ZW1cIl0nKS5mb3JFYWNoKChlbCkgPT4ge1xuICAgICAgZWwuY2xhc3NMaXN0LnJlbW92ZShcInNlbGVjdGVkXCIpO1xuICAgIH0pO1xuICAgIHRoaXMuJGVsLnF1ZXJ5U2VsZWN0b3IoYFtkYXRhLWlkPVwiJHtpZH1cIl1gKS5jbGFzc0xpc3QuYWRkKFwic2VsZWN0ZWRcIik7XG4gICAgdGhpcy4kYnV0dG9uLmNsYXNzTGlzdC5hZGQoXCJhY3RpdmVcIik7XG5cbiAgICB0aGlzLmNsb3NlKCk7XG4gIH1cblxuICB0b2dnbGUoKSB7XG4gICAgdGhpcy5pc09wZW4gPyB0aGlzLmNsb3NlKCkgOiB0aGlzLm9wZW4oKTtcbiAgfVxuXG4gIG9wZW4oKSB7XG4gICAgdGhpcy4kZWwuY2xhc3NMaXN0LmFkZChcIm9wZW5cIik7XG4gIH1cblxuICBjbG9zZSgpIHtcbiAgICB0aGlzLiRlbC5jbGFzc0xpc3QucmVtb3ZlKFwib3BlblwiKTtcbiAgfVxuXG4gIGNsZWFyKCkge1xuICAgIHRoaXMuJHZhbHVlLnZhbHVlID0gXCJcIjtcbiAgfVxufVxuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0uLi4uLi4uLi4uLi4uLi4uLi4uLi4tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyBTbGlkZXJcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS4uLi4uLi4uLi4uLi4uLi4uLi4uLi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuZnVuY3Rpb24gc2xpZGVyKHtcbiAgICAgICAgICAgICAgICAgIGNvbnRhaW5lcixcbiAgICAgICAgICAgICAgICAgIHNsaWRlLFxuICAgICAgICAgICAgICAgICAgcHJldkFycm93LFxuICAgICAgICAgICAgICAgICAgbmV4dEFycm93LFxuICAgICAgICAgICAgICAgICAgZmllbGQsXG4gICAgICAgICAgICAgICAgICBudW1TbGlkZXNUb0NoYW5nZSxcbiAgICAgICAgICAgICAgICAgIHNsaWRlc1BlclZpZXcsXG4gICAgICAgICAgICAgICAgICBpbnRlcnZhbCA9IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgdGltZXIsXG4gICAgICAgICAgICAgICAgICB0aW1lckRlbGF5LFxuICAgICAgICAgICAgICAgICAgZGlyZWN0aW9uID0gXCJob3Jpem9udGFsXCIsXG4gICAgICAgICAgICAgICAgfSkge1xuICBjb25zdCBzbGlkZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGNvbnRhaW5lciksXG4gICAgc2xpZGVzRmllbGQgPSBzbGlkZXIucXVlcnlTZWxlY3RvckFsbChmaWVsZCksXG4gICAgc2xpZGVzID0gc2xpZGVzRmllbGRbMF0ucXVlcnlTZWxlY3RvckFsbChzbGlkZSksXG4gICAgbmV4dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IobmV4dEFycm93KTtcblxuICBjb25zdCBzbGlkZVdpZHRoID0gZGVsZXRlTm90RGlnaXRzKHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKHNsaWRlc1swXSkud2lkdGgpLFxuICAgIHNsaWRlTWFyZ2luID0gZGVsZXRlTm90RGlnaXRzKFxuICAgICAgd2luZG93LmdldENvbXB1dGVkU3R5bGUoc2xpZGVzWzBdKS5tYXJnaW5SaWdodFxuICAgICk7XG5cbiAgY29uc3Qgc2xpZGVIZWlnaHQgPSBkZWxldGVOb3REaWdpdHMoXG4gICAgd2luZG93LmdldENvbXB1dGVkU3R5bGUoc2xpZGVzWzBdKS5oZWlnaHRcbiAgKTtcblxuICBsZXQgb2Zmc2V0ID0gMCxcbiAgICBzbGlkZXJJbnRlcnZhbCxcbiAgICB2YWx1ZSxcbiAgICBwcmV2O1xuXG4gIGlmIChkaXJlY3Rpb24gPT09IFwiaG9yaXpvbnRhbFwiKSB7XG4gICAgdmFsdWUgPSAoc2xpZGVXaWR0aCArIHNsaWRlTWFyZ2luKSAqIG51bVNsaWRlc1RvQ2hhbmdlO1xuICB9IGVsc2UgaWYgKGRpcmVjdGlvbiA9PT0gXCJ2ZXJ0aWNhbFwiKSB7XG4gICAgdmFsdWUgPSBzbGlkZUhlaWdodCAqIG51bVNsaWRlc1RvQ2hhbmdlO1xuICB9XG5cbiAgaWYgKHByZXZBcnJvdykge1xuICAgIHByZXYgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHByZXZBcnJvdyk7XG4gIH1cblxuICBmdW5jdGlvbiBtb3ZlU2xpZGUoKSB7XG4gICAgc2xpZGVzRmllbGQuZm9yRWFjaCgoZmllbGQpID0+IHtcbiAgICAgIGlmIChkaXJlY3Rpb24gPT09IFwiaG9yaXpvbnRhbFwiKSB7XG4gICAgICAgIGZpZWxkLnN0eWxlLnRyYW5zZm9ybSA9IGB0cmFuc2xhdGVYKC0ke29mZnNldH1weClgO1xuICAgICAgfSBlbHNlIGlmIChkaXJlY3Rpb24gPT09IFwidmVydGljYWxcIikge1xuICAgICAgICBmaWVsZC5zdHlsZS50cmFuc2Zvcm0gPSBgdHJhbnNsYXRlWSgtJHtvZmZzZXR9cHgpYDtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGRlbGV0ZU5vdERpZ2l0cyhzdHIpIHtcbiAgICByZXR1cm4gK3N0ci5yZXBsYWNlKC9cXEQvZywgXCJcIik7XG4gIH1cblxuICBmdW5jdGlvbiBtb3ZlRm9yd2FyZCgpIHtcbiAgICBpZiAoXG4gICAgICBvZmZzZXQgPT1cbiAgICAgICh2YWx1ZSAqIChzbGlkZXMubGVuZ3RoIC0gc2xpZGVzUGVyVmlldykpIC8gbnVtU2xpZGVzVG9DaGFuZ2VcbiAgICApIHtcbiAgICAgIG9mZnNldCA9IDA7XG4gICAgfSBlbHNlIHtcbiAgICAgIG9mZnNldCArPSB2YWx1ZTtcbiAgICB9XG4gICAgbW92ZVNsaWRlKCk7XG4gIH1cblxuICBmdW5jdGlvbiBtb3ZlQmFjaygpIHtcbiAgICBpZiAob2Zmc2V0ID09IDApIHtcbiAgICAgIG9mZnNldCA9ICh2YWx1ZSAqIChzbGlkZXMubGVuZ3RoIC0gc2xpZGVzUGVyVmlldykpIC8gbnVtU2xpZGVzVG9DaGFuZ2U7XG4gICAgfSBlbHNlIHtcbiAgICAgIG9mZnNldCAtPSB2YWx1ZTtcbiAgICB9XG5cbiAgICBtb3ZlU2xpZGUoKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHNsaWRlclRpbWVvdXQoKSB7XG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICBtb3ZlRm9yd2FyZCgpO1xuICAgICAgc2xpZGVySW50ZXJ2YWwgPSBzZXRJbnRlcnZhbChtb3ZlRm9yd2FyZCwgdGltZXIgKiAxMDAwKTtcbiAgICB9LCB0aW1lckRlbGF5ICogMTAwMCk7XG4gIH1cblxuICBpZiAoaW50ZXJ2YWwpIHtcbiAgICBzbGlkZXJJbnRlcnZhbCA9IHNldEludGVydmFsKG1vdmVGb3J3YXJkLCB0aW1lciAqIDEwMDApO1xuXG4gICAgc2xpZGVyLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT4ge1xuICAgICAgbGV0IGN1cnJTbGlkZSA9IGUudGFyZ2V0LmNsb3Nlc3Qoc2xpZGUpO1xuXG4gICAgICBpZiAoc2xpZGVyLmNvbnRhaW5zKGN1cnJTbGlkZSkpIHtcbiAgICAgICAgY2xlYXJJbnRlcnZhbChzbGlkZXJJbnRlcnZhbCk7XG4gICAgICAgIHNsaWRlclRpbWVvdXQoKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIG5leHQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB7XG4gICAgaWYgKGludGVydmFsKSB7XG4gICAgICBjbGVhckludGVydmFsKHNsaWRlckludGVydmFsKTtcbiAgICAgIHNsaWRlclRpbWVvdXQoKTtcbiAgICB9XG5cbiAgICBtb3ZlRm9yd2FyZCgpO1xuICB9KTtcblxuICBpZiAocHJldkFycm93KSB7XG4gICAgcHJldi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgaWYgKGludGVydmFsKSB7XG4gICAgICAgIGNsZWFySW50ZXJ2YWwoc2xpZGVySW50ZXJ2YWwpO1xuICAgICAgICBzbGlkZXJUaW1lb3V0KCk7XG4gICAgICB9XG5cbiAgICAgIG1vdmVCYWNrKCk7XG4gICAgfSk7XG4gIH1cbn1cblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLi4uLi4uLi4uLi4uLi4uLi4uLi4uLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gU2lkZWJhclxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLi4uLi4uLi4uLi4uLi4uLi4uLi4uLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuY2xhc3MgU2lkZWJhciB7XG4gIGNvbnN0cnVjdG9yKHNlbGVjdG9yLCBhcnJvdykge1xuICAgIHRoaXMuJHNpZGViYXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHNlbGVjdG9yKTtcbiAgICB0aGlzLiRlbCA9IHRoaXMuJHNpZGViYXIucXVlcnlTZWxlY3RvcihhcnJvdyk7XG5cbiAgICB0aGlzLiNzZXR1cCgpO1xuICB9XG5cbiAgI3NldHVwKCkge1xuICAgIHRoaXMuY2xpY2tIYW5kbGVyID0gdGhpcy5jbGlja0hhbmRsZXIuYmluZCh0aGlzKTtcbiAgICB0aGlzLiRlbC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgdGhpcy5jbGlja0hhbmRsZXIpO1xuICB9XG5cbiAgY2xpY2tIYW5kbGVyKCkge1xuICAgIHRoaXMudG9nZ2xlKCk7XG4gIH1cblxuICBnZXQgaXNPcGVuKCkge1xuICAgIHJldHVybiB0aGlzLiRzaWRlYmFyLmNsYXNzTGlzdC5jb250YWlucyhcIm9wZW5cIik7XG4gIH1cblxuICB0b2dnbGUoKSB7XG4gICAgdGhpcy5pc09wZW4gPyB0aGlzLmNsb3NlKCkgOiB0aGlzLm9wZW4oKTtcbiAgfVxuXG4gIG9wZW4oKSB7XG4gICAgdGhpcy4kc2lkZWJhci5jbGFzc0xpc3QuYWRkKFwib3BlblwiKTtcbiAgfVxuXG4gIGNsb3NlKCkge1xuICAgIHRoaXMuJHNpZGViYXIuY2xhc3NMaXN0LnJlbW92ZShcIm9wZW5cIik7XG4gIH1cbn1cblxuXG4vLy8gQWN0aXZhdGUgYnVyZ2VyXG5cbmNvbnN0IGJ1cmdlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5idXJnZXInKTtcbmNvbnN0IGhlYWRlck1lbnUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaGVhZGVyX19tZW51JylcblxuYnVyZ2VyLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICBidXJnZXIuY2xhc3NMaXN0LnRvZ2dsZSgnYnVyZ2VyLS1hY3RpdmUnKTtcbiAgaGVhZGVyTWVudS5jbGFzc0xpc3QudG9nZ2xlKCdhY3RpdmUnKVxufSk7Il0sImZpbGUiOiJzY3JpcHQuanMifQ==
