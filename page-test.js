const { spawn } = require('git-command-helper');

const cwd = __dirname + '/test';
process.cwd = () => cwd;

(async function () {
  const spawnOpt = { cwd, stdio: 'inherit', shell: true };

  await spawn('yarn', ['install'], spawnOpt);
  await spawn('hexo', ['clean'], spawnOpt);
  await spawn('hexo', ['server'], spawnOpt);
})();
