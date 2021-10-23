document.querySelectorAll(".pdp-header").forEach((header) => {
  let select = header.querySelector(".pdp-header__bottom__mobile-select");

  select.addEventListener("change", () => {
    window.location.href = select.value;
  });
});
