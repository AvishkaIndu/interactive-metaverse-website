/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'zentry': ['zentry', 'sans-serif'],
        'circular-web': ['circular-web', 'sans-serif'],
        'general': ['general', 'sans-serif'],
        'robert-medium': ['robert-medium', 'sans-serif'],
        'robert-regular': ['robert-regular', 'sans-serif'],
      },
      colors: {
        blue: {
          75: '#dbeafe',
          200: '#60a5fa',
          400: '#2563eb',
          500: '#3b82f6',
          750: '#1e40af',
          100: '#1e3a8a',
          200: '#172554',
          300: '#0f172a',
        },
        violet: {
          300: '#7c3aed',
        },
        yellow:{
          100: '#8E983F',
          300: '#edff66',
        },
      },
    },
  },
  plugins: [],
  }
  

