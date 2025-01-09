/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      'sm': {max: '1023px'},
      // => @media (min-width: 640px) { ... }

      'md': {min: '1024px', max: '1279px'},
      // => @media (min-width: 1024px) { ... }

      'lg': {min: '1280px'},
      // => @media (min-width: 1280px) { ... }
    },
  },
  plugins: [],
}

