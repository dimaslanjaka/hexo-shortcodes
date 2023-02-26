'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
// const Promise = require('bluebird');
var gist_1 = require("./gist");
var githubCard_1 = require("./githubCard");
var jsfiddle_1 = require("./jsfiddle");
(0, gist_1.gist)(hexo);
(0, jsfiddle_1.jsfiddle)(hexo);
(0, githubCard_1.githubCard)(hexo);
