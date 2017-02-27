# markdown编辑器


### 介绍

一款功能强大的markdown在线编辑器，使用codemirror做为编辑框，marked.js解析markdown语言

编辑器基于bootstrap，该编辑器没有使用jQuery库。

### 功能介绍

1.可直接保存文件到本地，可直接ctrl+s保存md或者HTML文件，也可按ctrl+shift+s调出选择框选择下载

2.支持图片上传，可一次性传多张图片

3.可复制网页图片或QQ截图粘贴，自动下载图片

4.可切换编辑模式，共三种模式 编辑模式 预览模式 编辑预览模式，可全屏

5.自动保存内容，通过url hash保存的方式，当你进行编辑的时候发现url在发生变化，说明已经保存

6.右侧代码可高亮显示，这主要是因为引入了highlight.pack.js

### 使用

只需要引入以下代码就可调用编辑器


```
<script type="text/plain" id="myEditor"></script>
<script src="editor_api.js"></script>
<script>
    var myEditor = MD.getEditor('myEditor',{
        name : 'body',
        markdownHeight : '300px',
    });
</script>
```

### 配置说明

找到config/main.js 进行配置，配置相对比较简单，去掉复杂的配置，只要简单。

main.js中的配置就是所有可以配置的项，增加其他的配置可以自己研究源码

调用编辑器的时候有 name markdownWidth 和 markdownHeight三个配置项

name 是什么？对，就是表单提交时需要的name，可以自定义。markdownWidth和markdownHeight分别是编辑器的宽和高，默认是100%