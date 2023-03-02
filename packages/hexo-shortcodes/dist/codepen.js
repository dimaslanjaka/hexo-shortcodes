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
        var regex = /codepen.io\/\w*\/pen\/(?<slug>\w*)/gm;
        var test = regex.test(id);
        console.log(test);
        return '';
    });
}
exports.codepen = codepen;
