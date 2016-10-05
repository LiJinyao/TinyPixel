# TinyPixel
简单的数字图像处理程序。数字图像处理作业。
```
TinyPixel
├── src
│   ├── actions
│   │   ├── getImage.js
│   │   ├── imageProcess // 图像处理算法
│   │   ├── index.js
│   │   ├── openFile.js
│   │   └── processImage.js
│   ├── components
│   │   ├── ActionList.jsx
│   │   ├── Actions // 图像处理选项组件
│   │   ├── App.jsx
│   │   └── MainViewer.jsx
│   ├── containers // redux containers
│   │   ├── ActionList.jsx
│   │   ├── App.jsx
│   │   └── MainViewer.jsx
│   ├── index.html
│   ├── index.jsx // 入口文件
│   ├── reducers
│   └── styles // 全局样式
├── webpack.dev.config.js
└── webpack.pub.config.js
```
## 功能
- 灰度化：RGB的平均值，最大值，最小值和R * 0.299 + G * 0.587 + B * 0.144加权平均。
- 仿射变换：
  - 缩放：无插值，最临近插值，双线性插值，双三次插值。
  - 旋转：0～360度。
  - 平移：垂直方向和水平方向。
  - 偏移便换：垂直方向和水平方向。

# JavaScript semicolon-less style
[一个关于分号的讨论](http://slides.com/evanyou/semicolons)说明现在的引擎足够聪明来解决分号的问题。
只要记住当`+ - [ ( /`开头时，在前面加一个分号即可。
