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
exports.registerIncludeTag = void 0;
var fs_extra_1 = __importDefault(require("fs-extra"));
var upath_1 = __importDefault(require("upath"));
var parseTagParameter_1 = require("./parseTagParameter");
var nunjucks_1 = __importDefault(require("nunjucks"));
/**
 * Hexo include tag
 *
 * Inserts the raw contents of a file into a hexo markdown file.
 *
 * Takes context. Exports function that grabs contents of file
 * given a filename relative to source directory.
 *
 * @example
 *   {% include_file 'path/to/file' %}
 *   Path is relative to your source directory.
 */
function includeTag(ctx) {
    var callback = function (args, template) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var sourceDir, codeDir, rawLinkBaseDir, sourcePage, parseArgs, from, to, preText, filePath, exists, contents, caption, lines, slice, env, renderTemplate, options;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        sourceDir = upath_1.default.join(ctx.base_dir, ctx.config.source_dir);
                        codeDir = upath_1.default.join(sourceDir, ctx.config.code_dir);
                        rawLinkBaseDir = upath_1.default.toUnix(ctx.base_dir);
                        sourcePage = this['full_source'];
                        if (!template) {
                            // keep template empty string when undefined
                            template = '';
                        }
                        else {
                            // trim trailing whitespaces
                            template = template.trim();
                        }
                        parseArgs = (0, parseTagParameter_1.parseTagParameter)(args);
                        from = 0;
                        if (parseArgs.from)
                            from = parseInt(parseArgs.from) - 1;
                        to = Number.MAX_VALUE;
                        if (parseArgs.to)
                            to = parseInt(parseArgs.to);
                        preText = true;
                        if (parseArgs.pretext)
                            preText = ((_a = parseArgs.pretext) === null || _a === void 0 ? void 0 : _a.trim()) === 'true';
                        // override language when is not string or empty string
                        if (typeof parseArgs.lang !== 'string' || parseArgs.lang.length == 0) {
                            parseArgs.lang = upath_1.default.extname(parseArgs.sourceFile).substring(1);
                        }
                        // override title
                        if (!parseArgs.title) {
                            parseArgs.title = upath_1.default.basename(parseArgs.sourceFile);
                        }
                        filePath = undefined;
                        exists = undefined;
                        // try find from relative to source_dir
                        if ((filePath = upath_1.default.join(sourceDir, parseArgs.sourceFile)) && (exists = fs_extra_1.default.existsSync(filePath))) {
                            rawLinkBaseDir = sourceDir;
                        }
                        // try find from relative to code_dir
                        else if ((filePath = upath_1.default.join(codeDir, parseArgs.sourceFile)) && (exists = fs_extra_1.default.existsSync(filePath))) {
                            rawLinkBaseDir = codeDir;
                        }
                        // try find from relative to source path
                        else if ((filePath = upath_1.default.resolve(upath_1.default.dirname(sourcePage), parseArgs.sourceFile)) &&
                            (exists = fs_extra_1.default.existsSync(filePath))) {
                            rawLinkBaseDir = upath_1.default.dirname(upath_1.default.resolve(upath_1.default.dirname(sourcePage), parseArgs.sourceFile));
                        }
                        // Add trailing slash to sourceBaseDir
                        if (!rawLinkBaseDir.endsWith('/'))
                            rawLinkBaseDir += '/';
                        // trim hexo.source_dir for raw link
                        rawLinkBaseDir = rawLinkBaseDir.replace(sourceDir, '');
                        contents = '';
                        if (!exists) return [3 /*break*/, 2];
                        return [4 /*yield*/, fs_extra_1.default.readFile(filePath, { encoding: 'utf-8' })];
                    case 1:
                        contents = _b.sent();
                        if (contents.length === 0) {
                            contents = parseArgs.sourceFile + ' file empty.';
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        //console.log({ filePath, sourceDir, sourceFile: parseArgs.sourceFile, rawLinkBaseDir });
                        contents = parseArgs.sourceFile + ' file path not found';
                        _b.label = 3;
                    case 3:
                        caption = "<span>".concat(parseArgs.title, "</span><a href=\"").concat(upath_1.default.join(ctx.config.root, rawLinkBaseDir, parseArgs.sourceFile), "\">view raw</a>");
                        lines = contents.split(/\r?\n/gm);
                        slice = lines.slice(from, to);
                        contents = slice.join('\n');
                        // nunjucks render when template not empty string
                        if (template.length > 0) {
                            env = nunjucks_1.default.configure({
                                noCache: true,
                                autoescape: false,
                                throwOnUndefined: false,
                                trimBlocks: false,
                                lstripBlocks: false
                            });
                            renderTemplate = "\n{% for line in lines %}\n  ".concat(template.replace(/\$line/gim, '{{ line }}').replace(/\$index/gim, '{{ loop.index }}'), "\n{% endfor %}\n      ").trim();
                            contents = env.renderString(renderTemplate, { lines: slice });
                        }
                        if (preText) {
                            // process syntax highlighter on `pretext:true`
                            if (ctx.extend.highlight.query(ctx.config.syntax_highlighter)) {
                                options = {
                                    lang: parseArgs.lang,
                                    caption: caption,
                                    lines_length: lines.length
                                };
                                return [2 /*return*/, ctx.extend.highlight.exec(ctx.config.syntax_highlighter, {
                                        context: ctx,
                                        args: [contents, options]
                                    })];
                            }
                            else {
                                return [2 /*return*/, "<pre><code>".concat(contents, "</code></pre>")];
                            }
                        }
                        else {
                            // return raw contents
                            return [2 /*return*/, contents];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    return callback;
}
function registerIncludeTag(ctx) {
    hexo.extend.tag.register('include_file', includeTag(ctx), { async: true, ends: true });
}
exports.registerIncludeTag = registerIncludeTag;
