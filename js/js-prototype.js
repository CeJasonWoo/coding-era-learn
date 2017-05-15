
// A是构造函数
var A = function (x) {
    this.x = x;

    // 返回值，如果是object直接返回，否则返回this
    // return {}; (return object {})
    // return 1; (return this)
}
// A的prototype对象用于共享函数 = a.__proto__
// 修改A.prototype上的属性时，constructor引用不变
A.prototype.y = 10;

var a = new A();

console.log(
    'A:', A,
    'A():', A(),
    'new A():', a
);

// 给A.prototype 赋值新的对象，constructor引用也被替换为新对象
/*
    解析
    // 在修改A.prototype原型之前的情况
    a.[[Prototype]] ----> Prototype <---- A.prototype
    
    // 修改之后
    A.prototype ----> New prototype // 新对象会拥有这个原型
    a.[[Prototype]] ----> Prototype // 引导的原来的原型上
*/
A.prototype = {
    // constructor: A, //手动把丢失的constructor由Object替换为A
    z: 100
};

var b = new A();

console.log(
    'b', b,  // y不存在 z=100
    'a', a // y=10 z不存在
);

for (var e in a) {
    console.log('a: ', e);
}
//e的constructor失去迭代能力
for (var e in b) {
    console.log('b: ', e);
}

// 解析二
//1.手动设置constructor: A 
//a - old prototype - constructor - A - new prototype - constructor - A
//2.constructor丢失
//a - old prototype - constructor - A - new prototype - constructor - Object
console.log('a.constructor === a.constructor.prototype.constructor', 
a.constructor === a.constructor.prototype.constructor);//return 1true 2false

console.log('a.constructor', a.constructor);
console.log('a.constructor.prototype.constructor', a.constructor.prototype.constructor);
console.log('b.constructor', b.constructor);



