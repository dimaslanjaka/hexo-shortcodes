import { array2obj } from './utils';

const rCaptionTitleFile = /("[^"]*"|'[^']*'|[\S]+)+/g;

/**
 * parse shortcode parameter
 * @param args
 */
export function parseTagParameter<T>(args: string[] | string, ...argv: string[]) {
  const concat = (typeof args === 'string' ? [args] : args).concat(argv || []);
  const join = concat.join(' ');
  const match = Array.from(join.match(rCaptionTitleFile) || []);
  const sourceFile = concat.filter((str) => !str.includes(':'))[0];
  const options: Record<string, string> = array2obj(
    match.map((str) => {
      const split = str.split(':');
      return { [split[0]]: split[1] };
    })
  );

  const result = Object.assign({ sourceFile }, options);
  // convert to number
  // if (typeof result.from !== 'number') result.from = parseInt(result.from);
  // if (typeof result.to !== 'number') result.from = parseInt(result.to);
  // fix empty line which embedding spesific lines
  // result.from = result.from - 1; <-- should decrease inside the function
  return result as typeof result & T;
}
