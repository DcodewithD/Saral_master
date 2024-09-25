let inputs = document.querySelectorAll(".card-form input");
document.addEventListener("click", function (e) {
  if (
    e.target.classList.contains("variant-head") ||
    e.target.closest(".variant-head")
  ) {
    let el = e.target.classList.contains("variant-head")
      ? e.target
      : e.target.closest(".variant-head");
    el.closest(".dropdown").classList.toggle("open");
  }
});
inputs.forEach(function (el, ind) {
  el.addEventListener("change", function (e) {
    let data = JSON.parse(el.closest("form").querySelector("script").innerText);
    let formInput = el.closest("form").querySelector('input[name="id"]');
    let ajaxButton = el.closest("form").querySelector(".ajax-cart");
    let options = el.closest("form").querySelectorAll('input[type="radio"]');
    let image1 = el
      .closest(".product-card")
      .querySelector(".card-image-wrap img");
    let image2 = el.closest(".product-card").querySelector(".product-image-2");
    image2 ? (image2.style.display = "none") : "";
    let selectedOptions = [];
    let selectedOptionData;
    let available;
    image1 ? image1.setAttribute("backdrop-filter", "blur(1px)") : "";
    options.forEach(function (el, ind) {
      if (el.checked) {
        selectedOptions.push(el.value);
      }
    });
    data.variants.forEach(function (el, ind) {
      if (
        el.options.length == selectedOptions.length &&
        el.options.every((el) => selectedOptions.indexOf(el) != -1)
      ) {
        selectedOptionData = el;
      }
    });
    console.log(selectedOptionData);
    formInput.value = selectedOptionData.id;
    console.log(formInput);
    available = selectedOptionData.available;
    if (ajaxButton) {
      available
        ? ajaxButton.removeAttribute("disabled")
        : ajaxButton.setAttribute("disabled", true);
    }
    image1 &&
    selectedOptionData.featured_image &&
    selectedOptionData.featured_image.src
      ? image1.setAttribute("src", selectedOptionData.featured_image.src)
      : "";
    image1 &&
    selectedOptionData.featured_image &&
    selectedOptionData.featured_image.src
      ? image1.setAttribute("srcset", selectedOptionData.featured_image.src)
      : "";
    image1 ? image1.setAttribute("backdrop-filter", "blur(0px)") : "";
  });
});

const disableUnavailableVariantCollection = function () {
  var sizeInputs = document.querySelectorAll(".card-form input[type='radio']");
  sizeInputs.forEach((el,ind) => {
    let data2 = JSON.parse(el.closest("form").querySelector("script").innerText);
    let cardForm = el.closest("form");
    // console.log(data2)
    let allVariantsCollection = data2.variants;
    // console.log(allVariantsCollection)
    allVariantsCollection.forEach((ele,ind) => {
      if(!ele.available){
        let unavailavleVariantInput = cardForm.querySelector(`.card-option input[value='${ele.option1}']`)
        let unavailavleVariantInputId = unavailavleVariantInput.getAttribute("id");
        let unavailavleVariantLabel = cardForm.querySelector(`.card-option label[for='${unavailavleVariantInputId}']`);

        unavailavleVariantInput.setAttribute("disabled","true");
        unavailavleVariantLabel.classList.add("disableTrue");        
      }
    })
  })
}

disableUnavailableVariantCollection();