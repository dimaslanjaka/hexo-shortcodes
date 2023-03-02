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

/**
 * turn multidimensional array to single object
 * @param data
 * @returns
 */
export function array2obj<T extends any[][] | any[]>(data: T) {
  /*if (Array.isArray(data)) {
    return data.reduce((obj, el, i) => (el && (obj[i] = multiDimensionalArrayToObject(el)), obj), {});
  } else if (typeof data === 'object') {
    return data.reduce(function (obj) {
      return Object.assign({}, obj);
    }, {});
  }*/
  if (Array.isArray(data)) {
    return data.reduce(function (prev, cur) {
      if (Array.isArray(prev)) return array2obj(prev);
      // fix array of object
      if (typeof cur === 'object' && !Array.isArray(cur)) return Object.assign(prev, cur);
      if (!Array.isArray(prev)) return Object.assign({}, prev);
    }, <any>{});
  }
  return data;
}

interface codepenTagOptions {
  [key: string]: any;
  theme: string;
  class: string;
  version: string;
  height: string;
  preview: string;
  default_tab: string;
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
    const parse = args
      .map((str) => {
        const spl = str.split('=');
        if (!spl[1]) return;
        return {
          [spl[0]]: spl[1]
        };
      })
      .filter((o) => typeof o === 'object');
    const overriden: codepenTagOptions = array2obj(parse);

    const config: codepenTagOptions = hexo.config.codepen || {};
    const url = `https://codepen.io/${user}/pen/${slug}`;
    const defaults = {
      class: config.class || 'codepen',
      embed_version: parseInt(config.version) || 2,
      height: parseInt(config.height) || 300,
      preview: String(config.preview) === 'true' ? true : false,
      theme_id: config.theme || 11_473,
      default_tab: config.default_tab || 'result',
      'data-user': user,
      'data-slug-hash': slug
    };
    const overriden_options = Object.assign(defaults, overriden);

    const attr = Object.keys(overriden_options)
      .map((key) => `${key}="${defaults[key]}"`)
      .join(' ');

    const htm_tag = `<p ${attr}>See the <a href="${url}">pen</a> on <a href="//codepen.io" rel="nofollow noopener">CodePen</a>.</p>`;

    const htm_script = '<script async src="https://production-assets.codepen.io/assets/embed/ei.js"></script>';

    return htm_tag + htm_script;
  });
}
