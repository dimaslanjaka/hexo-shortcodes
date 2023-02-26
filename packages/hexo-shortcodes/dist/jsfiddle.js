"use strict";
//
// Input: {% jsfiddle heera/A9RDk %}
// Output: <script async src=\"//jsfiddle.net/heera/A9RDk/embed/js,resources,html,css,result/dark/"></script>
//
// Input: {% jsfiddle heera/A9RDk js,html,result iframe %}
// Output: <iframe style="width: 100%; height: 300px" src="http://jsfiddle.net/heera/A9RDk/embedded/js,html,result/light/"></iframe>
//
Object.defineProperty(exports, "__esModule", { value: true });
exports.jsfiddle = void 0;
// /(?<fiddle>\w+)(?:\s+(?<sequence>[\w,]+))?(?:\s+(?<skin>\w+))?(?:\s+(?<height>\w+))?(?:\s+(?<width>\w+))?/
var jsfiddle = function (hexo) {
    return hexo.extend.tag.register('jsfiddle', function (args) {
        var id = args[0];
        var display = args[1] || 'js,resources,html,css,result';
        var outputAs = args[2] || 'script';
        var mode = args[3] || 'light';
        var ifr = "<iframe style=\"width: 100%; height: 300px\" src=\"http://jsfiddle.net/".concat(id, "/embedded/").concat(display, "/").concat(mode, "/\"></iframe>");
        var scr = "<script async src=\"//jsfiddle.net/".concat(id, "/embed/").concat(display, "/").concat(mode, "/\"></script><noscript>").concat(ifr, "</noscript>");
        if (outputAs === 'script') {
            return scr;
        }
        else {
            return ifr;
        }
    });
};
exports.jsfiddle = jsfiddle;
