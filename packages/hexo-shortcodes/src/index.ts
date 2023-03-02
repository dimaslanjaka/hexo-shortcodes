// const Promise = require('bluebird');
import { gist } from './gist';
import { githubCard } from './githubCard';
import { jsfiddle } from './jsfiddle';

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
