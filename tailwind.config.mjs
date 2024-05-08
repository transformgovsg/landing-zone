import defaultTheme from 'tailwindcss/defaultTheme';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,md,js,jsx,ts,tsx,astro}'],
  theme: {
    extend: {
      colors: {
        primary: '#EFAE3D',
      },
      fontFamily: {
        sans: [
          `InterVariable, ${defaultTheme.fontFamily.sans.join(',')}`,
          {
            fontFeatureSettings: '"case", "cv01", "cv02", "cv03", "cv04", "cv06", "ss02"',
          },
        ],
      },
    },
  },
  plugins: [],
};
