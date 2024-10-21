---
title: shortcode github card
date: 02-25-2023 11:44:00
updated: 2023-02-25T00:48:02+07:00
---

## github card

Display a card for GitHub profile and repo in your [hexo](https://hexo.io) blog. Implemented with [Github-cards](https://github.com/lepture/github-cards).

Insert `githubCard` tag in your article:

```
{% githubCard user:your_user [repo:your_repo] [width:400] [height:200] [theme:default] [client_id:your_client_id] [client_secret:your_client_secret] [align:text-align_position] %}
```

Argument | Description
-------- | -----------
user     | GitHub user name
repo     |  (Optional) GitHub repository name of the user. If omit then display only the user profile
height   | (Optional) Widget's height (in 'px'). Default is 200.
width   | (Optional) Widget's width (in 'px'). Default is 400.
client_id | (Optional) Your GitHub app client_id
client_secret | (Optional) Your GitHub app client_secret
align | (Optional) What kind of text-align is you want. Default is center.

(Configuration are consistent with [github-cards](https://github.com/lepture/github-cards#widgetjs))

## Example

Display user profile only
```
{% githubCard user:dimaslanjaka %}
```

{% githubCard user:dimaslanjaka %}

Display a repo
```
{% githubCard user:dimaslanjaka repo:hexo-seo %}
```

{% githubCard user:dimaslanjaka repo:hexo-seo %}