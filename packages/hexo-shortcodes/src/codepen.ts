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

    const regex = /codepen.io\/(\w*)\/pen\/(\w*)/gm;
    const match = getMatches(id, regex, 1);
    console.log(match);

    return '';
  });
}

/**
 * get matches from regex
 * @param string
 * @param regex
 * @param index
 * @returns
 */
function getMatches(string: string, regex: RegExp, index?: number) {
  // index || (index = 1); // default to the first capturing group
  const matches: string[] = [];
  let match: RegExpExecArray;
  while ((match = regex.exec(string))) {
    // matches.push(match[index]);
    match.forEach((m, i) => {
      matches[i] = m;
    });
  }
  if (index) return matches[index];
  return matches;
}
