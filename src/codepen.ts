import ansiColors from 'ansi-colors';
import Hexo from 'hexo';
import { array2obj, getMatches } from './utils';
const logname = ansiColors.magentaBright('hexo-shortcodes') + ansiColors.blueBright('(codepen)');

interface codepenTagOptions {
  [key: string]: any;
  theme: string;
  class: string;
  version: string;
  height: string | number;
  preview: string | boolean;
  default_tab: string;
}

/**
 * jekyll-codepen forked from https://github.com/rmcfadzean/jekyll-codepen
 * @param hexo
 */
export function codepen(hexo: Hexo) {
  hexo.extend.tag.register('codepen', function (args: string[]) {
    const urlOrid = args[0];

    let slug: string | null = null;
    let user: string | null = null;

    // get slug and user when first argument is url
    const regex = /codepen.io\/(\w*)\/pen\/(\w*)/gm;
    const match = getMatches(urlOrid, regex);
    if (match !== null) {
      args[0] = '';
      user = match[1];
      slug = match[2];
    } else {
      hexo.log.error(logname, urlOrid, String(match));
    }

    hexo.log.debug(logname, { user, pen: slug } as any);

    // parse `=` from all arguments
    const parse = args
      .map((str: string) => {
        const spl = str.split('=');
        if (!spl[1]) return;
        return {
          [spl[0]]: spl[1]
        } as Record<string, string>;
      })
      .filter((o) => typeof o === 'object');
    const overriden = array2obj(parse) as codepenTagOptions;

    const config: codepenTagOptions = hexo.config.codepen || {};
    const url = `https://codepen.io/${user}/pen/${slug}`;
    const defaults: codepenTagOptions = {
      class: config.class || 'codepen',
      embed_version: parseInt(config.version) || 2,
      height: parseInt(String(config.height)) || 300,
      preview: String(config.preview) === 'true' ? true : false,
      theme_id: config.theme_id || 11473,
      default_tab: config.default_tab || 'result',
      'data-user': user,
      'data-slug-hash': slug,
      theme: 'light',
      version: '2.0'
    };
    const overriden_options = Object.assign(defaults, overriden);

    const attr = Object.keys(overriden_options)
      .map((key) => `${key}="${defaults[key]}"`)
      .join(' ');

    const htm_tag = `<p ${attr}>See the <a href="${url}">pen</a> on <a href="//codepen.io" rel="nofollow noopener">CodePen</a>.</p>`;

    const htm_script = '<script async src="https://production-assets.codepen.io/assets/embed/ei.js"></script>';

    return htm_tag + htm_script;
  });
}
