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
