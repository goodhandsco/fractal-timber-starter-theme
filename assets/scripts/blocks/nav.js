import { globals } from "../utils";

document.querySelectorAll(".nav").forEach((el) => {
  let scrollOffset = 0;
  let navMargin = 0;
  let lastScroll = globals.scrollTop;
  const nav = el;

  let stickyNavMargin = 0;
  const stickyNav = document.querySelector(".pdp-header");

  if (stickyNav) {
    scrollOffset = document.querySelector(".usp-bar").offsetHeight;
  }

  const adjustNav = () => {
    let scrollDiff = globals.scrollTop - lastScroll;

    navMargin += scrollDiff;

    navMargin = Math.max(0, Math.min(navMargin, nav.offsetHeight));

    nav.style.marginTop = -navMargin + "px";

    lastScroll = globals.scrollTop;

    if (stickyNav) {
      stickyNavMargin += scrollDiff;
      stickyNavMargin = Math.max(0, Math.min(stickyNavMargin, stickyNav.offsetHeight - 14));

      stickyNav.style.transform = `translateY(-${stickyNavMargin}px)`;
    }
  };

  let isMobile = window.matchMedia("screen and (max-width: 768px)");

  const scrollFunction = () => {
    if (window.scrollY > scrollOffset) {
      adjustNav();
    }
  };

  isMobile.addEventListener("change", () => {
    if (isMobile.matches) {
      window.addEventListener("scroll", scrollFunction);
      if (stickyNav) {
        stickyNav.style.top = el.offsetHeight + "px";
      }
    } else if (isMobile.matches == false) {
      window.removeEventListener("scroll", scrollFunction);
      el.removeAttribute("style");

      stickyNav && stickyNav.removeAttribute("style");
    }
  });

  if (isMobile.matches) {
    if (stickyNav) {
      stickyNav.style.top = el.offsetHeight + "px";
    }

    window.addEventListener("scroll", scrollFunction);
  }
});
