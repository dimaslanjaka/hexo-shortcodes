// const Promise = require('bluebird');
import ansiColors from 'ansi-colors';
import { gist } from './gist';
import { githubCard } from './githubCard';
import { jsfiddle } from './jsfiddle';

const logname = ansiColors.magentaBright('hexo-shortcodes');

if (typeof hexo !== 'undefined') {
  hexo.log.debug('starting shortcodes');
  githubCard(hexo);
  gist(hexo);
  jsfiddle(hexo);
  hexo.extend.filter.register('after_post_render', function (data) {
    data.content =
      `<script src="/hexo-shortcodes-lib/githubcard.js"></script><link rel="stylesheet" href="/hexo-shortcodes-lib/gist.css" />` +
      data.content;
    return data;
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
