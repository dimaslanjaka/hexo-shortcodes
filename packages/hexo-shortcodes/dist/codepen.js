"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.codepen = void 0;
var ansi_colors_1 = __importDefault(require("ansi-colors"));
var utils_1 = require("./utils");
var logname = ansi_colors_1.default.magentaBright('hexo-shortcodes') + ansi_colors_1.default.blueBright('(codepen)');
function codepen(hexo) {
    hexo.extend.tag.register('codepen', function (args) {
        var urlOrid = args[0];
        var slug;
        var user;
        // get slug and user when first argument is url
        var regex = /codepen.io\/(\w*)\/pen\/(\w*)/gm;
        var match = (0, utils_1.getMatches)(urlOrid, regex);
        if (match !== null) {
            args[0] = '';
            user = match[1];
            slug = match[2];
        }
        else {
            hexo.log.error(logname, urlOrid, match);
        }
        hexo.log.info(logname, { user: user, pen: slug });
        // parse `=` from all arguments
        var parse = args
            .map(function (str) {
            var _a;
            var spl = str.split('=');
            if (!spl[1])
                return;
            return _a = {},
                _a[spl[0]] = spl[1],
                _a;
        })
            .filter(function (o) { return typeof o === 'object'; });
        var overriden = (0, utils_1.array2obj)(parse);
        var config = hexo.config.codepen || {};
        var url = "https://codepen.io/".concat(user, "/pen/").concat(slug);
        var defaults = {
            class: config.class || 'codepen',
            embed_version: parseInt(config.version) || 2,
            height: parseInt(config.height) || 300,
            preview: String(config.preview) === 'true' ? true : false,
            theme_id: config.theme_id || 11473,
            default_tab: config.default_tab || 'result',
            'data-user': user,
            'data-slug-hash': slug
        };
        var overriden_options = Object.assign(defaults, overriden);
        var attr = Object.keys(overriden_options)
            .map(function (key) { return "".concat(key, "=\"").concat(defaults[key], "\""); })
            .join(' ');
        var htm_tag = "<p ".concat(attr, ">See the <a href=\"").concat(url, "\">pen</a> on <a href=\"//codepen.io\" rel=\"nofollow noopener\">CodePen</a>.</p>");
        var htm_script = '<script async src="https://production-assets.codepen.io/assets/embed/ei.js"></script>';
        return htm_tag + htm_script;
    });
}
exports.codepen = codepen;
