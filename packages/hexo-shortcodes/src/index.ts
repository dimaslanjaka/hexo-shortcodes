'use strict';

// const Promise = require('bluebird');
import ansiColors from 'ansi-colors';
import fs from 'fs';
import nunjucks from 'nunjucks';
import {
  GITHUB_CARD_FILE_PATH,
  GITHUB_CARD_LIB_NAME,
  GITHUB_CARD_ROUTE_NAME,
  GITHUB_CARD_TAG_NAME,
  GITHUB_CARD_TEMPLATE,
  LIB_PATH,
  TEMPLATE_PATH
} from './env';
import { jsfiddle } from './jsfiddle';
const _hgc_logname = ansiColors.magentaBright('hexo-github-card');

jsfiddle(hexo);

nunjucks.configure([LIB_PATH, TEMPLATE_PATH], {
  noCache: true,
  watch: false
});

/*const escapeHTML = (str) =>
  str.replace(
    /[&<>'"]/g,
    (tag) =>
      ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        "'": '&#39;',
        '"': '&quot;'
      }[tag])
  );*/

// githubCard
// show github profile or repositories

// Registers serving of the lib used by the plugin with Hexo.
hexo.extend.generator.register(GITHUB_CARD_ROUTE_NAME, () => {
  return {
    path: `${GITHUB_CARD_ROUTE_NAME}/${GITHUB_CARD_LIB_NAME}`,
    data: () => fs.createReadStream(GITHUB_CARD_FILE_PATH)
  };
});

// Registers the new tag with Hexo.
hexo.extend.tag.register(
  GITHUB_CARD_TAG_NAME,
  function (args) {
    const argsObj: Record<string, any> = {};

    args.forEach((arg) => {
      const current = arg.split(':');
      argsObj[current[0]] = current[1];
    });

    const user = argsObj.user,
      repo = argsObj.repo,
      width = argsObj.width || '400',
      height = argsObj.height || '200',
      theme = argsObj.theme || 'default',
      client_id = argsObj.client_id || '',
      client_secret = argsObj.client_secret || '',
      align = argsObj.align || 'center';

    const payload = {
      user,
      repo,
      height,
      width,
      theme,
      client_id,
      client_secret,
      style: `text-align: ${align}`
    };

    return new Promise((resolve) => {
      nunjucks.renderString(fs.readFileSync(GITHUB_CARD_TEMPLATE, 'utf-8'), payload, (err, res) => {
        if (err) {
          resolve('ERROR(githubCard)' + err.message);
        } else {
          resolve(res);
        }
      });
    });
  },
  {
    async: true
  }
);
