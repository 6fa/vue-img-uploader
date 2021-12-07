# vue-img-uploader

基于vue的图片上传组件，分为图片预览区、图片选择器、提交按钮三部分。其中提交功能可去除，在获取图片列表后由用户自行提交。

## 效果图展示

[效果图请戳此链接](https://6fa.github.io/#uploader)

## 查看效果
也可以启动项目查看效果：
```
npm run serve
```

## 打包为库
运行下面的命令，将会将插件代码打包到根目录下：
```
npm run lib
```

## 如何用于自己的项目
根目录下imgUploader目录为已经打包好的插件源码，可以放到自己项目中，然后在main.js中引入使用：
```
//main.js
import Vue from 'vue'
import App from './App.vue'
import imgUploader from 'imgUploader/imgUploader.umd.js'

Vue.use(imgUploader)

new Vue({
  render: h => h(App),
}).$mount('#app')
```



## 文档
| 字段 | 类型 | 描述 | 默认值 | 值类型 |
| ---- | ---- | ---- | ---- | ---- |
| previewComp | 属性 | 选择图片预览的形式，有列表形式(listPreview)和卡片形式(cardPreview) | 'cardPreview' | String |
| selectComp | 属性 | 选择图片选择器的形式，有拖拽板形式(dragSelector)和卡片形式(cardSelector) | 'cardSelector' | String |
| limit | 属性 | 图片上传最大张数 |   | Number |
| maxSize | 属性 | 图片上传最大大小, 单位为MB |  | Number |
| submit | 属性 | 是否显示提交功能，不需要则不写。值为提交的服务器地址。 |  | String |
| uploadSuccess | 事件 | 图片上传成功时触发（在有submit属性的前提下），参数为响应结果 |  | Function |
| uploadFail | 事件 | 图片上传失败时触发（在有submit属性的前提下），参数为错误信息 |  | Function |
| oversize | 事件 | 图片超出大小限制时触发（在有maxSize属性的前提下），参数为超出限制图片在图片列表中的索引 |  | Function |
| readError | 事件 | 图片读取过程发生错误时触发，参数为错误图片在图片列表中的索引 |  | Function |

## 使用示例
卡片预览 + 卡片选择器 + 提交按钮：

```html
  <uploader 
    previewComp='cardPreview' 
    selectComp='cardSelector' 
    :limit='4' 
    :submit='url' 
    :maxSize="2" 
    @uploadSuccess='handler' 
    @uploadFail='handler' 
    @oversize='handler' 
    @readError='handler'>
  </uploader>
```

如果不需要提交功能：

```html
  <uploader 
    ref='uploader'
    previewComp='cardPreview' 
    selectComp='cardSelector' 
    :limit='4' 
    :maxSize="2" 
    @oversize='handler' 
    @readError='handler'>
  </uploader>
```
```javascript
// 通过fileList属性取得用户选择的图片列表
this.$refs.uploader.fileList
```

## 代码结构
未打包的插件源码位于src目录下的imgUploader：

imgUploader<br>
--- assets: 存放字体和css文件<br>
--- components<br>
  ------ preview：存放预览图片组件<br>
  ------ selector：存放选择图片组件<br>
  ------ submit：存放提交按钮组件<br>
--- index.js：入口文件<br>
--- index.vue：插件主页面

