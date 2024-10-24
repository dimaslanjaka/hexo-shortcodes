import ansiColors from 'ansi-colors';
import { default as axios } from 'axios';
import fs from 'fs-extra';
import Hexo from 'hexo';
import * as hexoUtils from 'hexo-util';
import nunjucks from 'nunjucks';
import { isValidHttpUrl } from 'sbg-utility';
import path from 'upath';
import { GIST_TEMPLATE, LIB_PATH, ROUTE_NAME, TEMPLATE_PATH } from './env';
import { getExtUrl } from './utils';
import { getHexoConfig } from './utils/getHexoConfig';
import { parseTagParameter } from './utils/parseTagParameter';

const logname = ansiColors.magentaBright('hexo-shortcodes') + ansiColors.blueBright('(gist)');

// hexo-gist
// gist shortcode
// https://github.com/jekyll/jekyll-gist
// https://github.com/jekyll/jekyll-gist/blob/master/lib/jekyll-gist/gist_tag.rb
//
// input {% gist meredrica/088f5a593a2a7184202850c58bcb48d1 %}
// output <script src="https://gist.github.com/meredrica/088f5a593a2a7184202850c58bcb48d1.js"> </script>
//
// You may optionally specify a `filename` after the `id`:
// input {% gist meredrica/c08ee0f2726fd0e3909d test.md %}

async function fetch_raw_code(hexo: Hexo, id: string, filename?: string) {
  let url = `https://gist.githubusercontent.com/${id}/raw`;
  if (typeof filename === 'string' && filename.length > 0) {
    url = `${url}/${filename}`;
  }
  let data = '';
  try {
    data = await (await axios.get(url)).data;
  } catch (e: any) {
    hexo.log.error(logname, e.message, url);
    data = `${e.message} from ${url}\n id ${id}`;
  }

  return { result: data, url };
}

export const gistEmbedTagRegister = (hexo: import('hexo')) => {
  const url_for = hexoUtils.url_for.bind(hexo);
  const libFilename = 'gist.css';
  const libRoute = `${ROUTE_NAME}/${libFilename}`;
  const libFilePath = path.resolve(LIB_PATH, libFilename);
  const hexoConfig = getHexoConfig(hexo);

  /**
   * REGISTER MIDDLEWARE FOR HEXO GENERATE
   */
  hexo.extend.generator.register(url_for(libRoute, {}), () => {
    return {
      path: libRoute,
      data: () => fs.createReadStream(libFilePath)
    };
  });
  /**
   * REGISTER MIDDLEWARE FOR HEXO SERVER
   */
  hexo.extend.filter.register('server_middleware', function (app) {
    app.use(libRoute, function (_req: import('connect').IncomingMessage, res: import('http').ServerResponse) {
      res.setHeader('content-type', 'text/javascript');
      res.end(fs.readFileSync(libFilePath).toString());
    });
  });

  /**
   * render using nunjucks
   * * useful when username undefined
   * @returns
   * @see {@link https://www.webmanajemen.com/docs/hexo-shortcodes/gist}
   */
  function _nunjucksMethod() {
    const env = nunjucks.configure([LIB_PATH, TEMPLATE_PATH], {
      noCache: true,
      watch: false
    });

    return function (args: Parameters<Parameters<typeof hexo.extend.tag.register>[1]>[0]) {
      const id = args[0];
      hexo.log.d(logname, { id });
      const filename = args[1];
      const payload = {
        id,
        filename,
        raw_code: ''
      };

      return env.renderString(fs.readFileSync(GIST_TEMPLATE).toString(), payload);
    };
  }

  /**
   * smart render using internal hexojs syntax highlighter
   * @param args
   * @returns
   */
  async function _usingHexoSyntaxHighlighter(args: string[]) {
    let id = args[0] || '';

    // return when id is empty
    if (id.length === 0) return `<pre><code>gist id insufficient\n\n${args}\n\n</code></pre>`;

    if (isValidHttpUrl(id)) {
      id = new URL(id).pathname;
    }

    const username = id.split('/')[0];
    const gist_id = id.split('/')[1];

    if (typeof gist_id === 'undefined' || gist_id.length === 0) {
      try {
        return _nunjucksMethod()(args);
      } catch (error) {
        hexo.log.error(logname, String(error));
        return 'cannot embed `gist` ' + args.join(' ');
      }
    }

    /** default options */
    const defaults = {
      filename: '',
      lines_length: 0,
      lang: '',
      caption: ''
    };

    const params = parseTagParameter<typeof defaults>(args);
    // console.log(params);
    const options = Object.assign(defaults, params);

    const { result: content, url } = await fetch_raw_code(hexo, id, options.filename);
    const line = options.line;
    const lineSplit = (line?.split('-') || []).map((L) => parseInt(L.replace(/#?L/g, '')));
    const startLine = lineSplit[0] - 1;
    const endLine = lineSplit[1];

    let codeText = content;
    if (typeof line === 'string') {
      // split spesific lines
      codeText = codeText.split('\n').slice(startLine, endLine).join('\n');
    }

    // fallback to content
    if (codeText.length === 0) codeText = content;

    let ext = options.lang.length > 0 ? options.lang : getExtUrl(options.filename || url);
    // validate extension contains non-words chars
    if (/\W/.test(ext)) ext = '';

    // return raw when hexo.config['hexo-shortcodes'].raw = true
    if (hexoConfig['hexo-shortcodes']?.raw) {
      return '```' + ext + '\n' + codeText + '\n```';
    }

    // If neither highlight.js nor prism.js is enabled, return escaped code directly
    if (!hexo.extend.highlight?.query(hexo.config.syntax_highlighter)) {
      return `<pre><code>${hexoUtils.escapeHTML(codeText)}</code></pre>`;
    }

    // assign lines length
    options.lines_length = codeText.split('\n').length;
    // assign language when empty
    if (options.lang.length === 0) options.lang = path.extname(options.filename).replace(/^./, '');
    // asign caption when empty
    if (options.caption.length === 0) options.caption = path.extname(options.filename).replace(/^./, '');

    hexo.log.debug(logname, String({ username, gist_id, options }));

    // forked from https://github.com/hexojs/hexo/blob/8b95bbc722e5c77a7e8125441ed64d2ea3524ac0/lib/plugins/tag/code.js#L141-L148
    const newContent = hexo.extend.highlight.exec(hexo.config.syntax_highlighter, {
      context: hexo,
      args: [codeText, options]
    });

    return newContent.replace(/{/g, '&#123;').replace(/}/g, '&#125;');
  }

  hexo.extend.tag.register('gist', _usingHexoSyntaxHighlighter, { async: true });

  return _usingHexoSyntaxHighlighter;
};
