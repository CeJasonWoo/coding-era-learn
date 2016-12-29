// 函数式编程 functional programming FP

// 我的理解 
// 表达式求值，类似于使用‘+ - * /’得出计算结果，我们无需知道计算符号的具体实现。从命令式编程到符号化编程的转变。
// from 知乎-什么是函数式编程思维 https://www.zhihu.com/question/28292740

/**
    函数式编程相关
        Immutable (所有的方法都不会改变传入参数的原始对象，只会返回一个新的对象)
        
        iteratee-first （处理过程（函数）作为第一个参数传入）
        data-last （处理对象作为最后的参数传入）
        auto-curried 自动柯里化 （多个参数分解成多个函数）

        higher order function 高阶函数 （函数当参数）
        map & reduce （传统遍历方式是for/while）

        lazy evaluation 懒执行
        pipeline 管道 
        Deferred execution 延迟执行

        Chaining 链式 扩展性差
        Compose 组合
        auto-curried iteratee-first data-last 处理过的函数可以很好地实现组合

    from 
    函数式编程 http://blog.csdn.net/huangkangying/article/details/44682397
    知乎-刘旸 https://www.zhihu.com/question/36942520
 */

// 函数式 js 接口实现原理，以及 lodash/fp 模块 https://segmentfault.com/a/1190000005760112

// currying 柯里化
var curry = function (a) {
    return function (b) {
        return function (c) {
            console(a, b, c);
        }
    }
}

// 辅助函数
var isFunction = function (fn) {
    return fn && typeof fn === 'function';
}
var slice = function (argsObj, start, end) {
    var argsArray;
    if (!(argsObj instanceof Array)) {
        // 将 array-like object 转为 array
        argsArray = Array.prototype.slice.apply(argsObj);
    }
    // 这样就能对argsObj进行数组操作
    // return Array.prototype.slice.apply(argsArray, start); // Error
    return argsArray.slice(start);
}

/**
 * 简易柯里化
 * @param fn 输入函数
 * @return 柯里化后的函数
 */
var currySimple = function (fn) {
    if (!isFunction(fn)) {
        return;
    }
    var args = slice(arguments, 1);
    return function () {
        var args2 = slice(arguments, 0);
        return fn.apply(this, args.concat(args2));
    }
}

var add = function (a, b) {
    console.log('add#arguments', arguments);
    return a + b;
}
// var res = currySimple(add, 1)(2,3,4); //add 1,2,3,4
var res = currySimple(add, 1, 2, 3)(2,3,4); //add 1,2,3,2,3,4
console.log('currySimple', res);

/**
 * 简易柯里化
 * @param fn 输入函数
 * @param arr 参数列表 数组列表形式
 * @return 柯里化后的函数
 */
var curryArray = function (fn, arr) {
    if (!isFunction(fn)) {
        return;
    }
    var args = arr.slice(0); // clone array
    args.unshift(fn); // fn is first element
    return currySimple.apply(this, args);
}
var res2 = curryArray(add, [1, 2, 3])(); //add 1,2,3
console.log('curryArray', res2);

/**
 * 自动柯里化
 * @param fn 输入函数
 * @param n 输入函数参数个数
 * @return 柯里化后的函数
 */
var autoCurry = function (fn, n) {
    if (!isFunction(fn)) {
        return;
    }
    return function retFn() {
        var len = arguments.length;
        var args = slice(arguments, 0);
        var nextn = n - len;

        if (nextn > 0) {
            return autoCurry(curryArray(retFn, args), nextn);
        }

        return fn.apply(this, args);
    }
}

// 普通函数调用
var resAdd = add(1,2,3);
console.log('resAdd', resAdd);

// 柯里化函数调用
// var resAc = autoCurry(add, 1)(1, 2, 3);
var resAc = autoCurry(add, 3)(1)(2)(3);
console.log('autoCurry', resAc);



// custom test
var autoCurry3 = function (val, n) {
    var that = this;
    var service = {
        add: function () {
            console.log('autoCurry3#add n=', n, 'val=', val, arguments);
            val += arguments[0];
            return autoCurry3(val, n - 1);
        },
        value: function () {
            return val;
        }
    }
    return service;
}
var addOne3 = autoCurry3(0, 3);
var res3 = addOne3.add(1).add(2).add(3).add(4).value();
// var res3 = addOne3.add(1).add(2).add(3).add(4).add(5).add(6).add(7);// Error
console.log('autoCurry3', res3);

// todo
// 函数式编程中局部应用（Partial Application）和局部套用（Currying）的区别
// https://segmentfault.com/a/1190000000765247
// Partial Application in JavaScript
// http://benalman.com/news/2012/09/partial-application-in-javascript/





