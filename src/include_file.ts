import fs from 'fs-extra';
import Hexo from 'hexo';
import path from 'upath';
import { parseTagParameter } from './utils/parseTagParameter';

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
  const callback = async function (this: { full_source: string }, args: string[], template: string) {
    const sourceDir = path.join(ctx.base_dir, ctx.config.source_dir);
    const codeDir = path.join(sourceDir, ctx.config.code_dir);
    let rawLinkBaseDir = path.toUnix(ctx.base_dir);
    // current source markdown page
    const sourcePage = this['full_source'];
    if (!template) {
      // keep template empty string when undefined
      template = '';
    } else {
      // trim trailing whitespaces
      template = template.trim();
    }

    const parseArgs = parseTagParameter<{
      from?: string;
      to?: string;
      lang?: string;
      pretext?: string;
      render?: string;
    }>(args);

    /** starts line */
    let from = 0;
    if (parseArgs.from) from = parseInt(parseArgs.from) - 1;
    /** ends line */
    let to = Number.MAX_VALUE;
    if (parseArgs.to) to = parseInt(parseArgs.to);
    /** is using preText tag? */
    let preText = true;
    if (parseArgs.pretext) preText = parseArgs.pretext?.trim() === 'true';

    // override language when is not string or empty string
    if (typeof parseArgs.lang !== 'string' || parseArgs.lang.length == 0) {
      parseArgs.lang = path.extname(parseArgs.sourceFile).substring(1);
    }
    // override title
    if (!parseArgs.title) {
      parseArgs.title = path.basename(parseArgs.sourceFile);
    }

    // absolute path file to be included
    let filePath: string | undefined = undefined;
    let exists: boolean | undefined = undefined;

    // try find from relative to source_dir
    if ((filePath = path.join(sourceDir, parseArgs.sourceFile)) && (exists = fs.existsSync(filePath))) {
      rawLinkBaseDir = sourceDir;
    }
    // try find from relative to code_dir
    else if ((filePath = path.join(codeDir, parseArgs.sourceFile)) && (exists = fs.existsSync(filePath))) {
      rawLinkBaseDir = codeDir;
    }
    // try find from relative to source path
    else if (
      (filePath = path.resolve(path.dirname(sourcePage), parseArgs.sourceFile)) &&
      (exists = fs.existsSync(filePath))
    ) {
      rawLinkBaseDir = path.dirname(path.resolve(path.dirname(sourcePage), parseArgs.sourceFile));
    }
    // Add trailing slash to sourceBaseDir
    if (!rawLinkBaseDir.endsWith('/')) rawLinkBaseDir += '/';
    // trim hexo.source_dir for raw link
    rawLinkBaseDir = rawLinkBaseDir.replace(sourceDir, '');

    // define contents and empty indicator
    let contents = '';
    if (exists) {
      contents = await fs.readFile(filePath, { encoding: 'utf-8' });
      if (contents.length === 0) {
        contents = parseArgs.sourceFile + ' file empty.';
      }
    } else {
      //console.log({ filePath, sourceDir, sourceFile: parseArgs.sourceFile, rawLinkBaseDir });
      contents = parseArgs.sourceFile + ' file path not found';
    }

    // create caption
    const caption = `<span>${parseArgs.title}</span><a href="${path.join(
      ctx.config.root,
      rawLinkBaseDir,
      parseArgs.sourceFile
    )}">view raw</a>`;
    // lines splitter
    const lines = contents.split(/\r?\n/gm);
    const slice = lines.slice(from, to);
    contents = slice.join('\n');

    if (template.length > 0) {
      // nunjucks render when template not empty string
      const renderTemplate = `
{% for line in lines %}
  ${template.replace(/\$line/gim, '{{ line }}').replace(/\$index/gim, '{{ loop.index }}')}
{% endfor %}
      `.trim();
      contents = await hexo.render.render({ text: renderTemplate, engine: 'njk' }, { lines: slice });
    } else if (parseArgs.render === 'true') {
      contents = await hexo.render.render({ text: contents, engine: parseArgs.lang || 'njk' }, { lines: slice });
    }

    if (preText) {
      // process syntax highlighter on `pretext:true`
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
      } else {
        return `<pre><code>${contents}</code></pre>`;
      }
    } else {
      // return raw contents
      return contents;
    }
  };
  return callback;
}

export function registerIncludeTag(ctx: Hexo) {
  ctx.extend.tag.register('include_file', includeTag(ctx), { async: true, ends: true });
}
