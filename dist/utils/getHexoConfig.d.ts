import Hexo from 'hexo';
/**
 * get hexo config with custom type
 * @param hexo
 * @returns
 */
export declare function getHexoConfig(hexo: Hexo): import("hexo/dist/hexo/index-d").Config & {
    'hexo-shortcodes'?: {
        raw: boolean;
    };
};
