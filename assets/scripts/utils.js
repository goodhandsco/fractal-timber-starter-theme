/**
 * Checks for the asset base url in the dataset of the html element or returns /.
 * @returns {string | string} The url path to assets.
 */
const assetsBaseUrl = () =>
  document.documentElement.dataset.assetsBaseUrl || "/";

/**
 * Executes callback method when DOM is ready.
 * @param callback Method to execute when DOM is ready.
 */
const domReady = callback => {
  if (
    document.attachEvent
      ? document.readyState === "complete"
      : document.readyState !== "loading"
  ) {
    callback();
  } else {
    document.addEventListener("DOMContentLoaded", callback);
  }
};

/**
 * Requires all files in a given directory.
 * @param directory Directory to load files from.
 * @param useSubdirectories Whether to search sub-directories.
 * @param regExp Pattern to filter files loaded.
 */
const requireAll = requireContext => {
  requireContext.keys().forEach(requireContext);
};

export { assetsBaseUrl, domReady, requireAll };
