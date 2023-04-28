import ansiColors from 'ansi-colors';
import Hexo from 'hexo';

const logname = ansiColors.magentaBright('hexo-shortcodes') + ansiColors.blueBright('(github)');

export function githubEmbed(hexo: Hexo) {
  hexo.extend.tag.register(
    'github',
    async function (params) {
      hexo.log.info(logname, params);

      return '';
    },
    { async: true }
  );
}
