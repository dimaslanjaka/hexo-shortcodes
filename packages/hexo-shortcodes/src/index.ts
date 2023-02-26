'use strict';

// const Promise = require('bluebird');
import { gist } from './gist';
import { githubCard } from './githubCard';
import { jsfiddle } from './jsfiddle';

gist(hexo);
jsfiddle(hexo);
githubCard(hexo);

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
