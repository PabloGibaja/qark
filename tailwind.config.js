/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'qark-blue': '#3B82F6',
        'qark-teal': '#06B6D4',
        'qark-orange': '#EE744E', // Corregido el typo
        'qark-grey': '#41444B',
      },
      backgroundImage: {
        'gradient-qark': 'linear-gradient(135deg, #3B82F6 0%, #06B6D4 100%)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        }
      }
    },
  },
  plugins: [],
}