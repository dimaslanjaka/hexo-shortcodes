"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.codepen = void 0;
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
        if (!regex.test(string))
            return null;
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
function codepen(hexo) {
    hexo.extend.tag.register('codepen', function (args) {
        var urlOrid = args[0];
        hexo.log.info(logname, urlOrid);
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
        // parse `=` from all arguments
        var parse = args.map(function (str) { return str.split('='); });
        console.log(parse);
        var config = hexo.config.codepen || {};
        var defaults = {
            class: config.class || 'codepen',
            embed_version: parseInt(config.version) || 2,
            height: parseInt(config.height) || 300,
            preview: String(config.preview) === 'true' ? true : false,
            theme_id: config.theme || 11473,
            default_tab: config.default_tab || 'result',
            user: user,
            slug: slug
        };
        return '';
    });
}
exports.codepen = codepen;
