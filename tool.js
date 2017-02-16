var obj = document.getElementById("tool-bold");

obj.onclick = function(){
	var old = editor.getValue();
	var eee = old + '**输入文字**';
	editor.setValue(eee);
}