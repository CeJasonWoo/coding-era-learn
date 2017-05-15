

// // Module模式

// // 基本用法
// var Calculator = function (eq) {
//     //这里可以声明私有成员

//     var eqCtl = document.getElementById(eq);
//     //console.log('eqCtl', eqCtl);
    
//     return {
//         // 暴露公开的成员
//         add: function (x, y) {
//             var val = x + y;
//             eqCtl.innerHTML = val;
//         }
//     };
// };

// var calculator = new Calculator('eq');
// calculator.add(2, 2);

// console.log('calculator', new Calculator('eq'));
// console.log('calculator', Calculator('eq'));

// var a = 1;
// //匿名闭包
// (function () {
//     // ... 所有的变量和function都在这里声明，并且作用域也只能在这个匿名闭包里
//     // ...但是这里的代码依然可以访问外部全局的对象
//     console.log('gloab', a);
// }());

// //写法二
// (function () {
//     /* 内部代码 */
// })();

// // 引用全局变量 不建议用 隐式全局变量
// (function (params) {
//     // ... 所有的变量和function都在这里声明，并且作用域也只能在这个匿名闭包里
//     // ...但是这里的代码依然可以访问外部全局的对象
//     console.log('gloab2', params);
// }(a));

// // 扩展
// // 步骤1必须事先声明blogModule
// // 步骤2扩展AddPhoto方法
// var blogModule = (function (my) {
//     my.AddPhoto = function () {
//         //添加内部代码  
//     };
//     return my;
// } (blogModule)); 

// // 松耦合扩展
// // 可以打乱步骤加载blogModule文件和扩展文件
// var blogModule = (function (my) {

//     // 添加一些功能   
    
//     return my;
// } (blogModule || {}));  

// // 紧耦合扩展
// // 虽然松耦合扩展很牛叉了，但是可能也会存在一些限制，比如你没办法重写你的一些属性或者函数，
// // 也不能在初始化的时候就是用Module的属性。
// // 紧耦合扩展限制了加载顺序，但是提供了我们重载的机会，看如下例子：
// var blogModule = (function (my) {
//     var oldAddPhotoMethod = my.AddPhoto;

//     my.AddPhoto = function () {
//         // 重载方法，依然可通过oldAddPhotoMethod调用旧的方法
//     };

//     return my;
// } (blogModule));

// // 子模块
// blogModule.CommentSubModule = (function () {
//     var my = {};
//     // ...

//     return my;
// } ());

// 自执行匿名函数和立即执行的函数表达式区别
// 自执行 递归
// 立即执行 无需调用自动执行
// 注：arguments.callee在ECMAScript 5 strict mode里被废弃了，所以在这个模式下，其实是不能用的。

// 这是一个自执行的函数，函数内部执行自身，递归
function foo1() { foo1(); }

// function test(params) {
//     console.log('test');
//     test();
// }
// test();

// // 这是一个自执行的匿名函数，因为没有标示名称
// // 必须使用arguments.callee属性来执行自己
var foo2 = function () { arguments.callee(); };

// // 这可能也是一个自执行的匿名函数，仅仅是foo标示名称引用它自身
// // 如果你将foo改变成其它的，你将得到一个used-to-self-execute匿名函数
var foo3 = function () { foo3(); };

// // 有些人叫这个是自执行的匿名函数（即便它不是），因为它没有调用自身，它只是立即执行而已。
(function () { /* code */ } ());

// (function () { 
//     console.log('test')    
//  }());

// // 为函数表达式添加一个标示名称，可以方便Debug
// // 但一定命名了，这个函数就不再是匿名的了
(function foo5() { /* code */ } ());

// // 立即调用的函数表达式（IIFE）也可以自执行，不过可能不常用罢了
//(function () { arguments.callee(); } ());
// (function foo6() { foo6(); } ());

// // 另外，下面的代码在黑莓5里执行会出错，因为在一个命名的函数表达式里，他的名称是undefined
// // 呵呵，奇怪
// (function foo7() { foo7(); } ());
// Uncaught RangeError: Maximum call stack size exceeded

// function pre(){
//     this.radius = Math.random();
//     return {};
// }

// var o = function(params) {
//     this.radius = Math.random();
//     // 返回的这个变量将赋值给o，而不是外面声明的function自身
//     return 1;//return {};
// }

// console.log('pre', new pre()); //{radius: 0.9411470086311529}
// console.log('pre', pre());     //1

// // return 1
// console.log('o', new o()); //{}
// console.log('o', o()); //1
// // return  {}
// console.log('o', new o()); //{}
// console.log('o', o()); //{}

// 使用原型的基础类
var Calculator = function(params) {
    return 1;
}

// console.log(Calculator);//function(){}
// console.log(Calculator()); //non return: undefined; return 1 : 1;
// console.log(new Calculator());//{}


// // 原型使用方式1：
// Calculator.prototype = {
//     add: function (x, y) {
//         return x + y;
//     }
// }

// //console.log(Calculator.add(1,1));//Uncaught TypeError: Calculator.add is not a function
// console.log(new Calculator().add(1,2));//3

// // 原型使用方式2：
// // 第二种方式是，在赋值原型prototype的时候使用function立即执行的表达式来赋值，即如下格式：
// // Calculator.prototype = function () { } ();
// Calculator.prototype = function () {
//     add = function (x, y) {
//         return x + y;
//     }
//     return {
//         add: add
//     }
// } ();

//分步声明
var BaseCalculator = function() {
    this.decimalDigits = 2;
};
BaseCalculator.prototype.add = function (x, y) {
    return x + y;
}

Calculator.prototype = new BaseCalculator();
//Calculator访问不到BaseCalculator构造函数属性
// Calculator.prototype = BaseCalculator.prototype;

var cal = new Calculator();
var cal2 = new Calculator();
console.log(cal.add(9,1));//10
console.log(cal.decimalDigits);//2
BaseCalculator.decimalDigits=111;
console.log(cal2.decimalDigits);//2

// 原型链
// 属性查找：
// 属性在查找的时候是先查找自身的属性，如果没有(this.a)
// 再查找原型，再没有，再往上走，（Foo.prototype.a）
// 一直插到Object的原型上，（Object.prototype.a）
// 所以在某种层面上说，用 for in语句遍历属性的时候，效率也是个问题。

// 可以赋值任何类型的对象到原型上，但是不能赋值原子类型的值
// function Foo() {}
// Foo.prototype = 1; // 无效

// hasOwnProperty函数
console.log(Calculator.hasOwnProperty('add'));//BaseCalculator.prototype.add : false

// hasOwnProperty函数被覆盖
// 使用{}对象的 hasOwnProperty，并将其上下为设置为foo
// {}.hasOwnProperty.call(foo, 'bar'); // true


// // new 操作符
// var obj = new Base();
// // 相当于：
// var obj  = {};
// obj.__proto__ = Base.prototype;
// Base.call(obj);//将Base函数对象的this指针替换成obj