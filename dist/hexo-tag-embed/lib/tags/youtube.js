"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.youtubeTag = void 0;
var hexo_util_1 = require("hexo-util");
/**
* Youtube tag
*
* Syntax:
*   {% youtube video_id, type, cookie %}
*/
function youtubeTag(_a) {
    var id = _a[0], _b = _a[1], type = _b === void 0 ? 'video' : _b, _c = _a[2], cookie = _c === void 0 ? true : _c;
    if (typeof type === 'boolean') {
        cookie = type;
        type = 'video';
    }
    var ytLink = cookie ? 'https://www.youtube.com' : 'https://www.youtube-nocookie.com';
    var embed = type === 'video' ? '/embed/' : '/embed/videoseries?list=';
    var iframeTag = (0, hexo_util_1.htmlTag)('iframe', {
        src: ytLink + embed + id,
        frameborder: '0',
        loading: 'lazy',
        allowfullscreen: true
    }, '');
    return (0, hexo_util_1.htmlTag)('div', { class: 'video-container' }, iframeTag, false);
}
exports.youtubeTag = youtubeTag;
