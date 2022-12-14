/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./pages/**/*.js", "./components/**/*.js"],
  theme: {
    container: {
      center: true,
    },
    extend: {
      backgroundImage: {
        "hero-pattern": "url('/images/showcase.jpg')",
      },
      animation: {
        cursor: "cursor .6s linear infinite alternate",
        type: "type 1.8s ease-in 1s 1 normal both",
        typeBody: "type 2s ease-in 1s 1 normal both",
      },
      keyframes: {
        type: {
          "0%": { width: "0ch" },
          "5%, 10%": { width: "1ch" },
          "15%, 20%": { width: "2ch" },
          "25%, 30%": { width: "3ch" },
          "35%, 40%": { width: "4ch" },
          "45%, 50%": { width: "5ch" },
          "55%, 60%": { width: "6ch" },
          "65%, 70%": { width: "7ch" },
          "75%, 80%": { width: "8ch" },
          "85%, 90%": { width: "9ch" },
          "95%": { width: "10ch" },
        },
      },
      dropShadow: {
        "3xl": "0 35px 35px rgba(255,255,255, 0.9)",
        "4xl": [
          "0 35px 35px rgba(255,255,255, 0.9)",
          "0 45px 65px rgba(255,255,255, 0.9)",
        ],
      },
    },
  },
  plugins: [],
};
