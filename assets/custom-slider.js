
function CardSlider(obj){
  this.sliderObject = obj;
  this.direction = true;
  this.auto = true;
  this.timeouts = [];
}
CardSlider.prototype.slide = function(){
  ////////// slider intialize
  let object = this.sliderObject;

  console.log("object", object);
  
  this.parent = document.querySelector(object.parent);
  this.sliderBlocks = document.querySelectorAll(`${object.parent}>div`);
  this.wrapper = document.createElement("div");
  this.wrapper.classList.add("custom-slide-init");
  this.parent.classList.add("custom-slide-wrapper");
  this.parent.parentNode.insertBefore(this.wrapper,this.parent);
  this.wrapper.appendChild(this.parent);
  this.wrapper.classList.add(`custom-slide-count-${object.slidesToShow}`);
    this.sliderBlocks.forEach(function(el,ind){
    el.classList.add("custom-slider-block");
  })
  /////////////////////////////////////////////////////////////////// if responsive is enabled
  this.responsiveArray = object.responsive?.length >= 0 ? object.responsive :
    [
     {
       breakpoint:[991,"auto"],
       arrows:true,
       slidesToShow:2,
       slidesToScroll:1,
     },
     {
       breakpoint:[481,990],
       arrows:true,
       slidesToShow:2,
       slidesToScroll:1,
     },
     {
       breakpoint:[0,480],
       arrows:true,
       slidesToShow:1,
       slidesToScroll:1
     }
   ];
  this.startSlider();
  this.startDots();
  this.arrows();
  this.autoplay();
  this.sliderTouch();
  window.addEventListener("resize",()=>{
   const slide = this.startSlider.bind(this);
   const dots = this.startDots.bind(this);
   const arrow = this.arrows.bind(this);
    dots();
    slide();
    arrow();
  })
}
CardSlider.prototype.startSlider = function(){
  let windowWidth = window.innerWidth;
  let sliderBlocks = this.sliderBlocks;
  let parent = this.parent;
    this.responsiveArray.forEach(function(el,ind){
        if(window.matchMedia(`(min-width:${el.breakpoint[0]}px) and (max-width: ${el.breakpoint[1] == "auto" ? '5000' : el.breakpoint[1]}px)`).matches){
          let dataObj = el;
          parent.setAttribute("style",`gap:${dataObj.gap}px;`)
          let {slidesToShow,slidesToScroll} = el;
            sliderBlocks.forEach(function(el,ind){
            el.setAttribute("style",`flex:0 0 calc(${100/slidesToShow}% - ${dataObj.gap*(slidesToShow-1)/slidesToShow}px);max-width:calc(${100/slidesToShow}% - ${dataObj.gap*(slidesToShow-1)/slidesToShow}px);`)
          })
        }
    })
}
CardSlider.prototype.startDots = function(){
  let object = this.sliderObject;
  let wrapper = this.wrapper;
  let parent = this.parent;
  let stopAutoplay = this.stopAutoplay.bind(this);
  let dotsHtml = `<div class="custom-dots-wrapper"></div>`;
  wrapper.insertAdjacentHTML("beforeend",dotsHtml);
  let wrapperWidth = wrapper.clientWidth;
  let totalWidth = this.wrapper.querySelector(".custom-slider-block").clientWidth * this.wrapper.querySelectorAll(".custom-slider-block").length;
    this.responsiveArray.forEach(function(el,ind){
      if(window.matchMedia(`(min-width:${el.breakpoint[0]}px) and (max-width: ${el.breakpoint[1] == "auto" ? '5000' : el.breakpoint[1]}px)`).matches){
          let dotsCount =  Math.floor(totalWidth/wrapper.querySelector(".custom-slider-block").clientWidth) - (el.slidesToShow-1) ;
          wrapper.querySelector(".custom-dots-wrapper").innerHTML = "";
          if (!el.dots) return;
          for(let i = 0; i< dotsCount; i++){
            wrapper.querySelector(".custom-dots-wrapper").insertAdjacentHTML("beforeend","<div class='custom-dot'></div>");
          }
          const getActiveDot = () =>{
            let activeDotCount = Math.floor(parent.scrollLeft/wrapper.querySelector(".custom-slider-block").clientWidth);
              Array.from(wrapper.querySelectorAll(".custom-dot")).forEach((el,ind)=>{
                ind == activeDotCount ? el.classList.add("active") : el.classList.remove("active");
              })
          }
          getActiveDot();
          parent.addEventListener("scroll",()=>{
             getActiveDot();
          })
          Array.from(wrapper.querySelectorAll(".custom-dot")).forEach((el,ind)=>{
            el.addEventListener("click",()=>{
              stopAutoplay()
              parent.scrollLeft = wrapper.querySelector(".custom-slider-block").clientWidth * ind;
            })
          })
      }
    })
}
CardSlider.prototype.arrows = function(){
  let object = this.sliderObject;
  let wrapper = this.wrapper;
  let parent = this.parent;
  let direction = object.direction;
  let stopAutoPlay = this.stopAutoplay.bind(this);
  this.responsiveArray.forEach(function(el,ind){
    if(window.matchMedia(`(min-width:${el.breakpoint[0]}px) and (max-width: ${el.breakpoint[1] == "auto" ? '5000' : el.breakpoint[1]}px)`).matches){
        wrapper.insertAdjacentHTML("beforeend","<div class='custom-arrows'></div>");
        wrapper.querySelector(".custom-arrows").innerHTML = "";
        if(el.arrows){
           let arrowHtml = `<button class='custom-arrow-prev prev-slide'><svg aria-hidden="true" focusable="false" role="presentation" class="icon icon-caret" viewBox="0 0 10 6">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M9.354.646a.5.5 0 00-.708 0L5 4.293 1.354.646a.5.5 0 00-.708.708l4 4a.5.5 0 00.708 0l4-4a.5.5 0 000-.708z" fill="currentColor"></svg></button><button class='custom-arrow-next next-slide'><svg aria-hidden="true" focusable="false" role="presentation" class="icon icon-caret" viewBox="0 0 10 6">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M9.354.646a.5.5 0 00-.708 0L5 4.293 1.354.646a.5.5 0 00-.708.708l4 4a.5.5 0 00.708 0l4-4a.5.5 0 000-.708z" fill="currentColor"></svg></button>`
          wrapper.querySelector(".custom-arrows").insertAdjacentHTML("beforeend",arrowHtml);
          parent.addEventListener("scroll",function(){
            let scrollLeftVal = parent.scrollLeft == 0 ? 0 : parent.scrollLeft+(wrapper.querySelector(".custom-slider-block").clientWidth*el.slidesToShow)+(el.gap*(el.slidesToShow-1));
            if(scrollLeftVal == 0){
              wrapper.querySelector(".custom-arrows .prev-slide").setAttribute("disabled","disabled");
              wrapper.querySelector(".custom-arrows .next-slide").removeAttribute("disabled");
            }else if(scrollLeftVal == parent.scrollWidth){
              wrapper.querySelector(".custom-arrows .next-slide").setAttribute("disabled","disabled");
              wrapper.querySelector(".custom-arrows .prev-slide").removeAttribute("disabled");
            }else if(scrollLeftVal > 0 && scrollLeftVal < parent.scrollWidth){
              wrapper.querySelector(".custom-arrows .prev-slide").removeAttribute("disabled");
              wrapper.querySelector(".custom-arrows .next-slide").removeAttribute("disabled");
            }
          })
        }
    }
  })
  wrapper.querySelectorAll(".custom-arrows button").forEach((el,ind)=>{
    el.addEventListener("click",function(){
      stopAutoPlay();
      if(el.classList.contains("next-slide")){
        parent.scrollLeft += wrapper.querySelector(".custom-slider-block").clientWidth;
      }else if(el.classList.contains("prev-slide")){
        parent.scrollLeft -= wrapper.querySelector(".custom-slider-block").clientWidth;
      }
    })
  })
}
CardSlider.prototype.autoplay = function(){
  let object = this.sliderObject;
  let parent = this.parent;
  let wrapper = this.wrapper;
  let auto = this.auto;
  this.responsiveArray.forEach((el,ind)=>{
    if(window.matchMedia(`(min-width:${el.breakpoint[0]}px) and (max-width: ${el.breakpoint[1] == "auto" ? '5000' : el.breakpoint[1]}px)`).matches){
       if(!el.autoplay || !this.auto) return;
        let elem = el;
        let direction = true;
       setInterval(()=>{
         if(!this.auto) return
         console.log(this.auto,"auto here")
         let scrollLeftVal = parent.scrollLeft == 0 ? 0 : parent.scrollLeft+(wrapper.querySelector(".custom-slider-block").clientWidth*elem.slidesToShow)+(elem.gap*(elem.slidesToShow-1));
         if(scrollLeftVal == parent.scrollWidth){
           direction = false;
         }else if(scrollLeftVal == 0){
           direction = true;
         }
        direction ? parent.scrollLeft += wrapper.querySelector(".custom-slider-block").clientWidth : parent.scrollLeft -= wrapper.querySelector(".custom-slider-block").clientWidth;
       },elem.time)
    }
  })
}
CardSlider.prototype.stopAutoplay = function(){
  this.auto = false;
  this.timeouts.forEach((el,ind)=>clearTimeout(el));
  var timeoutId = setTimeout(()=>{
    this.auto = true;
  },5000);
  this.timeouts.push(timeoutId);
}
CardSlider.prototype.sliderTouch = function(){
  let stopAutoPlay = this.stopAutoplay.bind(this);
  this.parent.addEventListener("touchstart",()=>{
    stopAutoPlay();
  })
}


