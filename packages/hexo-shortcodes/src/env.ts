import fs from 'fs';
import path from 'path';
export const LIB_PATH = path.resolve(__dirname, '../lib');
export const TEMPLATE_PATH = path.resolve(__dirname, '../template');
export const GITHUB_CARD_LIB_NAME = 'githubcard.js';
export const GITHUB_CARD_FILE_PATH = path.resolve(LIB_PATH, GITHUB_CARD_LIB_NAME);
export const GITHUB_CARD_ROUTE_NAME = 'github-card-lib';
export const GITHUB_CARD_TAG_NAME = 'githubCard';
export const GITHUB_CARD_TEMPLATE = path.resolve(TEMPLATE_PATH, 'hexo-github-card.njk');
let TEMP_PATH = path.join(process.cwd(), 'tmp/hexo-shortcodes');
if (fs.existsSync(path.join(process.cwd(), 'packages/hexo-shortcodes'))) {
  TEMP_PATH = path.join(process.cwd(), 'packages/hexo-shortcodes/tmp');
}
if (!fs.existsSync(TEMP_PATH)) {
  fs.mkdirSync(TEMP_PATH, { recursive: true });
}
export { TEMP_PATH };
