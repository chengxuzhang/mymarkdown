/**
 * 引入CSS样式
 */
(function (){
      var paths  = [
            "codemirror/lib/codemirror.css",
            "themes/base16-light.css",
            "themes/default.css",
            "bootstrap/dist/css/bootstrap.min.css",
            "font/iconfont.css",
            "themes/editor.css",
      ],
      baseURL = '';
      for (var i=0,pi;pi = paths[i++];) {
            var link = document.createElement("link");
            link.type = "text/css";
            link.rel = "stylesheet";
            link.href = baseURL + pi;
            document.getElementsByTagName("head")[0].appendChild(link);
      }
})();
