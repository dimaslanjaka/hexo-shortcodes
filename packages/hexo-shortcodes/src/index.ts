// const Promise = require('bluebird');
import ansiColors from 'ansi-colors';
import { codepen } from './codepen';
import { GITHUB_CARD_LIB_NAME } from './env';
import { gist } from './gist';
import { githubCard } from './githubCard';
import { jsfiddle } from './jsfiddle';
import { registerHexo, url_for } from './utils';

const logname = ansiColors.magentaBright('hexo-shortcodes');

if (typeof hexo !== 'undefined') {
  // register hexo for utils
  registerHexo(hexo);

  // register tags
  githubCard(hexo);
  gist(hexo);
  jsfiddle(hexo);
  codepen(hexo);

  // register assets before closing body
  hexo.extend.filter.register('after_render:html', function (data) {
    return data.replace(
      '</body>',
      `
<script src="${url_for('/hexo-shortcodes-lib/' + GITHUB_CARD_LIB_NAME)}"></script>
<link rel="stylesheet" href="${url_for('/hexo-shortcodes-lib/gist.css')}" />
</body>
      `
    );
  });
} else {
  console.error(logname, 'not running within hexo instance');
}

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
