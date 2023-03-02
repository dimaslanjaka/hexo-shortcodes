const gulp = require('gulp');
const path = require('path');

gulp.task('watch', function () {
  gulp.series('serve')();
  gulp.watch(['src/**/*.ts', 'src/**/*.js'], gulp.series('build', 'serve'));
});

gulp.task('build', function () {
  return killableSpawn('yarn', ['build'], { cwd: __dirname, stdio: 'inherit', shell: true }, 'build');
});

gulp.task('serve', async function () {
  return killableSpawn(
    'yarn',
    ['run', 'server'],
    {
      signal: abortController.signal,
      cwd: path.join(__dirname, 'test'),
      stdio: 'inherit'
    },
    'server'
  );
});

gulp.task('serve:clean', async function () {
  return killableSpawn(
    'hexo',
    ['clean'],
    {
      signal: abortController.signal,
      cwd: path.join(__dirname, 'test'),
      stdio: 'inherit'
    },
    'clean'
  );
});

/**
 * @type {Record<string, import('execa').ExecaChildProcess<string>>}
 */
const subprocess = {};
/**
 * @type {Record<string, AbortController>}
 */
const abortController = {};
/**
 * killable spawner
 * @param {string} cmd
 * @param {string|string[]} args
 * @param {import('execa').Options} opt
 * @param {string} instanceName
 */
async function killableSpawn(cmd, args, opt, instanceName = String(Math.random().toFixed(2))) {
  const { execa } = await import('execa');
  if (typeof subprocess[instanceName] !== 'undefined') {
    if (!subprocess[instanceName].killed) {
      abortController[instanceName].abort();
      try {
        await subprocess[instanceName];
      } catch (error) {
        console.log(subprocess[instanceName].pid, subprocess[instanceName].killed ? 'killed' : 'kill failed'); // true
        console.log(subprocess[instanceName].pid, error.isCanceled ? 'cancelled' : 'cancel failed'); // true
      }
      if (subprocess[instanceName].killed) {
        subprocess[instanceName] = undefined;
      }
    }
  }
  abortController[instanceName] = new AbortController();
  subprocess[instanceName] = execa(
    cmd,
    typeof args === 'string' ? [args] : args,
    Object.assign(
      {
        signal: abortController.signal,
        cwd: path.join(__dirname, 'test'),
        stdio: 'inherit'
      },
      opt
    )
  );
}
