import Hexo from 'hexo';

let hexo: Hexo;

/**
 * hexo-util.url_for alias
 * @param url
 * @returns
 */
export const url_for = (url: string) => (hexo.config.root + url).replace(/\/+/gm, '/');
export const registerHexo = (instance: Hexo) => (hexo = instance);
export const escapeHTML = (str: string) =>
  str.replace(
    /[&<>'"]/g,
    (tag) =>
      ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        "'": '&#39;',
        '"': '&quot;'
      }[tag])
  );

const matches_wrapper: Record<string, string | string[]> = {};

/**
 * get matches from regex (cacheable).
 * @param string
 * @param regex
 * @param index
 * @returns
 */
export function getMatches(string: string, regex: RegExp, index: number): string | null;
/**
 * get matches from regex (cacheable).
 * @param string
 * @param regex
 * @param index
 * @returns
 */
export function getMatches(string: string, regex: RegExp): string[] | null;
/**
 * get matches from regex (cacheable)
 * @param string
 * @param regex
 * @param index
 * @returns
 */
export function getMatches(string: string, regex: RegExp, index?: number): string | string[] | null {
  // index || (index = 1); // default to the first capturing group
  const key = string + String(regex);
  const matches = (matches_wrapper[key] as string[]) || [];
  if (matches.length === 0) {
    let match: RegExpExecArray;
    while ((match = regex.exec(string))) {
      // matches.push(match[index]);
      match.forEach((m, i) => {
        matches[i] = m;
      });
    }
  }

  matches_wrapper[key] = matches;
  if (index) return matches[index];
  return matches;
}

/**
 * is actual array
 * @param arr
 * @returns
 */
export const isArray = (arr: any) => Object.prototype.toString.call(arr) === '[object Array]';

/**
 * is actual object
 * @param obj
 * @returns
 */
export const isObject = (obj: any) => obj.constructor === Object;

export const isEmptyObject = (obj: any) => Object.keys(obj).length === 0 && obj.constructor === Object;

/**
 * turn multidimensional array to single object.
 *
 * - [typescript playground](https://www.typescriptlang.org/play?target=1&jsx=0&module=1&pretty=false&allowSyntheticDefaultImports=true#code/KYDwDg9gTgLgBAYwgOwM7wJaoIJSgQwE84BeOACnzwC459lCBKUgPjgHkAjAK2ARgB0YKBBijCYYALEBlGFAzIA5gIT4ANusp5mJPXABEAbQg8+8XAUIBdAwFgAUKEixEKdHCxde-UhVPctPRMrHABqu7yAK780KT63uYA3I7O0PBIaJioAKIAtmAwhIm+ZOQBQQy6bCWCANbAhKjlPIwC6sDKMAAW8WQADHAAZENhPBFZUDFiUH0cZvwpTuDpcABmUcj8GCh0eEQATAEAPAAqcKAwnQAmqHQMRtYs5Nf4MPi0p4yfRshReZxgFBrHAAN6OOCQuBQYAwKJQZBwV7vAQw64xYDkDZbGA7RHkYTAABulUIjwANIh4aTHsxwQ4oYy4AB6ZnrDAgOB5KLqXFIjB5TqoPEaPZWMJrODoBTKCFMyEdeDICAAd1oACU+NBrsdpYolJTgmwyKCAL5y+UYSXkLCWIjkBDwxh0i3yqHKlV+UFwIyOqBGfrWay0P1GACMIPNDLdUbdnmtAEIsPlCsUFjByB7ndDYfDEbUBPhUMKlMgCTCiZSs67Gaz2ZyqOKIJKAuY4DWoVaKF50w6ncwYXCEfMfIIiyWy4TK1SoIwO5Cu+QE3bCAJbftCOXidnB3mR+ZC8WMKXyGbKVPGEt5zmh-n04eJ1vp37L67TZSza+HFHHJlUBAOlUDoqHIL9mQAKj-eBOTIIwAHIoGoVA4MpOCwGoCA4OsAQ8nwMByGlUJpQEVAwHUDAMzg6g4OdVFgHRBBMWxbZdifSkXzBV1FTgD0NS1KAdT1ZRDQYY0wVjTtrXXKw+1nF1o3lD0vR9UNA2DGdw0jN9XV3YcC3HY9JwrKtVTnb8P1NL9f0iOBiFguCQGoQgULgOCPk4LCcLwgj5FCelGSgqUyIovxiNI8jKOoszGV0xFvSMcKKIDINaESmBNLgKNLLohimM2Fj8SndinU4hS3DQACpHUCAlDYmdosk7tUFqWSd1zPT7wMk8ivqnT2rirKLK-P9KvaGryCYcDmUcayKsA6rasbQ4AnIeDEOQ1D0Mw7DcPwwiSDYMLgsimjnTMkb5vGpbCCOHhVocpyXLc6gPJ27z9rYfyoUCtLQvkEjjvIKiaL628wR9NLkvUyGI0yxxLOdIA)
 * @param data
 * @returns
 */
export function array2obj<T extends any[]>(data: T): T[number] {
  return data.reduce(function (prev: any[], cur: any[]) {
    // fix multi dimensional array of string
    let now: Record<string, any> = {};
    if (isArray(cur)) {
      now = { [cur[0]]: cur[1] };
    }
    if (!isEmptyObject(now)) return Object.assign(prev, now);
    // fix array of object
    if (isObject(cur)) return Object.assign(prev, cur);
    if (!Array.isArray(prev)) return Object.assign({}, prev);

    return Object.assign(prev, cur);
  }, {});
}

/**
 * escape regex
 * @param str
 * @returns
 */
export function escapeRegex(str: string) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
