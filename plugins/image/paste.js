(function(){

PASTE = {
  /**
   * 覆盖层
   * @type {Object}
   */
  cover:{},

  /**
   * modal层 上传图片弹框
   * @type {Object}
   */
  modal:{},

  /**
   * tab选项卡的标识
   * @type {Number}
   */
  tab:1,

  /**
   * 所有上传的历史图片，仅限不刷新的历史图片，刷新页面后历史数据清空
   * @type {Array}
   */
  historyCache:[],

  /**
   * 刚刚上传的图片数据
   * @type {Array}
   */
  newHistoryCache:[],


  /**
   * 创建一个覆盖层
   * 该覆盖层定位在图片上传弹框的下方，可以用来装逼使用，显得特别屌
   * @return {[type]} [description]
   */
  createCover:function(){
    this.cover = document.createElement("div");
    this.cover.setAttribute("style","position:fixed;left:0px;top:0px;background:#000;opacity:.6;width:100%;height:100%;z-index:998;");
    document.getElementsByTagName("body")[0].appendChild(this.cover);
  },

  /**
   * 创建一个modal层
   * 所有的modal层信息都在这里创建，包括按钮点击功能等
   * @return {[type]} [description]
   */
  createModal:function(){
    var _this = this;
    // 添加一个遮罩层
    this.createCover();

    this.modal = document.createElement("div");
    this.modal.setAttribute("style","position:absolute;width:500px;height:auto;left:50%;top:50%;margin-left:-250px;margin-top:-250px;border:1px solid #ccc;background:#fff;z-index:999;");
    var title = document.createElement("div");
    title.setAttribute("style","height:40px;width:100%;line-height:40px;border-bottom:1px solid #ccc;padding:0 10px 0 10px;background:#eee;");
    title.innerHTML = MD.I18N.toolbars_image;
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
    tab1.innerHTML = '<a href="javascript:;">'+ MD.I18N.toolbars_image_tab1 +'</a>';
    ul.appendChild(tab1);
    var tab2 = document.createElement("li");
    tab2.innerHTML = '<a href="javascript:;">'+ MD.I18N.toolbars_image_tab2 +'</a>';
    ul.appendChild(tab2);
    var tab3 = document.createElement("li");
    tab3.innerHTML = '<a href="javascript:;">'+ MD.I18N.toolbars_image_tab3 +'</a>';
    ul.appendChild(tab3);
    var tab_content = document.createElement("div");
    tab_content.className = "tab-content";
    var uploadDiv = document.createElement("div");
    uploadDiv.className = "tab-pane active";
    uploadDiv.setAttribute("style","padding:20px 10px 0 10px;");
    uploadDiv.innerHTML = '<button class="btn btn-primary btn-sm" style="position:relative;margin-right:5px;"><span class="glyphicon glyphicon-plus"></span>'+ MD.I18N.toolbars_image_add +'<input type="file" name="file" id="file" multiple="multiple" style="opacity:.0;width:100%;height:100%;display:inline-block;position:absolute;left:0;top:0;cursor:pointer;"></button><button class="btn btn-success btn-sm"><span class="glyphicon glyphicon-circle-arrow-up"></span>'+ MD.I18N.toolbars_image_upload +'</button>';
    tab_content.appendChild(uploadDiv);
    var webDiv = document.createElement("div");
    webDiv.className = "tab-pane";
    webDiv.setAttribute("style","padding:20px 10px 0 10px;");
    webDiv.innerHTML = '<input type="text" name="text" class="form-control" placeholder="'+ MD.I18N.toolbars_image_webmsg +'">';
    tab_content.appendChild(webDiv);
    var historyDiv = document.createElement("div");
    historyDiv.className = "tab-pane";
    historyDiv.setAttribute("style","padding:20px 10px 0 10px;");
    if(this.historyCache){
      var _history = this.historyCache;
      for (var i = 0; i < _history.length; i++) {
        var historyImg = document.createElement("img");
        historyImg.setAttribute("style","cursor:pointer;margin-right:5px;border:1px solid #eee;padding:5px;width:80px;height:60px;");
        historyImg.src = _history[i];
        historyImg.onclick = function(){
          MD.editor.replaceSelection('![image]('+this.src+')');
        }
        historyDiv.appendChild(historyImg);
      }
    }
    tab_content.appendChild(historyDiv);

    body.appendChild(ul);
    body.appendChild(tab_content);
    tab1.onclick = function(){
      _this.tab = 1;
      tab1.className = "active";
      tab2.className = tab3.className = "";
      uploadDiv.className = "tab-pane active";
      webDiv.className = historyDiv.className = "tab-pane";
    }
    tab2.onclick = function(){
      _this.tab = 2;
      tab2.className = "active";
      tab1.className = tab3.className = "";
      webDiv.className = "tab-pane active";
      uploadDiv.className = historyDiv.className = "tab-pane";
    }
    tab3.onclick = function(){
      _this.tab = 3;
      tab3.className = "active";
      tab1.className = tab2.className = "";
      historyDiv.className = "tab-pane active";
      webDiv.className = uploadDiv.className = "tab-pane";
    }

    var footer = document.createElement("div");
    footer.setAttribute("style","margin-top:20px;width:100%;text-align:right;");
    body.appendChild(footer);

    var btn1 = document.createElement("button");
    btn1.setAttribute("style","margin-right:5px;");
    btn1.className = "btn btn-primary btn-sm";
    btn1.innerHTML = MD.I18N.toolbars_image_insert;
    footer.appendChild(btn1);

    var btn2 = document.createElement("button");
    btn2.className = "btn btn-default btn-sm";
    btn2.innerHTML = MD.I18N.toolbars_image_cancle;
    footer.appendChild(btn2);

    btn1.onclick = function(){
      if(_this.tab === 1){
        for (var i = 0; i < _this.newHistoryCache.length; i++) {
          MD.editor.replaceSelection('![image]('+_this.newHistoryCache[i]+')');
        }
      }else if(_this.tab === 2){
        var value = webDiv.getElementsByTagName("input")[0].value;
        MD.editor.replaceSelection('![image]('+value+')');
      }else if(_this.tab === 3){
        for (var i = 0; i < _this.historyCache.length; i++) {
          MD.editor.replaceSelection('![image]('+_this.historyCache[i]+')');
        }
      }
      _this.hideUpload();
    }

    btn2.onclick = function(){
      _this.hideUpload();
    }

    var fileInput = uploadDiv.getElementsByTagName("input")[0];

    var trs = [];

    fileInput.onchange = function(){
      if(uploadDiv.getElementsByTagName("table")[0]){
        uploadDiv.removeChild(uploadDiv.getElementsByTagName("table")[0]);
      }   
      var table = document.createElement("table");
      table.className = "table table-bordered";
      for (var i = 0; i < fileInput.files.length; i++) {
          var tr = document.createElement("tr");
          tr.innerHTML = '<td>'+fileInput.files[i]['name']+'<div style="width:200px;height:16px;position:relative;background:#eff;border-radius:3px;"><span style="position:absolue:left:0;top:0;height:16px;background:blue;width:0%;display:block;border-radius:3px;transition: width 1s;-moz-transition: width 1s;-webkit-transition: width 1s;-o-transition: width 1s;"></span></div></td><td></td>';
          trs[i] = tr;
          table.appendChild(tr);
      }
      uploadDiv.appendChild(table);
    }

    uploadDiv.getElementsByTagName("button")[1].onclick = function(){
      _this.newHistoryCache.splice(0,_this.newHistoryCache.length); // 清空数组

      var i = 0;

      var timer = setInterval(function(){
        
      if(i>=fileInput.files.length){
          clearInterval(timer);
          return false;
      }

      //用法
      //触发文件上传事件
      _this.uploadImg({
        //上传文件接收地址
        uploadUrl: MD.path + "?type=img",
        file:fileInput.files[i],
        index:i,
        //选择文件后，发送文件前自定义事件
        //file为上传的文件信息，可在此处做文件检测、初始化进度条等动作
        beforeSend: function(file) {

        },
        //文件上传完成后回调函数
        //res为文件上传信息
        callback: function(res, index) {
          // 加入历史图片
          _this.historyCache.push(res.store_path); // 全部上传的图片
          _this.newHistoryCache.push(res.store_path); // 刚刚上传的图片

          var img = document.createElement("img");
          img.src = res.store_path;
          img.style.width = "80px";
          img.style.height = "60px";
          img.style.cursor = "pointer";
          img.onclick = function(){
            MD.editor.replaceSelection('![image]('+res.store_path+')');
          }
          trs[index].getElementsByTagName("td")[1].appendChild(img);
        },
        //返回上传过程中包括上传进度的相关信息
        //详细请看res,可在此加入进度条相关代码
        uploading: function(res, index) {
          trs[index].getElementsByTagName("span")[0].style.width = res + '%';
        }
      });

      i++;

    },200);

  }

  document.getElementsByTagName("body")[0].appendChild(this.modal);
  },

  showUpload:function(){
    this.tab = 1;
    this.createModal();
  },

  hideUpload:function(){
    document.body.removeChild(this.modal);
    document.body.removeChild(this.cover);
  },

  /**
   * 上传图片
   * @param  {[type]} option [description]
   * @return {[type]}        [description]
   */
  uploadImg:function(option) {
    var file,
        fd = new FormData(),
        xhr = new XMLHttpRequest(),
        loaded, tot, per, uploadUrl, index;
    uploadUrl = option.uploadUrl;
    callback = option.callback;
    uploading = option.uploading;
    beforeSend = option.beforeSend;
    index = option.index;
         
    file = option.file;
    if(beforeSend instanceof Function){
        if(beforeSend(file) === false){
            return false;
        }
    }
                     
    fd.append("files", file);
    //追加文件数据 
         
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            if(callback instanceof Function){
                callback(JSON.parse(xhr.responseText), index);
            }
        }
    }
         
    //侦查当前附件上传情况
    xhr.upload.onprogress = function(evt) {
        loaded = evt.loaded;
        tot = evt.total;
        per = Math.floor(100 * loaded / tot); //已经上传的百分比
        if(uploading instanceof Function){
            uploading(per, index);
        }
    };
         
    xhr.open("post", uploadUrl);
    xhr.send(fd);
  },

  uploadImgFromPaste:function(file, type, isChrome) {
    var formData = new FormData();
    formData.append('image', file);
    formData.append('submission-type', type);
   
    var xhr = new XMLHttpRequest();
    xhr.open('POST', MD.path + '?type=base64');
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

/**
 * 监听浏览器的粘贴事件
 * 当发生ctrl+v事件的时候，首先会判断浏览器是否可以粘贴图片，如果可以就执行下面的操作
 * 其中还会判断粘贴的内容是图片还是HTML或者纯文本的内容
 * 如果是图片就会把图片下载到本地，如果是纯文本或者HTML就会直接粘贴内容
 * 如果浏览器不支持就直接return false，执行浏览器本身的粘贴操作
 * @param  {[type]} event) {             if(MD.isEdit [description]
 * @return {[type]}        [description]
 */
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
        // 下面这种情况是粘贴的纯文本+HTML形式
        if (items[0].type === 'text/plain' && items[1].type === 'text/html') {        
          return false;
        }
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