new CardSlider({
    parent:".categories-block-wrap>.category-block:nth-child(1) .category-block-cards-wrapper",
    slidesToShow:1,
    slidesToScroll:1,
    autoplay:false,
    arrows:true,
    dots:false,
    responsive:[
      {
        breakpoint:[991,"auto"],
        arrows:true,
        slidesToShow:3,
        slidesToScroll:3,
        gap:20,
        dots:false,
        time:1000,
        autoplay:false
      },
      {
        breakpoint:[481,990],
        arrows:true,
        slidesToShow:2,
        slidesToScroll:2,
        gap:20,
        dots:false,
        time:2000,
        autoplay:false
      },
      {
        breakpoint:[0,480],
        arrows:true,
        slidesToShow:2,
        slidesToScroll:2,
        gap:20,
        arrows:false,
        dots:false,
        time:2000,
        autoplay:false
      }
    ]
  }).slide();

new CardSlider({
    parent:".categories-block-wrap>.category-block:nth-child(2) .category-block-cards-wrapper",
    slidesToShow:1,
    slidesToScroll:1,
    autoplay:false,
    arrows:true,
    dots:false,
    responsive:[
      {
        breakpoint:[991,"auto"],
        arrows:true,
        slidesToShow:3,
        slidesToScroll:3,
        gap:20,
        dots:false,
        time:1000,
        autoplay:false
      },
      {
        breakpoint:[481,990],
        arrows:true,
        slidesToShow:2,
        slidesToScroll:2,
        gap:20,
        dots:false,
        time:2000,
        autoplay:false
      },
      {
        breakpoint:[0,480],
        arrows:true,
        slidesToShow:2,
        slidesToScroll:2,
        gap:20,
        arrows:false,
        dots:false,
        time:2000,
        autoplay:false
      }
    ]
  }).slide();

new CardSlider({
    parent:".categories-block-wrap>.category-block:nth-child(3) .category-block-cards-wrapper",
    slidesToShow:1,
    slidesToScroll:1,
    autoplay:false,
    arrows:true,
    dots:false,
    responsive:[
      {
        breakpoint:[991,"auto"],
        arrows:true,
        slidesToShow:3,
        slidesToScroll:3,
        gap:20,
        dots:false,
        time:1000,
        autoplay:false
      },
      {
        breakpoint:[481,990],
        arrows:true,
        slidesToShow:2,
        slidesToScroll:2,
        gap:20,
        dots:false,
        time:2000,
        autoplay:false
      },
      {
        breakpoint:[0,480],
        arrows:true,
        slidesToShow:2,
        slidesToScroll:2,
        gap:20,
        arrows:false,
        dots:false,
        time:2000,
        autoplay:false
      }
    ]
  }).slide();

