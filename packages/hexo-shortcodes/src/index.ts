// const Promise = require('bluebird');
import { codepen } from './codepen';
import { dailymotion } from './dailymotion';
import { GITHUB_CARD_LIB_NAME } from './env';
import { gist } from './gist';
import { githubCard } from './githubCard';
import { jsfiddle } from './jsfiddle';
import { registerHexo, url_for } from './utils';

if (typeof hexo !== 'undefined') {
  // register hexo for utils
  registerHexo(hexo);

  // register tags
  githubCard(hexo);
  gist(hexo);
  jsfiddle(hexo);
  codepen(hexo);
  dailymotion(hexo);

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
}
