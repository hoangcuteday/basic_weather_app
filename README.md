# Weather App Setup Guide

Follow these steps to create a PWA weather app using Vite, React, Tailwind CSS, and OpenWeatherMap.

## 1. Create the App
```bash
npx create-next-app weather-app
cd weather-app
```

## 2. Get OpenWeatherMap API Key
- Sign up at [OpenWeatherMap](https://openweathermap.org/).
- Go to your account and create an API key.
- Add your key to a `.env` file:
```
VITE_OPEN_WEATHER_API_KEY=your_api_key_here
```

## 3. Install Tailwind CSS (Optional for flexible CSS)
Follow the official guide: [Tailwind + Vite](https://tailwindcss.com/docs/installation/using-vite)
```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```
- Configure `tailwind.config.js` and add Tailwind directives to your CSS.

## 4. Install vite-plugin-pwa and Configure
```bash
npm install vite-plugin-pwa --save-dev
```
Add the following to your `vite.config.ts`:
```ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'Weather App',
        short_name: 'Weather',
        start_url: '/',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#317EFB',
        icons: [
          {
            src: '/icon-192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/icon-512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ]
});
```

## 5. Build, Preview, and Add to Home Screen
```bash
npm run build
npm run preview -- --port=4173
```
- Open your browser and go to `http://localhost:4173` (or the port you chose).
- Use your browser's menu to "Add to Home Screen".
- The app will now open as a standalone PWA from your home screen.

---
Enjoy your Weather App!
# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
