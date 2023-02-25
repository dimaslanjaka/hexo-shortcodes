// test render from parent site
const path = require('path');
const fs = require('fs-extra');
const { writefile } = require('sbg-utility');
// const { spawn } = require('git-command-helper');

const rootProject = path.join(__dirname, '../..');

/*
spawn('yarn', ['add', './packages/hexo-shortcodes'], { cwd: rootProject }).then(() => {
  spawn('hexo', ['clean'], { cwd: rootProject });
});
*/

const content = fs.readFileSync(path.join(__dirname, 'hexo-shortcodes.md')).toString();

writefile(path.join(rootProject, 'source/docs/hexo-shortcodes/index.md'), content);
