import Hexo from 'hexo';
/**
 * turn multidimensional array to single object.
 *
 * forked from @see {@link https://github.com/rmcfadzean/jekyll-codepen}
 * @param data
 * @returns
 */
export declare function array2obj<T extends any[][] | any[]>(data: T): any;
export declare function codepen(hexo: Hexo): void;
