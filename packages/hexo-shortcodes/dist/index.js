'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// const Promise = require('bluebird');
var ansi_colors_1 = __importDefault(require("ansi-colors"));
var fs_1 = __importDefault(require("fs"));
var nunjucks_1 = __importDefault(require("nunjucks"));
var env_1 = require("./env");
var jsfiddle_1 = require("./jsfiddle");
var _hgc_logname = ansi_colors_1.default.magentaBright('hexo-github-card');
(0, jsfiddle_1.jsfiddle)(hexo);
nunjucks_1.default.configure([env_1.LIB_PATH, env_1.TEMPLATE_PATH], {
    noCache: true,
    watch: false
});
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
// githubCard
// show github profile or repositories
// Registers serving of the lib used by the plugin with Hexo.
hexo.extend.generator.register(env_1.GITHUB_CARD_ROUTE_NAME, function () {
    return {
        path: "".concat(env_1.GITHUB_CARD_ROUTE_NAME, "/").concat(env_1.GITHUB_CARD_LIB_NAME),
        data: function () { return fs_1.default.createReadStream(env_1.GITHUB_CARD_FILE_PATH); }
    };
});
// Registers the new tag with Hexo.
hexo.extend.tag.register(env_1.GITHUB_CARD_TAG_NAME, function (args) {
    var argsObj = {};
    args.forEach(function (arg) {
        var current = arg.split(':');
        argsObj[current[0]] = current[1];
    });
    var user = argsObj.user, repo = argsObj.repo, width = argsObj.width || '400', height = argsObj.height || '200', theme = argsObj.theme || 'default', client_id = argsObj.client_id || '', client_secret = argsObj.client_secret || '', align = argsObj.align || 'center';
    var payload = {
        user: user,
        repo: repo,
        height: height,
        width: width,
        theme: theme,
        client_id: client_id,
        client_secret: client_secret,
        style: "text-align: ".concat(align)
    };
    return new Promise(function (resolve) {
        nunjucks_1.default.renderString(fs_1.default.readFileSync(env_1.GITHUB_CARD_TEMPLATE, 'utf-8'), payload, function (err, res) {
            if (err) {
                resolve('ERROR(githubCard)' + err.message);
            }
            else {
                resolve(res);
            }
        });
    });
}, {
    async: true
});
