---
title: embed any javascript codes
date: 2023-05-18T18:52:09+07:00
updated: 2023-05-18T18:52:09+07:00
---

```markdown
{% npmrunkit id:custom %}
// GeoJSON!
var getJSON = require("async-get-json");

await getJSON("https://storage.googleapis.com/maps-devrel/google.json");
{% endnpmrunkit %}
```

{% npmrunkit id:custom %}
// GeoJSON!
var getJSON = require("async-get-json");

await getJSON("https://storage.googleapis.com/maps-devrel/google.json");
{% endnpmrunkit %}

## auto fix on duplicated id
```markdown
{% npmrunkit id:custom %}
const boxen = require("boxen");
const options = {
    borderStyle: "classic",
    padding: 1
};
const title = boxen("Boxen gets your text noticed!", options);
title + "\nAny other text is simply text :)";
{% endnpmrunkit %}
```

{% npmrunkit id:custom %}
const boxen = require("boxen");
const options = {
    borderStyle: "classic",
    padding: 1
};
const title = boxen("Boxen gets your text noticed!", options);
title + "\nAny other text is simply text :)";
{% endnpmrunkit %}