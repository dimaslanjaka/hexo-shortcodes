const cp = require('cross-spawn');
const path = require('upath');
const fs = require('fs-extra');

(async function main() {
  const base = path.join(__dirname, 'test');

  // clone
  await cp.async('git', ['clone', 'https://github.com/dimaslanjaka/docs.git', 'test/.deploy_git'], {
    cwd: __dirname,
    shell: true
  });

  // generate site
  await cp.async('yarn', ['build'], { cwd: base, shell: true });

  // copy folder
  if (fs.existsSync(path.join(base, '.deploy_git/hexo-shortcodes'))) {
    await fs.rm(path.join(base, '.deploy_git/hexo-shortcodes'), { recursive: true, force: true });
  }
  fs.copySync(path.join(base, 'public'), path.join(base, '.deploy_git/hexo-shortcodes'));
})();
