import { array2obj } from './utils';

const rCaptionTitleFile = /("[^"]*"|'[^']*'|[\S]+)+/g;

/**
 * parse shortcode parameter
 * @param args
 */
export function parseTagParameter(args: string[] | string, ...argv: string[]) {
  const concat = (typeof args === 'string' ? [args] : args).concat(argv || []);
  const join = concat.join(' ');
  const match = Array.from(join.match(rCaptionTitleFile) || []);
  const sourceFile = concat.filter((str) => !str.includes(':'))[0];
  const options: Record<string, string | number> = array2obj(
    match.map((str) => {
      const split = str.split(':');
      return { [split[0]]: split[1] };
    })
  );

  const result = Object.assign({ lang: '', from: 0, to: Number.MAX_VALUE, sourceFile }, options);
  if (typeof result.from !== 'number') result.from = parseInt(result.from);
  if (typeof result.to !== 'number') result.from = parseInt(result.to);
  return result;
}
