import anime from "animejs";

document.querySelectorAll(".variation-tabs").forEach((section) => {
  const animateDropdown = (item, action) => {
    action === "close" ? item.classList.remove("variation-tabs__bottom__controls-container--mobile-open") : item.classList.add("variation-tabs__bottom__controls-container--mobile-open");

    let container = item.querySelector(".variation-tabs__bottom__controls-content");

    if (action === "close") {
      container.style.height = item.querySelector(".row").offsetHeight + "px";
    }

    anime({
      targets: container,
      height: action === "close" ? 0 : item.querySelector(".row").offsetHeight,
      easing: "easeInSine",
      duration: 400,
      complete: () => {
        if (action === "open") {
          container.style.height = "auto";
        }
      },
    });
  };

  const changeContent = (content) => {
    const contentContainer = section.querySelector(".variation-tabs__bottom-content");

    contentContainer.style.height = contentContainer.offsetHeight + "px";

    anime({
      targets: contentContainer,
      translateY: 20,
      opacity: 0,
      easing: "easeInQuad",
      duration: 400,
      complete: () => {
        contentContainer.innerHTML = "";
        contentContainer.appendChild(content.cloneNode(true));

        anime({
          targets: contentContainer,
          translateY: 0,
          opacity: 1,
          height: contentContainer.querySelector(".variation-tabs__bottom__controls-content").offsetHeight,
          easing: "easeOutQuad",
          duration: 400,
          delay: 200,
        });
      },
    });
  };

  section.querySelectorAll(".variation-tabs__bottom__control").forEach((tab) => {
    tab.addEventListener("click", () => {
      const contentToFill = tab.closest(".variation-tabs__bottom__controls-container").querySelector(".variation-tabs__bottom__controls-content");

      // desktop
      if (window.matchMedia("screen and (min-width: 768px)").matches) {
        if (!tab.classList.contains("variation-tabs__bottom__control--active")) {
          section.querySelectorAll(".variation-tabs__bottom__control").forEach((item) => {
            item.classList.remove("variation-tabs__bottom__control--active");
          });

          tab.classList.add("variation-tabs__bottom__control--active");

          changeContent(contentToFill);
        }
      }

      // mobile

      if (window.matchMedia("screen and (max-width: 767px)").matches) {
        const parentEl = tab.closest(".variation-tabs__bottom__controls-container");

        const closeOthers = () => {
          section.querySelectorAll(".variation-tabs__bottom__controls-container").forEach((item) => {
            if (item.classList.contains("variation-tabs__bottom__controls-container--mobile-open")) {
              animateDropdown(item, "close");
            }
          });
        };

        if (parentEl.classList.contains("variation-tabs__bottom__controls-container--mobile-open")) {
          animateDropdown(parentEl, "close");
        } else {
          closeOthers();
          animateDropdown(parentEl, "open");
        }
      }
    });
  });
});
