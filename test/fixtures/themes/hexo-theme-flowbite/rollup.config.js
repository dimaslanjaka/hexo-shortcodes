const commonjs = require("@rollup/plugin-commonjs").default;
const json = require("@rollup/plugin-json").default;
const resolve = require("@rollup/plugin-node-resolve").nodeResolve;
const typescript = require("@rollup/plugin-typescript").default;
const { dts } = require("rollup-plugin-dts");
const terser = require("@rollup/plugin-terser").default;

const pkg = require("./package.json");
const deps = Object.keys(pkg.dependencies || {}).concat(Object.keys(pkg.devDependencies || {}));
const globals = { jquery: "$", lodash: "_", axios: "axios", "highlight.js": "hljs" };

/**
 * Common TypeScript plugin configuration
 */
const tsPlugin = typescript({
  tsconfig: false,
  compilerOptions: {
    lib: ["DOM", "DOM.Iterable", "ES2020", "ESNext"],
    module: "ESNext",
    skipLibCheck: true,
    esModuleInterop: true,
    allowSyntheticDefaultImports: true
  },
  include: ["./src/**/*", "./package.json"],
  resolveJsonModule: true
});

/**
 * Common resolve and commonjs plugin configuration for browser
 */
const resolveAndCommonJSBrowser = [
  resolve({
    browser: true,
    extensions: [".mjs", ".js", ".json", ".node", ".ts"]
  }),
  commonjs()
];

/**
 * Common resolve and commonjs plugin configuration for Node.js
 */
const resolveAndCommonJSNode = [
  resolve({
    extensions: [".mjs", ".js", ".json", ".node", ".ts"]
  }),
  commonjs()
];

/**
 * @type {import("rollup").RollupOptions}
 */
const browserJS = {
  input: "src/index.ts",
  output: {
    file: "source/js/script.js",
    format: "iife",
    name: "HexoThemeFlowbite",
    sourcemap: false,
    globals
  },
  plugins: [tsPlugin, json(), ...resolveAndCommonJSBrowser, terser()]
};

/**
 * @type {import("rollup").RollupOptions}
 */
const apiJS = {
  input: "src/api.ts",
  output: {
    file: "dist/hexo-theme-flowbite-api.js",
    format: "cjs",
    sourcemap: false
  },
  plugins: [tsPlugin, json(), ...resolveAndCommonJSNode],
  external: deps
};

/**
 * @type {import("rollup").RollupOptions}
 */
const apiDts = {
  input: "src/api.ts",
  output: {
    file: "dist/hexo-theme-flowbite-api.d.ts",
    format: "cjs",
    sourcemap: false
  },
  plugins: [dts()],
  external: deps
};

module.exports = [browserJS, apiDts, apiJS];
