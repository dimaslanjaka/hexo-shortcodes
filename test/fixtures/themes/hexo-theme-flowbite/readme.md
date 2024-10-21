# hexo-theme-flowbite

HexoJS theme build with TailwindCSS and Flowbite

## Features

- Responsive
- Auto SEO
- Custom HTML Injection
- FancyBox multimedia display

## Requirements

- Hexo renderer nunjucks

## Preview

- [https://www.webmanajemen.com/hexo-themes/hexo-theme-flowbite/](https://www.webmanajemen.com/hexo-themes/hexo-theme-flowbite/)

## Installation

[Read Here](https://github.com/dimaslanjaka/hexo-themes?tab=readme-ov-file#how-to-install)

## Configuration

> Before starting. Make sure the location of your theme is.
>
> when theme in `themes/flowbite` the yaml config filename is `_config.flowbite.yml`
>
> when theme in `themes/hexo-theme-flowbite` the yaml config filename is `_config.hexo-theme-flowbite.yml`

- [Full hexo-theme-flowbite config and description here](https://github.com/dimaslanjaka/hexo-themes/blob/master/themes/hexo-theme-flowbite/_config.yml)
- [Full hexo-theme-flowbite config on production](https://github.com/dimaslanjaka/static-blog-generator-hexo/blob/master/site/_config.flowbite.yml)

### Search box

[Read Here](https://github.com/dimaslanjaka/hexo-themes?tab=readme-ov-file#search-data)

### Syntax highlighter

This theme only working for highlight.js with below configuration

- apply to `_config.yml`

```yaml
# https://github.com/hexojs/hexo-util
# https://hexo.io/docs/syntax-highlight.html
syntax_highlighter: highlight.js
highlight:
  enable: true
  line_number: false
  auto_detect: false
  tab_replace: '  ' # replace tabs with 2 spaces
  wrap: false
  hljs: true
prismjs:
  enable: false
  preprocess: true
  line_number: true
  tab_replace: '  ' # replace tabs with 2 spaces
```

### Loading animation

Show loading animation before page fully loaded. (`boolean`)

- apply to **theme yaml config**

```yaml
loading_animation:
  enable: true
  # type mini: small loader fixed on top right
  # type full: full page loader
  type: mini
```

### Gallery

Show gallery each post (`boolean`)

- apply to **theme yaml config**

```yml
gallery: true
```

### Disqus comment

Integrate disqus comment system (`string`)

- apply to **site yaml config**

```yaml
disqus_shortname: YOUR_DISQUS_USERNAME
```

> remove `disqus_shortname` to disable disqus comment system

### Code injection

Inject your own widget html [see folder](../../source/_data/hexo-theme-flowbite/)

| File Path | Description |
| :--- | :--- |
| `source/_data/hexo-theme-flowbite/head.html` | inject html codes before `</head>` |
| `source/_data/hexo-theme-flowbite/body.html` | inject html codes before `</body>` |
| `source/_data/hexo-theme-flowbite/before-post.html` | inject html before post |
| `source/_data/hexo-theme-flowbite/after-post.html` | inject html after post |
| `source/_data/hexo-theme-flowbite/aside.html` | inject html on aside bottom section |
