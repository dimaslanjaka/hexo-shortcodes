"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.shortcodeParserResultToArrayAttrParam = exports.shortcodeParser = void 0;
function shortcodeParser(str) {
    /** shortcode tag name */
    var tagName = '';
    var attributes = [];
    // https://regex101.com/r/XoeXnw/6
    var regex = /{%\s([\w]{1,100})\s([^%}]+)%}/gm;
    var m;
    while ((m = regex.exec(str)) !== null) {
        // This is necessary to avoid infinite loops with zero-width matches
        if (m.index === regex.lastIndex) {
            regex.lastIndex++;
        }
        tagName = m[1] || '';
        var str2 = m[2] || '';
        if (str2.length > 0) {
            var r = /(\w+)[=:]["']?((?:.(?!["']?\s+(?:\S+)[=:]|\s*\/?[%}]))+.)(?:["'])|(\w+)[=:]["']?((?:.(?!["']?\s+(?:\S+)[=:]|\s*\/?[%}]))+.)["']?/gm;
            var mm = void 0;
            while ((mm = r.exec(str)) !== null) {
                // This is necessary to avoid infinite loops with zero-width matches
                if (mm.index === r.lastIndex) {
                    r.lastIndex++;
                }
                var regex1Found = typeof mm[1] != 'undefined' && typeof mm[2] != 'undefined';
                if (regex1Found) {
                    attributes.push({ key: mm[1], value: mm[2] });
                }
                else {
                    attributes.push({ key: mm[3], value: mm[4] });
                }
                // The result can be accessed through the `m`-variable.
                // mm.forEach((match, groupIndex) => {
                //   console.log(`Found match, group ${groupIndex}: ${match}`);
                // });
            }
        }
    }
    return { tagName: tagName, attributes: attributes };
}
exports.shortcodeParser = shortcodeParser;
/**
 * shortcode result to hexo tag attributes array format
 * @param result
 * @returns
 */
function shortcodeParserResultToArrayAttrParam(result) {
    var attributes = result.attributes;
    /** array of key:value */
    var arrayResult = [];
    for (var i = 0; i < attributes.length; i++) {
        var attr = attributes[i];
        arrayResult.push("".concat(attr.key, ":").concat(attr.value));
    }
    return arrayResult;
}
exports.shortcodeParserResultToArrayAttrParam = shortcodeParserResultToArrayAttrParam;
