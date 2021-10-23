import 'whatwg-fetch';
import { assetsBaseUrl, domReady, requireAll } from './utils';

// Require all icons to trigger svg-sprite-loader generating the sprite map
requireAll(require.context('../icons/', true, /\.svg$/));

/**
 * Attaches the generated sprite map to the document.
 */
const loadIcons = () => {
  // Fetch generated sprite map and attach it to the document
  fetch(`${assetsBaseUrl()}images/icons.svg`)
    .then(response => {
      if (!response.ok) {
        throw Error(`${response.statusText}: ${response.url}`);
      }
      return response.text();
    })
    .then(data => {
      const spriteWrapper = document.createElement('div');
      spriteWrapper.innerHTML = data;
      spriteWrapper.style.display = 'none';
      document.body.appendChild(spriteWrapper);
    });
};

// Execute icon load when DOM is ready
domReady(loadIcons);
