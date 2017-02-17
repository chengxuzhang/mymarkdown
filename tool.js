var toollists = ['bold', 'italic', '|', 'link', 'quote', 'code', 'image', '|', 'ul', 'ol', 'title', 'hr', 'table', '|', 'cancel', 'sure', '|', 'question', 'full-screen'];

var toolbarDiv = document.createElement("div");
toolbarDiv.className = "toolsbar";
var toolUl = document.createElement("ul");
var toolLiRight = document.createElement("li");
toolLiRight.setAttribute("style","float:right;");
var toolLiRightUl = document.createElement("ul");
toolLiRight.appendChild(toolLiRightUl);
toolUl.appendChild(toolLiRight);
toolbarDiv.appendChild(toolUl);
document.getElementById("content").appendChild(toolbarDiv);
var status = 0;

for (var i = 0; i < toollists.length; i++) {
	if(toollists[i] == "|"){
		var toolLi = document.createElement("li");
		toolLi.className = "group-sign";
		toolLi.innerHTML = '<span class="sign"></span>';
		toolUl.appendChild(toolLi);
	}
	if(toollists[i] == "bold"){
		var toolLi = document.createElement("li");
		toolLi.className = "tool tool-bold";
		toolLi.setAttribute("title","加粗");
		toolLi.innerHTML = '<span class="iconfont icon-bold"></span>';
		toolLi.onclick = function(){
			editor.replaceSelection('**输入文字**');
		}
		toolUl.appendChild(toolLi);
	}
	if(toollists[i] == "italic"){
		var toolLi = document.createElement("li");
		toolLi.className = "tool tool-italic";
		toolLi.setAttribute("title","斜体");
		toolLi.innerHTML = '<span class="iconfont icon-italic"></span>';
		toolLi.onclick = function(){
			editor.replaceSelection('*输入文字*');
		}
		toolUl.appendChild(toolLi);
	}
	if(toollists[i] == "link"){
		var toolLi = document.createElement("li");
		toolLi.className = "tool tool-link";
		toolLi.setAttribute("title","链接");
		toolLi.innerHTML = '<span class="iconfont icon-link"></span>';
		toolLi.onclick = function(){
			editor.replaceSelection('[链接文字](http://www.codegong.com/)');
		}
		toolUl.appendChild(toolLi);
	}
	if(toollists[i] == "quote"){
		var toolLi = document.createElement("li");
		toolLi.className = "tool tool-quote";
		toolLi.setAttribute("title","引用");
		toolLi.innerHTML = '<span class="iconfont icon-quote"></span>';
		toolLi.onclick = function(){
			editor.replaceSelection('> 输入文字');
		}
		toolUl.appendChild(toolLi);
	}
	if(toollists[i] == "code"){
		var toolLi = document.createElement("li");
		toolLi.className = "tool tool-code";
		toolLi.setAttribute("title","代码");
		toolLi.innerHTML = '<span class="iconfont icon-code"></span>';
		toolLi.onclick = function(){
			editor.replaceSelection('```\n输入文字\n```');
		}
		toolUl.appendChild(toolLi);
	}
	if(toollists[i] == "image"){
		var toolLi = document.createElement("li");
		toolLi.className = "tool tool-image";
		toolLi.setAttribute("title","图片");
		toolLi.innerHTML = '<span class="iconfont icon-image"></span>';
		toolLi.onclick = function(){
			editor.replaceSelection('![image](codemirror.jpg)');
		}
		toolUl.appendChild(toolLi);
	}
	if(toollists[i] == "ul"){
		var toolLi = document.createElement("li");
		toolLi.className = "tool tool-ul";
		toolLi.setAttribute("title","数字列表");
		toolLi.innerHTML = '<span class="iconfont icon-ul"></span>';
		toolLi.onclick = function(){
			editor.replaceSelection('1.输入文字');
		}
		toolUl.appendChild(toolLi);
	}
	if(toollists[i] == "ol"){
		var toolLi = document.createElement("li");
		toolLi.className = "tool tool-ol";
		toolLi.setAttribute("title","普通列表");
		toolLi.innerHTML = '<span class="iconfont icon-ol"></span>';
		toolLi.onclick = function(){
			editor.replaceSelection('- 输入文字');
		}
		toolUl.appendChild(toolLi);
	}
	if(toollists[i] == "title"){
		var toolLi = document.createElement("li");
		toolLi.className = "tool tool-title";
		toolLi.setAttribute("title","标题");
		toolLi.innerHTML = '<span class="iconfont icon-title"></span>';
		toolLi.onclick = function(){
			editor.replaceSelection('# 输入文字');
		}
		toolUl.appendChild(toolLi);
	}
	if(toollists[i] == "hr"){
		var toolLi = document.createElement("li");
		toolLi.className = "tool tool-hr";
		toolLi.setAttribute("title","分割线");
		toolLi.innerHTML = '<span class="iconfont icon-hr"></span>';
		toolLi.onclick = function(){
			editor.replaceSelection('----------');
		}
		toolUl.appendChild(toolLi);
	}
	if(toollists[i] == "table"){
		var toolLi = document.createElement("li");
		toolLi.className = "tool tool-table";
		toolLi.setAttribute("title","表格");
		toolLi.innerHTML = '<span class="iconfont icon-table"></span>';
		toolLi.onclick = function(){
			editor.replaceSelection('表格头 1 | 表格头 2\n---|---\n参数1 | 参数2\n参数1 | 参数2');
		}
		toolUl.appendChild(toolLi);
	}
	if(toollists[i] == "cancel"){
		var toolLi = document.createElement("li");
		toolLi.className = "tool tool-cancel";
		toolLi.setAttribute("title","撤销");
		toolLi.innerHTML = '<span class="iconfont icon-cancel"></span>';
		toolLi.onclick = function(){
			editor.undo();
		}
		toolUl.appendChild(toolLi);
	}
	if(toollists[i] == "sure"){
		var toolLi = document.createElement("li");
		toolLi.className = "tool tool-sure";
		toolLi.setAttribute("title","返回");
		toolLi.innerHTML = '<span class="iconfont icon-sure"></span>';
		toolLi.onclick = function(){
			editor.redo();
		}
		toolUl.appendChild(toolLi);
	}
	if(toollists[i] == "question"){
		var toolLi = document.createElement("li");
		toolLi.className = "tool tool-question";
		toolLi.setAttribute("title","帮助");
		toolLi.innerHTML = '<span class="iconfont icon-question"></span>';
		toolLi.onclick = function(){
			// editor.redo();
		}
		toolUl.appendChild(toolLi);
	}
	if(toollists[i] == "full-screen"){
		var toolLi = document.createElement("li");
		toolLi.className = "tool tool-full-screen";
		toolLi.setAttribute("title","全屏");
		toolLi.innerHTML = '<span class="iconfont icon-full-screen"></span>';
		toolLi.onclick = function(){
			if(status == 0){
				document.getElementById("content").setAttribute("style","width:100%;height:"+(document.body.scrollHeight-30)+"px;");
				status = 1;
			}else if(status == 1){
				document.getElementById("content").setAttribute("style","");
				status = 0;	
			}
		}
		toolLiRightUl.appendChild(toolLi);
	}
}

