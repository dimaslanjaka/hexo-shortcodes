| option key | description | default |
| :--- | :--- | :--- |
| `title` | caption title | `path.extname(pathToFile)` |
| `pretext` | wrap codes with `<pre/><code/>` and syntax highlight enable indicator | `true` |
| `lang` | syntax highlighter for spesific language, _needs `pretext` to `true`_ | `empty string` by default treat as text plain |
| `from` | embed start line | `0` |
| `to` | embed ends line | `Number.MAX_VALUE` |
| `render` | Render the file to include, requiring the `lang` option parameter |