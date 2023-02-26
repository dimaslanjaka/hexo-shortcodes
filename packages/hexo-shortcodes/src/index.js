'use strict';

const Promise = require('bluebird');
const fs = require('fs');
const nunjucks = require('nunjucks');
const path = require('path');
const { default: axios } = require('axios');
const ansiColors = require('ansi-colors');
const { writefile } = require('sbg-utility');
const _hgc_logname = ansiColors.magentaBright('hexo-github-card');
const _hg_logname = ansiColors.magentaBright('hexo-gist');
const LIB_PATH = path.resolve(__dirname, '../lib');
const TEMPLATE_PATH = path.resolve(__dirname, '../template');
const GITHUB_CARD_LIB_NAME = 'githubcard.js';
const GITHUB_CARD_FILE_PATH = path.resolve(LIB_PATH, GITHUB_CARD_LIB_NAME);
const GITHUB_CARD_ROUTE_NAME = 'js';
const GITHUB_CARD_TAG_NAME = 'githubCard';
const GITHUB_CARD_TEMPLATE = path.resolve(TEMPLATE_PATH, 'hexo-github-card.njk');
const GITHUB_CARD_TEMPLATE_CONTENT = fs.readFileSync(GITHUB_CARD_TEMPLATE, 'utf-8');
const TEMP_PATH = path.join(process.cwd(), 'tmp/hexo-shortcodes');

nunjucks.configure([LIB_PATH, TEMPLATE_PATH], {
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
  function (args) {
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

    return new Promise((resolve) => {
      nunjucks.renderString(GITHUB_CARD_TEMPLATE_CONTENT, payload, (err, res) => {
        if (err) {
          resolve('ERROR(githubCard)', err.message);
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

// hexo-gist
// gist shortcode
// https://github.com/jekyll/jekyll-gist
// https://github.com/jekyll/jekyll-gist/blob/master/lib/jekyll-gist/gist_tag.rb
//
// input {% gist meredrica/088f5a593a2a7184202850c58bcb48d1 %}
// output <script src="https://gist.github.com/meredrica/088f5a593a2a7184202850c58bcb48d1.js"> </script>
//
// You may optionally specify a `filename` after the `gist_id`:
// input {% gist meredrica/c08ee0f2726fd0e3909d test.md %}

hexo.extend.tag.register('gist', function (args) {
  const gist_id = args[0];
  const filename = args[1];
  const payload = {
    gist_id,
    filename,
    raw_code: ''
  };

  const fetch_raw_code = async function (gist_id, filename) {
    let url = `https://gist.githubusercontent.com/${gist_id}/raw`;
    if (typeof filename === 'string') {
      url = `${url}/${filename}`;
    }
    return new Promise((resolve) => {
      axios
        .get(url)
        .then((res) => {
          resolve(res.data);
        })
        .catch((e) => {
          hexo.log.error(_hg_logname, gist_id, `cannot get ${e.message}`, { url });
          resolve(
            `cannot fetch raw code ${JSON.stringify(
              {
                gist_id,
                url,
                errorMessage: e.message,
                errorCode: e.code
              },
              null,
              2
            )}`
          );
        });
    });
  };

  return new Promise((resolve) => {
    fetch_raw_code(gist_id, filename)
      .then((raw_code) => {
        payload.raw_code = raw_code;
        writefile(path.join(TEMP_PATH, gist_id + '.txt'), raw_code);
        writefile(path.join(TEMP_PATH, gist_id + '.json'), JSON.stringify(payload, null, 2));
      })
      .finally(() => {
        nunjucks.renderString(
          fs.readFileSync(path.join(TEMPLATE_PATH, 'hexo-gist.njk')).toString(),
          payload,
          function (err, result) {
            if (typeof result !== 'string') {
              resolve(`ERROR(gist) cannot fetch raw ${gist_id}. ${JSON.stringifyWithCircularRefs(err, null, 2)}`);
            } else {
              writefile(path.join(TEMP_PATH, gist_id + '.njk.txt'));
              resolve(result);
            }
          }
        );
      })
      .catch(console.log);
  });
});

//
// Input: {% jsfiddle heera/A9RDk %}
// Output: <script async src=\"//jsfiddle.net/heera/A9RDk/embed/js,resources,html,css,result/dark/"></script>
//
// Input: {% jsfiddle heera/A9RDk js,html,result iframe %}
// Output: <iframe style="width: 100%; height: 300px" src="http://jsfiddle.net/heera/A9RDk/embedded/js,html,result/light/"></iframe>
//

// /(?<fiddle>\w+)(?:\s+(?<sequence>[\w,]+))?(?:\s+(?<skin>\w+))?(?:\s+(?<height>\w+))?(?:\s+(?<width>\w+))?/

hexo.extend.tag.register('jsfiddle', function (args) {
  const id = args[0];
  const display = args[1] || 'js,resources,html,css,result';
  const outputAs = args[2] || 'script';
  const mode = args[3] || 'light';

  const ifr = `<iframe style="width: 100%; height: 300px" src="http://jsfiddle.net/${id}/embedded/${display}/${mode}/"></iframe>`;
  const scr = `<script async src="//jsfiddle.net/${id}/embed/${display}/${mode}/"></script><noscript>${ifr}</noscript>`;

  if (outputAs === 'script') {
    return scr;
  } else {
    return ifr;
  }
});
