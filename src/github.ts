export function githubEmbed(hexo: import('hexo')) {
  hexo.extend.tag.register(
    'github',
    async function (params) {
      hexo.log.info(params);

      return '';
    },
    { async: true }
  );
}
