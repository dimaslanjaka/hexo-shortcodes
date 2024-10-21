---
title: hexo-shortcodes codepen tag
date: 02-25-2023 11:44:00
updated: 2023-02-25T00:48:02+07:00
---

you can specify default configurations at `_config.yml` or default options will be used
```yaml
codepen:
  theme_id: 11473
  height: 300
  preview: false
  default_tab: result
  version: 2
```

```nunjucks
{% codepen https://codepen.io/dimaslanjaka/pen/KowxjR %}
```

{% codepen https://codepen.io/dimaslanjaka/pen/KowxjR %}

overriden default configuration from `_config.yml`

```nunjucks
{% codepen https://codepen.io/dimaslanjaka/pen/KowxjR height=800 preview=true %}
```

{% codepen https://codepen.io/dimaslanjaka/pen/KowxjR height=800 preview=true %}