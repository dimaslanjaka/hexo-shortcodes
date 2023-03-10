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
exports.rssreader = void 0;
var ansi_colors_1 = __importDefault(require("ansi-colors"));
var hexo_util_1 = require("hexo-util");
var nunjucks_1 = __importDefault(require("nunjucks"));
var rss_parser_1 = __importDefault(require("rss-parser"));
var utils_1 = require("./utils");
var logname = ansi_colors_1.default.magentaBright('hexo-shortcodes') + ansi_colors_1.default.blueBright('(rssreader)');
function rssreader(hexo) {
    var parser = new rss_parser_1.default({
        customFields: {
            item: [['media:content', 'media:content', { keepArray: true }]]
        },
        defaultRSS: 2.0
    });
    var env = nunjucks_1.default.configure({
        noCache: true,
        autoescape: false
    });
    hexo.extend.tag.register('rssreader', function (args, template) {
        if (template === void 0) { template = ''; }
        return __awaiter(this, void 0, void 0, function () {
            var url, defaults, options, feed, result, _loop_1, i;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = args[0];
                        defaults = {
                            limit: '3',
                            debug: 'false'
                        };
                        options = Object.assign(defaults, (0, utils_1.array2obj)(args.splice(1).map(function (str) {
                            var _a;
                            var split = str.split(':');
                            return _a = {}, _a[split[0]] = split[1], _a;
                        })));
                        hexo.log.info(logname, url, options);
                        return [4 /*yield*/, parser.parseURL(url)];
                    case 1:
                        feed = _a.sent();
                        result = [];
                        _loop_1 = function (i) {
                            var item = feed.items[i];
                            var rendered = void 0;
                            if (options.debug === 'true') {
                                // debugging
                                rendered = "<pre><code class=\"highlight json\">".concat(JSON.stringify(Object.keys(item), null, 2), "</code></pre>");
                            }
                            else {
                                // clone and modify template
                                var cloneTemplate_1 = template
                                    .replace(/\$title/gim, '{{ title }}')
                                    .replace(/\$content/gim, '{{ content }}')
                                    .replace(/\$link/gim, '{{ link }}')
                                    .replace(/\$summary/gim, '{{ summary }}')
                                    .replace(/\$image/gim, '{{ image }}');
                                Object.keys(item).forEach(function (key) {
                                    var regex = new RegExp((0, hexo_util_1.escapeRegExp)('$' + key), 'gmi');
                                    var replacement = '{{ ' + key + ' }}';
                                    hexo.log.debug(logname, regex, '->', replacement);
                                    cloneTemplate_1 = cloneTemplate_1.replace(regex, replacement);
                                });
                                // render
                                rendered = env.renderString(cloneTemplate_1, item);
                            }
                            result.push(rendered);
                        };
                        for (i = 0; i < (options.limit || 3); i++) {
                            _loop_1(i);
                        }
                        return [2 /*return*/, result.join('\n')];
                }
            });
        });
    }, { ends: true, async: true });
}
exports.rssreader = rssreader;
