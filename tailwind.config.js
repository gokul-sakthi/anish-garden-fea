const { url } = require("inspector");
module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      keyframes: {
        "fade-in-down": {
          "0%": {
            opacity: "0",
            transform: "translateY(-10px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
      },
      animation: {
        "fade-in-down": "fade-in-down 0.5s ease-out",
      },
      display: ["group-hover", "hover"],
      border: ["first", "last"],
      backgroundImage: {
        "hero-section-1": url(
          "./src/assets/images/Taking care of the Earth-rafiki.svg"
        ),
      },
    },
  },
  variants: {
    extend: {
      "object-fit": ["hover"],
      opacity: ["disabled"],
    },
  },
  plugins: [],
};
