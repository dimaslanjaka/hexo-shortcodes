import Hexo from 'hexo';

let hexo: Hexo;

/**
 * hexo-util.url_for alias
 * @param url
 * @returns
 */
export const url_for = (url: string) => (hexo.config.root + url).replace(/\/+/gm, '/');
export const registerHexo = (instance: Hexo) => (hexo = instance);
