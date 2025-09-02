// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import vercel from '@astrojs/vercel/serverless';

// https://astro.build/config
export default defineConfig({
  site: 'https://qark.app',
  integrations: [
    react(),
    tailwind({
      applyBaseStyles: false, // Para usar nuestros estilos personalizados
    })
  ],
  output: 'server', // ✅ Cambiar a server
  adapter: vercel({}), // ✅ Añadir adapter de Vercel
  build: {
    assets: 'assets'
  }
});