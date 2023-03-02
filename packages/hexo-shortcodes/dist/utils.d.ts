import Hexo from 'hexo';
/**
 * hexo-util.url_for alias
 * @param url
 * @returns
 */
export declare const url_for: (url: string) => string;
export declare const registerHexo: (instance: Hexo) => Hexo;
export declare const escapeHTML: (str: string) => string;
/**
 * get matches from regex (cacheable).
 * @param string
 * @param regex
 * @param index
 * @returns
 */
export declare function getMatches(string: string, regex: RegExp, index: number): string | null;
/**
 * get matches from regex (cacheable).
 * @param string
 * @param regex
 * @param index
 * @returns
 */
export declare function getMatches(string: string, regex: RegExp): string[] | null;
/**
 * turn multidimensional array to single object.
 *
 * forked from @see {@link https://github.com/rmcfadzean/jekyll-codepen}
 * @param data
 * @returns
 */
export declare function array2obj<T extends any[][] | any[]>(data: T): any;
