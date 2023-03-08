/* eslint-disable no-useless-escape */
import Hexo from 'hexo';
import { htmlTag } from 'hexo-util';

/**
 * Dailymotion tag
 *
 * @example
 * ```nunjucks
 * {% dailymotion [player:player_id] [video:video_id] [playlist:playlist_id]  %}
 * ```
 */
export function dailymotionTag(args: string[]) {
  const arg = args.join(' ');

  const [, player = null] = arg.match(/\s*player:(\w+)/i) || [];
  const [, video = null] = arg.match(/\s*video:(\w+)/i) || [];
  const [, playlist = null] = arg.match(/\s*playlist:(\w+)/i) || [];
  const [, params = null] = arg.match(/\s*params:([=&%\[\]\w\-]+)/i) || [];

  const playerPath = player ? `player/${player}.js` : `player.js`;

  return htmlTag(
    'script',
    {
      src: `https://geo.dailymotion.com/${playerPath}`,
      class: 'video-container',
      ...(video ? { 'data-video': video } : null),
      ...(playlist ? { 'data-playlist': playlist } : null),
      ...(params ? { 'data-params': params } : null)
    },
    '',
    false
  );
}

export function dailymotion(hexo: Hexo) {
  hexo.extend.tag.register('dailymotion', dailymotionTag);
}
