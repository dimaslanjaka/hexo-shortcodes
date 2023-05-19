import pathFn from 'path';
import fs from 'fs-extra';
import Hexo from 'hexo';
import path from 'upath';
import { parseTagParameter } from './parseTagParameter';

/**
 * Hexo include tag
 *
 * Inserts the raw contents of a file into a hexo markdown file.
 *
 * Takes context. Exports function that grabs contents of file
 * given a filename relative to source directory.
 *
 * @example
 *   {% include_file 'path/to/file' %}
 *   Path is relative to your source directory.
 */
function includeTag(ctx: Hexo) {
  const callback = async function (this: { full_source: string }, args: string[]) {
    let codeDir = ctx.config.code_dir;
    // Add trailing slash to codeDir
    if (!codeDir.endsWith('/')) codeDir += '/';

    const parseArgs = parseTagParameter(args);
    // override language when is not string or empty string
    if (typeof parseArgs.lang !== 'string' || parseArgs.lang.length == 0)
      parseArgs.lang = path.extname(parseArgs.sourceFile).substring(1);
    // override title
    if (!parseArgs.title) parseArgs.title = path.basename(parseArgs.sourceFile);
    // create caption
    const caption = `<span>${parseArgs.title}</span><a href="${path.join(
      ctx.config.root,
      codeDir,
      parseArgs.sourceFile
    )}">view raw</a>`;

    // absolute path file to be included
    let filePath = pathFn.join(ctx.source_dir, parseArgs.sourceFile);
    // current source markdown page
    const sourcePage = this['full_source'];

    // exit if path is not defined
    if (typeof filePath !== 'string' || filePath.length === 0) {
      return 'Include file path undefined.';
    }

    let exists = fs.existsSync(filePath);

    // check existence
    if (!exists) {
      // try find from relative to source path
      const relativeToSource = path.resolve(path.dirname(sourcePage), parseArgs.sourceFile);
      exists = fs.existsSync(relativeToSource);
      //console.log({ source_dir: ctx.source_dir, sourcePage, relativeToSource, sourceFile: parseArgs.sourceFile });
      if (exists) {
        filePath = relativeToSource;
      }
    }

    let contents = '';
    if (exists) {
      contents = await fs.readFile(filePath, { encoding: 'utf-8' });
      if (!contents) {
        contents = 'Include file empty.';
      }
    } else {
      contents = 'Include file path not found';
    }

    const lines = contents.split(/\r?\n/);
    contents = lines.slice(parseArgs.from, parseArgs.to).join('\n').trim();

    if (parseArgs.from > 0 && parseArgs.to < Number.MAX_VALUE)
      console.log(parseArgs.from, parseArgs.to, lines.length, lines.slice(parseArgs.from, parseArgs.to));

    if (ctx.extend.highlight.query(ctx.config.syntax_highlighter)) {
      const options = {
        lang: parseArgs.lang,
        caption,
        lines_length: lines.length
      };
      return ctx.extend.highlight.exec(ctx.config.syntax_highlighter, {
        context: ctx,
        args: [contents, options]
      });
    }

    return `<pre><code>${contents}</code></pre>`;
  };
  return callback;
}

export function registerIncludeTag(ctx: Hexo) {
  hexo.extend.tag.register('include_file', includeTag(ctx), { async: true });
}
