/** @type {import('vite').UserConfig} */

import { VitePWA } from 'vite-plugin-pwa';

export default {
    base: './',
    plugins: [
        VitePWA({
            devOptions: {
                enabled: true,
            },
            manifest: {
                "name": "WebGL example",
                "short_name": "WebGL_example",
                "start_url": "./",
                "display": "fullscreen",
                "icons": [
                    {
                        "src": "icons/manifest-icon-192.maskable.png",
                        "sizes": "192x192",
                        "type": "image/png",
                        "purpose": "any"
                    },
                    {
                        "src": "icons/manifest-icon-192.maskable.png",
                        "sizes": "192x192",
                        "type": "image/png",
                        "purpose": "maskable"
                    },
                    {
                        "src": "icons/manifest-icon-512.maskable.png",
                        "sizes": "512x512",
                        "type": "image/png",
                        "purpose": "any"
                    },
                    {
                        "src": "icons/manifest-icon-512.maskable.png",
                        "sizes": "512x512",
                        "type": "image/png",
                        "purpose": "maskable"
                    }
                ],
                "background_color": "blue",
                "theme_color": "yellow",
                "screenshots": [
                    {
                        "src": "icons/screenshots/desktop.ss.jpg",
                        "sizes": "960x467",
                        "type": "image/jpeg",
                        "form_factor": "wide",
                        "label": "screenshot of app in desktop view"
                    },
                    {
                        "src": "icons/screenshots/mobile.ss.jpg",
                        "sizes": "361x805",
                        "type": "image/jpeg",
                        "form_factor": "narrow",
                        "label": "screenshot of app in mobile view"
                    }
                ],
                "description": "example of WebGL and PWA implementation."
            },
            workbox: {
                // globPatterns: ['**/*.{js,css,html,ico,png,svg}'], // precache, eager load and cache
                runtimeCaching: [
                    {
                        urlPattern: /\.(png|jpg|jpeg|svg|gif)$/i,
                        handler: 'StaleWhileRevalidate', // Cache StrategyName
                        options: {
                            cacheName: 'image-cache',
                            expiration: {
                                maxEntries: 10,
                                maxAgeSeconds: 3600 * 24 * 2 
                            },
                            cacheableResponse: {
                                statuses: [0, 200]
                            }
                        }
                    },
                ]
            }
        })
    ],
}