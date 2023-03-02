import Hexo from 'hexo';

let hexo: Hexo;

/**
 * hexo-util.url_for alias
 * @param url
 * @returns
 */
export const url_for = (url: string) => (hexo.config.root + url).replace(/\/+/gm, '/');
export const registerHexo = (instance: Hexo) => (hexo = instance);
export const escapeHTML = (str: string) =>
  str.replace(
    /[&<>'"]/g,
    (tag) =>
      ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        "'": '&#39;',
        '"': '&quot;'
      }[tag])
  );

const matches_wrapper: Record<string, string | string[]> = {};

/**
 * get matches from regex (cacheable).
 * @param string
 * @param regex
 * @param index
 * @returns
 */
export function getMatches(string: string, regex: RegExp, index: number): string | null;
/**
 * get matches from regex (cacheable).
 * @param string
 * @param regex
 * @param index
 * @returns
 */
export function getMatches(string: string, regex: RegExp): string[] | null;
/**
 * get matches from regex (cacheable)
 * @param string
 * @param regex
 * @param index
 * @returns
 */
export function getMatches(string: string, regex: RegExp, index?: number): string | string[] | null {
  // index || (index = 1); // default to the first capturing group
  const key = string + String(regex);
  const matches = (matches_wrapper[key] as string[]) || [];
  if (matches.length === 0) {
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
 * turn multidimensional array to single object.
 *
 * forked from @see {@link https://github.com/rmcfadzean/jekyll-codepen}
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
