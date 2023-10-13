import fs from 'fs';
import Hexo from 'hexo';
import { gistEmbedTagRegister } from '../src/gist';
import { githubEmbedTagRegister } from '../src/github';

const root = __dirname + '/tmp/post';
fs.mkdirSync(root, { recursive: true });

const hexo = new Hexo(root, { silent: true });
gistEmbedTagRegister(hexo);
githubEmbedTagRegister(hexo);

async function main() {
  // Load renderers for testing
  await hexo.loadPlugin(require.resolve('hexo-renderers'), () => {});

  // re-assign config
  hexo.config = Object.assign(hexo.config, { highlight: { enabled: true } });

  const content = `
  ## gist tag

  {% gist meredrica/088f5a593a2a7184202850c58bcb48d1 %}

  ## github tag

  {% github https://github.com/dimaslanjaka/static-blog-generator/blob/e8ef351552d57c5e28e016e39e78fef139a8e7b2/.github/workflows/build-beta.yml#L152-L158 %}

  `;

  const _data = await hexo.post.render(null as unknown as string, {
    content,
    engine: 'markdown'
  });

  // console.log(_data.content.trim());
}

main();
