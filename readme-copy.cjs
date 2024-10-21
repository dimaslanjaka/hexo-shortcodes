const fs = require('fs');
const path = require('path');
const moment = require('moment-timezone');

const currentDate = moment().tz('Asia/Bangkok').format('YYYY-MM-DDTHH:mm:ssZ');

const metadata = `
---
title: hexo-shortcodes demo
date: 2023-03-03T00:48:02+07:00
updated: ${currentDate}
---
`.trim();

const body = fs
  .readFileSync(path.join(__dirname, 'readme.md'), 'utf-8')
  .replace(/https:\/\/www\.webmanajemen\.com\/docs\/hexo-shortcodes/g, '/docs/hexo-shortcodes');

fs.writeFileSync(path.join(__dirname, 'test/fixtures/source/index.md'), `${metadata}\n\n${body}`);
