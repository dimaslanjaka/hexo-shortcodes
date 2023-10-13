import Hexo from 'hexo';
/**
 * github embedder engine
 * @param hexo
 * @returns
 * @example
 * hexo.extend.tag.register('github', githubEmbedder(hexo), { async: true });
 */
export declare function githubEmbedder(hexo: Hexo): (params: string[]) => Promise<string>;
/**
 * hexo shortcode to embed file
 * @param hexo
 */
export declare function githubEmbedTagRegister(hexo: Hexo): (params: string[]) => Promise<string>;
/**
 * github raw embedder engine
 * @param hexo
 * @returns raw parsed response without highlight.js
 * @example
 * hexo.extend.tag.register('github', githubEmbedder(hexo), { async: true });
 */
export declare function githubEmbedderRaw(hexo: Hexo): (params: string[]) => Promise<string>;
