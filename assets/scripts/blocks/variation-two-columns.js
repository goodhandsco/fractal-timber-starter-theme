document.querySelectorAll(".variation-two-columns").forEach((el) => {
  let descriptions = el.querySelector(".variation-two-columns__descriptions-inner-container");
  let descriptionAmount = el.querySelectorAll(".variation-two-columns__descriptions__description").length;

  descriptions.style.width = descriptionAmount * 100 + "%";

  descriptions.addEventListener("transitionend", () => {
    descriptions.classList.remove("is-animating");
  });

  el.querySelectorAll(".variation-two-columns__variants__single").forEach((button) => {
    button.addEventListener("click", () => {
      if (!button.classList.contains("variation-two-columns__variants__single--selected")) {
        el.querySelector(".variation-two-columns__variants__single--selected").classList.remove("variation-two-columns__variants__single--selected");

        button.classList.add("variation-two-columns__variants__single--selected");

        let imageUrl = button.getAttribute("data-full");

        el.querySelector(".variation-two-columns__main-image").setAttribute("src", imageUrl);

        let targetStep = parseInt(button.getAttribute("data-button")) - 1;

        descriptions.style.transform = `translateX(${(-100 / descriptionAmount) * targetStep}%)`;

        descriptions.classList.add("is-animating");
      }
    });
  });
});
