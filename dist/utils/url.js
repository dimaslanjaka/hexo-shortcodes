"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getExtUrl = getExtUrl;
/**
 * get extension from url
 * @param url
 * @returns
 */
function getExtUrl(url) {
    return url.split('?')[0].split('#')[0].split('.').pop() || '';
}
