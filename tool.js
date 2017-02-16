var bold = document.getElementById("tool-bold");
var code = document.getElementById("tool-code");
var iocnchexiao = document.getElementById("tool-iocnchexiao");
var chexiao = document.getElementById("tool-chexiao");
var yy = document.getElementById("tool-yy");

var bold_str = '**code**';
var code_str = '\
```\n\
code\n\
```';
var yy_str = '> code';

bold.onclick = function(){
	editor.replaceSelection(bold_str);
}

code.onclick = function(){
	editor.replaceSelection(code_str);
}

iocnchexiao.onclick = function(){
	editor.undo();
}

chexiao.onclick = function(){
	editor.redo();
}

yy.onclick = function(){
	editor.replaceSelection(yy_str);
}