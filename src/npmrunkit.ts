/// embed any nodejs codes to website

import { md5 } from 'sbg-utility';
import { array2obj } from './utils';

const ids = [] as string[];

async function callback(args: string[], innerCodes: string) {
  const defaults = {
    id: md5(innerCodes)
  };
  const options = Object.assign(
    defaults,
    array2obj(
      args.splice(1).map((str) => {
        const split = str.split(':');
        return { [split[0]]: split[1] };
      })
    )
  );

  if (ids.includes(options.id)) {
    // regenerate id on duplicated
    options.id = md5(innerCodes);
  }

  ids.push(options.id);

  return (
    '<script src="https://embed.runkit.com" data-element-id="' +
    options.id +
    '"></script><div id="' +
    options.id +
    '">' +
    innerCodes +
    '</div>'
  );
}

export function embedNPMRunKit(hexo: import('hexo')) {
  hexo.extend.tag.register('npmrunkit', callback, { ends: true, async: true });
}
