const { readFileSync, writeFileSync } = require('fs-extra');
const path = require('path');

/** package readme */
const srcReadme = path.join(__dirname, 'lib/readme.md');
/** index site */
const siteReadme = path.join(__dirname, 'test/source/index.md');
/** monorepo readme */
const monorepoReadme = path.join(__dirname, 'readme.md');

const srcMd = readFileSync(srcReadme, 'utf-8');

const siteIndexMeta = `
---
title: hexo-shortcodes demo
date: 2023-03-03T00:48:02+07:00
updated: 2023-05-25T00:48:02+07:00
---
`.trim();

// write to index documentation
writeFileSync(siteReadme, siteIndexMeta + '\n\n' + srcMd);
// write to current readme repo
writeFileSync(monorepoReadme, srcMd);
