import { defineMiddleware } from 'astro:middleware';

export const onRequest = defineMiddleware((context, next) => {
  const url = new URL(context.request.url);

  if (url.hostname === 'softwarecode.cl') {
    return context.redirect(
      `https://www.softwarecode.cl${url.pathname}${url.search}`,
      301
    );
  }

  return next();
});