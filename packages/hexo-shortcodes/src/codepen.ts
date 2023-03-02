import ansiColors from 'ansi-colors';
import Hexo from 'hexo';
const logname = ansiColors.magentaBright('hexo-shortcodes') + ansiColors.blueBright('(codepen)');

export function codepen(hexo: Hexo) {
  hexo.extend.tag.register('codepen', function (args) {
    const id = args[0];
    hexo.log.info(logname, id);
    const defaults = {
      class: 'codepen',
      embed_version: 2,
      height: 300,
      preview: false,
      theme_id: 11_473,
      default_tab: 'result'
    };

    const regex = /codepen.io\/\w*\/pen\/(?<slug>\w*)/gm;
    const test = regex.test(id);
    console.log(test);

    return '';
  });
}
