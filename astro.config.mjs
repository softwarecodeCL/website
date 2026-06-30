// @ts-check
import { defineConfig } from 'astro/config';

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import cloudflare from '@astrojs/cloudflare';

export default defineConfig({
  site: 'https://www.softwarecode.cl',
  trailingSlash: 'always',
  // SSR habilitado globalmente.
  // Las rutas que declares con prerender=true quedan estáticas.
  output: 'server',

  adapter: cloudflare({
    imageService: 'compile',
  }),

  root: './',
  srcDir: './src',
  publicDir: './public',
  outDir: './dist',

  integrations: [
    mdx(),
    sitemap({
      filter: (page) => !page.includes('/tag/') && !page.includes('/category/'),
    }),
  ],

  vite: {
    build: {
      sourcemap: false,
    },
  },
});