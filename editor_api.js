/**
 * 开发版本的文件导入
 */
(function (){
      var paths  = [
            '_src/editor.js',
            '_src/marked/markdown-it.js',
            '_src/marked/markdown-it-footnote.js',
            '_src/other/highlight.pack.js',
            'emoji/emojify.js',
            'codemirror/lib/codemirror.js',
            'codemirror/overlay.js',
            'codemirror/xml/xml.js',
            'codemirror/markdown/markdown.js',
            'codemirror/gfm/gfm.js',
            'codemirror/javascript/javascript.js',
            'codemirror/css/css.js',
            'codemirror/htmlmixed/htmlmixed.js',
            'codemirror/lib/util/continuelist.js',
            '_src/other/rawinflate.js',
            '_src/other/rawdeflate.js',
            '_src/style.js',
            'config/main.js',
            'plugins/toolbars.js',
            'Editor.js',
      ],
      baseURL = '';
      for (var i=0,pi;pi = paths[i++];) {
            document.write('<script type="text/javascript" src="'+ baseURL + pi +'" charset="utf-8"></script>');
      }
})();
