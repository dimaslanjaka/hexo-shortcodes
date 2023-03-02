"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// const Promise = require('bluebird');
var ansi_colors_1 = __importDefault(require("ansi-colors"));
var gist_1 = require("./gist");
var githubCard_1 = require("./githubCard");
var jsfiddle_1 = require("./jsfiddle");
var logname = ansi_colors_1.default.magentaBright('hexo-shortcodes');
if (typeof hexo !== 'undefined') {
    hexo.log.debug('starting shortcodes');
    (0, githubCard_1.githubCard)(hexo);
    (0, gist_1.gist)(hexo);
    (0, jsfiddle_1.jsfiddle)(hexo);
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
