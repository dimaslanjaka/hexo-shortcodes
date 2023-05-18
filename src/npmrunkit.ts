/// embed any nodejs codes to website

import { md5 } from 'sbg-utility';
import { array2obj } from './utils';

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
