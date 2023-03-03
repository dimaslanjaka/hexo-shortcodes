/* eslint-disable no-useless-escape */
const gulp = require('gulp');
const path = require('path');
const fs = require('fs-extra');

const argv = require('minimist')(process.argv.slice(2));

gulp.task('argv', function (done) {
  console.log(argv);
  done();
});

gulp.task('watch', function () {
  gulp.series('serve')();
  gulp.watch(['src/**/*.ts', 'src/**/*.js', 'template/**/*'], { delay: 1000 }, gulp.series('build', 'serve'));
});

gulp.task('build', function () {
  return killableSpawn('yarn', ['build'], { cwd: __dirname, stdio: 'inherit', shell: true }, 'build');
});

/**
 * @type {import('execa').ExecaChildProcess<string>}
 */
let subprocess;
/**
 * @type {AbortController}
 */
let abortController;
gulp.task('serve', function () {
  return (async function () {
    const { execa } = await import('execa');
    // hexo clean
    await killableSpawn(
      'hexo',
      ['clean'],
      {
        signal: aborts.signal,
        cwd: path.join(__dirname, 'test'),
        stdio: 'inherit'
      },
      'clean'
    );
    // hexo serve
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
    subprocess = execa('hexo', ['server'], {
      signal: abortController.signal,
      cwd: path.join(__dirname, 'test'),
      stdio: 'inherit'
    });
  })();
});

/**
 * @type {Record<string, import('execa').ExecaChildProcess<string>>}
 */
const childs = {};
/**
 * @type {Record<string, AbortController>}
 */
const aborts = {};
/**
 * killable spawner
 * @param {string} cmd
 * @param {string|string[]} args
 * @param {import('execa').Options} opt
 * @param {string} instanceName
 */
async function killableSpawn(cmd, args, opt, instanceName = String(Math.random().toFixed(2))) {
  const { execa } = await import('execa');
  if (typeof childs[instanceName] !== 'undefined') {
    if (!childs[instanceName].killed) {
      aborts[instanceName].abort();
      try {
        await childs[instanceName];
      } catch (error) {
        console.log(childs[instanceName].pid, childs[instanceName].killed ? 'killed' : 'kill failed'); // true
        console.log(childs[instanceName].pid, error.isCanceled ? 'cancelled' : 'cancel failed'); // true
      }
      if (childs[instanceName].killed) {
        childs[instanceName] = undefined;
      }
    }
  }
  aborts[instanceName] = new AbortController();
  childs[instanceName] = execa(
    cmd,
    typeof args === 'string' ? [args] : args,
    Object.assign(
      {
        signal: aborts.signal,
        cwd: path.join(__dirname, 'test'),
        stdio: 'inherit'
      },
      opt
    )
  );
  return new Promise((resolve) => {
    childs[instanceName].once('exit', function () {
      resolve();
    });
  });
}

// gh-pages builder
gulp.task('build-pages', async function () {
  await killableSpawn('hexo', ['generate'], { cwd: path.join(__dirname, 'test') });
});
gulp.task('copy-pages', async function () {
  const dest = path.join(__dirname, '../../site/.deploy_git/docs/hexo-shortcodes');
  const src = path.join(__dirname, 'test/public');
  if (fs.existsSync(dest) && fs.existsSync(src)) {
    await fs.emptyDir(dest);
    await fs.copy(src, dest, { overwrite: true });
  }
});
