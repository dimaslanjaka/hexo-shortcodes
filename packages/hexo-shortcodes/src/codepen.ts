import ansiColors from 'ansi-colors';
import Hexo from 'hexo';
const logname = ansiColors.magentaBright('hexo-shortcodes') + ansiColors.blueBright('(codepen)');

const matches_wrapper: Record<string, any> = {};

function getMatches(string: string, regex: RegExp, index: number): string | null;
function getMatches(string: string, regex: RegExp): string[] | null;
/**
 * get matches from regex (cacheable)
 * @param string
 * @param regex
 * @param index
 * @returns
 */
function getMatches(string: string, regex: RegExp, index?: number): string | string[] | null {
  // index || (index = 1); // default to the first capturing group
  const key = string + String(regex);
  const matches: string[] = matches_wrapper[key] || [];
  if (matches.length === 0) {
    if (!regex.test(string)) return null;
    let match: RegExpExecArray;
    while ((match = regex.exec(string))) {
      // matches.push(match[index]);
      match.forEach((m, i) => {
        matches[i] = m;
      });
    }
  }
  matches_wrapper[key] = matches;
  if (index) return matches[index];
  return matches;
}

export function codepen(hexo: Hexo) {
  hexo.extend.tag.register('codepen', function (args) {
    const urlOrid = args[0];
    hexo.log.info(logname, urlOrid);

    let slug: string;
    let user: string;

    // get slug and user when first argument is url
    const regex = /codepen.io\/(\w*)\/pen\/(\w*)/gm;
    const match = getMatches(urlOrid, regex);
    if (match !== null) {
      args[0] = '';
      user = match[1];
      slug = match[2];
    }

    // parse `=` from all arguments
    const parse = args.map((str) => str.split('='));
    console.log(parse);

    const config: {
      [key: string]: any;
      theme: string;
      class: string;
      version: string;
      height: string;
      preview: string;
      default_tab: string;
    } = hexo.config.codepen || {};
    const defaults = {
      class: config.class || 'codepen',
      embed_version: parseInt(config.version) || 2,
      height: parseInt(config.height) || 300,
      preview: String(config.preview) === 'true' ? true : false,
      theme_id: config.theme || 11_473,
      default_tab: config.default_tab || 'result',
      user,
      slug
    };

    return '';
  });
}
