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
