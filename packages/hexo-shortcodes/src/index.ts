// const Promise = require('bluebird');
import ansiColors from 'ansi-colors';
import { gist } from './gist';
import { githubCard } from './githubCard';
import { jsfiddle } from './jsfiddle';

const logname = ansiColors.magentaBright('hexo-shortcodes');

if (typeof hexo !== 'undefined') {
  gist(hexo);
  jsfiddle(hexo);
  githubCard(hexo);

  hexo.extend.tag.register(
    'githubCard',
    async function (args) {
      hexo.log.info(args);
      return JSON.stringify(args, null, 2);
    },
    { async: true }
  );
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
