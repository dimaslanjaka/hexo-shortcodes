process.cwd = () => __dirname;
import Hexo from 'hexo';
import { rssreader } from '../lib/src/rssreader';
import fs from 'fs';
import path from 'path';

const tmp = path.join(__dirname, '../tmp');
if (!fs.existsSync(tmp)) fs.mkdirSync(tmp, { recursive: true });

const hexo = new Hexo(__dirname);
hexo.init().then(() => {
  const { callback } = rssreader(hexo);
  callback(
    ['https://www.kompiajaib.com/feeds/posts/default', 'limit:10'],
    `
## $title
> published $date
![$title]($image)

[read more]($link)
  `.trim()
  ).then((result) => {
    fs.writeFileSync(path.join(tmp, 'rss.md'), result);
  });
});
