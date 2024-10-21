---
title: hexo-shortcodes demo
date: 2023-03-03T00:48:02+07:00
updated: 2023-05-25T00:48:02+07:00
---

# hexo-shortcodes
Hexo shortcodes helper. Various shortcodes for hexo, adapted from jekyll. Various hexo shortcode tags. [GitHub](https://github.com/dimaslanjaka/hexo-shortcodes).

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
```
for yarn just replace `npm i` with `yarn add`

## shortcodes list
| shortcode | description |
| :--- | :--- |
| [hexo **codepen** shortcode](/docs/hexo-shortcodes/codepen) | embed codepen |
| [hexo **gist** shortcode](/docs/hexo-shortcodes/gist) | embed gist |
| [hexo **jsfiddle** shortcode](/docs/hexo-shortcodes/jsfiddle) | embed jsfiddle |
| [hexo **githubCard** shortcode](/docs/hexo-shortcodes/githubCard) | embed github card |
| [hexo **rssreader** shortcode](/docs/hexo-shortcodes/rssreader) | embed rss feed |
| [hexo **github** shortcode](/docs/hexo-shortcodes/github) | embed any source files from [github.com](https://github.com) |
| [hexo **npmrunkit** shortcode](/docs/hexo-shortcodes/npmrunkit) | embed any javascript codes to website |
| [hexo **include_file** shortcode](/docs/hexo-shortcodes/include_file) | include any files relative to `hexo.config.source_dir`, `hexo.config.code_dir`, or reference file it self |
| [videos](/docs/hexo-shortcodes/videos) | default hexo embedding videos |

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
