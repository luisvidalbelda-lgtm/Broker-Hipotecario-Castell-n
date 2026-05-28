import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';
import icon from 'astro-icon';
import tailwindcss from '@tailwindcss/vite';

import cloudflare from '@astrojs/cloudflare';

export default defineConfig({
  site: 'https://brokerhipotecariocastellon.es',
  trailingSlash: 'never',

  build: {
    format: 'file',
  },

  vite: {
    plugins: [tailwindcss()],
  },

  integrations: [
    sitemap({
      filter: (page) =>
        !page.includes('/admin') &&
        !page.includes('/aviso-legal') &&
        !page.includes('/politica-privacidad') &&
        !page.includes('/politica-cookies'),
    }),
    mdx(),
    icon({ include: { lucide: ['*'] } }),
  ],

  adapter: cloudflare(),
});