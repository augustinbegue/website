const production = !process.env.ROLLUP_WATCH;
module.exports = {
  content: [
    "./src/**/*.svelte",
  ],
  darkMode: "media", // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        display: ['"Ibm Plex Sans"', "sans-serif"],
      },
      colors: {
        dark: {
          50: "#21252B",
          100: "#282C34",
          200: "#464B57",
          300: "#656C7A",
          400: "#878E9C",
          500: "#ABB2BF",
        },
        red: {
          100: "#E06C75",
          200: "#D85961",
          300: "#D1474C",
          400: "#C93539",
          500: "#C22526",
        },
        green: {
          100: "#98C379",
          200: "#80B166",
          300: "#6A9F55",
          400: "#558E46",
          500: "#417C38",
        },
        yellow: {
          100: "#E5C07B",
          200: "#E8BB68",
          300: "#EBB654",
          400: "#EEB140",
          500: "#F1AC2B",
        },
        blue: {
          100: "#61AFEF",
          200: "#4DA1E6",
          300: "#3B94DD",
          400: "#2A88D4",
          500: "#1A7CCB",
        },
        purple: {
          100: "#C678DD",
          200: "#B868D1",
          300: "#AB59C4",
          400: "#9E4BB8",
          500: "#913EAB",
        },
        cyan: {
          100: "#56B6C2",
          200: "#47B4C1",
          300: "#37B3C0",
          400: "#28B2BF",
          500: "#19B1BD",
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
  future: {
    purgeLayersByDefault: true,
    removeDeprecatedGapUtilities: true,
  },
};
