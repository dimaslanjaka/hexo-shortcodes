"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseTagParameter = void 0;
var utils_1 = require("./utils");
var rCaptionTitleFile = /("[^"]*"|'[^']*'|[\S]+)+/g;
/**
 * parse shortcode parameter
 * @param args
 */
function parseTagParameter(args) {
    var argv = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        argv[_i - 1] = arguments[_i];
    }
    var join = (typeof args === 'string' ? [args] : args).concat(argv).join(' ');
    var concat = Array.from(join.match(rCaptionTitleFile) || []);
    var sourceFile = concat.filter(function (str) { return !str.includes(':'); })[0];
    var options = (0, utils_1.array2obj)(concat.map(function (str) {
        var _a;
        var split = str.split(':');
        return _a = {}, _a[split[0]] = split[1], _a;
    }));
    var result = Object.assign({ lang: '', from: 0, to: Infinity, sourceFile: sourceFile }, options);
    if (typeof result.from !== 'number')
        result.from = parseInt(result.from);
    if (typeof result.to !== 'number')
        result.from = parseInt(result.to);
    return result;
}
exports.parseTagParameter = parseTagParameter;
