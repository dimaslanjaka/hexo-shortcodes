---
title: gist github shortcode
date: 02-25-2023 11:44:00
updated: 2023-02-25T00:48:02+07:00
---

### Gist
Embed gist codes to your website. Source idea from `jekyll-gist`.

| option | description |
| :--- | :--- |
| `filename` | filename specific embed |
| `lang` | override language syntax highlighter default based on `filename` extension |
| `line` | embed custom lines |

```nunjucks
{% gist meredrica/088f5a593a2a7184202850c58bcb48d1 %}
```

{% gist meredrica/088f5a593a2a7184202850c58bcb48d1 %}

```nunjucks
{% gist dimaslanjaka/a6aa24a8fa7a13999ee3dac077fa21fe filename:anonymize-ip.php %}
```

{% gist dimaslanjaka/a6aa24a8fa7a13999ee3dac077fa21fe filename:anonymize-ip.php %}

## get specific lines
```nunjucks
{% gist dimaslanjaka/a6aa24a8fa7a13999ee3dac077fa21fe filename:anonymize-ip.php line:1-7 %}
```

{% gist dimaslanjaka/a6aa24a8fa7a13999ee3dac077fa21fe filename:anonymize-ip.php line:1-7 %}

## old hexo gist

```nunjucks
{% gist 996818 %}
```

{% gist 996818 %}

### new hexo gist

```nunjucks
{% gist imathis/996818 %}
```

{% gist imathis/996818 %}

### new hexo gist with override options
```nunjucks
{% gist imathis/996818 lang:diff caption:'DIFF changes' %}
```

{% gist imathis/996818 lang:diff caption:'DIFF changes' %}

### new hexo gist with URL and override options
```nunjucks
{% gist https://gist.github.com/smourier/f77617a802f097aea4b4f3778108b5ef lang:ts %}
```

{% gist https://gist.github.com/smourier/f77617a802f097aea4b4f3778108b5ef lang:ts %}