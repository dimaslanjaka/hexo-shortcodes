"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerHexo = exports.url_for = void 0;
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
