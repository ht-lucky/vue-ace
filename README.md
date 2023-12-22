# echarts-vue2  ace-edotor

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

## master 分支
```
echartsEdit 编辑器目录 
echartsEdit demoAce ace编辑器
echartsEdit dics 公用字典文件
echartsEdit echarts echart方法集合
```
## 去除已渲染echarts 的id 可以重新渲染 （解决h5 echarts 第二次不渲染的问题）
document.getElementById("echarts-part2").removeAttribute('_echarts_instance_');
document.getElementById("echarts-part3").removeAttribute('_echarts_instance_');
