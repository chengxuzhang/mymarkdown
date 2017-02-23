(function(){
TOOLBARS = {

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

	for (var i = 0; i < MD.toolbars.length; i++) {
		if(MD.toolbars[i] == "|"){
			var toolLi = document.createElement("li");
			toolLi.className = "group-sign";
			toolLi.innerHTML = '<span class="sign"></span>';
			toolUl.appendChild(toolLi);
		}
		if(MD.toolbars[i] == "Bold"){
			var toolLi = document.createElement("li");
			toolLi.className = "tool tool-bold";
			toolLi.setAttribute("title",MD.I18N.toolbars_Bold);
			toolLi.innerHTML = '<span class="iconfont icon-bold"></span>';
			toolLi.onclick = function(){
				editor.replaceSelection('**'+ MD.I18N.toolbars_tip_msg +'**');
			}
			toolUl.appendChild(toolLi);
		}
		if(MD.toolbars[i] == "Italic"){
			var toolLi = document.createElement("li");
			toolLi.className = "tool tool-italic";
			toolLi.setAttribute("title",MD.I18N.toolbars_Italic);
			toolLi.innerHTML = '<span class="iconfont icon-italic"></span>';
			toolLi.onclick = function(){
				editor.replaceSelection('*'+ MD.I18N.toolbars_tip_msg +'*');
			}
			toolUl.appendChild(toolLi);
		}
		if(MD.toolbars[i] == "Link"){
			var toolLi = document.createElement("li");
			toolLi.className = "tool tool-link";
			toolLi.setAttribute("title",MD.I18N.toolbars_Link);
			toolLi.innerHTML = '<span class="iconfont icon-link"></span>';
			toolLi.onclick = function(){
				editor.replaceSelection('['+ MD.I18N.toolbars_tip_msg +'](http://www.codegong.com/)');
			}
			toolUl.appendChild(toolLi);
		}
		if(MD.toolbars[i] == "Quote"){
			var toolLi = document.createElement("li");
			toolLi.className = "tool tool-quote";
			toolLi.setAttribute("title",MD.I18N.toolbars_Quote);
			toolLi.innerHTML = '<span class="iconfont icon-quote"></span>';
			toolLi.onclick = function(){
				editor.replaceSelection('> ' + MD.I18N.toolbars_tip_msg);
			}
			toolUl.appendChild(toolLi);
		}
		if(MD.toolbars[i] == "Code"){
			var toolLi = document.createElement("li");
			toolLi.className = "tool tool-code";
			toolLi.setAttribute("title",MD.I18N.toolbars_Code);
			toolLi.innerHTML = '<span class="iconfont icon-code"></span>';
			toolLi.onclick = function(){
				editor.replaceSelection('```\n'+ MD.I18N.toolbars_tip_msg +'\n```');
			}
			toolUl.appendChild(toolLi);
		}
		if(MD.toolbars[i] == "Image"){
			// 载入image插件
			var imagePaste = document.createElement("script");
			imagePaste.type = "text/javascript";
			imagePaste.src = "plugins/image/paste.js";
			imagePaste.charset = "utf-8";
			document.getElementsByTagName("head")[0].appendChild(imagePaste);

			var toolLi = document.createElement("li");
			toolLi.className = "tool tool-image";
			toolLi.setAttribute("title",MD.I18N.toolbars_Image);
			toolLi.innerHTML = '<span class="iconfont icon-image"></span>';
			toolLi.onclick = function(){
				PASTE.showUpload();
			}
			toolUl.appendChild(toolLi);
		}
		if(MD.toolbars[i] == "Ul"){
			var toolLi = document.createElement("li");
			toolLi.className = "tool tool-ul";
			toolLi.setAttribute("title",MD.I18N.toolbars_Ul);
			toolLi.innerHTML = '<span class="iconfont icon-ul"></span>';
			toolLi.onclick = function(){
				editor.replaceSelection('1.' + MD.I18N.toolbars_tip_msg);
			}
			toolUl.appendChild(toolLi);
		}
		if(MD.toolbars[i] == "Ol"){
			var toolLi = document.createElement("li");
			toolLi.className = "tool tool-ol";
			toolLi.setAttribute("title",MD.I18N.toolbars_Ol);
			toolLi.innerHTML = '<span class="iconfont icon-ol"></span>';
			toolLi.onclick = function(){
				editor.replaceSelection('- ' + MD.I18N.toolbars_tip_msg);
			}
			toolUl.appendChild(toolLi);
		}
		if(MD.toolbars[i] == "Title"){
			var toolLi = document.createElement("li");
			toolLi.className = "tool tool-title";
			toolLi.setAttribute("title",MD.I18N.toolbars_Title);
			toolLi.innerHTML = '<span class="iconfont icon-title"></span>';
			toolLi.onclick = function(){
				editor.replaceSelection('# ' + MD.I18N.toolbars_tip_msg);
			}
			toolUl.appendChild(toolLi);
		}
		if(MD.toolbars[i] == "Hr"){
			var toolLi = document.createElement("li");
			toolLi.className = "tool tool-hr";
			toolLi.setAttribute("title",MD.I18N.toolbars_Hr);
			toolLi.innerHTML = '<span class="iconfont icon-hr"></span>';
			toolLi.onclick = function(){
				editor.replaceSelection('----------');
			}
			toolUl.appendChild(toolLi);
		}
		if(MD.toolbars[i] == "Table"){
			var toolLi = document.createElement("li");
			toolLi.className = "tool tool-table";
			toolLi.setAttribute("title",MD.I18N.toolbars_Table);
			toolLi.innerHTML = '<span class="iconfont icon-table"></span>';
			toolLi.onclick = function(){
				editor.replaceSelection(MD.I18N.toolbars_table_msg);
			}
			toolUl.appendChild(toolLi);
		}
		if(MD.toolbars[i] == "Cancel"){
			var toolLi = document.createElement("li");
			toolLi.className = "tool tool-cancel";
			toolLi.setAttribute("title",MD.I18N.toolbars_Cancel);
			toolLi.innerHTML = '<span class="iconfont icon-cancel"></span>';
			toolLi.onclick = function(){
				editor.undo();
			}
			toolUl.appendChild(toolLi);
		}
		if(MD.toolbars[i] == "Sure"){
			var toolLi = document.createElement("li");
			toolLi.className = "tool tool-sure";
			toolLi.setAttribute("title",MD.I18N.toolbars_Sure);
			toolLi.innerHTML = '<span class="iconfont icon-sure"></span>';
			toolLi.onclick = function(){
				editor.redo();
			}
			toolUl.appendChild(toolLi);
		}
		if(MD.toolbars[i] == "Question"){
			var toolLi = document.createElement("li");
			toolLi.className = "tool tool-question";
			toolLi.setAttribute("title",MD.I18N.toolbars_Question);
			toolLi.innerHTML = '<span class="iconfont icon-question"></span>';
			toolLi.onclick = function(){
				var help_word = MD.I18N.toolbars_question_msg;
				var question_help = document.createElement("div");
				question_help.setAttribute("style","position:absolute;width:350px;height:500px;margin-left:-175px;left:50%;top:50%;margin-top:-250px;background:#eff;color:#999;border:1px solid #ccc;border-radius:5px;");
				var question_title = document.createElement("div");
				question_title.setAttribute("style","height:30px;border-bottom:1px solid #ccc;widhth:100%;line-height:30px;font-family:'微软雅黑';padding:0 10px 0 10px;");
				question_title.innerHTML = MD.I18N.toolbars_Question;
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
		if(MD.toolbars[i] == "FullScreen"){
			var toolLi = document.createElement("li");
			toolLi.className = "tool tool-full-screen";
			toolLi.setAttribute("title",MD.I18N.toolbars_FullScreen);
			toolLi.innerHTML = '<span class="iconfont icon-full-screen"></span>';
			toolLi.onclick = function(){
				if(status == 0){
					markdownDiv.setAttribute("style","width:100%;height:"+(document.body.scrollHeight-30)+"px;position:fixed;left:0;top:0;");
					status = 1;
				}else if(status == 1){
					markdownDiv.setAttribute("style","");
					status = 0;	
				}
			}
			toolLiRightUl.appendChild(toolLi);
		}
		if(MD.toolbars[i] == "Left"){
			var toolLi = document.createElement("li");
			toolLi.className = "tool tool-left";
			toolLi.setAttribute("title",MD.I18N.toolbars_Left);
			toolLi.innerHTML = '<span class="iconfont icon-left"></span>';
			toolLi.onclick = function(){
				document.getElementById("out").setAttribute("style","left:0;");
				document.getElementById("in").setAttribute("style","width:0;");
			}
			toolLiRightUl.appendChild(toolLi);
		}
		if(MD.toolbars[i] == "Right"){
			var toolLi = document.createElement("li");
			toolLi.className = "tool tool-right";
			toolLi.setAttribute("title",MD.I18N.toolbars_Right);
			toolLi.innerHTML = '<span class="iconfont icon-right"></span>';
			toolLi.onclick = function(){
				document.getElementById("out").setAttribute("style","left:100%;display:none;");
				document.getElementById("in").setAttribute("style","width:100%;border-right:1px solid #eee;");
			}
			toolLiRightUl.appendChild(toolLi);
		}
		if(MD.toolbars[i] == "EditView"){
			var toolLi = document.createElement("li");
			toolLi.className = "tool tool-edit-view";
			toolLi.setAttribute("title",MD.I18N.toolbars_EditView);
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
})();

