// 对象Object
//对象包含：显式属性 + 隐式属性__proto__
// var foo = {
//   x: 10,
//   y: 20
// };
// console.log(foo);


// 原型链（Prototype chain）
// var a = {
//   x: 10,
//   calculate: function (z) {
//     return this.x + this.y + z
//   }
// };
 
// var b = {
//   y: 20,
//   __proto__: a
// };
 
// var c = {
//   y: 30,
//   __proto__: a
// };
 
// // 调用继承过来的方法
// console.log(b.calculate(30)); // 60
// console.log(c.calculate(40)); // 80
// console.log(b);

// 构造函数(Constructor)

// 构造函数
function Foo(y) {
  // 构造函数将会以特定模式创建对象：被创建的对象都会有"y"属性
  this.y = y;
}
 
// "Foo.prototype"存放了新建对象的原型引用
// 所以我们可以将之用于定义继承和共享属性或方法
// 所以，和上例一样，我们有了如下代码：
 
// 继承属性"x"
Foo.prototype.x = 10;
 
// 继承方法"calculate"
Foo.prototype.calculate = function (z) {
  return this.x + this.y + z;
};
 
// 使用foo模式创建 "b" and "c"
var b = new Foo(20);
var c = new Foo(30);
 
// 调用继承的方法
b.calculate(30); // 60
c.calculate(40); // 80
 
// 让我们看看是否使用了预期的属性
 
console.log(
 
  b.__proto__ === Foo.prototype, // true
  c.__proto__ === Foo.prototype, // true
 
  // "Foo.prototype"自动创建了一个特殊的属性"constructor"
  // 指向a的构造函数本身
  // 实例"b"和"c"可以通过授权找到它并用以检测自己的构造函数
 
  b.constructor === Foo, // true
  c.constructor === Foo, // true
  Foo.prototype.constructor === Foo, // true
 
  b.calculate === b.__proto__.calculate, // true
  b.__proto__.calculate === Foo.prototype.calculate // true
 
);
// console.log('Foo', Foo) //function Foo(){}
console.log('Foo', b);

// Jason test

// var jason = {
//   x: 10,
//   y: 20
// };
// var son = {
//     s:10,
//     p:jason,
//     __proto__:jason
// };

// // x,y,__proto__
// console.log('old jason', jason);//no changed
// console.log('old son', son);//p:changed, __proto__:changed
// delete jason.x;
// jason.y=100;
// console.log('change jason', jason);//changed
// console.log('change son', son);//changed


var Jason = function(x,y) {
  this.x = x;
  this.y = y;
}
var Son = function(a,b) {
  this.a = a;
  this.b = b;
//   this.__proto__ = Jason;
}

var jason = new Jason(1,2);
var son = new Son(1,2);

console.log('Jason',Jason);//function name(params) { }
Jason.prototype.z = 100;
// console.log('Jason',Jason;//function name(params) { }
// son.prototype.p = jason;//错误用法son.prototype不存在

console.log('old jason',jason);
console.log('old son', son);

console.log(
    jason.__proto__ === Jason.prototype,// true
    jason.constructor === Jason, // true
    Jason.prototype.constructor === Jason // true
  );
console.log(son.__proto__ === Son.prototype);

// 没用的伪代码
// var object = {
 
//   // catch住不能响应消息的系统信号
//   __noSuchMethod__: function (name, args) {
//     alert([name, args]);
//     if (name == 'test') {
//       return '.test() method is handled';
//     }
//   }
 
// };
// object.test();