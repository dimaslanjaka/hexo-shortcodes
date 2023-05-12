// const Promise = require('bluebird');
import { codepen } from './codepen';
import { dailymotion } from './dailymotion';
import { GITHUB_CARD_LIB_NAME } from './env';
import { gist } from './gist';
import { githubEmbed } from './github';
import { githubCard } from './githubCard';
import { vimeoTag } from './hexo-tag-embed/lib/tags/vimeo';
import { youtubeTag } from './hexo-tag-embed/lib/tags/youtube';
import { jsfiddle } from './jsfiddle';
import { rssreader } from './rssreader';
import { registerHexo, url_for } from './utils';

if (typeof hexo !== 'undefined') {
  // register hexo for utils
  registerHexo(hexo as any);

  // register tags
  githubCard(hexo as any);
  gist(hexo as any);
  jsfiddle(hexo as any);
  codepen(hexo as any);
  dailymotion(hexo as any);
  rssreader(hexo as any);
  githubEmbed(hexo as any);

  // register hexo-tag-embed
  hexo.extend.tag.register('vimeo', <any>vimeoTag);
  hexo.extend.tag.register('youtube', <any>youtubeTag);

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
