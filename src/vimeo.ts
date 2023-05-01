import * as HexoUtil from 'hexo-util';

/**
 * Vimeo tag
 *
 * Syntax:
 *   {% vimeo video_id %}
 */
export function vimeoTag(id: string) {
  const src = 'https://player.vimeo.com/video/' + id;

  const iframeTag = HexoUtil.htmlTag(
    'iframe',
    {
      src,
      frameborder: '0',
      loading: 'lazy',
      allowfullscreen: true
    },
    ''
  );

  return HexoUtil.htmlTag('div', { class: 'video-container' }, iframeTag, false);
}

export default function vimeo(hexo: import('hexo')) {
  hexo.extend.tag.register('vimeo', vimeoTag);
}
