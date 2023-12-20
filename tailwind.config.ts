/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {},
    colors: {
      "primary-white": "var(--primary-white)",
      indigo: "var(--indigo)",
      "dark-blue": "var(--dark-blue)",
      green: "var(--green)",
      orange: "var(--orange)",
    },
    fontFamily: {
      nunito: "Nunito, sans-serif",
    },
  },
  plugins: [],
};
