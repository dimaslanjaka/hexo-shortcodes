const cp = require('cross-spawn');
const path = require('upath');
const fs = require('fs-extra');
const git = require('git-command-helper');

// build documentation site

const base = path.join(__dirname, 'test');
process.cwd = () => base;

const Hexo = require('./test/node_modules/hexo');

(async function main() {
  await cp.async('npm', ['run', 'build'], { stdio: 'inherit', cwd: __dirname });

  // clone
  if (!fs.existsSync(path.join(base, '.deploy_git/.git'))) {
    if (fs.existsSync(path.join(base, '.deploy_git'))) {
      fs.rmSync(path.join(base, '.deploy_git'), { recursive: true, force: true });
    } else if (fs.existsSync(path.join(base, '.deploy_git/.git/index.lock'))) {
      fs.rmSync(path.join(base, '.deploy_git/.git/index.lock'), { recursive: true, force: true });
    }
    await cp.async('git', ['clone', 'https://github.com/dimaslanjaka/docs.git', '.deploy_git'], {
      stdio: 'inherit',
      cwd: base
    });
  }

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
    if (await gh.canPush()) {
      await gh.push();
    }
  }
})();