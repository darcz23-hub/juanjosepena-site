/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Paleta tomada del logo oficial de campaña ("Juan José" en azul,
        // "PEÑA" en rojo, con acentos verde/rojo/blanco).
        marino: {
          DEFAULT: "#0b5fb0",
          dark: "#08427a",
          light: "#2e7fd1",
        },
        acento: {
          DEFAULT: "#e0202c",
          dark: "#b8161f",
        },
      },
      fontFamily: {
        sans: ["ui-sans-serif", "system-ui", "Segoe UI", "Roboto", "Helvetica", "Arial", "sans-serif"],
      },
    },
  },
  plugins: [],
};
