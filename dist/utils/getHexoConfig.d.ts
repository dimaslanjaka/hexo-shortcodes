import Hexo from 'hexo';
/**
 * get hexo config with custom type
 * @param hexo
 * @returns
 */
export declare function getHexoConfig(hexo: Hexo): typeof hexo.config & {
    "hexo-shortcodes"?: {
        raw: boolean;
    };
};
