---
title: hexo-shortcodes rss reader
date: 02-25-2023 11:44:00
updated: 2023-03-02T18:47:02+07:00
---

## Hexo shortcode rss reader
display any rss to your hexo site.

```nunjucks
{% rssreader [url] [limit:n] [debug:[true|false]] [randomize:[true|false]] %}
<!-- html result formats each item -->
{% endrssreader %}
```

## Options
rss reader options.

| option | default | description |
| :--- | :--- | :--- |
| limit | 3 | maximum items to display |
| debug | false | debug item |
| randomize | false | sort items randomly instead reading from last published date |

## Formats

format object parsed from rss items.

| sign | description |
| :--- | :--- |
| $title | item title |
| $link | item link |
| $content | item description |
| $image | item thumbnail |
| $pubDate | item date published |
| $author | item author |
| $summary | item summary |

### Debug Item Object
if you don't know what is your rss object key, you can debug your item object with bellow shortcode.

> when you done debugging, remove `debug` option.

```nunjucks
{% rssreader https://www.webmanajemen.com/rss.xml debug:true %}{% endrssreader %}
```

sample result from https://www.webmanajemen.com/rss.xml

{% rssreader https://www.webmanajemen.com/rss.xml limit:1 debug:true %}{% endrssreader %}

## Example

```nunjucks
{% rssreader https://www.webmanajemen.com/rss.xml limit:10 %}
<div style="margin-bottom: 7px; padding: 7px">
  <div style="display: flex">
    <div>$image</div>
    <div><h2>$title</h2></div>
  </div>
  <p>$content</p>
  <a href="$link" rel="follow">Read More</a>
</div>
{% endrssreader %}
```

{% rssreader https://www.webmanajemen.com/rss.xml limit:10 %}
<div style="margin-bottom: 7px; padding: 7px">
  <div style="display: flex">
    <div>$image</div>
    <div><h2>$title</h2></div>
  </div>
  <p>$content</p>
  <a href="$link" rel="follow">Read More</a>
</div>
{% endrssreader %}
