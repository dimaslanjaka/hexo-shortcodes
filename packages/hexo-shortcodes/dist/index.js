"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// const Promise = require('bluebird');
var codepen_1 = require("./codepen");
var dailymotion_1 = require("./dailymotion");
var env_1 = require("./env");
var gist_1 = require("./gist");
var githubCard_1 = require("./githubCard");
var jsfiddle_1 = require("./jsfiddle");
var rssreader_1 = require("./rssreader");
var utils_1 = require("./utils");
if (typeof hexo !== 'undefined') {
    // register hexo for utils
    (0, utils_1.registerHexo)(hexo);
    // register tags
    (0, githubCard_1.githubCard)(hexo);
    (0, gist_1.gist)(hexo);
    (0, jsfiddle_1.jsfiddle)(hexo);
    (0, codepen_1.codepen)(hexo);
    (0, dailymotion_1.dailymotion)(hexo);
    (0, rssreader_1.rssreader)(hexo);
    // register assets before closing body
    hexo.extend.filter.register('after_render:html', function (data) {
        return data.replace('</body>', "\n<script src=\"".concat((0, utils_1.url_for)('/hexo-shortcodes-lib/' + env_1.GITHUB_CARD_LIB_NAME), "\"></script>\n<link rel=\"stylesheet\" href=\"").concat((0, utils_1.url_for)('/hexo-shortcodes-lib/gist.css'), "\" />\n</body>\n      "));
    });
}
