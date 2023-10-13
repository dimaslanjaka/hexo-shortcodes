import Hexo from 'hexo';

/**
 * get hexo config with custom type
 * @param hexo
 * @returns
 */
export function getHexoConfig(hexo: Hexo) {
  return hexo.config as typeof hexo.config & {
    'hexo-shortcodes'?: {
      raw: boolean;
    };
  };
}
