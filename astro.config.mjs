  // @ts-check
  import { defineConfig } from 'astro/config';

  import mdx from '@astrojs/mdx'
  import node from '@astrojs/node';
  import sitemap from '@astrojs/sitemap';

  // https://astro.build/config
  export default defineConfig({
      site: 'https://www.softwarecode.cl',  
      output: 'server', // Habilitar SSR
      adapter: node({
        mode: 'standalone', // Genera un servidor independiente listo para producción
      }),
      root: './',         // Raíz del proyecto (opcional si ya es la raíz)
      srcDir: './src',    // Define que los archivos fuente están en `src/`
      publicDir: './public', // Define que los archivos estáticos están en `public/`
      outDir: './dist',   // Carpeta de salida tras el build
      integrations: [mdx(), sitemap()],
  }); 
