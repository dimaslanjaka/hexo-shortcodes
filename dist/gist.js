"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.gist = void 0;
var ansi_colors_1 = __importDefault(require("ansi-colors"));
var axios_1 = __importDefault(require("axios"));
var bluebird_1 = __importDefault(require("bluebird"));
var upath_1 = __importDefault(require("upath"));
var hexoUtils = __importStar(require("hexo-util"));
var nunjucks_1 = __importDefault(require("nunjucks"));
var fs_extra_1 = __importDefault(require("fs-extra"));
var env_1 = require("./env");
var logname = ansi_colors_1.default.magentaBright('hexo-shortcodes') + ansi_colors_1.default.blueBright('(gist)');
// hexo-gist
// gist shortcode
// https://github.com/jekyll/jekyll-gist
// https://github.com/jekyll/jekyll-gist/blob/master/lib/jekyll-gist/gist_tag.rb
//
// input {% gist meredrica/088f5a593a2a7184202850c58bcb48d1 %}
// output <script src="https://gist.github.com/meredrica/088f5a593a2a7184202850c58bcb48d1.js"> </script>
//
// You may optionally specify a `filename` after the `id`:
// input {% gist meredrica/c08ee0f2726fd0e3909d test.md %}
var fetch_raw_code = function (hexo, id, filename) {
    return __awaiter(this, void 0, void 0, function () {
        var url;
        return __generator(this, function (_a) {
            url = "https://gist.githubusercontent.com/".concat(id, "/raw");
            if (typeof filename === 'string') {
                url = "".concat(url, "/").concat(filename);
            }
            return [2 /*return*/, new bluebird_1.default(function (resolve, reject) {
                    axios_1.default
                        .get(url)
                        .then(function (res) {
                        resolve(res.data);
                    })
                        .catch(function (e) {
                        hexo.log.error(logname, id, "cannot get ".concat(e.message), { url: url });
                        reject(e);
                    });
                })];
        });
    });
};
var gist = function (hexo) {
    var url_for = hexoUtils.url_for.bind(hexo);
    var libFilename = 'gist.css';
    var libRoute = "".concat(env_1.ROUTE_NAME, "/").concat(libFilename);
    var libFilePath = upath_1.default.resolve(env_1.LIB_PATH, libFilename);
    /**
     * REGISTER MIDDLEWARE FOR HEXO GENERATE
     */
    hexo.extend.generator.register(url_for(libRoute, {}), function () {
        return {
            path: libRoute,
            data: function () { return fs_extra_1.default.createReadStream(libFilePath); }
        };
    });
    /**
     * REGISTER MIDDLEWARE FOR HEXO SERVER
     */
    hexo.extend.filter.register('server_middleware', function (app) {
        app.use(libRoute, function (_req, res) {
            res.setHeader('content-type', 'text/javascript');
            res.end(fs_extra_1.default.readFileSync(libFilePath).toString());
        });
    });
    /**
     * render using nunjucks
     * * useful when username undefined
     * @returns
     * @example
     * {% gist 996818 %}
     */
    function _nunjucksMethod() {
        var env = nunjucks_1.default.configure([env_1.LIB_PATH, env_1.TEMPLATE_PATH], {
            noCache: true,
            watch: false
        });
        return function (args) {
            var id = args[0];
            hexo.log.d(logname, id);
            var filename = args[1];
            var payload = {
                id: id,
                filename: filename,
                raw_code: ''
            };
            return env.renderString(fs_extra_1.default.readFileSync(env_1.GIST_TEMPLATE).toString(), payload);
        };
    }
    /**
     * smart render using internal hexojs syntax highlighter
     * @param args
     * @returns
     */
    function _usingHexoSyntaxHighlighter(args) {
        return __awaiter(this, void 0, void 0, function () {
            var id, username, gist_id, filename, content, line, lineSplit, startLine, endLine, codeText, contentSplit, options, newContent;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = args[0] || '';
                        username = id.split('/')[0];
                        gist_id = id.split('/')[1];
                        if (!gist_id) {
                            try {
                                return [2 /*return*/, _nunjucksMethod()(args)];
                            }
                            catch (error) {
                                hexo.log.error(logname, error);
                                return [2 /*return*/, ''];
                            }
                        }
                        hexo.log.d(logname, username, gist_id);
                        filename = args[1] || '';
                        return [4 /*yield*/, fetch_raw_code(hexo, id, filename)];
                    case 1:
                        content = _a.sent();
                        line = args[2] || '';
                        lineSplit = line.split('-');
                        startLine = (line !== '' && parseInt(lineSplit[0].replace('#L', ''))) || -1;
                        endLine = parseInt((line !== '' && lineSplit.length > 1 && lineSplit[1].replace('L', '')) || String(startLine));
                        codeText = '';
                        contentSplit = content.split('\n');
                        if (startLine > 0) {
                            contentSplit = contentSplit.slice(startLine - 1, endLine);
                            codeText = contentSplit.join('\n');
                            // Then add the newline back
                            codeText = codeText + '\n';
                        }
                        // fallback to content
                        if (codeText.length === 0)
                            codeText = content;
                        // If neither highlight.js nor prism.js is enabled, return escaped code directly
                        if (!hexo.extend.highlight.query(hexo.config.syntax_highlighter)) {
                            return [2 /*return*/, "<pre><code>".concat(hexoUtils.escapeHTML(codeText), "</code></pre>")];
                        }
                        options = {
                            lines_length: codeText.split('\n').length,
                            lang: upath_1.default.extname(filename),
                            caption: upath_1.default.extname(filename)
                        };
                        newContent = hexo.extend.highlight.exec(hexo.config.syntax_highlighter, {
                            context: hexo,
                            args: [codeText, options]
                        });
                        return [2 /*return*/, newContent.replace(/{/g, '&#123;').replace(/}/g, '&#125;')];
                }
            });
        });
    }
    hexo.extend.tag.register('gist', _usingHexoSyntaxHighlighter, { async: true });
};
exports.gist = gist;
