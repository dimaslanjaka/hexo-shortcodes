"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.codepen = void 0;
var ansi_colors_1 = __importDefault(require("ansi-colors"));
var logname = ansi_colors_1.default.magentaBright('hexo-shortcodes') + ansi_colors_1.default.blueBright('(codepen)');
function codepen(hexo) {
    hexo.extend.tag.register('codepen', function (args) {
        var id = args[0];
        hexo.log.info(logname, id);
        var defaults = {
            class: 'codepen',
            embed_version: 2,
            height: 300,
            preview: false,
            theme_id: 11473,
            default_tab: 'result'
        };
        var regex = /codepen.io\/(\w*)\/pen\/(\w*)/gm;
        var match = getMatches(id, regex, 1);
        console.log(match);
        return '';
    });
}
exports.codepen = codepen;
/**
 * get matches from regex
 * @param string
 * @param regex
 * @param index
 * @returns
 */
function getMatches(string, regex, index) {
    // index || (index = 1); // default to the first capturing group
    var matches = [];
    var match;
    while ((match = regex.exec(string))) {
        // matches.push(match[index]);
        match.forEach(function (m, i) {
            matches[i] = m;
        });
    }
    if (index)
        return matches[index];
    return matches;
}
