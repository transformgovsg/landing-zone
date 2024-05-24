import alpinejs from '@astrojs/alpinejs';
import node from '@astrojs/node';
import tailwind from '@astrojs/tailwind';
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  output: 'hybrid',
  build: {
    client: './build/client',
    server: './build/server',
  },
  adapter: node({
    mode: 'standalone',
  }),
  integrations: [
    alpinejs(),
    tailwind({
      applyBaseStyles: false,
    }),
  ],
});
