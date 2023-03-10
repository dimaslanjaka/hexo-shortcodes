import Hexo from 'hexo';
/**
 * Dailymotion tag
 *
 * @example
 * ```nunjucks
 * {% dailymotion [player:player_id] [video:video_id] [playlist:playlist_id]  %}
 * ```
 */
export declare function dailymotionTag(args: string[]): string;
export declare function dailymotion(hexo: Hexo): void;
