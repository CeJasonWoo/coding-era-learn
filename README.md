# coding-era-learn
主要包含如下方面
- markdown文档

    对前端、js、java、Linux、SQL、docker、vagrant等多个方面的知识点备忘记录

- 巩固练习代码

    使用JavsScript实现的算法和数据结构、以及设计模式的运用
    对某知识点的代码展示比千言万语更直观，比如js中的primise、es6中的generator yield等等

- 代码片段

    方便日后开发时快速拷贝


# webpack

- webpack搭建

[awesome-webpack](https://github.com/d3viant0ne/awesome-webpack)
[see](https://github.com/ruanyf/webpack-demos)

    webpack --progress --colors
    webpack --watch

- use ES6

[给 JavaScript 初心者的 ES2015 实战](http://gank.io/post/564151c1f1df1210001c9161)

    npm install --save-dev babel-loader babel-core
    npm install --save-dev babel-preset-es2015

- 其他

    编辑器 vscode

# TODO
总结
起码要有模块管理工具打包：Webpack或者SystemJS，有强迫症还可以再来一个任务管理工具Gulp
HTTP/2 普及之后，不打包反而更好，SystemJS是一个动态的模块加载器
要用ES6，就要Babel转译
要用函数式编程和强类型语言，就要Typescript 或者 Flow
要用Promise,就能用上Fetch,别忘了加上 Fetch 的 Polyfill，因为 Safari 不支持 Fetch。
要用await/async 管理 Promise, 就必须用ES6+、 Babel转译，

[see](https://zhuanlan.zhihu.com/p/22782487)
[Fetch](https://segmentfault.com/a/1190000003810652#articleHeader4)