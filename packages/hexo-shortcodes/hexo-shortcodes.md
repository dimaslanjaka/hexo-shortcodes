title: hexo-shortcodes demo
date: 2013-12-25 00:14:39
updated: 2023-02-25T00:48:02+07:00
type: page
permalink: /docs/hexo-shortcodes/index.html
---

This post is used for testing hexo-shortcodes plugins.

## github card

Display user profile only
```
{% githubCard user:dimaslanjaka %}
```

{% githubCard user:dimaslanjaka %}

Display a repo
```
{% githubCard user:dimaslanjaka repo:hexo-shortcodes %}
```

{% githubCard user:dimaslanjaka repo:hexo-shortcodes %}

### jsFiddle

```nunjucks
{% jsfiddle heera/A9RDk %}
```

{% jsfiddle heera/A9RDk %}

```nunjucks
{% jsfiddle heera/A9RDk js,html,result iframe %}
```

{% jsfiddle heera/A9RDk js,html,result iframe %}


### Gist

```nunjucks
{% gist meredrica/088f5a593a2a7184202850c58bcb48d1 %}
```

{% gist meredrica/088f5a593a2a7184202850c58bcb48d1 %}

```nunjucks
{% gist dimaslanjaka/a6aa24a8fa7a13999ee3dac077fa21fe anonymize-ip.php %}
```

{% gist dimaslanjaka/a6aa24a8fa7a13999ee3dac077fa21fe anonymize-ip.php %}

#### vimeo

```nunjucks
{% vimeo video_id [width] [height] %}
```

#### youtube

```nunjucks
{% youtube video_id [type] [cookie] %}
```

```nunjucks
{% youtube lJIrF4YjHfQ %}
```

{% youtube lJIrF4YjHfQ %}