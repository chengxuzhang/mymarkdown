var URL = window.URL || window.webkitURL || window.mozURL || window.msURL;
    navigator.saveBlob = navigator.saveBlob || navigator.msSaveBlob || navigator.mozSaveBlob || navigator.webkitSaveBlob;
    window.saveAs = window.saveAs || window.webkitSaveAs || window.mozSaveAs || window.msSaveAs;

    // Because highlight.js is a bit awkward at times
    var languageOverrides = {
      js: 'javascript',
      html: 'xml'
    };

    emojify.setConfig({ img_dir: 'emoji' });

    var md = markdownit({
      html: true,
      highlight: function(code, lang){
        if(languageOverrides[lang]) lang = languageOverrides[lang];
        if(lang && hljs.getLanguage(lang)){
          try {
            return hljs.highlight(lang, code).value;
          }catch(e){}
        }
        return '';
      }
    })
      .use(markdownitFootnote);


    var hashto;

    function update(e){
      setOutput(e.getValue());

      clearTimeout(hashto);
      hashto = setTimeout(updateHash, 1000);
    }

    function setOutput(val){
      val = val.replace(/<equation>((.*?\n)*?.*?)<\/equation>/ig, function(a, b){
        return '<img src="http://latex.codecogs.com/png.latex?' + encodeURIComponent(b) + '" />';
      });

      var out = document.getElementById('out');
      var old = out.cloneNode(true);
      out.innerHTML = md.render(val);
      emojify.run(out);

      var allold = old.getElementsByTagName("*");
      if (allold === undefined) return;

      var allnew = out.getElementsByTagName("*");
      if (allnew === undefined) return;

      for (var i = 0, max = Math.min(allold.length, allnew.length); i < max; i++) {
        if (!allold[i].isEqualNode(allnew[i])) {
          out.scrollTop = allnew[i].offsetTop;
          return;
        }
      }
    }

    var editor = CodeMirror.fromTextArea(document.getElementById('code'), {
      mode: 'gfm',
      lineNumbers: false,
      matchBrackets: true,
      lineWrapping: true,
      theme: 'base16-light',
      extraKeys: {"Enter": "newlineAndIndentContinueMarkdownList"}
    });

    editor.on('change', update);

    document.addEventListener('drop', function(e){
      e.preventDefault();
      e.stopPropagation();

      var reader = new FileReader();
      reader.onload = function(e){
        editor.setValue(e.target.result);
      };

      reader.readAsText(e.dataTransfer.files[0]);
    }, false);

    function saveAsMarkdown(){
      save(editor.getValue(), "untitled.md");
    }

    function saveAsHtml() {
      save(document.getElementById('out').innerHTML, "untitled.html");
    }

    function save(code, name){
      var blob = new Blob([code], { type: 'text/plain' });
      if(window.saveAs){
        window.saveAs(blob, name);
      }else if(navigator.saveBlob){
        navigator.saveBlob(blob, name);
      }else{
        url = URL.createObjectURL(blob);
        var link = document.createElement("a");
        link.setAttribute("href",url);
        link.setAttribute("download",name);
        var event = document.createEvent('MouseEvents');
        event.initMouseEvent('click', true, true, window, 1, 0, 0, 0, 0, false, false, false, false, 0, null);
        link.dispatchEvent(event);
      }
    }

    var menuVisible = false;
    var menu = document.createElement("div");
    menu.id = "menu";
    var span_title = document.createElement("span");
    span_title.innerHTML = '保存格式';
    menu.appendChild(span_title);
    var saveas_markdown = document.createElement("div");
    saveas_markdown.id = "saveas-markdown";
    saveas_markdown.innerHTML = '<svg height="64" width="64">\
        <g transform="scale(0.0625)">\
          <path d="M950.154 192H73.846C33.127 192 0 225.12699999999995 0 265.846v492.308C0 798.875 33.127 832 73.846 832h876.308c40.721 0 73.846-33.125 73.846-73.846V265.846C1024 225.12699999999995 990.875 192 950.154 192zM576 703.875L448 704V512l-96 123.077L256 512v192H128V320h128l96 128 96-128 128-0.125V703.875zM767.091 735.875L608 512h96V320h128v192h96L767.091 735.875z" />\
        </g>\
      </svg>\
      <span>Markdown</span>';
    saveas_markdown.onclick = function(){
      saveAsMarkdown();
      hideMenu();  
    }
    menu.appendChild(saveas_markdown);
    var saveas_html = document.createElement("div");
    saveas_html.id = "saveas-html";
    saveas_html.innerHTML = '<svg height="64" width="64">\
        <g transform="scale(0.0625) translate(64,0)">\
          <path d="M608 192l-96 96 224 224L512 736l96 96 288-320L608 192zM288 192L0 512l288 320 96-96L160 512l224-224L288 192z" />\
        </g>\
      </svg>\
      <span>HTML</span>';
    saveas_html.onclick = function(){
      saveAsHtml();
      hideMenu();
    }
    menu.appendChild(saveas_html);
    var close_menu = document.createElement("a");
    close_menu.id = "close-menu";
    close_menu.setAttribute("href","javascript:;");
    close_menu.innerHTML = '&times;';
    close_menu.onclick = function(){
      hideMenu();
    }
    menu.appendChild(close_menu);

    document.getElementsByTagName("body")[0].appendChild(menu);

    function showMenu() {
      menuVisible = true;
      menu.style.display = 'block';
    }

    function hideMenu() {
      menuVisible = false;
      menu.style.display = 'none';
    }

    // document.getElementById('close-menu').addEventListener('click', function(){
    //   hideMenu();
    // });

    document.addEventListener('keydown', function(e){
      if(e.keyCode == 83 && (e.ctrlKey || e.metaKey)){
        e.shiftKey ? showMenu() : saveAsMarkdown();

        e.preventDefault();
        return false;
      }

      if(e.keyCode === 27 && menuVisible){
        hideMenu();

        e.preventDefault();
        return false;
      }
    });

    function updateHash(){
      window.location.hash = btoa( // base64 so url-safe
        RawDeflate.deflate( // gzip
          unescape(encodeURIComponent( // convert to utf8
            editor.getValue()
          ))
        )
      );
    }

    if(window.location.hash){
      var h = window.location.hash.replace(/^#/, '');
      if(h.slice(0,5) == 'view:'){
        setOutput(decodeURIComponent(escape(RawDeflate.inflate(atob(h.slice(5))))));
        document.body.className = 'view';
      }else{
        editor.setValue(
          decodeURIComponent(escape(
            RawDeflate.inflate(
              atob(
                h
              )
            )
          ))
        );
        update(editor);
        editor.focus();
      }
    }else{
      update(editor);
      editor.focus();
    }