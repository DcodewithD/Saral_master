function productSlider(options) {
  let sliderObject;
  let autoPlay;
  ////////////////////Scroll
  const scrollStart = (wrapper, next, index) => {
    let slideBlocks = wrapper.querySelectorAll(".slide-block");
    let slideWidth = slideBlocks[0].clientWidth;
    if (!index) {
      wrapper.scrollLeft = next
        ? wrapper.scrollLeft + slideWidth
        : wrapper.scrollLeft - slideWidth;
    } else {
      wrapper.scrollLeft = slideWidth * index;
    }
  };
  /////////////////dots
  const sliderDots = (scrollableSlides, wrapper) => {
    let sliderDotsHtml = `<div class="slider-dots-wrapper"></div>`;
    !wrapper.querySelector(".slider-dots-wrapper")
      ? wrapper.insertAdjacentHTML("beforeend", sliderDotsHtml)
      : "";
    wrapper.querySelector(".slider-dots-wrapper").innerHTML = "";
    for (let i = 0; i <= scrollableSlides; i++) {
      wrapper
        .querySelector(".slider-dots-wrapper")
        .insertAdjacentHTML(
          "beforeend",
          `<div class="slide-dot ${i == 0 ? "active" : ""}"></div>`
        );
    }
    let slideDots = Array.from(wrapper.querySelectorAll(".slide-dot"));
    slideDots.forEach(function (el, ind) {
      el.addEventListener("click", function () {
        let dot = el;
        scrollStart(wrapper, false, ind);
        slideDots.forEach((el, ind) => {
          el == dot
            ? el.classList.add("active")
            : el.classList.remove("active");
        });
      });
    });
  };
  //////// arrows
  const arrows = (wrapper) => {
    let arrowsHtml = `<div class="slider__arrows">
        <button class="previous__slide" aria-label="slider-previous-button">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="8"
            height="14"
            viewBox="0 0 8 14"
            fill="none"
          >
            <path
              d="M1 13L7 7L1 1"
              stroke="#1E1E1E"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>
        <button class="next__slide" aria-label="slider-next-button">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="8"
            height="14"
            viewBox="0 0 8 14"
            fill="none"
          >
            <path
              d="M1 13L7 7L1 1"
              stroke="#1E1E1E"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>
      </div>`;
    !wrapper.querySelector(".slider__arrows")
      ? wrapper.insertAdjacentHTML("beforeend", arrowsHtml)
      : "";
    wrapper
      .querySelector(".previous__slide")
      .addEventListener("click", function () {
        let next = false;
        scrollStart(wrapper, next);
      });
    wrapper
      .querySelector(".next__slide")
      .addEventListener("click", function () {
        let next = true;
        scrollStart(wrapper, true);
      });
  };
  /////////////////slide init
  let sliderObj = options;
  const slide = (sliderObj) => {
    sliderObject = sliderObj;
    sliderObject.autoPlay ? (autoPlay = true) : (autoPlay = false);
    let slide = false;
    let sliderParams = { ...sliderObject };
    let sliderWrapper = document.querySelector(sliderParams.parent);
    let slideBlocks = document.querySelector(sliderParams.parent).children;
    sliderWrapper.scrollLeft = 0;
    slide =
      sliderWrapper.scrollWidth > sliderWrapper.clientWidth ? true : false;
    if (!slide) return false;
    sliderWrapper.classList.add("slide-init");
    Array.from(slideBlocks).forEach((el, ind) =>
      el.classList.add("slide-block")
    );
    let scrollableSlides = Math.floor(
      (sliderWrapper.scrollWidth - sliderWrapper.clientWidth) /
        slideBlocks[0].clientWidth
    );
    if (sliderParams.dots) sliderDots(scrollableSlides, sliderWrapper);
    if (sliderParams.arrows) arrows(sliderWrapper);
    ///////////////Dots
    if (sliderObject.dots) {
      let wrapper = document.querySelector(sliderObject.parent);
      wrapper.addEventListener("scroll", function () {
        let slide = wrapper.querySelector(".slide-block");
        let slideWidth = slide.clientWidth;
        let scrollVal = Math.floor(wrapper.scrollLeft / slideWidth) + 1;
        Array.from(wrapper.querySelectorAll(".slide-dot")).forEach((el, ind) =>
          ind + 1 == scrollVal
            ? el.classList.add("active")
            : el.classList.remove("active")
        );
      });
    }
  };
  slide(sliderObj);
}
