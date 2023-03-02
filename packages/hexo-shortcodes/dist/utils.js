"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.array2obj = exports.getMatches = exports.escapeHTML = exports.registerHexo = exports.url_for = void 0;
var hexo;
/**
 * hexo-util.url_for alias
 * @param url
 * @returns
 */
var url_for = function (url) { return (hexo.config.root + url).replace(/\/+/gm, '/'); };
exports.url_for = url_for;
var registerHexo = function (instance) { return (hexo = instance); };
exports.registerHexo = registerHexo;
var escapeHTML = function (str) {
    return str.replace(/[&<>'"]/g, function (tag) {
        return ({
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            "'": '&#39;',
            '"': '&quot;'
        }[tag]);
    });
};
exports.escapeHTML = escapeHTML;
var matches_wrapper = {};
/**
 * get matches from regex (cacheable)
 * @param string
 * @param regex
 * @param index
 * @returns
 */
function getMatches(string, regex, index) {
    // index || (index = 1); // default to the first capturing group
    var key = string + String(regex);
    var matches = matches_wrapper[key] || [];
    if (matches.length === 0) {
        var match = void 0;
        while ((match = regex.exec(string))) {
            // matches.push(match[index]);
            match.forEach(function (m, i) {
                matches[i] = m;
            });
        }
    }
    matches_wrapper[key] = matches;
    if (index)
        return matches[index];
    return matches;
}
exports.getMatches = getMatches;
/**
 * turn multidimensional array to single object.
 *
 * forked from @see {@link https://github.com/rmcfadzean/jekyll-codepen}
 * @param data
 * @returns
 */
function array2obj(data) {
    /*if (Array.isArray(data)) {
        return data.reduce((obj, el, i) => (el && (obj[i] = multiDimensionalArrayToObject(el)), obj), {});
      } else if (typeof data === 'object') {
        return data.reduce(function (obj) {
          return Object.assign({}, obj);
        }, {});
      }*/
    if (Array.isArray(data)) {
        return data.reduce(function (prev, cur) {
            if (Array.isArray(prev))
                return array2obj(prev);
            // fix array of object
            if (typeof cur === 'object' && !Array.isArray(cur))
                return Object.assign(prev, cur);
            if (!Array.isArray(prev))
                return Object.assign({}, prev);
        }, {});
    }
    return data;
}
exports.array2obj = array2obj;
