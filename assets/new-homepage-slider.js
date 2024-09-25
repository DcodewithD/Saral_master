const arrowNext = document.querySelector(".next-slide");
const arrowPrev = document.querySelector(".prev-slide");
const slides = document.querySelectorAll(".slider-block");
const slideWrap = document.querySelector(".slide-content");
let auto = true;
let sliderDots = document.querySelectorAll(".slider-dot");
const slide = (slideIndex) => {
  let slideWidth = slides[0].getBoundingClientRect().width;
  let slideValue = slideIndex * slideWidth;
  slideWrap.scrollLeft = slideValue;
  slides.forEach(function (el, ind) {
    let matchIndex = slideIndex;
    ind == matchIndex
      ? el.classList.add("active")
      : el.classList.remove("active");
  });
  updateDots(slideIndex);
};
const updateDots = (index) => {
  if (!sliderDots) return false;
  sliderDots.forEach(function (el, ind) {
    ind == index ? el.classList.add("active") : el.classList.remove("active");
  });
};
const slideCallback = (next) => {
  let currentActiveIndex;
  slides.forEach((el, ind) => {
    if (el.classList.contains("active")) {
      currentActiveIndex = ind;
    }
  });
  let nextSlide = next
    ? slides[currentActiveIndex + 1]
    : slides[currentActiveIndex - 1];
  let nextSlideIndex = next
    ? [currentActiveIndex + 1]
    : [currentActiveIndex - 1];
  nextSlide ? slide(nextSlideIndex) : "";
};
arrowNext.addEventListener("click", function () {
  slideCallback(true);
  auto = false;
});
arrowPrev.addEventListener("click", function () {
  slideCallback(false);
  auto = false;
});
sliderDots.forEach(function (el, ind) {
  el.addEventListener("click", function () {
    slide(Number(el.dataset.index));
  });
});
slideWrap.addEventListener("scroll", function () {
  let scrollIndex = this.scrollLeft / slides[0].getBoundingClientRect().width;
  if (Number.isInteger(scrollIndex) || scrollIndex == 0) {
    updateDots(scrollIndex);
  }
});
let activeDot;
setInterval(()=>{
  if(activeDot == document.querySelectorAll('.slider-dot').length -1){
    arrowPrev.click();
  }else{
    arrowNext.click();  
  }
  document.querySelectorAll('.slider-dot').forEach((el,ind)=>{
    if(el.classList.contains('active')){
      activeDot =  ind;
    }
  })
},5000)