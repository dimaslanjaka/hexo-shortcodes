import Hexo from 'hexo';
/**
 * hexo-util.url_for alias
 * @param url
 * @returns
 */
export declare const url_for: (url: string) => string;
export declare const registerHexo: (instance: Hexo) => Hexo;
export declare const escapeHTML: (str: string) => string;
/**
 * get matches from regex (cacheable).
 * @param string
 * @param regex
 * @param index
 * @returns
 */
export declare function getMatches(string: string, regex: RegExp, index: number): string | null;
/**
 * get matches from regex (cacheable).
 * @param string
 * @param regex
 * @param index
 * @returns
 */
export declare function getMatches(string: string, regex: RegExp): string[] | null;
/**
 * is actual array
 * @param arr
 * @returns
 */
export declare const isArray: (arr: any) => boolean;
/**
 * is actual object
 * @param obj
 * @returns
 */
export declare const isObject: (obj: any) => boolean;
export declare const isEmptyObject: (obj: any) => boolean;
/**
 * turn multidimensional array to single object.
 *
 * - [typescript playground](https://www.typescriptlang.org/play?target=1&jsx=0&module=1&pretty=false&allowSyntheticDefaultImports=true#code/KYDwDg9gTgLgBAYwgOwM7wJaoIJSgQwE84BeOACnzwC459lCBKUgPjgHkAjAK2ARgB0YKBBijCYYALEBlGFAzIA5gIT4ANusp5mJPXABEAbQg8+8XAUIBdAwFgAUKEixEKdHCxde-UhVPctPRMrHABqu7yAK780KT63uYA3I7O0PBIaJioAKIAtmAwhIm+ZOQBQQy6bCWCANbAhKjlPIwC6sDKMAAW8WQADHAAZENhPBFZUDFiUH0cZvwpTuDpcABmUcj8GCh0eEQATAEAPAAqcKAwnQAmqHQMRtYs5Nf4MPi0p4yfRshReZxgFBrHAAN6OOCQuBQYAwKJQZBwV7vAQw64xYDkDZbGA7RHkYTAABulUIjwANIh4aTHsxwQ4oYy4AB6ZnrDAgOB5KLqXFIjB5TqoPEaPZWMJrODoBTKCFMyEdeDICAAd1oACU+NBrsdpYolJTgmwyKCAL5y+UYSXkLCWIjkBDwxh0i3yqHKlV+UFwIyOqBGfrWay0P1GACMIPNDLdUbdnmtAEIsPlCsUFjByB7ndDYfDEbUBPhUMKlMgCTCiZSs67Gaz2ZyqOKIJKAuY4DWoVaKF50w6ncwYXCEfMfIIiyWy4TK1SoIwO5Cu+QE3bCAJbftCOXidnB3mR+ZC8WMKXyGbKVPGEt5zmh-n04eJ1vp37L67TZSza+HFHHJlUBAOlUDoqHIL9mQAKj-eBOTIIwAHIoGoVA4MpOCwGoCA4OsAQ8nwMByGlUJpQEVAwHUDAMzg6g4OdVFgHRBBMWxbZdifSkXzBV1FTgD0NS1KAdT1ZRDQYY0wVjTtrXXKw+1nF1o3lD0vR9UNA2DGdw0jN9XV3YcC3HY9JwrKtVTnb8P1NL9f0iOBiFguCQGoQgULgOCPk4LCcLwgj5FCelGSgqUyIovxiNI8jKOoszGV0xFvSMcKKIDINaESmBNLgKNLLohimM2Fj8SndinU4hS3DQACpHUCAlDYmdosk7tUFqWSd1zPT7wMk8ivqnT2rirKLK-P9KvaGryCYcDmUcayKsA6rasbQ4AnIeDEOQ1D0Mw7DcPwwiSDYMLgsimjnTMkb5vGpbCCOHhVocpyXLc6gPJ27z9rYfyoUCtLQvkEjjvIKiaL628wR9NLkvUyGI0yxxLOdIA)
 * @param data
 * @returns
 */
export declare function array2obj<T extends any[]>(data: T): T[number];
/**
 * escape regex
 * @param str
 * @returns
 */
export declare function escapeRegex(str: string): string;
