import defaultTheme from 'tailwindcss/defaultTheme';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,md,js,jsx,ts,tsx,astro}'],
  theme: {
    extend: {
      colors: {
        primary: '#F9D949',
      },
      fontFamily: {
        sans: [
          `var(--font-inter-variable), ${defaultTheme.fontFamily.sans.join(',')}`,
          {
            fontFeatureSettings: '"case", "cv01", "cv02", "cv03", "cv04", "cv06", "ss02"',
          },
        ],
      },
      rounded: {
        '3xl': '2rem',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
