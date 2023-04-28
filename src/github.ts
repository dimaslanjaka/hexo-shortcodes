import ansiColors from 'ansi-colors';

const logname = ansiColors.magentaBright('hexo-shortcodes') + ansiColors.blueBright('(github)');

export function githubEmbed(hexo: import('hexo')) {
  hexo.extend.tag.register(
    'github',
    async function (params) {
      hexo.log.info(logname, params);

      return '';
    },
    { async: true }
  );
}
