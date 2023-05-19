import { array2obj } from './utils';

const rCaptionTitleFile = /("[^"]*"|'[^']*'|[\S]+)+/g;

/**
 * parse shortcode parameter
 * @param args
 */
export function parseTagParameter(args: string[] | string, ...argv: string[]) {
  const join = (typeof args === 'string' ? [args] : args).concat(argv).join(' ');
  const concat = Array.from(join.match(rCaptionTitleFile) || []);
  const sourceFile = concat.filter((str) => !str.includes(':'))[0];
  const options: Record<string, string | number> = array2obj(
    concat.map((str) => {
      const split = str.split(':');
      return { [split[0]]: split[1] };
    })
  );

  const result = Object.assign({ lang: '', from: 0, to: Infinity, sourceFile }, options);
  if (typeof result.from !== 'number') result.from = parseInt(result.from);
  if (typeof result.to !== 'number') result.from = parseInt(result.to);
  return result;
}
