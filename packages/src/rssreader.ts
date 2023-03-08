import ansiColors from 'ansi-colors';
import Hexo from 'hexo';
import { escapeRegExp } from 'hexo-util';
import nunjucks from 'nunjucks';
import rssParser from 'rss-parser';
import { array2obj } from './utils';

export type RSSType = {
  items: Array<{
    title: string;
    link: string;
    pubDate: string;
    'content:encoded': string;
    'content:encodedSnippet': string;
    comments?: string;
    content: string;
    contentSnippet: string;
    guid: string;
    categories: Array<{
      _: string;
      $: {
        domain: string;
      };
    }>;
    isoDate: string;
  }>;
  feedUrl: string;
  image: {
    link: string;
    url: string;
    title: string;
  };
  paginationLinks: {
    self: string;
  };
  title: string;
  description: string;
  pubDate: string;
  generator: string;
  link: string;
};

export type rssreaderOptions = {
  limit?: string;
  debug?: string;
};

const logname = ansiColors.magentaBright('hexo-shortcodes') + ansiColors.blueBright('(rssreader)');

export function rssreader(hexo: Hexo) {
  const parser = new rssParser({
    customFields: {
      item: [['media:content', 'media:content', { keepArray: true }]]
    },
    defaultRSS: 2.0
  });
  const env = nunjucks.configure({
    noCache: true,
    autoescape: false
  });

  hexo.extend.tag.register(
    'rssreader',
    async function (args, template = '') {
      const url = args[0];
      const defaults: rssreaderOptions = {
        limit: '3',
        debug: 'false'
      };
      const options = Object.assign(
        defaults,
        array2obj(
          args.splice(1).map((str) => {
            const split = str.split(':');
            return { [split[0]]: split[1] };
          })
        )
      );

      hexo.log.info(logname, url, options);
      const feed = await parser.parseURL(url);

      // render
      const result = [] as string[];
      for (let i = 0; i < (options.limit || 3); i++) {
        const item = feed.items[i];

        let rendered: string;

        if (options.debug === 'true') {
          // debugging
          rendered = `<pre><code class="highlight json">${
            (JSON.stringifyWithCircularRefs(Object.keys(item)), 2)
          }</code></pre>`;
        } else {
          // clone and modify template
          let cloneTemplate = template
            .replace(/\$title/gim, '{{ title }}')
            .replace(/\$content/gim, '{{ content }}')
            .replace(/\$link/gim, '{{ link }}')
            .replace(/\$summary/gim, '{{ summary }}')
            .replace(/\$image/gim, '{{ image }}');
          Object.keys(item).forEach((key) => {
            const regex = new RegExp(escapeRegExp('$' + key), 'gmi');
            const replacement = '{{ ' + key + ' }}';
            hexo.log.debug(logname, regex, '->', replacement);
            cloneTemplate = cloneTemplate.replace(regex, replacement);
          });
          // render
          rendered = env.renderString(cloneTemplate, item);
        }
        result.push(rendered);
      }
      return result.join('\n');
    },
    { ends: true, async: true }
  );
}
