# hexo-shortcodes
Hexo shortcodes helper. Various shortcodes for hexo, adapted from jekyll. Various hexo shortcode tags.

[GitHub](https://github.com/dimaslanjaka/hexo-shortcodes) |
[Demo and docs](https://www.webmanajemen.com/docs/hexo-shortcodes/)

## Installation
Firsly, remove old original tag renderer. Because this plugin already have all default tag (`vimeo`, `youtube`, `gist`, `codeblock`)

```bash
npm un hexo-tag-embed
```

production
```bash
npm i hexo-shortcodes
```

latest changes, replace `COMMIT_HASH` with latest commit hash. see [pre-release commit history](https://github.com/dimaslanjaka/hexo-shortcodes/commits/pre-release)
```bash
npm i hexo-shortcodes@https://github.com/dimaslanjaka/hexo-shortcodes/tarball/COMMIT_HASH
# or
yarn add hexo-shortcodes@https://github.com/dimaslanjaka/hexo-shortcodes/tarball/COMMIT_HASH
```

## shortcodes list
| shortcode | description |
| :--- | :--- |
| [hexo **codepen** shortcode](https://www.webmanajemen.com/docs/hexo-shortcodes/codepen) | embed codepen |
| [hexo **gist** shortcode](https://www.webmanajemen.com/docs/hexo-shortcodes/gist) | embed gist |
| [hexo **jsfiddle** shortcode](https://www.webmanajemen.com/docs/hexo-shortcodes/jsfiddle) | embed jsfiddle |
| [hexo **githubCard** shortcode](https://www.webmanajemen.com/docs/hexo-shortcodes/githubCard) | embed github card |
| [hexo **rssreader** shortcode](https://www.webmanajemen.com/docs/hexo-shortcodes/rssreader) | embed rss feed |
| [hexo **github** shortcode](https://www.webmanajemen.com/docs/hexo-shortcodes/github) | embed any source files from [github.com](https://github.com) |
| [hexo **npmrunkit** shortcode](https://www.webmanajemen.com/docs/hexo-shortcodes/npmrunkit) | embed any javascript codes to website |
| [hexo **include_file** shortcode](https://www.webmanajemen.com/docs/hexo-shortcodes/include_file) | include any files relative to `hexo.config.source_dir`, `hexo.config.code_dir`, or reference file it self |
| [videos](https://www.webmanajemen.com/docs/hexo-shortcodes/videos) | default hexo embedding videos |

## Config

define renderer returns by setting `_config.yml`

```yaml
hexo-shortcodes:
  # true = return raw markdown format instead html
  raw: false
```

## Language Test

- [php](/docs/hexo-shortcodes/lang/php)

## Changelog
read more at https://github.com/dimaslanjaka/hexo-shortcodes/commits/pre-release (`chore`,`feat`,`fix` sections)
### 1.2.3
- fix: `hexo@6` `context.extend.highlight` undefined
  TypeError: Cannot read properties of undefined (reading 'query')
### 1.2.2
- `include_file`: fix typeof `hexo` undefined
### 1.2.1
- `include_file`: add include file shortcode tag
- `gist`: fix failed embed spesific lines
### 1.2.0
- `gist`: change parameters and usages
- `gist`: validate id is URL or not
### 1.1.3
- `rssreader`: hotfix get thumbnail from rss item
- `rssreader`: fix: validate `item['media:group']` is Array
### 1.1.2
- `gist`: fix undefined username
### 1.1.1
- fix: invalid `git-embed` location

## Documentations
- [FULL DEMO, FEATURES, CHANGELOG, and USAGES](https://www.webmanajemen.com/docs/hexo-shortcodes)

License
=======

[MIT](https://github.com/dimaslanjaka/hexo-shortcodes/blob/master/LICENSE)
