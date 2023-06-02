import ansiColors from 'ansi-colors';
import * as hexoUtil from 'hexo-util';
import nunjucks from 'nunjucks';
import rssParser from 'rss-parser';
import { array2obj } from './utils';

export type RSSType = {
  [key: string]: any;
  items: Array<{
    [key: string]: any;
    title: string;
    link: string;
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
    pubDate: string;
    generator: string;
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

export function rssreader(hexo: import('hexo')) {
  // <RSSType, RSSType['items']>
  const parser = new rssParser({
    customFields: {
      item: [
        ['media:content', 'media-content', { keepArray: true }],
        // ['media:group', { keepArray: true }],
        ['media:thumbnail', 'media:group', { keepArray: true }]
      ]
    },
    defaultRSS: 2.0
  });
  const env = nunjucks.configure({
    noCache: true,
    autoescape: false
  });

  const callback = async function (args: any[], template = '') {
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

    hexo.log.debug(logname, url, String(options));
    const feed = await parser.parseURL(url);
    // remove duplicate items by title
    feed.items = feed.items.filter(
      (value, index, self) => index === self.findIndex((t) => t.title === value.title)
    ) as typeof feed.items;

    // render
    const result = [] as string[];
    for (let i = 0; i < (parseInt(String(options.limit)) || 3); i++) {
      const item = feed.items[i] as (typeof feed.items)[number] & Record<string, any>;

      let rendered: string;

      if (options.debug === 'true') {
        // render debug
        rendered = `<pre><code class="highlight json">${JSON.stringify(Object.keys(item), null, 2)}</code></pre>`;
      } else {
        // clone and modify template
        let cloneTemplate = template
          .replace(/\$title/gim, '{{ title }}')
          .replace(/\$content/gim, '{{ content }}')
          .replace(/\$link/gim, '{{ link }}')
          .replace(/\$summary/gim, '{{ summary }}')
          .replace(/\$image/gim, '{{ image }}')
          // print date
          .replace(/\$date/gim, '{{ date }}');
        Object.keys(item).forEach((key) => {
          const regex = new RegExp(hexoUtil.escapeRegExp('$' + key), 'gmi');
          const replacement = '{{ ' + key + ' }}';
          hexo.log.debug(logname, String(regex), '->', replacement);
          cloneTemplate = cloneTemplate.replace(regex, replacement);
        });
        if ('date' in item === false && item.pubDate) {
          item['date'] = item.pubDate;
        }
        if ('image' in item === false) {
          if (Array.isArray(item['media:group'])) item.image = item['media:group'][0]['$'].url;
        }
        // writefile(path.join(__dirname, '../tmp/item/', item.title + '.json'), jsonStringifyWithCircularRefs(item));
        // render result
        rendered = env.renderString(cloneTemplate, item);
      }
      result.push(rendered);
    }
    return result.join('\n');
  };

  hexo.extend.tag.register('rssreader', callback, { ends: true, async: true });

  return { callback };
}
