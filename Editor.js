(function(){

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
    }).use(markdownitFootnote);

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
        MD.saveAsHtml();
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

    document.addEventListener('keydown', function(e){
        if(e.keyCode == 83 && (e.ctrlKey || e.metaKey)){
          e.shiftKey ? showMenu() : MD.saveAsMarkdown();
          e.preventDefault();
          return false;
        }
        if(e.keyCode === 27 && menuVisible){
          hideMenu();
          e.preventDefault();
          return false;
        }
    });

MD = {
    hashto:{},
    inDiv:{},
    outDiv:{},
    textarea:{},
    editor:{},
    toolbars:[],
    path:'',
    isEdit:false,

    getEditor:function(id, config){
        this.toolbars = config.toolbars || MARKDOWN_CONFIG.toolbars;
        this.path = config.path || MARKDOWN_CONFIG.path;

        this.init(id, config);
    },

    init:function(id, config){
        var textHtml = document.getElementById(id).innerHTML;
        var markdownDiv = document.createElement("div");
        markdownDiv.id = id;
        markdownDiv.className = "markdown-editor";
        this.insertAfter(markdownDiv,document.getElementById(id));
        this.inDiv = document.createElement("div");
        this.inDiv.id = "in";
        markdownDiv.appendChild(this.inDiv);
        this.textarea = document.createElement("textarea");
        this.textarea.id = "code";
        this.textarea.setAttribute("name",config.name || id);
        this.textarea.innerHTML = textHtml;
        this.inDiv.appendChild(this.textarea);
        this.editor = CodeMirror.fromTextArea(this.textarea, {
            mode: 'gfm',
            lineNumbers: false,
            matchBrackets: true,
            lineWrapping: true,
            theme: 'base16-light',
            extraKeys: {"Enter": "newlineAndIndentContinueMarkdownList"}
        });
        this.editor.on('change', this.update);
        this.editor.on('focus', this.setFocus);
        this.editor.on('blur', this.setBlur);
        /*
        this.editor.on("drop",function(e){
            if(!(e.dataTransfer && e.dataTransfer.files)){
                alert("该浏览器不支持操作");
                return false;
            }
            for(var i=0;i<e.dataTransfer.files.length;i++){
                console.log(e.dataTransfer.files[i]);
                // fileUpload(e.dataTransfer.files[i]);
            }
            e.preventDefault();
        });
        */
        this.outDiv = document.createElement("div");
        this.outDiv.id = "out";
        markdownDiv.appendChild(this.outDiv);
        var toolbars = TOOLBARS.toolbars(markdownDiv, this.editor);
        markdownDiv.appendChild(toolbars);
        document.body.removeChild(document.getElementById(id));

        if(window.location.hash){
            var h = window.location.hash.replace(/^#/, '');
            if(h.slice(0,5) == 'view:'){
                MD.setOutput(decodeURIComponent(escape(RawDeflate.inflate(atob(h.slice(5))))));
                document.body.className = 'view';
            }else{
                this.editor.setValue(
                decodeURIComponent(escape(
                    RawDeflate.inflate(
                        atob(
                            h
                        )
                    )
                ))
            );
            MD.update(this.editor);
            this.editor.focus();
        }
        }else{
            MD.update(this.editor);
            this.editor.focus();
        }
    },

    insertAfter:function ( newElement, targetElement ){ // newElement是要追加的元素 targetElement 是指定元素的位置 
        var parent = targetElement.parentNode; // 找到指定元素的父节点 
        if( parent.lastChild == targetElement ){ // 判断指定元素的是否是节点中的最后一个位置 如果是的话就直接使用appendChild方法 
            parent.appendChild( newElement, targetElement ); 
        }else{ 
            parent.insertBefore( newElement, targetElement.nextSibling ); 
        }; 
    },

    setFocus:function(e){
        MD.isEdit = true;
        // console.log(MD.isEdit);
    },

    setBlur:function(e){
        MD.isEdit = false;
        // console.log(MD.isEdit);
    },

    update:function(e){
        MD.setOutput(e.getValue());
        clearTimeout(MD.hashto);
        MD.hashto = setTimeout(MD.updateHash, 1000);
    },

    updateHash:function(){
        window.location.hash = btoa(RawDeflate.deflate(unescape(encodeURIComponent(MD.editor.getValue()))));
        // 设置textarea内容
        MD.textarea.innerHTML = MD.outDiv.innerHTML;
    },

    setOutput:function(val){
        val = val.replace(/<equation>((.*?\n)*?.*?)<\/equation>/ig, function(a, b){
            return '<img src="http://latex.codecogs.com/png.latex?' + encodeURIComponent(b) + '" />';
        });

        var old = this.outDiv.cloneNode(true);
        this.outDiv.innerHTML = md.render(val);
        emojify.run(this.outDiv);

        var allold = old.getElementsByTagName("*");
        if (allold === undefined) return;

        var allnew = this.outDiv.getElementsByTagName("*");
        if (allnew === undefined) return;

        for (var i = 0, max = Math.min(allold.length, allnew.length); i < max; i++) {
            if (!allold[i].isEqualNode(allnew[i])) {
                this.outDiv.scrollTop = allnew[i].offsetTop;
                return;
            }
        }
    },

    saveAsMarkdown:function(){
        this.save(MD.editor.getValue(), "untitled.md");
    },

    saveAsHtml:function() {
        this.save(this.outDiv.innerHTML, "untitled.html");
    },

    save:function(code, name){
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
    },

}
    
    /*
    document.addEventListener('drop', function(e){
        // console.log(e.dataTransfer.files[0]);
        if(!(e.dataTransfer&&e.dataTransfer.files)){
            alert("该浏览器不支持操作");
            return;
        }
        for(var i=0;i<e.dataTransfer.files.length;i++){
            console.log(e.dataTransfer.files[i]);
            fileUpload(e.dataTransfer.files[i]);
        }
        e.preventDefault();
    });
    */

})();