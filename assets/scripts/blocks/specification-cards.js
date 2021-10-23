import anime from "animejs";

const animateDropdown = (item, action) => {
  action === "close" ? item.classList.remove("open") : item.classList.add("open");

  let container = item.querySelector(".specification-cards__content-container");

  if (action === "close") {
    container.style.height = item.querySelector(".specification-cards__content").offsetHeight + "px";
  }

  anime({
    targets: container,
    height: action === "close" ? 0 : item.querySelector(".specification-cards__content").offsetHeight,
    easing: "easeInSine",
    duration: 400,
    complete: () => {
      if (action === "open") {
        container.style.height = "auto";
      } else {
        container.removeAttribute("style");
      }
    },
  });
};

document.querySelectorAll(".specification-cards").forEach((section) => {
  section.querySelectorAll(".specification-cards__card-container").forEach((card, index) => {
    // index === 0 && animateDropdown(card, "open");

    card.querySelector(".specification-cards__mobile-opener").addEventListener("click", () => {
      const toggleDropdown = (e) => {
        section.querySelectorAll(".specification-cards__card-container").forEach((item) => {
          if (item.classList.contains("open")) {
            if (item !== card) {
              animateDropdown(item, "close");
            }
          }
        });
      };

      toggleDropdown();

      if (card.classList.contains("open")) {
        animateDropdown(card, "close");
      } else {
        animateDropdown(card, "open");

        anime({
          targets: document.querySelectorAll("html, body"),
          scrollTop: section.querySelector(".specification-cards__heading").getBoundingClientRect().bottom + window.scrollY - 100,
          easing: "cubicBezier(0.85, 0, 0.15, 1)",
          duration: 750,
        });
      }
    });
  });
});
