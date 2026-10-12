import { defineConfig, type HtmlTagDescriptor, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';
import { appleSplashScreens } from './pwa-assets.config.ts';

// Keep equal to `background` in pwa-assets.config.ts.
const backgroundColor = '#ffffff';
const themeColor = '#ffffff';

// iOS only shows a launch image when a <link rel="apple-touch-startup-image"> matches the
// device's exact screen. Derive one per image from the same config `npm run generate-icons`
// uses to write public/apple-splash-*.png, so the tags can't drift from the files.
function appleSplashLinks(): Plugin {
  const { sizes, name } = appleSplashScreens;
  const seen = new Set<string>();
  const tags: HtmlTagDescriptor[] = [];
  for (const { width, height, scaleFactor } of sizes) {
    for (const landscape of [false, true]) {
      const size = landscape ? { width: height, height: width, scaleFactor } : { width, height, scaleFactor };
      const file = name!(landscape, size);
      if (seen.has(file)) continue;
      seen.add(file);
      tags.push({
        tag: 'link',
        attrs: {
          rel: 'apple-touch-startup-image',
          media:
            `screen and (device-width: ${width / scaleFactor}px) and (device-height: ${height / scaleFactor}px)` +
            ` and (-webkit-device-pixel-ratio: ${scaleFactor}) and (orientation: ${landscape ? 'landscape' : 'portrait'})`,
          href: `/${file}`,
        },
        injectTo: 'head',
      });
    }
  }
  return { name: 'apple-splash-links', transformIndexHtml: () => tags };
}

export default defineConfig({
  plugins: [
    react(),
    appleSplashLinks(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['icon.svg', 'favicon.ico', 'apple-touch-icon-180x180.png'],
      manifest: {
        // Replace these with your app's values (see TEMPLATE.md).
        name: 'Template PWA',
        short_name: 'App',
        description: 'Starter page. Replace with your app.',
        lang: 'en',
        start_url: '/',
        scope: '/',
        display: 'standalone',
        background_color: backgroundColor,
        theme_color: themeColor,
        icons: [
          { src: 'pwa-64x64.png', sizes: '64x64', type: 'image/png' },
          { src: 'pwa-192x192.png', sizes: '192x192', type: 'image/png' },
          { src: 'pwa-512x512.png', sizes: '512x512', type: 'image/png' },
          { src: 'maskable-icon-512x512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,woff2,png,svg,ico,webmanifest}'],
        // iOS fetches its launch image at install time; precaching all of them would only cost
        // every other client the download.
        globIgnores: ['**/apple-splash-*.png'],
        navigateFallback: '/index.html',
        cleanupOutdatedCaches: true,
      },
    }),
  ],
});
