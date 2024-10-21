---
title: include_file custom template
date: 2023-05-20T16:32:51+07:00
updated: 2023-05-20T16:32:51+07:00
---

# Custom Template - `include_file`

> `$line` is current line of code
> `$index` is current line index of code

```
<table>
  <thead>
    <tr>
      <th>index</th><th>contents line</th>
    </tr>
  </thead>
  <tbody>
    {% include_file lang:javascript 'test.js' pretext:false %}
    <tr><td>$index</td><td>$line</td></tr>
    {% endinclude_file %}
  </tbody>
</table>
```

<table>
  <thead>
    <tr>
      <th>index</th><th>contents line</th>
    </tr>
  </thead>
  <tbody>
    {% include_file lang:javascript 'test.js' pretext:false %}
    <tr><td>$index</td><td>$line</td></tr>
    {% endinclude_file %}
  </tbody>
</table>
