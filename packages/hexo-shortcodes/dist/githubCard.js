'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.githubCard = void 0;
var ansi_colors_1 = __importDefault(require("ansi-colors"));
// const Promise = require('bluebird');
var fs_1 = __importDefault(require("fs"));
var nunjucks_1 = __importDefault(require("nunjucks"));
var env_1 = require("./env");
var logname = ansi_colors_1.default.magentaBright('hexo-shortcodes(githubCard)');
// githubCard
// show github profile or repositories
function githubCard(hexo) {
    // Registers serving of the lib used by the plugin with Hexo.
    var libRoute = "".concat(env_1.GITHUB_CARD_ROUTE_NAME, "/").concat(env_1.GITHUB_CARD_LIB_NAME);
    hexo.extend.generator.register(env_1.GITHUB_CARD_ROUTE_NAME, function () {
        return {
            path: libRoute,
            data: function () { return fs_1.default.createReadStream(env_1.GITHUB_CARD_FILE_PATH); }
        };
    });
    hexo.extend.filter.register('server_middleware', function (app) {
        app.use(libRoute, function (_req, res) {
            res.setHeader('content-type', 'text/javascript');
            res.end(fs_1.default.readFileSync(env_1.GITHUB_CARD_FILE_PATH).toString());
        });
    });
    // Registers the new tag with Hexo.
    hexo.extend.tag.register('githubCard', function (args) {
        nunjucks_1.default.configure([env_1.LIB_PATH, env_1.TEMPLATE_PATH], {
            noCache: true,
            watch: false
        });
        var argsObj = {};
        args.forEach(function (arg) {
            var current = arg.split(':');
            argsObj[current[0]] = current[1];
        });
        hexo.log.info(logname, argsObj);
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
}
exports.githubCard = githubCard;
