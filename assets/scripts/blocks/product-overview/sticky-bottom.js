import { globals } from "../../utils";

const stickyBottom = () => {
  const stickyButtons = document.querySelector(".product-overview__sticky-bar");

  let stickyButtonsMargin = 0;
  let lastScroll = globals.scrollTop + stickyButtons.offsetHeight;

  const adjuststickyButtons = () => {
    let scrollDiff = globals.scrollTop - lastScroll;

    stickyButtonsMargin -= scrollDiff;

    stickyButtonsMargin = Math.max(0, Math.min(stickyButtonsMargin, stickyButtons.offsetHeight));

    stickyButtons.style.marginBottom = -stickyButtonsMargin + "px";

    lastScroll = globals.scrollTop;
  };

  adjuststickyButtons();

  window.addEventListener("scroll", adjuststickyButtons);
};

export default stickyBottom;
