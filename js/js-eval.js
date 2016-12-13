// Evaluating JavaScript code via eval() and new Function()
// http://www.2ality.com/2014/01/eval.html

// 结论
// eval() 和 new Function()
// 如果娿返回全局对象,建议使用Function('return this')();因为 eval()写法太繁琐。



// 关于eval()

var a = 12;
// str
eval('a + 5') //17
// code block
eval('{ foo: 123 }')   // 123
// object literal
eval('({ foo: 123 })')   //{ foo: 123 }

// eval() in strict mode
function fv() {
    //  'use strict'; //建议加上这句，eval就不会影响下面的语句，导致不必要的bug
    eval('var foo = 1');
    console.log(foo); // 1
}
fv();

// Indirect eval() evaluates in global scope 如何间接引用全局变量呢
var x = 'global';

//正常情况下，引用的是局部变量
function directEval() {
    'use strict';
    var x = 'local';

    console.log(eval('x')); // local
}
// directEval();

// 间接引用全局变量 写法真的是各种繁琐，所以建议还是用new Function(）
function indirectEval() {
    'use strict';
    var x = 'local';

    // Call eval in a different way
    console.log(eval.call(null, 'x')); // global
    console.log(window.eval('x')); // global
    console.log((1, eval)('x')); // global (1)

    // Store eval somewhere else
    var xeval = eval;
    console.log(xeval('x')); // global
    var obj = { eval: eval };
    console.log(obj.eval('x')); // global
}
// indirectEval();


// 关于 new Function()

var ft = new Function('x', 'y', 'return x+y');
ft(3, 4); //7

// 获取全局变量
var x = 'global';
function strictFunc1() {
    'use strict';
    var x = 'local';

    // var f = new Function('"use strict"; return x'); //结果都是一样
    var f = new Function('return x');
    console.log(f()); // global
}
strictFunc1();

// 小心下面的坑啊，严格模式可能会失效
function strictFunc2() {
    'use strict';

    var sl = new Function('return this');
    console.log(sl() === undefined); // false, sloppy mode

    var st = new Function('"use strict"; return this');
    console.log(st() === undefined); // true, strict mode
}
