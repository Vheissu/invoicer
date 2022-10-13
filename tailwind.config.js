/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,ts}"],
  theme: {
    extend: {},
  },
  plugins: [],
  purge: {
    enabled: true,
    content: ['./src/**/*.html'],
  },
}
