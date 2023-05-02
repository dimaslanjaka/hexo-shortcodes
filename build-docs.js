const cp = require('cross-spawn');
const path = require('upath');
const fs = require('fs-extra');
const git = require('git-command-helper');

const base = path.join(__dirname, 'test');
process.cwd = () => base;

const Hexo = require('./test/node_modules/hexo');

(async function main() {
  // clone
  await cp.async('git', ['clone', 'https://github.com/dimaslanjaka/docs.git', '.deploy_git'], {
    cwd: base
  });

  // generate site
  //await cp.async('hexo', ['generate'], { cwd: base, stdio:'inherit' });
  const hexo = new Hexo(base);
  await hexo.init();
  await hexo.load();
  await hexo.call('generate');

  // copy folder
  if (fs.existsSync(path.join(base, '.deploy_git/hexo-shortcodes'))) {
    await fs.rm(path.join(base, '.deploy_git/hexo-shortcodes'), { recursive: true, force: true });
  }
  if (fs.existsSync(path.join(base, 'public'))) {
    fs.copySync(path.join(base, 'public'), path.join(base, '.deploy_git/hexo-shortcodes'));
  }
  if (fs.existsSync(path.join(base, '.deploy_git/hexo-shortcodes'))) {
    const cwd = path.join(base, '.deploy_git');
    const ghc = new git.default(__dirname, 'monorepo');
    const ghl = new git.default(path.join(__dirname, 'lib'), 'pre-release');
    const gh = new git.default(cwd, 'master');
    await gh.add('hexo-shortcodes');
    const ghlr = new URL((await ghl.getremote()).fetch.url);
    const ghcr = new URL((await ghc.getremote()).fetch.url);
    const msg = [
      'deploy from',
      ghlr.origin + ghlr.pathname.replace(/.git$/, '') + '/commit/' + (await ghc.latestCommit()),
      ghcr.origin + ghcr.pathname.replace(/.git$/, '') + '/commit/' + (await ghl.latestCommit())
    ].join(' ');
    await gh.commit(msg, '-m');
    console.log(await gh.canPush())
  }
})();
