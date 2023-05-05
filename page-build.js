const path = require('path');
const fs = require('fs-extra');
const { default: gch, spawn } = require('git-command-helper');
const spawnAsync = require('cross-spawn').async;

// publish pages

const testDir = path.resolve(__dirname, 'test');
const src = path.join(testDir, 'public');
const deployDir = path.resolve(testDir, '.deploy_git/hexo-shortcodes');
(async function () {
  // check deploy directory
  if (!fs.existsSync(deployDir)) {
    await spawn('git', ['clone', '-b', 'master', 'https://github.com/dimaslanjaka/docs.git', 'test/.deploy_git'], {
      cwd: __dirname
    });
  } else {
    await spawn('git', ['pull', 'origin', 'master', '-X', 'theirs'], { cwd: deployDir, shell: true, stdio: 'inherit' });
  }

  // build site start
  await spawn('yarn', ['build'], { cwd: testDir, shell: true, stdio: 'inherit' });

  // commit start
  const projectGit = new gch(__dirname, 'master');
  const commit = await projectGit.latestCommit(__dirname);
  const repo = new URL((await projectGit.getremote()).fetch.url).pathname.replace(/^\/+/gm, '');
  const message = `chore: update from ${repo}@${commit}`;

  // copy start
  if (fs.existsSync(deployDir)) {
    await fs.rm(deployDir, { recursive: true, force: true });
    await fs.mkdir(deployDir);
  }
  await fs.copy(src, deployDir, { overwrite: true });

  try {
    const destSpawnOpt = { cwd: deployDir, shell: true, stdio: 'inherit' };
    //await spawn('git', ['remote', 'set-url', 'origin', 'https://github.com/dimaslanjaka/docs.git'], destSpawnOpt);
    await spawn('git', ['add', '.'], destSpawnOpt);
    await spawn('git', ['commit', '-m', `"${message}"`], destSpawnOpt);
    await spawn('git', ['checkout', 'master'], destSpawnOpt);
    await spawn('git', ['push', '-u', 'origin', 'master'], destSpawnOpt);
  } catch (e) {
    console.error('cannot push', e);
  }
})();
