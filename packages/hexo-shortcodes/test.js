// test render from parent site
const path = require('path');
const fs = require('fs-extra');
const { writefile } = require('sbg-utility');
const { spawn } = require('git-command-helper');

const rootProject = path.join(__dirname, '../..');
const siteProject = path.join(rootProject, 'site');

const content = fs.readFileSync(path.join(__dirname, 'hexo-shortcodes.md')).toString();

writefile(path.join(siteProject, 'source/docs/hexo-shortcodes/index.md'), content);
(async function () {
  await spawn('yarn', ['build'], { cwd: __dirname });
  await spawn('hexo', ['clean'], { cwd: siteProject });
  await spawn('hexo', ['server'], { cwd: siteProject, stdio: 'inherit' });
})();
