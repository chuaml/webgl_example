import './style.css'

import './src/scene-setup/init.js';


// register service worker for PWA
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./pwa.sw.js');
}
