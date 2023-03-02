---
title: hexo-shortcodes codepen tag
---

configurations at `_config.yml`
```yaml
codepen:
  theme: 11473
  height: 300
  preview: false
  default_tab: result
  version: 2
```

```nunjucks
{% codepen https://codepen.io/blindingstars/pen/wBexpr %}
```

{% codepen https://codepen.io/blindingstars/pen/wBexpr %}

overriden default configuration from `_config.yml`

```nunjucks
{% codepen https://codepen.io/blindingstars/pen/wBexpr height=800 preview=true %}
```

{% codepen https://codepen.io/blindingstars/pen/wBexpr height=800 preview=true %}