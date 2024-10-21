---
title: Include any files to Hexo Post
date: 2023-05-19T20:08:11+07:00
updated: 2023-05-19T20:08:11+07:00
---

include any local files with syntax highlighter
```
{% include_file [title:'scoped title'] [render:[true|false]] [lang:language] [from:line] [to:line] [pretext:[true|false]] path/to/file %}{% endinclude_file %}
```

{% include_file 'include_file_options.md' pretext:false lang:md render:true %}{% endinclude_file %}

## More Samples
- [`include_file` with **custom template**](/docs/hexo-shortcodes/include_file/custom-template)
- [`include_file` with **custom lines**](/docs/hexo-shortcodes/include_file/custom-lines)
- [`include_file` with **renderer markdown**](/docs/hexo-shortcodes/include_file/render-markdown)

## path relative to source directory

```
{% include_file 'fixtures/include-one.txt' %}{% endinclude_file %}
```

{% include_file 'fixtures/include-one.txt' %}{% endinclude_file %}

## path relative to current file (with space and without preText)

```
{% include_file '../fixtures/include two.txt' pretext:false %}{% endinclude_file %}
```

{% include_file '../fixtures/include two.txt' pretext:false %}{% endinclude_file %}

## include_code alias
Inserts code snippets relative to `source` folder. `code_dir` option in the config also be used for reference finder.

references:
- [hexojs/hexo#3211](https://github.com/hexojs/hexo/issues/3211)

### Embed the whole content of test.js
`test.js` inside `source/downloads/code` (`hexo.code_dir`)

```
{% include_file lang:javascript 'test.js' %}{% endinclude_file %}
```

{% include_file lang:javascript 'test.js' %}{% endinclude_file %}

```
{% include_file lang:javascript 'downloads/code/test.js' %}{% endinclude_file %}
```

{% include_file lang:javascript 'downloads/code/test.js' %}{% endinclude_file %}



