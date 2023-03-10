import ansiColors from 'ansi-colors';
import { default as axios } from 'axios';
import Bluebird from 'bluebird';
import fs from 'fs-extra';
import nunjucks from 'nunjucks';
import path from 'path';
import { writefile } from 'sbg-utility';
import { GIST_TEMPLATE, LIB_PATH, ROUTE_NAME, TEMPLATE_PATH, TEMP_PATH } from './env';
import { url_for } from './utils';
const logname = ansiColors.magentaBright('hexo-shortcodes') + ansiColors.blueBright('(gist)');

// hexo-gist
// gist shortcode
// https://github.com/jekyll/jekyll-gist
// https://github.com/jekyll/jekyll-gist/blob/master/lib/jekyll-gist/gist_tag.rb
//
// input {% gist meredrica/088f5a593a2a7184202850c58bcb48d1 %}
// output <script src="https://gist.github.com/meredrica/088f5a593a2a7184202850c58bcb48d1.js"> </script>
//
// You may optionally specify a `filename` after the `id`:
// input {% gist meredrica/c08ee0f2726fd0e3909d test.md %}

const fetch_raw_code = async function (id: string, filename: string) {
  let url = `https://gist.githubusercontent.com/${id}/raw`;
  if (typeof filename === 'string') {
    url = `${url}/${filename}`;
  }
  return new Bluebird(function (resolve: (res: string) => any, reject) {
    axios
      .get(url)
      .then(function (res) {
        resolve(res.data);
      })
      .catch(function (e) {
        hexo.log.error(logname, id, `cannot get ${e.message}`, { url });
        reject(e);
      });
  });
};

export const gist = (hexo: import('hexo')) => {
  nunjucks.configure([LIB_PATH, TEMPLATE_PATH], {
    noCache: true,
    watch: false
  });

  const libFilename = 'gist.css';
  const libRoute = `${ROUTE_NAME}/${libFilename}`;
  const libFilePath = path.resolve(LIB_PATH, libFilename);
  hexo.extend.generator.register(url_for(libRoute), () => {
    return {
      path: libRoute,
      data: () => fs.createReadStream(libFilePath)
    };
  });
  hexo.extend.filter.register('server_middleware', function (app) {
    app.use(libRoute, function (_req, res) {
      res.setHeader('content-type', 'text/javascript');
      res.end(fs.readFileSync(libFilePath).toString());
    });
  });

  // hexo.extend.tag.unregister('gist');
  hexo.extend.tag.register('gist', function (args) {
    const id = args[0];
    hexo.log.info(logname, id);
    const filename = args[1];
    const payload = {
      id,
      filename,
      raw_code: ''
    };

    return nunjucks.renderString(fs.readFileSync(GIST_TEMPLATE).toString(), payload);
  });

  const _oldMethod = function (args: string[]) {
    return new Promise((resolve) => {
      const id = args[0];
      hexo.log.info(logname, id);
      const filename = args[1];
      const payload = {
        id,
        filename,
        raw_code: ''
      };
      fetch_raw_code(id, filename)
        .then((raw_code) => {
          payload.raw_code = <string>raw_code;
          writefile(path.join(TEMP_PATH, 'gist', id + '.txt'), raw_code);
          writefile(path.join(TEMP_PATH, 'gist', id + '.json'), JSON.stringify(payload, null, 2));
        })
        .catch((e) => {
          payload.raw_code = JSON.stringifyWithCircularRefs(e, 2);
        })
        .finally(() => {
          /*let result = '';
        if (filename) {
          result += `<script src="https://gist.github.com/${id}.js?file=${filename}"></script>`;
        } else {
          result += `<script src="https://gist.github.com/${id}.js"></script>`;
        }
        result += `
        <noscript>
          <pre><code>${payload.raw_code}</code></pre>
        </noscript>
        `;
        resolve(result);*/
          nunjucks.render('hexo-gist.njk', payload, function (_err, result) {
            writefile(path.join(TEMP_PATH, 'gist', id + '.njk.txt'), String(result));
            resolve(result);
          });
          /*nunjucks.renderString(
          fs.readFileSync(path.join(TEMPLATE_PATH, 'hexo-gist.njk')).toString(),
          payload,
          function (err, result) {
            if (err) {
              console.log(err);
              resolve(
                `ERROR(gist) cannot fetch ${id}.<br/> ${escapeHTML(JSON.stringifyWithCircularRefs(err, null, 2))}`
              );
            } else {
              writefile(path.join(TEMP_PATH, 'gist', id + '.njk.txt'), result);
              resolve(result);
            }
          }
        );*/
        });
    });
  };
};
