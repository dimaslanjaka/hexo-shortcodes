'use strict';

const Promise = require('bluebird');
const fs = require('fs');
const nunjucks = require('nunjucks');
const path = require('path');
const { default: axios } = require('axios');
const ansiColors = require('ansi-colors');
const _hgc_logname = ansiColors.magentaBright('hexo-github-card');
const _hg_logname = ansiColors.magentaBright('hexo-gist');
const LIB_PATH = path.resolve(__dirname, './lib');
const GITHUB_CARD_LIB_NAME = 'githubcard.js';
const GITHUB_CARD_FILE_PATH = path.resolve(LIB_PATH, GITHUB_CARD_LIB_NAME);
const GITHUB_CARD_ROUTE_NAME = 'js';
const GITHUB_CARD_TAG_NAME = 'githubCard';
const GITHUB_CARD_TEMPLATE = path.resolve(__dirname, 'hexo-github-card.njk');
const GITHUB_CARD_TEMPLATE_CONTENT = fs.readFileSync(GITHUB_CARD_TEMPLATE, 'utf-8');

nunjucks.configure([__dirname], {
  noCache: true,
  watch: false
});

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
  (args) => {
    const argsObj = {};

    args.forEach((arg) => {
      let current = arg.split(':');
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

    return new Promise((resolve, reject) => {
      nunjucks.renderString(GITHUB_CARD_TEMPLATE_CONTENT, payload, (err, res) => {
        if (err) {
          return reject(err);
        }
        resolve(res);
      });
    });
  },
  {
    async: true
  }
);

// hexo-gist

async function fetch_raw_code(gist_id) {
  const url = `https://gist.githubusercontent.com/${gist_id}/raw`;
  const res = await axios.get(url);
  return res.data;
}

// https://github.com/jekyll/jekyll-gist/blob/master/lib/jekyll-gist/gist_tag.rb
hexo.extend.tag.register('gist', (args) => {
  /**
   * @type {import('hexo')}
   */
  const self = this;
  return new Promise((resolve, reject) => {
    hexo.log.info(_hg_logname, args);
    hexo.log.info(_hg_logname, self.config.url);

    const payload = {
      gist_id: args[0]
    };

    nunjucks.renderString(path.join(__dirname, 'hexo-gist.njk'), payload, (err, res) => {
      if (err) {
        return reject(err);
      }
      resolve(res);
    });
  });
});

//
// Input: {% jsfiddle ccWP7 %}
// Output: <script async src=\"//jsfiddle.net/ccWP7/embed/js,resources,html,css,result/dark/"></script>
//
// Input: {% jsfiddle ccWP7 js,html,result iframe %}
// Output: <iframe style="width: 100%; height: 300px" src="http://jsfiddle.net/ccWP7/embedded/js,html,result/light/"></iframe>
//
