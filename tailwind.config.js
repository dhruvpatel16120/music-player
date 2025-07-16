/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}"
  ],
  theme: { extend: {} },
  plugins: [],
  extend: {
    animation: {
      'spin-slow': 'spin 8s linear infinite',
    }
  }
};
