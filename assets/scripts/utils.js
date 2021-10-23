/**
 * Checks for the asset base url in the dataset of the html element or returns /.
 * @returns {string | string} The url path to assets.
 */
 const assetsBaseUrl = () => document.documentElement.dataset.assetsBaseUrl || "/";

 /**
  * Executes callback method when DOM is ready.
  * @param callback Method to execute when DOM is ready.
  */
 const domReady = (callback) => {
   if (document.attachEvent ? document.readyState === "complete" : document.readyState !== "loading") {
     callback();
   } else {
     document.addEventListener("DOMContentLoaded", callback);
   }
 };
 
 let globals = {
   scrollTop: window.scrollY,
   windowHeight: window.innerHeight,
   breakpoints: {
     mdDown: window.matchMedia("screen and (max-width: 767px)").matches,
     mdUp: window.matchMedia("screen and (min-width: 768px)").matches,
   },
   // isMobile: false,
   // breakpoints: {
   //   smallDown: () => window.innerWidth < 640,
   //   betweenSmallLarge: () => window.innerWidth > 640 && window.innerWidth < 960,
   //   largeUp: () => window.innerWidth > 960,
   // },
 };
 
 let updateGlobals = () => {
   // if (window.innerWidth < 960) {
   //   globals.isMobile = true;
   // } else if (window.innerWidth > 960) {
   //   globals.isMobile = false;
   // }
 
   globals.scrollTop = Math.max(0, Math.min(window.scrollY, document.body.offsetHeight - globals.windowHeight));
   globals.windowHeight = window.innerHeight;
 };
 
 window.addEventListener("scroll", () => {
   updateGlobals();
 });
 
 window.addEventListener("resize", () => {
   updateGlobals();
 });
 
 /**
  * Requires all files in a given directory.
  * @param directory Directory to load files from.
  * @param useSubdirectories Whether to search sub-directories.
  * @param regExp Pattern to filter files loaded.
  */
 const requireAll = (requireContext) => {
   requireContext.keys().forEach(requireContext);
 };
 
 export { assetsBaseUrl, domReady, requireAll, globals };