import anime from "animejs";

const animateDropdown = (item, action) => {
  action === "close" ? item.classList.remove("open") : item.classList.add("open");

  let container = item.querySelector(".section-faq__question__content-container");

  if (action === "close") {
    container.style.height = item.querySelector(".section-faq__question__content").offsetHeight + "px";
  }

  anime({
    targets: container,
    height: action === "close" ? 0 : item.querySelector(".section-faq__question__content").offsetHeight,
    easing: "easeInSine",
    duration: 400,
    complete: () => {
      if (action === "open") {
        container.style.height = "auto";
      }
    },
  });
};

document.querySelectorAll(".section-faq").forEach((section) => {
  section.querySelectorAll(".section-faq__question").forEach((question, index) => {
    index === 0 && animateDropdown(question, "open");

    question.querySelector(".section-faq__question__title").addEventListener("click", () => {
      const toggleDropdown = (e) => {
        document.querySelectorAll(".section-faq__question").forEach((item) => {
          if (item.classList.contains("open")) {
            if (item !== question) {
              animateDropdown(item, "close");
            }
          }
        });
      };

      toggleDropdown();

      if (question.classList.contains("open")) {
        animateDropdown(question, "close");
      } else {
        animateDropdown(question, "open");
      }
    });
  });
});
