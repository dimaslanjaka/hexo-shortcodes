const { spawn } = require('git-command-helper');
const path = require('path');
const fs = require('fs-extra');

const cwd = __dirname + '/test';
process.cwd = () => cwd;

(async function () {
  const spawnOpt = { cwd, stdio: 'inherit', shell: true };
  const lockfile = path.join(cwd, 'yarn.lock');
  if (!fs.existsSync(lockfile)) {
    fs.writeFileSync(lockfile, '');
    await spawn('yarn', ['install'], spawnOpt);
  } else {
    await spawn('yarn', ['add', '../'], spawnOpt);
  }
  await spawn('hexo', ['clean'], spawnOpt);
  await spawn('hexo', ['server'], spawnOpt);
})();
