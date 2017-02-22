(function(){


PASTE = {
  cover:{},
  modal:{},
  tab:1,

  createCover:function(){
    this.cover = document.createElement("div");
    this.cover.setAttribute("style","position:absolute;left:0px;top:0px;background:#000;opacity:.6;width:100%;height:100%;z-index:998;");
    document.getElementsByTagName("body")[0].appendChild(this.cover);
  },

  createModal:function(){
    var _this = this;
    // 添加一个遮罩层
    this.createCover();

    this.modal = document.createElement("div");
    this.modal.setAttribute("style","position:absolute;width:500px;height:auto;left:50%;top:50%;margin-left:-250px;margin-top:-250px;border:1px solid #ccc;background:#fff;z-index:999;");
    var title = document.createElement("div");
    title.setAttribute("style","height:40px;width:100%;line-height:40px;border-bottom:1px solid #ccc;padding:0 10px 0 10px;background:#eee;");
    title.innerHTML = "插入图片";
    this.modal.appendChild(title);
    var close = document.createElement("a");
    close.setAttribute("style","float:right");
    close.setAttribute("href","javascript:;");
    close.innerHTML = "&times;";
    close.onclick = function(){
      _this.hideUpload();
    }
    title.appendChild(close);
    var body = document.createElement("div");
    body.setAttribute("style","padding:10px;");
    this.modal.appendChild(body);
    var ul = document.createElement("ul");
    ul.className = "nav nav-tabs";
    var tab1 = document.createElement("li");
    tab1.className = "active";
    tab1.innerHTML = '<a href="javascript:;">上传图片</a>';
    var tab2 = document.createElement("li");
    tab2.innerHTML = '<a href="javascript:;">网络图片</a>';
    ul.appendChild(tab1);
    ul.appendChild(tab2);
    var tab_content = document.createElement("div");
    tab_content.className = "tab-content";
    var uploadDiv = document.createElement("div");
    uploadDiv.className = "tab-pane active";
    uploadDiv.innerHTML = '<input type="file" name="file">';
    var webDiv = document.createElement("div");
    webDiv.className = "tab-pane";
    webDiv.setAttribute("style","padding:20px 10px 0 10px;");
    webDiv.innerHTML = '<input type="text" name="text" class="form-control" placeholder="填写图片地址">';
    tab_content.appendChild(uploadDiv);
    tab_content.appendChild(webDiv);
    body.appendChild(ul);
    body.appendChild(tab_content);
    tab1.onclick = function(){
      _this.tab = 1;
      tab1.className = "active";
      tab2.className = "";
      uploadDiv.className = "tab-pane active";
      webDiv.className = "tab-pane";
    }
    tab2.onclick = function(){
      _this.tab = 2;
      tab1.className = "";
      tab2.className = "active";
      webDiv.className = "tab-pane active";
      uploadDiv.className = "tab-pane";
    }

    var footer = document.createElement("div");
    footer.setAttribute("style","margin-top:20px;width:100%;text-align:right;");
    body.appendChild(footer);

    var btn1 = document.createElement("button");
    btn1.setAttribute("style","margin-right:5px;");
    btn1.className = "btn btn-primary btn-sm";
    btn1.innerHTML = "插入";
    footer.appendChild(btn1);

    var btn2 = document.createElement("button");
    btn2.className = "btn btn-default btn-sm";
    btn2.innerHTML = "取消";
    footer.appendChild(btn2);

    btn1.onclick = function(){
      if(_this.tab === 1){
        var value = 'sb';
      }else if(_this.tab === 2){
        var value = webDiv.getElementsByTagName("input")[0].value;
      }
      MD.editor.replaceSelection('![image]('+value+')');
      _this.hideUpload();
    }

    btn2.onclick = function(){
      _this.hideUpload();
    }

    document.getElementsByTagName("body")[0].appendChild(this.modal);
  },

  showUpload:function(){
    this.createModal();
  },

  hideUpload:function(){
    document.body.removeChild(this.modal);
    document.body.removeChild(this.cover);
  },

  uploadImgFromPaste:function(file, type, isChrome) {
    var formData = new FormData();
    formData.append('image', file);
    formData.append('submission-type', type);
   
    var xhr = new XMLHttpRequest();
    xhr.open('POST', MD.path);
    xhr.onload = function () {
      if ( xhr.readyState === 4 ) {
        if ( xhr.status === 200 ) {
          var data = JSON.parse( xhr.responseText );
          if ( isChrome ) {
            MD.editor.replaceSelection('![image]('+data.store_path+')');
          } else {
            /*
            var imgList = document.querySelectorAll('#tar_box img'),
              len = imgList.length,
              i;
            for ( i = 0; i < len; i ++) {
              if ( imgList[i].className !== 'my_img' ) {
                imgList[i].className = 'my_img';
                imgList[i].src = data.store_path;
              }
            }
            */
          }
   
        } else {
          console.log( xhr.statusText );
        }
      };
    };
    xhr.onerror = function (e) {
      console.log( xhr.statusText );
    }
    xhr.send(formData);
  }

}

document.addEventListener('paste', function (event) {
  if(MD.isEdit === false){
    return false;
  }
  var isChrome = false;
  if ( event.clipboardData || event.originalEvent ) {
    //not for ie11  某些chrome版本使用的是event.originalEvent
    var clipboardData = (event.clipboardData || event.originalEvent.clipboardData);
    if(!clipboardData.items){
      alert("此浏览器不支持该功能!");
      return false;
    }
    if ( clipboardData.items ) {
      // for chrome
      var  items = clipboardData.items,
        len = items.length,
        blob = null;
      isChrome = true;
      //items.length比较有意思，初步判断是根据mime类型来的，即有几种mime类型，长度就是几（待验证）
      //如果粘贴纯文本，那么len=1，如果粘贴网页图片，len=2, items[0].type = 'text/plain', items[1].type = 'image/*'
      //如果使用截图工具粘贴图片，len=1, items[0].type = 'image/png'
      //如果粘贴纯文本+HTML，len=2, items[0].type = 'text/plain', items[1].type = 'text/html'
      // console.log('len:' + len);
      // console.log(items[0]);
      // console.log(items[1]);
      // console.log( 'items[0] kind:', items[0].kind );
      // console.log( 'items[0] MIME type:', items[0].type );
      // console.log( 'items[1] kind:', items[1].kind );
      // console.log( 'items[1] MIME type:', items[1].type );
 
      //阻止默认行为即不让剪贴板内容在div中显示出来
      event.preventDefault();
 
      //在items里找粘贴的image,据上面分析,需要循环  
      for (var i = 0; i < len; i++) {
        if (items[i].type.indexOf("image") !== -1) {
          // console.log(items[i]);
          // console.log( typeof (items[i]));
 
          //getAsFile() 此方法只是living standard firefox ie11 并不支持        
          blob = items[i].getAsFile();
        }
      }
      if ( blob !== null ) {
        var reader = new FileReader();
        reader.onload = function (event) {
          // event.target.result 即为图片的Base64编码字符串
          var base64_str = event.target.result
          //可以在这里写上传逻辑 直接将base64编码的字符串上传（可以尝试传入blob对象，看看后台程序能否解析）
          PASTE.uploadImgFromPaste(base64_str, 'paste', isChrome);
        }
        reader.readAsDataURL(blob); 
      }
    } else {
      //for firefox
      /*
      setTimeout(function () {
        //设置setTimeout的原因是为了保证图片先插入到div里，然后去获取值
        var imgList = document.querySelectorAll('#tar_box img'),
          len = imgList.length,
          src_str = '',
          i;
        for ( i = 0; i < len; i ++ ) {
          if ( imgList[i].className !== 'my_img' ) {
            //如果是截图那么src_str就是base64 如果是复制的其他网页图片那么src_str就是此图片在别人服务器的地址
            src_str = imgList[i].src;
          }
        }
        uploadImgFromPaste(src_str, 'paste', isChrome);
      }, 1);
      */
    }
  } else {
    //for ie11
    /*
    setTimeout(function () {
      var imgList = document.querySelectorAll('#tar_box img'),
        len = imgList.length,
        src_str = '',
        i;
      for ( i = 0; i < len; i ++ ) {
        if ( imgList[i].className !== 'my_img' ) {
          src_str = imgList[i].src;
        }
      }
      uploadImgFromPaste(src_str, 'paste', isChrome);
    }, 1);
    */
  }
})
 


})();