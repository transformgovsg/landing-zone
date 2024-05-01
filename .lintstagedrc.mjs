/** @type {import('lint-staged').Config} */
export default {
  '**/*.{html,css,md,json,js,jsx,cjs,mjs,ts,tsx,astro}': 'prettier --write',
};
