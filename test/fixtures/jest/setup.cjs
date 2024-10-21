const { join } = require('path');
const cwd = join(__dirname, '../');
process.cwd = () => cwd;

const Hexo = require('hexo');

const hexo = new Hexo(cwd, { silent: true });
hexo
  .init()
  .then(() => hexo.load())
  .then(() => {
    hexo.page.render(join(cwd, 'source/github.md')).then((result) => {
      console.log(result.content);
    });
  });
