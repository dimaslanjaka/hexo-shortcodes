const path = require('path');
const fs = require('fs-extra');
const { default: gch, spawn } = require('git-command-helper');

// publish pages

const testDir = path.resolve(__dirname, 'test');
const src = path.join(testDir, 'public');
const dest = path.resolve(__dirname, '../../../dimaslanjaka.github.io/docs/hexo-shortcodes');
(async function () {
  // build start
  await spawn('hexo', ['generate'], { cwd: testDir, shell: true });

  // commit start
  const projectGit = new gch(__dirname, 'master');
  const commit = await projectGit.latestCommit(__dirname);
  const repo = new URL((await projectGit.getremote()).fetch.url).pathname.replace(/^\//, '');
  const message = `chore: update from ${repo}@${commit}`;

  // copy start
  if (fs.existsSync(dest)) await fs.emptyDir(dest);
  await fs.copy(src, dest);

  await spawn('git', ['add', '.'], { cwd: dest, shell: true });
  await spawn('git', ['commit', '-m', message], { cwd: dest, shell: true });
  await spawn('git', ['checkout', 'master'], { cwd: dest, shell: true });
  await spawn('git', ['pull', 'origin', 'master', '-X', 'ours'], { cwd: dest, shell: true });
  await spawn('git', ['push'], { cwd: dest, shell: true });
})();
