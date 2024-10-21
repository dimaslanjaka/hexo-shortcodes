process.cwd = () => __dirname;

import Hexo from 'hexo';
import path from 'path';

const hexo = new Hexo(__dirname);
async function main() {
  await hexo.init();
  // hexo.init().then(() => hexo.loadPlugin(require.resolve('hexo-shortcodes')));
  await hexo.load(async () => {
    const post = await hexo.post.render(path.join(__dirname, 'source/lang/php.md'));
    console.log(post);
  });
}

main();
