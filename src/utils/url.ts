/**
 * get extension from url
 * @param url
 * @returns
 */
export function getExtUrl(url: string) {
  return url.split('?')[0].split('#')[0].split('.').pop() || '';
}
