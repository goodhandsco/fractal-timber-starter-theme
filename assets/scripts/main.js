import "../styles/main.scss";

(function($) {
  var initializeBlock = function($block) {
    //add scripts related to blocks
  };

  $(document).ready(function() {
    initializeBlock();

    $("body").addClass("loaded");

    $(".menu-trigger").on("click", function() {
      $(this).toggleClass("active");
      $(".mobile-menu").toggleClass("active");
    });

    $(window).scroll(function() {
      var sticky = $(".header"),
        scroll = $(window).scrollTop();

      if (scroll >= 40) {
        sticky.addClass("fixed");
      } else {
        sticky.removeClass("fixed");
      }
    });

    // Hide Header on on scroll down
    var didScroll;
    var lastScrollTop = 0;
    var delta = 1;
    var navbarHeight = 300;

    $(window).scroll(function(event) {
      didScroll = true;
    });

    setInterval(function() {
      if (didScroll) {
        hasScrolled();
        didScroll = false;
      }
    }, 250);

    function hasScrolled() {
      var st = $(window).scrollTop();

      // If they scrolled down and are past the navbar, add class .nav-up.
      // This is necessary so you never see what is "behind" the navbar.
      if (st > lastScrollTop && st > navbarHeight) {
        // Scroll Down
        $(".header")
          .removeClass("nav-down")
          .addClass("nav-up");
      } else {
        // Scroll Up
        if (st + $(window).height() < $(document).height()) {
          $(".header")
            .removeClass("nav-up")
            .addClass("nav-down");
        }
      }

      lastScrollTop = st;
    }

    $(".single-blog-content__social-share").stick_in_parent({
      offset_top: 100
    });
  });

  if (window.acf) {
    window.acf.addAction("render_block_preview", initializeBlock);
  }
})(jQuery);
