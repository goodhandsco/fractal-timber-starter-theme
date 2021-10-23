import tippy from "tippy.js";
import "tippy.js/dist/tippy.css";
import "tippy.js/animations/shift-away-subtle.css";

document.querySelectorAll(".tooltip").forEach((tooltip) => {
  tippy(tooltip, {
    animation: "shift-away-subtle",
  });
});
