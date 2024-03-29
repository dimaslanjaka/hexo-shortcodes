"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseTagParameter = void 0;
var utils_1 = require("../utils");
var rCaptionTitleFile = /("[^"]*"|'[^']*'|[\S]+)+/g;
/**
 * parse shortcode parameter
 * @param args
 */
function parseTagParameter(args) {
    var varArgs = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        varArgs[_i - 1] = arguments[_i];
    }
    var concat = (typeof args === 'string' ? [args] : args).concat(varArgs || []);
    var join = concat.join(' ');
    var match = Array.from(join.match(rCaptionTitleFile) || []);
    var sourceFile = concat.filter(function (str) { return !str.includes(':'); })[0];
    if (!sourceFile && typeof args === 'string') {
        // fix: undefined `sourceFile` on arg string
        sourceFile = match.filter(function (str) { return !str.includes(':'); })[0];
    }
    var options = (0, utils_1.array2obj)(match.map(function (str) {
        var _a;
        var split = str.split(':');
        return _a = {}, _a[split[0]] = split[1], _a;
    }));
    var result = Object.assign({ sourceFile: sourceFile }, options);
    // convert to number
    // if (typeof result.from !== 'number') result.from = parseInt(result.from);
    // if (typeof result.to !== 'number') result.from = parseInt(result.to);
    // fix empty line which embedding spesific lines
    // result.from = result.from - 1; <-- should decrease inside the function
    return result;
}
exports.parseTagParameter = parseTagParameter;
