TOOLBARS = {

	toollists : ['bold', 'italic', '|', 'link', 'quote', 'code', 'image', '|', 'ul', 'ol', 'title', 'hr', 'table', '|', 'cancel', 'sure', '|', 'question', 'left', 'edit-view', 'right', 'full-screen'],

	toolbars:function (markdownDiv, editor){

	var toolbarDiv = document.createElement("div");
	toolbarDiv.className = "toolsbar";
	var toolUl = document.createElement("ul");
	var toolLiRight = document.createElement("li");
	toolLiRight.setAttribute("style","float:right;width:auto !important;");
	var toolLiRightUl = document.createElement("ul");
	toolLiRight.appendChild(toolLiRightUl);
	toolUl.appendChild(toolLiRight);
	toolbarDiv.appendChild(toolUl);
	// document.getElementById("markdown-editor").appendChild(toolbarDiv);
	var status = 0;

	for (var i = 0; i < this.toollists.length; i++) {
		if(this.toollists[i] == "|"){
			var toolLi = document.createElement("li");
			toolLi.className = "group-sign";
			toolLi.innerHTML = '<span class="sign"></span>';
			toolUl.appendChild(toolLi);
		}
		if(this.toollists[i] == "bold"){
			var toolLi = document.createElement("li");
			toolLi.className = "tool tool-bold";
			toolLi.setAttribute("title","加粗");
			toolLi.innerHTML = '<span class="iconfont icon-bold"></span>';
			toolLi.onclick = function(){
				editor.replaceSelection('**输入文字**');
			}
			toolUl.appendChild(toolLi);
		}
		if(this.toollists[i] == "italic"){
			var toolLi = document.createElement("li");
			toolLi.className = "tool tool-italic";
			toolLi.setAttribute("title","斜体");
			toolLi.innerHTML = '<span class="iconfont icon-italic"></span>';
			toolLi.onclick = function(){
				editor.replaceSelection('*输入文字*');
			}
			toolUl.appendChild(toolLi);
		}
		if(this.toollists[i] == "link"){
			var toolLi = document.createElement("li");
			toolLi.className = "tool tool-link";
			toolLi.setAttribute("title","链接");
			toolLi.innerHTML = '<span class="iconfont icon-link"></span>';
			toolLi.onclick = function(){
				editor.replaceSelection('[链接文字](http://www.codegong.com/)');
			}
			toolUl.appendChild(toolLi);
		}
		if(this.toollists[i] == "quote"){
			var toolLi = document.createElement("li");
			toolLi.className = "tool tool-quote";
			toolLi.setAttribute("title","引用");
			toolLi.innerHTML = '<span class="iconfont icon-quote"></span>';
			toolLi.onclick = function(){
				editor.replaceSelection('> 输入文字');
			}
			toolUl.appendChild(toolLi);
		}
		if(this.toollists[i] == "code"){
			var toolLi = document.createElement("li");
			toolLi.className = "tool tool-code";
			toolLi.setAttribute("title","代码");
			toolLi.innerHTML = '<span class="iconfont icon-code"></span>';
			toolLi.onclick = function(){
				editor.replaceSelection('```\n输入文字\n```');
			}
			toolUl.appendChild(toolLi);
		}
		if(this.toollists[i] == "image"){
			var toolLi = document.createElement("li");
			toolLi.className = "tool tool-image";
			toolLi.setAttribute("title","图片");
			toolLi.innerHTML = '<span class="iconfont icon-image"></span>';
			toolLi.onclick = function(){
				editor.replaceSelection('![image](codemirror.jpg)');
			}
			toolUl.appendChild(toolLi);
		}
		if(this.toollists[i] == "ul"){
			var toolLi = document.createElement("li");
			toolLi.className = "tool tool-ul";
			toolLi.setAttribute("title","数字列表");
			toolLi.innerHTML = '<span class="iconfont icon-ul"></span>';
			toolLi.onclick = function(){
				editor.replaceSelection('1.输入文字');
			}
			toolUl.appendChild(toolLi);
		}
		if(this.toollists[i] == "ol"){
			var toolLi = document.createElement("li");
			toolLi.className = "tool tool-ol";
			toolLi.setAttribute("title","普通列表");
			toolLi.innerHTML = '<span class="iconfont icon-ol"></span>';
			toolLi.onclick = function(){
				editor.replaceSelection('- 输入文字');
			}
			toolUl.appendChild(toolLi);
		}
		if(this.toollists[i] == "title"){
			var toolLi = document.createElement("li");
			toolLi.className = "tool tool-title";
			toolLi.setAttribute("title","标题");
			toolLi.innerHTML = '<span class="iconfont icon-title"></span>';
			toolLi.onclick = function(){
				editor.replaceSelection('# 输入文字');
			}
			toolUl.appendChild(toolLi);
		}
		if(this.toollists[i] == "hr"){
			var toolLi = document.createElement("li");
			toolLi.className = "tool tool-hr";
			toolLi.setAttribute("title","分割线");
			toolLi.innerHTML = '<span class="iconfont icon-hr"></span>';
			toolLi.onclick = function(){
				editor.replaceSelection('----------');
			}
			toolUl.appendChild(toolLi);
		}
		if(this.toollists[i] == "table"){
			var toolLi = document.createElement("li");
			toolLi.className = "tool tool-table";
			toolLi.setAttribute("title","表格");
			toolLi.innerHTML = '<span class="iconfont icon-table"></span>';
			toolLi.onclick = function(){
				editor.replaceSelection('表格头 1 | 表格头 2\n---|---\n参数1 | 参数2\n参数1 | 参数2');
			}
			toolUl.appendChild(toolLi);
		}
		if(this.toollists[i] == "cancel"){
			var toolLi = document.createElement("li");
			toolLi.className = "tool tool-cancel";
			toolLi.setAttribute("title","撤销");
			toolLi.innerHTML = '<span class="iconfont icon-cancel"></span>';
			toolLi.onclick = function(){
				editor.undo();
			}
			toolUl.appendChild(toolLi);
		}
		if(this.toollists[i] == "sure"){
			var toolLi = document.createElement("li");
			toolLi.className = "tool tool-sure";
			toolLi.setAttribute("title","返回");
			toolLi.innerHTML = '<span class="iconfont icon-sure"></span>';
			toolLi.onclick = function(){
				editor.redo();
			}
			toolUl.appendChild(toolLi);
		}
		if(this.toollists[i] == "question"){
			var toolLi = document.createElement("li");
			toolLi.className = "tool tool-question";
			toolLi.setAttribute("title","帮助");
			toolLi.innerHTML = '<span class="iconfont icon-question"></span>';
			toolLi.onclick = function(){
				var help_word = '1.按住ctrl+shift+s可弹出保存选项<br>\
				2.直接按ctrl+s可直接保存文件<br>\
				3.加粗可使用 **输入文字内容**<br>\
				4.斜体可使用 *输入文字内容*<br>\
				5.链接可使用 [链接文字](http://www.example.com)<br>\
				6.引用可使用 > 输入文字内容<br>\
				7.代码可使用 <br>\
				``` <br>\
				输入代码 <br>\
				``` <br>\
				8.图片可使用 ![image](图片地址)<br>\
				9.数字列表可使用 1.输入文字内容<br>\
				10.普通列表可使用 - 输入文字内容<br>\
				11.标题可使用 # 输入文字内容<br>\
				说明：从h1-h6 分别是# ## ### #### ##### ######<br>\
				12.分割线可使用 ----------<br>\
				13.表格可使用<br>\
				表头1 | 表头2<br>\
				---|---<br>\
				参数1 | 参数2<br>\
				';
				var question_help = document.createElement("div");
				question_help.setAttribute("style","position:absolute;width:350px;height:500px;margin-left:-175px;left:50%;top:50%;margin-top:-250px;background:#eff;color:#999;border:1px solid #ccc;border-radius:5px;");
				var question_title = document.createElement("div");
				question_title.setAttribute("style","height:30px;border-bottom:1px solid #ccc;widhth:100%;line-height:30px;font-family:'微软雅黑';padding:0 10px 0 10px;");
				question_title.innerHTML = '帮助';
				var question_close = document.createElement("a");
				question_close.setAttribute("style","float:right;");
				question_close.setAttribute("href","javascript:;");
				question_close.innerHTML = '&times;';
				question_close.onclick = function(){
					document.body.removeChild(question_help);
				}
				question_title.appendChild(question_close);
				question_help.appendChild(question_title);
				var question_body = document.createElement("div");
				question_body.setAttribute("style","width:100%;height:100%;padding:10px;");
				question_body.innerHTML = help_word;
				question_help.appendChild(question_body);
				document.getElementsByTagName("body")[0].appendChild(question_help);
			}
			toolUl.appendChild(toolLi);
		}
		if(this.toollists[i] == "full-screen"){
			var toolLi = document.createElement("li");
			toolLi.className = "tool tool-full-screen";
			toolLi.setAttribute("title","全屏");
			toolLi.innerHTML = '<span class="iconfont icon-full-screen"></span>';
			toolLi.onclick = function(){
				if(status == 0){
					markdownDiv.setAttribute("style","width:100%;height:"+(document.body.scrollHeight-30)+"px;");
					status = 1;
				}else if(status == 1){
					markdownDiv.setAttribute("style","");
					status = 0;	
				}
			}
			toolLiRightUl.appendChild(toolLi);
		}
		if(this.toollists[i] == "left"){
			var toolLi = document.createElement("li");
			toolLi.className = "tool tool-left";
			toolLi.setAttribute("title","预览");
			toolLi.innerHTML = '<span class="iconfont icon-left"></span>';
			toolLi.onclick = function(){
				document.getElementById("out").setAttribute("style","left:0;");
				document.getElementById("in").setAttribute("style","width:0;");
			}
			toolLiRightUl.appendChild(toolLi);
		}
		if(this.toollists[i] == "right"){
			var toolLi = document.createElement("li");
			toolLi.className = "tool tool-right";
			toolLi.setAttribute("title","编辑");
			toolLi.innerHTML = '<span class="iconfont icon-right"></span>';
			toolLi.onclick = function(){
				document.getElementById("out").setAttribute("style","left:100%;display:none;");
				document.getElementById("in").setAttribute("style","width:100%;border-right:1px solid #eee;");
			}
			toolLiRightUl.appendChild(toolLi);
		}
		if(this.toollists[i] == "edit-view"){
			var toolLi = document.createElement("li");
			toolLi.className = "tool tool-edit-view";
			toolLi.setAttribute("title","编辑预览");
			toolLi.innerHTML = '<span class="iconfont icon-edit-view"></span>';
			toolLi.onclick = function(){
				document.getElementById("out").setAttribute("style","left:50%;");
				document.getElementById("in").setAttribute("style","width:50%;");
			}
			toolLiRightUl.appendChild(toolLi);
		}
	}

	return toolbarDiv;

	},
}

