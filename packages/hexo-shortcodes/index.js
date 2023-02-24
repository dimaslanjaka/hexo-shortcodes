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

nunjucks.configure(__dirname, {
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
// gist shortcode
// https://github.com/jekyll/jekyll-gist
// https://github.com/jekyll/jekyll-gist/blob/master/lib/jekyll-gist/gist_tag.rb
//
// input {% gist c08ee0f2726fd0e3909d %}
// output <script src="https://gist.github.com/parkr/c08ee0f2726fd0e3909d.js"> </script>
//
// You may optionally specify a `filename` after the `gist_id`:
// input {% gist c08ee0f2726fd0e3909d test.md %}

async function fetch_raw_code(gist_id, filename) {
  let url = `https://gist.githubusercontent.com/${gist_id}/raw`;
  if (typeof filename === 'string') {
    url = `${url}/${filename}`;
  }
  try {
    const res = await axios.get(url);
    return res.data;
  } catch (e) {
    hexo.log.error(_hg_logname, gist_id, `cannot get ${e.message}`);
    return '';
  }
}

hexo.extend.tag.register('gist', (args) => {
  /**
   * @type {import('hexo')}
   */
  //const self = this;
  return new Promise((resolve, reject) => {
    hexo.log.info(_hg_logname, args);
    //hexo.log.info(_hg_logname, self.config.url);

    const gist_id = args[0];
    const filename = args[1];
    const payload = {
      gist_id,
      filename,
      raw_code: ''
    };

    fetch_raw_code(gist_id, filename)
      .then((raw_code) => {
        console.log(raw_code);
        payload.raw_code = raw_code;
        nunjucks.renderString(path.join(__dirname, 'hexo-gist.njk'), payload, (err, res) => {
          if (err) {
            return reject(err);
          }
          resolve(res);
        });
      })
      .catch(console.log);
  });
});

//
// Input: {% jsfiddle ccWP7 %}
// Output: <script async src=\"//jsfiddle.net/ccWP7/embed/js,resources,html,css,result/dark/"></script>
//
// Input: {% jsfiddle ccWP7 js,html,result iframe %}
// Output: <iframe style="width: 100%; height: 300px" src="http://jsfiddle.net/ccWP7/embedded/js,html,result/light/"></iframe>
//

// /(?<fiddle>\w+)(?:\s+(?<sequence>[\w,]+))?(?:\s+(?<skin>\w+))?(?:\s+(?<height>\w+))?(?:\s+(?<width>\w+))?/

hexo.extend.tag.register('jsfiddle', (args) => {
  /**
   * @type {import('hexo')}
   */
  const self = this;
  const id = args[0];
  const display = args[1] || 'js,resources,html,css,result';
  const outputAs = args[2] || 'script';
  const mode = args[3] || 'light';
  hexo.log.info(_hg_logname, args);
  hexo.log.info(_hg_logname, self.config.url);

  if (outputAs === 'script') {
    return `<script async src="//jsfiddle.net/${id}/embed/${display}/${mode}/"></script>`;
  } else {
    return `<iframe style="width: 100%; height: 300px" src="http://jsfiddle.net/${id}/embedded/${display}/${mode}/"></iframe>`;
  }
});
