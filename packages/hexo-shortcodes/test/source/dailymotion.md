---
title: hexo-shortcodes dailymotion tag
date: 02-25-2023 11:44:00
updated: 2023-02-25T00:48:02+07:00
---

dailymotion shortcode tag for hexo

```nunjucks
{% dailymotion [player:player_id] [video:video_id] [playlist:playlist_id] %}
```

### Parameters

-   `player:player_id`: (optional) Identifier of your custom player configuration (See [Getting Started section in Dailymotion Video player documentation](https://developers.dailymotion.com/player/#getting-started).
-   `video:video_id`: (optional) Identifier of the video to be loaded within the player
-   `playlist:playlist_id`: (optional) Identifier of the playlist to be loaded within the player

All parameters are optional, but you must add either a `video` or `playlist` or the player will remains an empty black rectangle.

See [Video player documentation -- Dailymotion for Developers](https://developers.dailymotion.com/player/) for details about how Dailymotion player works.

### [](https://github.com/dharFr/hexo-tag-dailymotion/tree/main#example-usages)

### Example usages

#### [](https://github.com/dharFr/hexo-tag-dailymotion/tree/main#embed-a-video)

#### Embed a video

```nunjucks
{% dailymotion player:xakn video:x84sh87 %}
```

will inject the following into hexo rendered page or post

```text-html-basic
<script src="https://geo.dailymotion.com/player/xakn.js" data-video="x84sh87" ></script>
```

#### [](https://github.com/dharFr/hexo-tag-dailymotion/tree/main#embed-a-playlist)

#### Embed a playlist

```
{% dailymotion player:xakn playlist:x79dlo %}

```

will inject the following into hexo rendered page or post

```text-html-basic
<script src="https://geo.dailymotion.com/player/xakn.js" data-playlist="x79dlo"></script>
```

#### [](https://github.com/dharFr/hexo-tag-dailymotion/tree/main#embed-a-video-and-a-playlist)

#### Embed a video and a playlist

```
{% dailymotion player:xakn video:x84sh87 playlist:x79dlo %}

```

will inject the following into hexo rendered page or post

```text-html-basic
<script src="https://geo.dailymotion.com/player/xakn.js" data-video="x84sh87" data-playlist="x79dlo"></script>
```

#### [](https://github.com/dharFr/hexo-tag-dailymotion/tree/main#embed-a-default-player)

#### Embed a default player

```
{% dailymotion video:x84sh87 %}

```

will inject the following into hexo rendered page or post

```text-html-basic
<script src="https://geo.dailymotion.com/player.js" data-video="x84sh87"></script>
```

#### [](https://github.com/dharFr/hexo-tag-dailymotion/tree/main#embed-a-player-with-parameters)

#### Embed a player with parameters

```
{% dailymotion player:xakn video:x84sh87 params:startTime=15 %}

```

will inject the following into hexo rendered page or post

```text-html-basic
<script src="https://geo.dailymotion.com/player/xakn.js" data-video="x84sh87" data-params="startTime=15"></script>
```

* * * * *

```
{% dailymotion player:xakn video:x84sh87 params:startTime=15&mute=true&loop=true %}
```

will inject the following into hexo rendered page or post

```text-html-basic
<script src="https://geo.dailymotion.com/player/xakn.js" data-video="x84sh87" data-params="startTime=15&mute=true&loop=true"></script>
```