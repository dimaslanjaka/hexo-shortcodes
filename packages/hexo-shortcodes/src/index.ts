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
