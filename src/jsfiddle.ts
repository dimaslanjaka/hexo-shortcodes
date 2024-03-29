//
// Input: {% jsfiddle heera/A9RDk %}
// Output: <script async src=\"//jsfiddle.net/heera/A9RDk/embed/js,resources,html,css,result/dark/"></script>
//
// Input: {% jsfiddle heera/A9RDk js,html,result iframe %}
// Output: <iframe style="width: 100%; height: 300px" src="http://jsfiddle.net/heera/A9RDk/embedded/js,html,result/light/"></iframe>
//

// /(?<fiddle>\w+)(?:\s+(?<sequence>[\w,]+))?(?:\s+(?<skin>\w+))?(?:\s+(?<height>\w+))?(?:\s+(?<width>\w+))?/

export const jsfiddle = function (hexo: import('hexo')) {
  // hexo.extend.tag.unregister('jsfiddle');
  hexo.extend.tag.register('jsfiddle', function (args: string[]) {
    const id = args[0] || null;
    const display = args[1] || 'js,resources,html,css,result';
    const outputAs = args[2] || 'script';
    const mode = args[3] || 'light';

    if (!id) return '<span>[hexo-shortcodes] ERROR(jsfiddle) id undefined</span>';

    const ifr = `<iframe style="width: 100%; height: 300px" src="http://jsfiddle.net/${id}/embedded/${display}/${mode}/"></iframe>`;
    const scr = `<script async src="//jsfiddle.net/${id}/embed/${display}/${mode}/"></script><noscript>${ifr}</noscript>`;

    if (outputAs === 'script') {
      return scr;
    } else {
      return ifr;
    }
  });
};
