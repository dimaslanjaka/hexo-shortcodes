#!/usr/bin/env node

"use strict";

const fs = require("fs");
const path = require("path");

const pkg = JSON.parse(fs.readFileSync(path.join(process.cwd(), "package.json")));
const isESM = pkg.type === "module";

console.log("hexo-theme-flowbite cli running on", isESM ? "ESM" : "CJS");

if (isESM) {
  // Using dynamic import in CommonJS
  (async () => {
    await import("./hexo-theme-flowbite.mjs");
  })();
} else {
  require("./hexo-theme-flowbite.cjs");
}
