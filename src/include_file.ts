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
    const codeDir = ctx.config.code_dir;
    const sourceDir = ctx.config.source_dir;
    let rawLinkBaseDir = ctx.base_dir;

    const parseArgs = parseTagParameter<{
      from?: string;
      to?: string;
      lang?: string;
    }>(args);

    let from = 0;
    if (parseArgs.from) from = parseInt(parseArgs.from) - 1;
    let to = Number.MAX_VALUE;
    if (parseArgs.to) to = parseInt(parseArgs.to);

    // override language when is not string or empty string
    if (typeof parseArgs.lang !== 'string' || parseArgs.lang.length == 0) {
      parseArgs.lang = path.extname(parseArgs.sourceFile).substring(1);
    }
    // override title
    if (!parseArgs.title) {
      parseArgs.title = path.basename(parseArgs.sourceFile);
    }

    // absolute path file to be included
    let filePath: string;
    if ((filePath = pathFn.join(sourceDir, parseArgs.sourceFile))) {
      rawLinkBaseDir = sourceDir;
    } else if ((filePath = pathFn.join(codeDir, parseArgs.sourceFile))) {
      rawLinkBaseDir = codeDir;
    }
    // Add trailing slash to sourceBaseDir
    if (!rawLinkBaseDir.endsWith('/')) rawLinkBaseDir += '/';
    // trim hexo.source_dir for raw link
    rawLinkBaseDir = rawLinkBaseDir.replace(ctx.source_dir, '');

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

    // define contents and empty indicator
    let contents = '';
    let empty = true;
    if (exists) {
      contents = await fs.readFile(filePath, { encoding: 'utf-8' });
      if (contents.length === 0) {
        contents = 'Include file empty.';
      } else {
        empty = false;
      }
    } else {
      contents = 'Include file path not found';
    }

    if (!empty) {
      // create caption
      const caption = `<span>${parseArgs.title}</span><a href="${path.join(
        ctx.config.root,
        rawLinkBaseDir,
        parseArgs.sourceFile
      )}">view raw</a>`;
      const lines = contents.split(/\r?\n/gm);
      const slice = lines.slice(from, to);
      contents = slice.join('\n');

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
    }

    return `<pre><code>${contents}</code></pre>`;
  };
  return callback;
}

export function registerIncludeTag(ctx: Hexo) {
  hexo.extend.tag.register('include_file', includeTag(ctx), { async: true });
}