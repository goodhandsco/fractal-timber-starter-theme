import PhotoSwipe from "photoswipe";
import PhotoSwipeUI_Default from "photoswipe/dist/photoswipe-ui-default";

const photoSwipe = function(el) {
  var pswpElement = el.querySelector(".pswp");

  var items = [];

  el.querySelectorAll(".product-overview__mobile-gallery-images img").forEach((img) => {
    items.push({
      src: img.getAttribute("data-src"),
      w: 1200,
      h: 1200,
    });
  });

  var options = {
    escKey: false,
    history: false,
    focus: false,
    modal: false,
    closeOnScroll: false,
    showHideOpacity: true,
    closeOnVerticalDrag: false,
  };

  var gallery = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, items, options);
  gallery.init();

  const pagination = () => {
    const container = el.querySelector(".pswp");

    const paginationEl = document.createElement("div");
    paginationEl.classList.add("pswp__pagination");

    for (var i = 0; i < el.querySelectorAll(".product-overview__mobile-gallery-images img").length; i++) {
      let button = document.createElement("button");
      button.setAttribute("data-goto", i);

      button.addEventListener("click", () => {
        gallery.goTo(parseInt(button.getAttribute("data-goto")));
      });

      if (i == 0) {
        button.classList.add("active");
      }

      paginationEl.appendChild(button);
    }

    container.append(paginationEl);
  };

  pagination();

  gallery.listen("afterChange", () => {
    el.querySelectorAll(".pswp__pagination button").forEach((item, index) => {
      item.classList.remove("active");

      index == gallery.getCurrentIndex() && item.classList.add("active");
    });
  });
};

export default photoSwipe;
