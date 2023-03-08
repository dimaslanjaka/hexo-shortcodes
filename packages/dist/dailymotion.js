"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dailymotion = exports.dailymotionTag = void 0;
var hexo_util_1 = require("hexo-util");
/**
 * Dailymotion tag
 *
 * @example
 * ```nunjucks
 * {% dailymotion [player:player_id] [video:video_id] [playlist:playlist_id]  %}
 * ```
 */
function dailymotionTag(args) {
    var arg = args.join(' ');
    var _a = arg.match(/\s*player:(\w+)/i) || [], _b = _a[1], player = _b === void 0 ? null : _b;
    var _c = arg.match(/\s*video:(\w+)/i) || [], _d = _c[1], video = _d === void 0 ? null : _d;
    var _e = arg.match(/\s*playlist:(\w+)/i) || [], _f = _e[1], playlist = _f === void 0 ? null : _f;
    var _g = arg.match(/\s*params:([=&%\[\]\w\-]+)/i) || [], _h = _g[1], params = _h === void 0 ? null : _h;
    var playerPath = player ? "player/".concat(player, ".js") : "player.js";
    return (0, hexo_util_1.htmlTag)('script', __assign(__assign(__assign({ src: "https://geo.dailymotion.com/".concat(playerPath), class: 'video-container' }, (video ? { 'data-video': video } : null)), (playlist ? { 'data-playlist': playlist } : null)), (params ? { 'data-params': params } : null)), '', false);
}
exports.dailymotionTag = dailymotionTag;
function dailymotion(hexo) {
    hexo.extend.tag.register('dailymotion', dailymotionTag);
}
exports.dailymotion = dailymotion;
