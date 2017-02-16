var obj = document.getElementById("tool-bold");

var s = '\
```\n\
fajlsdkfj\n\
```';

obj.onclick = function(){
	editor.replaceSelection(s);
}