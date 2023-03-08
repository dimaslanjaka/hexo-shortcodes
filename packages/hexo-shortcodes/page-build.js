const path = require('path');
const fs = require('fs-extra');
const { default: gch, spawn } = require('git-command-helper');

// publish pages

const src = path.resolve(__dirname, 'test/public');
const dest = path.resolve(__dirname, '../../../dimaslanjaka.github.io/docs/hexo-shortcodes');
(async function () {
  const projectGit = new gch(__dirname, 'master');
  const commit = await projectGit.latestCommit(__dirname);
  const repo = new URL((await projectGit.getremote()).fetch.url).pathname.replace(/^\//, '');
  const message = `chore: update from ${repo}@${commit}`;

  if (fs.existsSync(dest)) await fs.emptyDir(dest);
  await fs.copy(src, dest);

  await spawn('git', ['add', '.'], { cwd: dest });
  await spawn('git', ['commit', '-m', message], { cwd: dest });
  await spawn('git', ['checkout', 'master'], { cwd: dest });
  await spawn('git', ['pull', 'origin', 'master', '-X', 'ours'], { cwd: dest });
  await spawn('git', ['push'], { cwd: dest });
})();
