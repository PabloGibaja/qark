// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
  site: 'https://qark.app',
  integrations: [
    react(),
    tailwind({
      applyBaseStyles: false, // Para usar nuestros estilos personalizados
    })
  ],
  output: 'static',
  build: {
    assets: 'assets'
  }
});