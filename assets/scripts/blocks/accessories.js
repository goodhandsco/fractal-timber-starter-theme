import Swiper, { Navigation, Pagination } from "swiper/core";

Swiper.use([Navigation, Pagination]);

document.querySelectorAll(".accessories").forEach((section) => {
  const popup = section.querySelector(".accessories__popup");

  const swiper = new Swiper(popup.querySelector(".swiper-container"), {
    spaceBetween: 35,
    slidesPerView: 1,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });

  window.swiper = swiper;

  section.querySelectorAll(".accessories__card").forEach((card) => {
    let button = card.querySelector(".accessories__card__button");

    button.addEventListener("click", () => {
      popup.classList.add("accessories__popup--open");

      swiper.slideTo(parseInt(button.getAttribute("data-card")), 0);
    });
  });

  popup.querySelectorAll(".accessories__popup__close-button").forEach((button) => {
    button.addEventListener("click", () => {
      popup.classList.remove("accessories__popup--open");

      window.setTimeout(() => {
        section.querySelectorAll(".accessories__popup-card__text").forEach((textContainer) => {
          textContainer.scrollTop = 0;
        });
      }, 300);
    });
  });

  section.querySelector(".accessories__popup__overlay").addEventListener("click", () => {
    popup.classList.remove("accessories__popup--open");
  });
});
