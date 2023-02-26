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
exports.gist = void 0;
var ansi_colors_1 = __importDefault(require("ansi-colors"));
var axios_1 = __importDefault(require("axios"));
var bluebird_1 = __importDefault(require("bluebird"));
var nunjucks_1 = __importDefault(require("nunjucks"));
var path_1 = __importDefault(require("path"));
var sbg_utility_1 = require("sbg-utility");
var env_1 = require("./env");
var _hg_logname = ansi_colors_1.default.magentaBright('hexo-gist');
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
var fetch_raw_code = function (id, filename) {
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
                        hexo.log.error(_hg_logname, id, "cannot get ".concat(e.message), { url: url });
                        reject(e);
                    });
                })];
        });
    });
};
var gist = function (hexo) {
    hexo.extend.tag.register('gist', function (args) {
        nunjucks_1.default.configure([env_1.LIB_PATH, env_1.TEMPLATE_PATH], {
            noCache: true,
            watch: false
        });
        return new Promise(function (resolve) {
            var id = args[0];
            hexo.log.info(_hg_logname, id);
            var filename = args[1];
            var payload = {
                id: id,
                filename: filename,
                raw_code: ''
            };
            fetch_raw_code(id, filename)
                .then(function (raw_code) {
                payload.raw_code = raw_code;
                (0, sbg_utility_1.writefile)(path_1.default.join(env_1.TEMP_PATH, 'gist', id + '.txt'), raw_code);
                (0, sbg_utility_1.writefile)(path_1.default.join(env_1.TEMP_PATH, 'gist', id + '.json'), JSON.stringify(payload, null, 2));
            })
                .catch(function (e) {
                payload.raw_code = JSON.stringifyWithCircularRefs(e, 2);
            })
                .finally(function () {
                /*let result = '';
              if (filename) {
                result += `<script src="https://gist.github.com/${id}.js?file=${filename}"></script>`;
              } else {
                result += `<script src="https://gist.github.com/${id}.js"></script>`;
              }
              result += `
              <noscript>
                <pre><code>${payload.raw_code}</code></pre>
              </noscript>
              `;
              resolve(result);*/
                nunjucks_1.default.render('hexo-gist.njk', payload, function (_err, result) {
                    (0, sbg_utility_1.writefile)(path_1.default.join(env_1.TEMP_PATH, 'gist', id + '.njk.txt'), result);
                    resolve(result);
                });
                /*nunjucks.renderString(
                fs.readFileSync(path.join(TEMPLATE_PATH, 'hexo-gist.njk')).toString(),
                payload,
                function (err, result) {
                  if (err) {
                    console.log(err);
                    resolve(
                      `ERROR(gist) cannot fetch ${id}.<br/> ${escapeHTML(JSON.stringifyWithCircularRefs(err, null, 2))}`
                    );
                  } else {
                    writefile(path.join(TEMP_PATH, 'gist', id + '.njk.txt'), result);
                    resolve(result);
                  }
                }
              );*/
            });
        });
    }, { async: true });
};
exports.gist = gist;
