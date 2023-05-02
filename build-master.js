const cp = require('cross-spawn');
const path = require('upath');
const fs = require('fs-extra');
const git = require('git-command-helper');

const lib = path.join(__dirname, 'lib');

(async function main() {
  await cp.async('npm', ['run', 'build'], { stdio: 'inherit', cwd: lib })

  const dist = path.resolve(lib, 'dist')
  const tmp = path.join(__dirname, 'tmp/pre-release')
  if (!fs.existsSync(tmp)) {
    fs.mkdirSync(tmp, { recursive: true })
  } else {
    await fs.emptyDir(tmp)
  }

  // copy to temp
  await fs.copy(dist, tmp, { overwrite: true })

  // checkout master
  await cp.async('git', ['checkout', 'origin/master'], { cwd: lib })
  await cp.async('git', ['pull', 'origin', 'master'], { cwd: lib })

  // copy temp to master dist
  await fs.emptyDir(dist)
  await fs.copy(tmp, dist)

  // commit dist
  await cp.async('git', ['add', 'dist'], { cwd: lib })
  await cp.async('git', ['commit', '-m', "update from 'pre-release'"], { cwd: lib })

  // push master
  const dry = await cp.async('git', ['push', 'origin', 'master', '--dry-out'], { cwd: lib })
  console.log(dry)

  // checkout pre-release
  await cp.async('git', ['checkout', 'pre-release'], { cwd: lib })
})()