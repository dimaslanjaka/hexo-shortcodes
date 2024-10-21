---
title: include_file render markdown
date: 2023-05-20T16:32:51+07:00
updated: 2023-05-20T16:32:51+07:00
---

include the file and render directly using `hexo.renderer` with engine **markdown**

```
{% include_file 'markdown-cheatsheet.md' pretext:false lang:md render:true %}{% endinclude_file %}
```

{% include_file 'markdown-cheatsheet.md' pretext:false lang:md render:true %}{% endinclude_file %}
