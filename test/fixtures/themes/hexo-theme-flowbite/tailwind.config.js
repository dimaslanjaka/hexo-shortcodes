const path = require("upath");
const glob = require("glob");

const configs = glob.globSync("_config.*.yml", { cwd: process.cwd() }).map((p) => path.join(process.cwd(), p));
const injectionFiles = glob
  .globSync("**/*.html", { cwd: path.join(process.cwd(), "source") })
  .map((p) => path.join(process.cwd(), "source", p));

/** @type {import('tailwindcss').Config} */
const tailwindConfig = {
  darkMode: "class", // Enables dark mode based on class
  content: [
    "./node_modules/flowbite/**/*.js",
    "./layout/**/*.njk",
    "./src/**/*",
    "./_config.yml",
    "./scripts/**/*"
  ].concat(configs, injectionFiles),
  theme: {
    extend: {
      colors: {
        clifford: "#da373d",
        ocean: "#1ca9c9",
        forest: "#228b22",
        sunset: "#ff4500",
        sky: "#87ceeb",
        sand: "#c2b280",
        berry: "#cc66cc",
        cyan: "#00ffff",
        magenta: "#ff00ff",
        polkador: "#ff6347",
        skip: "#d3d3d3", // light gray
        silver: "#c0c0c0",
        mutedGray: "#b0b0b0",
        lightGray: "#d3d3d3"
      },
      typography: {
        DEFAULT: {
          css: {
            pre: {
              // background color should same with .hljs background color
              // see src/highlight
              "background-color": "#22272e"
            },
            // drop styling for katex math
            '[class^="katex"]': {
              all: "initial"
            } // false
            // drop styling for images with any class
            // "img[class]": {
            // all: "initial" // Reset all styles
            // display: "inline", // Default display
            // "max-width": "100%", // Reset max-width
            // height: "auto" // Reset height
            // }
          }
        }
      }
    }
  },
  plugins: [require("flowbite/plugin"), require("flowbite-typography")]
};

module.exports = tailwindConfig;
