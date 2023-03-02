"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// const Promise = require('bluebird');
var ansi_colors_1 = __importDefault(require("ansi-colors"));
var codepen_1 = require("./codepen");
var env_1 = require("./env");
var gist_1 = require("./gist");
var githubCard_1 = require("./githubCard");
var jsfiddle_1 = require("./jsfiddle");
var utils_1 = require("./utils");
var logname = ansi_colors_1.default.magentaBright('hexo-shortcodes');
if (typeof hexo !== 'undefined') {
    // register hexo for utils
    (0, utils_1.registerHexo)(hexo);
    // register tags
    (0, githubCard_1.githubCard)(hexo);
    (0, gist_1.gist)(hexo);
    (0, jsfiddle_1.jsfiddle)(hexo);
    (0, codepen_1.codepen)(hexo);
    // register assets before closing body
    hexo.extend.filter.register('after_render:html', function (data) {
        return data.replace('</body>', "\n<script src=\"".concat((0, utils_1.url_for)('/hexo-shortcodes-lib/' + env_1.GITHUB_CARD_LIB_NAME), "\"></script>\n<link rel=\"stylesheet\" href=\"").concat((0, utils_1.url_for)('/hexo-shortcodes-lib/gist.css'), "\" />\n</body>\n      "));
    });
}
else {
    console.error(logname, 'not running within hexo instance');
}
/*const escapeHTML = (str) =>
  str.replace(
    /[&<>'"]/g,
    (tag) =>
      ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        "'": '&#39;',
        '"': '&quot;'
      }[tag])
  );*/
