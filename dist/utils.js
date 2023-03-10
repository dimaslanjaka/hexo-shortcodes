"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.escapeRegex = exports.array2obj = exports.isEmptyObject = exports.isObject = exports.isArray = exports.getMatches = exports.escapeHTML = exports.registerHexo = exports.url_for = void 0;
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
 * is actual array
 * @param arr
 * @returns
 */
var isArray = function (arr) { return Object.prototype.toString.call(arr) === '[object Array]'; };
exports.isArray = isArray;
/**
 * is actual object
 * @param obj
 * @returns
 */
var isObject = function (obj) { return obj.constructor === Object; };
exports.isObject = isObject;
var isEmptyObject = function (obj) { return Object.keys(obj).length === 0 && obj.constructor === Object; };
exports.isEmptyObject = isEmptyObject;
/**
 * turn multidimensional array to single object.
 *
 * - [typescript playground](https://www.typescriptlang.org/play?target=1&jsx=0&module=1&pretty=false&allowSyntheticDefaultImports=true#code/KYDwDg9gTgLgBAYwgOwM7wJaoIJSgQwE84BeOACnzwC459lCBKUgPjgHkAjAK2ARgB0YKBBijCYYALEBlGFAzIA5gIT4ANusp5mJPXABEAbQg8+8XAUIBdAwFgAUKEixEKdHCxde-UhVPctPRMrHABqu7yAK780KT63uYA3I7O0PBIaJioAKIAtmAwhIm+ZOQBQQy6bCWCANbAhKjlPIwC6sDKMAAW8WQADHAAZENhPBFZUDFiUH0cZvwpTuDpcABmUcj8GCh0eEQATAEAPAAqcKAwnQAmqHQMRtYs5Nf4MPi0p4yfRshReZxgFBrHAAN6OOCQuBQYAwKJQZBwV7vAQw64xYDkDZbGA7RHkYTAABulUIjwANIh4aTHsxwQ4oYy4AB6ZnrDAgOB5KLqXFIjB5TqoPEaPZWMJrODoBTKCFMyEdeDICAAd1oACU+NBrsdpYolJTgmwyKCAL5y+UYSXkLCWIjkBDwxh0i3yqHKlV+UFwIyOqBGfrWay0P1GACMIPNDLdUbdnmtAEIsPlCsUFjByB7ndDYfDEbUBPhUMKlMgCTCiZSs67Gaz2ZyqOKIJKAuY4DWoVaKF50w6ncwYXCEfMfIIiyWy4TK1SoIwO5Cu+QE3bCAJbftCOXidnB3mR+ZC8WMKXyGbKVPGEt5zmh-n04eJ1vp37L67TZSza+HFHHJlUBAOlUDoqHIL9mQAKj-eBOTIIwAHIoGoVA4MpOCwGoCA4OsAQ8nwMByGlUJpQEVAwHUDAMzg6g4OdVFgHRBBMWxbZdifSkXzBV1FTgD0NS1KAdT1ZRDQYY0wVjTtrXXKw+1nF1o3lD0vR9UNA2DGdw0jN9XV3YcC3HY9JwrKtVTnb8P1NL9f0iOBiFguCQGoQgULgOCPk4LCcLwgj5FCelGSgqUyIovxiNI8jKOoszGV0xFvSMcKKIDINaESmBNLgKNLLohimM2Fj8SndinU4hS3DQACpHUCAlDYmdosk7tUFqWSd1zPT7wMk8ivqnT2rirKLK-P9KvaGryCYcDmUcayKsA6rasbQ4AnIeDEOQ1D0Mw7DcPwwiSDYMLgsimjnTMkb5vGpbCCOHhVocpyXLc6gPJ27z9rYfyoUCtLQvkEjjvIKiaL628wR9NLkvUyGI0yxxLOdIA)
 * @param data
 * @returns
 */
function array2obj(data) {
    return data.reduce(function (prev, cur) {
        var _a;
        // fix multi dimensional array of string
        var now = {};
        if ((0, exports.isArray)(cur)) {
            now = (_a = {}, _a[cur[0]] = cur[1], _a);
        }
        if (!(0, exports.isEmptyObject)(now))
            return Object.assign(prev, now);
        // fix array of object
        if ((0, exports.isObject)(cur))
            return Object.assign(prev, cur);
        if (!Array.isArray(prev))
            return Object.assign({}, prev);
        return Object.assign(prev, cur);
    }, {});
}
exports.array2obj = array2obj;
/**
 * escape regex
 * @param str
 * @returns
 */
function escapeRegex(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
exports.escapeRegex = escapeRegex;
