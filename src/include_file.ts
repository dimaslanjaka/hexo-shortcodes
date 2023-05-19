import pathFn from 'path';
import fs from 'fs-extra';
import Hexo from 'hexo';
import path from 'path';

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
  return async function (this: Hexo, args: string[]) {
    let filePath = pathFn.join(ctx.source_dir, args[0]);
    const sourcePage = (this as any)['full_source'];

    // exit if path is not defined
    if (!filePath) {
      return 'Include file path undefined.';
    }

    // check existence
    if (!(await fs.exists(filePath))) {
      // try find from relative to source path
      const relativeToSource = path.join(path.dirname(sourcePage), args[0]);
      if (await fs.exists(relativeToSource)) {
        filePath = relativeToSource;
      } else {
        return 'Include file not found.';
      }
    }

    const contents = await fs.readFile(filePath, { encoding: 'utf-8' });
    if (!contents) {
      return 'Include file empty.';
    }
    return String(contents);
  };
}

export function registerIncludeTag(ctx: Hexo) {
  hexo.extend.tag.register('include_file', includeTag(ctx), { async: true });
}
