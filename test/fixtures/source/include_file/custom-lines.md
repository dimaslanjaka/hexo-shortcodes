---
title: include_file custom lines
date: 2023-05-20T16:32:51+07:00
updated: 2023-05-20T16:32:51+07:00
---

### Embed line 13 only

```
{% include_file lang:typescript from:13 to:13 'fixtures/test.ts' %}{% endinclude_file %}
```

{% include_file lang:typescript from:13 to:13 'fixtures/test.ts' %}{% endinclude_file %}

### Embed line 5 to 8

```
{% include_file lang:typescript from:5 to:8 'fixtures/test.ts' %}{% endinclude_file %}
```

{% include_file lang:typescript from:5 to:8 'fixtures/test.ts' %}{% endinclude_file %}

### Embed line 5 to the end of file

```
{% include_file lang:typescript from:5 'fixtures/test.ts' %}{% endinclude_file %}
```

{% include_file lang:typescript from:5 'fixtures/test.ts' %}{% endinclude_file %}

### Embed line 1 to 8

```
{% include_file lang:javascript to:8 'test.js' %}{% endinclude_file %}
```

{% include_file lang:javascript to:8 'test.js' %}{% endinclude_file %}