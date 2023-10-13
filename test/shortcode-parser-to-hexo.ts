import ansiColors from 'ansi-colors';
import Hexo from 'hexo';
import { gistEmbedTagRegister } from '../src/gist';
import { githubEmbedTagRegister } from '../src/github';
import { shortcodeParser, shortcodeParserResultToArrayAttrParam } from '../src/utils/shortcodeParser';

const hexo = new Hexo(__dirname, { silent: false, debug: false });
// const parserGist = gist(hexo);

const contents = [
  '{% github https://github.com/dimaslanjaka/static-blog-generator/blob/e8ef351552d57c5e28e016e39e78fef139a8e7b2/.github/workflows/build-beta.yml#L152-L158 %}',
  '{% gist https://gist.github.com/dimaslanjaka/e7fc4c8778cdef48e1799de74a0c8949 %}',
  '{% gist https://gist.github.com/dimaslanjaka/a6aa24a8fa7a13999ee3dac077fa21fe filename:anonymize-ip.php line:1-7 %}'
];

async function main() {
  // append new config
  hexo.config = Object.assign(hexo.config || {}, { 'hexo-shortcodes': { raw: true } });
  // prepare renderer
  const parserGithub = githubEmbedTagRegister(hexo);
  const parserGist = gistEmbedTagRegister(hexo);
  // Load renderers for testing
  await hexo.loadPlugin(require.resolve('hexo-renderers'), () => {});

  for (let i = 0; i < contents.length; i++) {
    const str = contents[i];

    console.log('\n' + ansiColors.green(str) + '\n');

    const parse = shortcodeParser(str);
    const arr = shortcodeParserResultToArrayAttrParam(parse);
    if (parse.tagName === 'github') {
      const render = await parserGithub(arr);
      console.log(render.includes('```yml'));
    } else if (parse.tagName === 'gist') {
      const render = await parserGist(arr);
      console.log(render);
    }
  }
}

main();
