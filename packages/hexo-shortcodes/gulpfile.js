const gulp = require('gulp');
const { spawn } = require('git-command-helper');
const path = require('path');

gulp.task('watch', function () {
  gulp.series('serve')();
  gulp.watch(['src/**/*.ts', 'src/**/*.js'], gulp.series('build', 'serve'));
});

gulp.task('build', function () {
  return spawn('yarn', ['build'], { cwd: __dirname, stdio: 'inherit', shell: true });
});

/**
 * @type {import('execa').ExecaChildProcess<string>}
 */
let subprocess;
/**
 * @type {AbortController}
 */
let abortController;
gulp.task('serve', async function () {
  const { execa } = await import('execa');
  if (typeof subprocess !== 'undefined') {
    if (!subprocess.killed) {
      abortController.abort();
      try {
        await subprocess;
      } catch (error) {
        console.log(subprocess.pid, subprocess.killed ? 'killed' : 'kill failed'); // true
        console.log(subprocess.pid, error.isCanceled ? 'cancelled' : 'cancel failed'); // true
      }
      if (subprocess.killed) {
        subprocess = undefined;
      }
    }
  }
  abortController = new AbortController();
  subprocess = execa('yarn', ['run', 'server'], {
    signal: abortController.signal,
    cwd: path.join(__dirname, 'test'),
    stdio: 'inherit'
  });
});
