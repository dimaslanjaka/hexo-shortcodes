"use strict";
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
exports.githubEmbed = void 0;
var ansi_colors_1 = __importDefault(require("ansi-colors"));
var git_embed_1 = __importDefault(require("git-embed"));
var logname = ansi_colors_1.default.magentaBright('hexo-shortcodes') +
    ansi_colors_1.default.blueBright('(github)');
/**
 * hexo shortcode to embed file
 * @param hexo
 */
function githubEmbed(hexo) {
    hexo.extend.tag.register('github', function (params) {
        return __awaiter(this, void 0, void 0, function () {
            var url, parseURL, config_1, splitcolon, splithypen, embed;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        // filter empty array
                        params = params.filter(function (str) { return String(str).trim().length > 0; });
                        if (!(params.length > 0)) return [3 /*break*/, 2];
                        url = void 0;
                        parseURL = void 0;
                        config_1 = {
                            repo: '',
                            file: '',
                            line: '',
                            ref: ''
                        };
                        if (params.length === 1) {
                            // params is url
                            try {
                                parseURL = new URL(params[0]);
                            }
                            catch (_e) {
                                parseURL = new URL('https://github.com/' + params[0]);
                            }
                            url = parseURL.toString();
                        }
                        else {
                            splitcolon = params.map(function (str) { return String(str).split(':'); });
                            splitcolon.forEach(function (split) {
                                ;
                                config_1[split[0].trim()] = split[1].trim();
                            });
                            parseURL = new URL('https://github.com');
                            // merge pathname
                            parseURL.pathname = [
                                config_1.repo,
                                'blob',
                                config_1.ref,
                                config_1.file
                            ].join('/');
                            // fix line
                            if (!config_1.line.includes('L')) {
                                splithypen = config_1.line.split('-');
                                parseURL.hash = '#L' + splithypen[0] + '-L' + splithypen[1];
                            }
                            else {
                                parseURL.hash = config_1.line;
                            }
                            url = parseURL.toString();
                        }
                        hexo.log.i(logname, 'embed', parseURL.pathname + parseURL.hash);
                        config_1.line = parseURL.hash;
                        return [4 /*yield*/, (0, git_embed_1.default)(url, { tabSize: 2 })];
                    case 1:
                        embed = _a.sent();
                        return [2 /*return*/, embed.result];
                    case 2: return [2 /*return*/, ''];
                }
            });
        });
    }, { async: true });
}
exports.githubEmbed = githubEmbed;
