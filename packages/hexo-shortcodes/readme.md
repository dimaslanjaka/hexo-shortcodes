# hexo-shortcodes
Hexo shortcodes helper. Various shortcodes for hexo, adapted from jekyll.

- [FULL DEMO and USAGES](https://www.webmanajemen.com/docs/hexo-shortcodes)

NPM
```
npm install --save hexo-shortcodes
```

Yarn
```
yarn add hexo-shortcodes
```

## Usage

## jsfiddle

Embed JSFiddle playground to your website. Source idea from `jekyll-jsfiddle`.

## gist

Embed gist codes to your website. Source idea from `jekyll-gist`.


## hexo-github-card
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

Example:

Display user profile only
```
{% githubCard user:dimaslanjaka %}
```

Display a repo
```
{% githubCard user:dimaslanjaka repo:hexo-shortcodes %}
```

## codepen

Example:

```nunjucks
{% codepen https://codepen.io/dimaslanjaka/pen/KowxjR %}
```

License
=======

[MIT](LICENSE)
