
// 参考

// 从一个简单例子来理解js引用类型指针的工作方式
// http://www.cnblogs.com/chris-oil/p/4862638.html


var a = { n: 1 };
var b = a;
a.x = a = { n: 2 };
console.log(a.x);// --> undefined 
console.log(b.x);// --> [object Object] 

/**
首先是
var a = { n: 1 };
var b = a;
在这里a指向了一个对象{n:1}（我们姑且称它为对象A），b指向了a所指向的对象，也就是说，在这时候a和b都是指向对象A的：
这一步很好理解，接着继续看下一行非常重要的代码：

a.x = a = {n:2};
我们知道js的赋值运算顺序永远都是从右往左的，不过由于“.”是优先级最高的运算符，所以这行代码先“计算”了a.x。
这时候发生了这个事情——a指向的对象{n:1}新增了属性x（虽然这个x是undefined的）：

从图上可以看到，由于b跟a一样是指向对象A的，要表示A的x属性除了用a.x，自然也可以使用b.x来表示了。
接着，依循“从右往左”的赋值运算顺序先执行 a={n:2} ，这时候，a指向的对象发生了改变，变成了新对象{n:2}（我们称为对象B）：

接着继续执行 a.x=a，很多人会认为这里是“对象B也新增了一个属性x，并指向对象B自己”
但实际上并非如此，由于一开始js已经先计算了a.x，便已经解析了这个a.x是对象A的x，
所以在同一条公式的情况下再回来给a.x赋值，也不会说重新解析这个a.x为对象B的x。
所以 a.x=a 应理解为对象A的属性x指向了对象B:


那么这时候结果就显而易见了。当console.log(a.x)的 时候，a是指向对象B的，但对象B没有属性x。没关系，
当查找一个对象的属性时，JavaScript 会向上遍历原型链，直到找到给定名称的属性为止。
但当查找到达原型链的顶部 - 也就是 Object.prototype - 仍然没有找到指定的属性B.prototype.x，
自然也就输出undefined；
而在console.log(b.x)的 时候，由于b.x表示对象A的x属性，该属性是指向对象B，
自然也输出了[object Object]了，注意这里的[object Object]可不是2个对象的意思，对象的字符串形式，
是隐式调用了Object对象的toString()方法，形式是："[object Object]"。所以[object Object]表示的就只是一个对象罢了:)
 */











// 在js中这样写会不会从list中删除了先前的引用?不会!

// var a = {'a':1};
// var b = a;
// var o = {'o':b};
// var a = o;
// console.log('abo', a, b, o);//{{1}},{1},{{1}}

// var a = {'a':1};
// var o = {'o':a};
// var a = o;
// console.log('ao', a, o);//{{1}},{{1}}

// var a = 1;
// var o = {'o':a};
// var a = 2;
// console.log('ao', a, o);//2,{{1}}

// var a = 1;
// var o = a
// var a = 2;
// console.log('ao', a, o); // 2,1




