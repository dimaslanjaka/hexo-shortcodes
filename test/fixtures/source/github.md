---
title: embed any codes from github
---

## with full url
```markdown
{% github https://github.com/dimaslanjaka/static-blog-generator/blob/e8ef351552d57c5e28e016e39e78fef139a8e7b2/.github/workflows/build-beta.yml#L152-L158 %}
```

{% github https://github.com/dimaslanjaka/static-blog-generator/blob/e8ef351552d57c5e28e016e39e78fef139a8e7b2/.github/workflows/build-beta.yml#L152-L158 %}

## without base url
embed tag without base url `https://github.com/`

```nunjucks
{% github dimaslanjaka/static-blog-generator/blob/e8ef351552d57c5e28e016e39e78fef139a8e7b2/.github/workflows/build-beta.yml#L152-L158 %}
```

```nunjucks
{% github dimaslanjaka/static-blog-generator/blob/e8ef351552d57c5e28e016e39e78fef139a8e7b2/.github/workflows/build-beta.yml#L152-L158 %}
```

{% github dimaslanjaka/static-blog-generator/blob/e8ef351552d57c5e28e016e39e78fef139a8e7b2/.github/workflows/build-beta.yml#L152-L158 %}

## using object options

```nunjucks
{% github repo:dimaslanjaka/static-blog-generator ref:e8ef351552d57c5e28e016e39e78fef139a8e7b2 file:.github/workflows/build-beta.yml line:#L152-L158 %}
```

| property | description | sample value |
| :--- | :--- | :--- |
| repo | github repository | github_username/github_repo |
| file | file path | file path to embed |
| ref | github refs | commit hash or branch |
| line | embed specific line | **152-158** or **#L152-L158** |

{% github repo:dimaslanjaka/static-blog-generator ref:e8ef351552d57c5e28e016e39e78fef139a8e7b2 file:.github/workflows/build-beta.yml line:#L152-L158 %}

## using object options - line without `#L`

```nunjucks
{% github repo:dimaslanjaka/static-blog-generator ref:e8ef351552d57c5e28e016e39e78fef139a8e7b2 file:.github/workflows/build-beta.yml line:152-158 %}
```

{% github repo:dimaslanjaka/static-blog-generator ref:e8ef351552d57c5e28e016e39e78fef139a8e7b2 file:.github/workflows/build-beta.yml line:152-158 %}

## Language matcher test

pretext from hexo
```yaml
name: Build Beta

on:
  push:
    branches: ['beta']
    paths-ignore:
      - '**/dist/**'
      - '**/release/**'
      - 'packages/google-news-sitemap'
      - 'packages/hexo-post-parser'
      - 'packages/git-command-helper'
      - 'packages/safelinkify'
      - 'packages/hexo-blogger-xml'
      - '**/test/**'
  pull_request:
    types:
      - closed
  workflow_dispatch:
```

pretext from plugin

{% github repo:dimaslanjaka/static-blog-generator ref:e8ef351552d57c5e28e016e39e78fef139a8e7b2 file:.github/workflows/build-beta.yml %}