const postcss = require("postcss");
const tailwindcss = require("tailwindcss");
const autoprefixer = require("autoprefixer");
const importPlugin = require("postcss-import");
const sass = require("sass");
const fs = require("fs-extra");
const path = require("path");
const { spawnSync } = require("child_process");

const inputSCSS = path.resolve(__dirname, "src/style.scss");

const compile = async (outputCSS) => {
  try {
    await fs.ensureDir(path.dirname(outputCSS));
    // First, compile SCSS using the new compile method
    const sassResult = sass.compile(inputSCSS, {
      style: "expanded",
      loadPaths: [
        path.join(process.cwd(), "node_modules"),
        path.join(__dirname, "node_modules"),
        path.join(__dirname, "src")
      ]
    });

    // Then, process with PostCSS
    const postCssResult = await postcss([importPlugin, tailwindcss, autoprefixer]).process(sassResult.css, {
      from: inputSCSS,
      to: outputCSS
    });

    // Write processed CSS
    fs.writeFileSync(outputCSS, postCssResult.css);

    console.log("CSS processed successfully!", outputCSS);
  } catch (error) {
    console.error("Error processing CSS:", error);
  }
};

async function compileFlowbite() {
  await compile(path.join(__dirname, "source/css/style.css"));
}

async function compileJS() {
  spawnSync("npx", ["rollup", "-c"], { stdio: "inherit", shell: true, cwd: __dirname });
}

if (require.main === module) {
  compileFlowbite().then(compileJS);
}

module.exports = { compileFlowbite, compileJS };
