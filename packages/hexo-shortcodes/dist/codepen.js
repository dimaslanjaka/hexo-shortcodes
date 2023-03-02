"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.codepen = exports.array2obj = void 0;
var ansi_colors_1 = __importDefault(require("ansi-colors"));
var logname = ansi_colors_1.default.magentaBright('hexo-shortcodes') + ansi_colors_1.default.blueBright('(codepen)');
var matches_wrapper = {};
/**
 * get matches from regex (cacheable)
 * @param string
 * @param regex
 * @param index
 * @returns
 */
function getMatches(string, regex, index) {
    // index || (index = 1); // default to the first capturing group
    var key = string + String(regex);
    var matches = matches_wrapper[key] || [];
    if (matches.length === 0) {
        var match = void 0;
        while ((match = regex.exec(string))) {
            // matches.push(match[index]);
            match.forEach(function (m, i) {
                matches[i] = m;
            });
        }
    }
    matches_wrapper[key] = matches;
    if (index)
        return matches[index];
    return matches;
}
/**
 * turn multidimensional array to single object.
 *
 * forked from @see {@link https://github.com/rmcfadzean/jekyll-codepen}
 * @param data
 * @returns
 */
function array2obj(data) {
    /*if (Array.isArray(data)) {
      return data.reduce((obj, el, i) => (el && (obj[i] = multiDimensionalArrayToObject(el)), obj), {});
    } else if (typeof data === 'object') {
      return data.reduce(function (obj) {
        return Object.assign({}, obj);
      }, {});
    }*/
    if (Array.isArray(data)) {
        return data.reduce(function (prev, cur) {
            if (Array.isArray(prev))
                return array2obj(prev);
            // fix array of object
            if (typeof cur === 'object' && !Array.isArray(cur))
                return Object.assign(prev, cur);
            if (!Array.isArray(prev))
                return Object.assign({}, prev);
        }, {});
    }
    return data;
}
exports.array2obj = array2obj;
function codepen(hexo) {
    hexo.extend.tag.register('codepen', function (args) {
        var urlOrid = args[0];
        var slug;
        var user;
        // get slug and user when first argument is url
        var regex = /codepen.io\/(\w*)\/pen\/(\w*)/gm;
        var match = getMatches(urlOrid, regex);
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
        var overriden = array2obj(parse);
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
