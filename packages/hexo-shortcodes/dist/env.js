"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TEMP_PATH = exports.GITHUB_CARD_TEMPLATE = exports.GITHUB_CARD_TAG_NAME = exports.GITHUB_CARD_ROUTE_NAME = exports.GITHUB_CARD_FILE_PATH = exports.GITHUB_CARD_LIB_NAME = exports.TEMPLATE_PATH = exports.LIB_PATH = void 0;
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
exports.LIB_PATH = path_1.default.resolve(__dirname, '../lib');
exports.TEMPLATE_PATH = path_1.default.resolve(__dirname, '../template');
exports.GITHUB_CARD_LIB_NAME = 'githubcard.js';
exports.GITHUB_CARD_FILE_PATH = path_1.default.resolve(exports.LIB_PATH, exports.GITHUB_CARD_LIB_NAME);
exports.GITHUB_CARD_ROUTE_NAME = 'github-card-lib';
exports.GITHUB_CARD_TAG_NAME = 'githubCard';
exports.GITHUB_CARD_TEMPLATE = path_1.default.resolve(exports.TEMPLATE_PATH, 'hexo-github-card.njk');
var TEMP_PATH = path_1.default.join(process.cwd(), 'tmp/hexo-shortcodes');
exports.TEMP_PATH = TEMP_PATH;
if (fs_1.default.existsSync(path_1.default.join(process.cwd(), 'packages/hexo-shortcodes'))) {
    exports.TEMP_PATH = TEMP_PATH = path_1.default.join(process.cwd(), 'packages/hexo-shortcodes/tmp');
}
if (!fs_1.default.existsSync(TEMP_PATH)) {
    fs_1.default.mkdirSync(TEMP_PATH, { recursive: true });
}
