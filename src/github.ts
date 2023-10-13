import ansiColors from 'ansi-colors';
import gitEmbed from 'git-embed';
import Hexo from 'hexo';
import * as hexoUtils from 'hexo-util';
import { getExtUrl } from './utils';
import { getHexoConfig } from './utils/getHexoConfig';

const logname = ansiColors.magentaBright('hexo-shortcodes') + ansiColors.blueBright('(github)');

/**
 * github embedder engine
 * @param hexo
 * @returns
 * @example
 * hexo.extend.tag.register('github', githubEmbedder(hexo), { async: true });
 */
export function githubEmbedder(hexo: Hexo) {
  const hexoConfig = getHexoConfig(hexo);
  return async function (params: string[]) {
    // filter empty array
    params = params.filter((str) => String(str).trim().length > 0);

    // only parse when array length > 0
    if (params.length > 0) {
      let url: string;
      let parseURL: URL;
      const config = {
        repo: '',
        file: '',
        line: '',
        ref: ''
      };

      if (params.length === 1) {
        // params is url
        try {
          parseURL = new URL(params[0]);
        } catch (_e) {
          parseURL = new URL('https://github.com/' + params[0]);
        }

        url = parseURL.toString();
      } else {
        // params is object
        const splitcolon = params.map((str) => String(str).split(':'));
        splitcolon.forEach((split) => {
          (config as any)[split[0].trim()] = split[1].trim();
        });
        parseURL = new URL('https://github.com');
        // merge pathname
        parseURL.pathname = [config.repo, 'blob', config.ref, config.file].join('/');
        // fix line
        if (!config.line.includes('L')) {
          // fix line to #L{number}-L{number}
          const splithypen = config.line.split('-');
          if (splithypen.length === 2) {
            parseURL.hash = '#L' + splithypen[0] + '-L' + splithypen[1];
          }
        } else {
          parseURL.hash = config.line;
        }
        url = parseURL.toString();
      }

      hexo.log.debug(logname, parseURL.pathname + parseURL.hash);
      config.line = parseURL.hash;
      const embed = await gitEmbed(url, { tabSize: 2 });
      const ext = getExtUrl(url);

      // return raw when hexo.config['hexo-shortcodes'].raw = true
      if (hexoConfig['hexo-shortcodes']?.raw) {
        return '```' + ext + '\n' + embed.result + '\n```';
      }

      const content = embed.result;

      // If neither highlight.js nor prism.js is enabled, return escaped code directly
      if (!hexo.extend.highlight?.query(hexo.config.syntax_highlighter)) {
        return `<pre><code>${hexoUtils.escapeHTML(content)}</code></pre>`;
      }

      const options = {
        lines_length: content.split('\n').length,
        lang: embed.parseResult.language,
        caption: embed.parseResult.language
      };

      // forked from https://github.com/hexojs/hexo/blob/8b95bbc722e5c77a7e8125441ed64d2ea3524ac0/lib/plugins/tag/code.js#L141-L148
      const newContent = hexo.extend.highlight.exec(hexo.config.syntax_highlighter, {
        context: hexo,
        args: [content, options]
      });

      return newContent.replace(/{/g, '&#123;').replace(/}/g, '&#125;');
    }

    return ['cannot embed', ...params].join(' ');
  };
}

/**
 * hexo shortcode to embed file
 * @param hexo
 */
export function githubEmbedTagRegister(hexo: Hexo) {
  const engine = githubEmbedder(hexo);
  hexo.extend.tag.register('github', engine, { async: true });
  return engine;
}

/**
 * github raw embedder engine
 * @param hexo
 * @returns raw parsed response without highlight.js
 * @example
 * hexo.extend.tag.register('github', githubEmbedder(hexo), { async: true });
 */
export function githubEmbedderRaw(hexo: Hexo) {
  return async function (params: string[]) {
    // filter empty array
    params = params.filter((str) => String(str).trim().length > 0);

    // only parse when array length > 0
    if (params.length > 0) {
      let url: string;
      let parseURL: URL;
      const config = {
        repo: '',
        file: '',
        line: '',
        ref: ''
      };

      if (params.length === 1) {
        // params is url
        try {
          parseURL = new URL(params[0]);
        } catch (_e) {
          parseURL = new URL('https://github.com/' + params[0]);
        }

        url = parseURL.toString();
      } else {
        // params is object
        const splitcolon = params.map((str) => String(str).split(':'));
        splitcolon.forEach((split) => {
          (config as any)[split[0].trim()] = split[1].trim();
        });
        parseURL = new URL('https://github.com');
        // merge pathname
        parseURL.pathname = [config.repo, 'blob', config.ref, config.file].join('/');
        // fix line
        if (!config.line.includes('L')) {
          // fix line to #L{number}-L{number}
          const splithypen = config.line.split('-');
          if (splithypen.length === 2) {
            parseURL.hash = '#L' + splithypen[0] + '-L' + splithypen[1];
          }
        } else {
          parseURL.hash = config.line;
        }
        url = parseURL.toString();
      }

      hexo.log.debug(logname, parseURL.pathname + parseURL.hash);
      config.line = parseURL.hash;
      const embed = await gitEmbed(url, { tabSize: 2 });
      return embed.result;
    }
  };
}
