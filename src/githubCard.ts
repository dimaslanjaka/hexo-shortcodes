'use strict';

import ansiColors from 'ansi-colors';
// const Promise = require('bluebird');
import fs from 'fs';
import nunjucks from 'nunjucks';
import {
  GITHUB_CARD_FILE_PATH,
  GITHUB_CARD_LIB_NAME,
  GITHUB_CARD_TEMPLATE,
  LIB_PATH,
  ROUTE_NAME,
  TEMPLATE_PATH
} from './env';
import { url_for } from './utils';

const logname = ansiColors.magentaBright('hexo-shortcodes') + ansiColors.blueBright('(githubCard)');

// githubCard
// show github profile or repositories

export function githubCard(hexo: import('hexo')) {
  // Registers serving of the lib used by the plugin with Hexo.
  const libRoute = `${ROUTE_NAME}/${GITHUB_CARD_LIB_NAME}`;
  hexo.extend.generator.register(url_for(libRoute), () => {
    return {
      path: libRoute,
      data: () => fs.createReadStream(GITHUB_CARD_FILE_PATH)
    };
  });
  hexo.extend.filter.register('server_middleware', function (app) {
    app.use(libRoute, function (_req, res) {
      res.setHeader('content-type', 'text/javascript');
      res.end(fs.readFileSync(GITHUB_CARD_FILE_PATH).toString());
    });
  });

  nunjucks.configure([LIB_PATH, TEMPLATE_PATH], {
    noCache: true,
    watch: false
  });

  // hexo.extend.tag.unregister('githubCard');

  // Registers the new tag with Hexo.
  hexo.extend.tag.register(
    'githubCard',
    function (args: string[]) {
      const argsObj: Record<string, any> = {};

      args.forEach((arg: string) => {
        const current = arg.split(':');
        argsObj[current[0]] = current[1];
      });
      hexo.log.debug(logname, String(argsObj));

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

      /*return new Promise((resolve) => {
        nunjucks.renderString(fs.readFileSync(GITHUB_CARD_TEMPLATE, 'utf-8'), payload, (err, res) => {
          if (err) {
            resolve('ERROR(githubCard)' + err.message);
          } else {
            resolve(res);
          }
        });
      });*/
      const rendered = nunjucks.renderString(fs.readFileSync(GITHUB_CARD_TEMPLATE, 'utf-8'), payload);
      // return Promise.resolve(JSON.stringify(payload, null, 2));

      return Promise.resolve(rendered);
    },
    {
      async: true
    }
  );
}
