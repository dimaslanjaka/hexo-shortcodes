"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getExtUrl = void 0;
/**
 * get extension from url
 * @param url
 * @returns
 */
function getExtUrl(url) {
    return url.split('?')[0].split('#')[0].split('.').pop() || '';
}
exports.getExtUrl = getExtUrl;
