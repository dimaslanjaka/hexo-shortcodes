"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.vimeoTag = vimeoTag;
var hexo_util_1 = require("hexo-util");
/**
 * Vimeo tag
 *
 * Syntax:
 *   {% vimeo video_id %}
 */
function vimeoTag(id) {
    var src = 'https://player.vimeo.com/video/' + id;
    var iframeTag = (0, hexo_util_1.htmlTag)('iframe', {
        src: src,
        frameborder: '0',
        loading: 'lazy',
        allowfullscreen: true
    }, '');
    return (0, hexo_util_1.htmlTag)('div', { class: 'video-container' }, iframeTag, false);
}
