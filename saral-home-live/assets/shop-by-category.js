let categoryBlocks = document.querySelectorAll(
  ".shop-by-category-section .category-block"
);
let categoryHeads = document.querySelectorAll(
  ".shop-by-category-section .category-head"
);
categoryHeads.forEach((el, ind) => {
  el.addEventListener("click", () => {
    let headButton = el;
    let targetId = el.dataset.block;
    categoryHeads.forEach((el, ind) => {
      headButton == el
        ? el.classList.add("active")
        : el.classList.remove("active");
    });
    categoryBlocks.forEach((el, ind) => {
      if (el.dataset.id == targetId) {
        el.classList.add("active");
        console.log("class added");
        el.style.opacity = "0";
        setTimeout(() => {
          el.style.opacity = "1";
        });
      } else {
        el.classList.remove("active");
      }
    });
  });
});
