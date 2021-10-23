import anime from "animejs";

document.querySelectorAll(".plp-range").forEach((section) => {
  section.querySelectorAll(".plp-range__sticky-col__link").forEach((link) => {
    link.addEventListener("click", (e) => {
      if(link.getAttribute("href").startsWith("#")) {
        e.preventDefault();

        const scrollTo = section.querySelector(link.getAttribute("href")).offsetTop;

        anime({
          targets: document.querySelectorAll("html, body"),
          scrollTop: scrollTo,
          easing: "cubicBezier(0.85, 0, 0.15, 1)",
          duration: 750,
        });
      }
    });
  });

  // toggle active menu links on scroll

  let scrollersArray = [];

  const scrollOffsetArray = () => {
    scrollersArray = [];

    section.querySelectorAll(".plp-range__single-block").forEach((block) => {
      scrollersArray.push(block.offsetTop);
    });
  };

  window.addEventListener("resize", () => {
    scrollOffsetArray();
  });

  window.addEventListener("load", () => {
    scrollOffsetArray();
  });

  scrollOffsetArray();

  var adjustNav = function() {
    for (var i = 0; i < scrollersArray.length; i++) {
      if (window.scrollY + window.innerHeight / 2 > scrollersArray[i]) {
        let targetScroller = section.querySelectorAll(".plp-range__sticky-col__link")[i];

        section.querySelectorAll(".plp-range__sticky-col__link").forEach((link) => {
          link.classList.remove("plp-range__sticky-col__link--active");
        });

        targetScroller.classList.add("plp-range__sticky-col__link--active");
      }
    }
  };

  window.addEventListener("scroll", () => {
    adjustNav();
  });

  window.addEventListener("load", () => {
    adjustNav();
  });

  window.addEventListener("resize", () => {
    adjustNav();
  });
});
