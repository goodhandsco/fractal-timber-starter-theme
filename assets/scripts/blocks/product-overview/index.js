import photoSwipe from "./product-overview-photo-swipe";
import stickyBottom from "./sticky-bottom";

let mobileGalleryInitialized = false;

document.querySelectorAll(".product-overview").forEach((el) => {
  el.querySelectorAll(".product-overview__thumbnail-nav li button").forEach((button) => {
    button.addEventListener("click", () => {
      if (!button.classList.contains("active")) {
        el.querySelector(".product-overview__thumbnail-nav li button.active").classList.remove("active");

        button.classList.add("active");

        let imageUrl = button.getAttribute("data-full");

        el.querySelector(".product-overview__desktop-image").setAttribute("src", imageUrl);
      }
    });
  });

  // mobile gallery
  let mdbp = window.matchMedia("screen and (max-width: 980px)");

  const initPhotoSwipe = () => {
    if (mdbp.matches && !mobileGalleryInitialized) {
      photoSwipe(el);
      mobileGalleryInitialized = true;
    }
  };

  window.addEventListener("resize", initPhotoSwipe);

  initPhotoSwipe();
});
var productOverviewStickyMenu = document.getElementsByClassName('product-overview__sticky-bar');

if(productOverviewStickyMenu.length > 0) {
  // sticky bottom elements
  stickyBottom();
}
