// 定义calss

// 参考 
// Javascript定义类（class）的三种方法
// http://www.ruanyifeng.com/blog/2012/07/three_ways_to_define_a_javascript_class.html
// 深入理解JavaScript系列（18）：面向对象编程之ECMAScript实现 
// http://www.cnblogs.com/TomXu/archive/2012/02/06/2330609.html


// 一、构造函数法
console.log('---构造函数法---')
function A() {
    this.name = "大毛";
　　}
A.prototype.makeSound = function () {
    console.log("A#makeSound");
　　}
var a = new A();
console.log(a);
//重载方法
a.makeSound = function () {
    //调用父方法
    a.constructor.prototype.makeSound();

    // 或者使用
    // A.prototype.makeSound.apply(this, arguments);

    console.log("a#makeSound");
}
a.makeSound();




// 二、Object.create()法
// 这种方法比"构造函数法"简单，但是不能实现私有属性和私有方法，实例对象之间也不能共享数据，对"类"的模拟不够全面。
console.log('---Object.create()法---');

　　var B = {
    name: "大毛",
    makeSound: function () { console.log("B method"); }
　　};
var b = Object.create(B);
console.log(b);
//重载方法
b.makeSound = function () {
    //调用父方法
    b.__proto__.makeSound();
    console.log("b method");
}
b.makeSound();

//自定义实现
console.log('---自定义的Object.create()法---');
// 参考 
// 深入理解JavaScript系列（18）：面向对象编程之ECMAScript实现 
// http://www.cnblogs.com/TomXu/archive/2012/02/06/2330609.html

var inherit = (function () {
    function F() { } //为了去掉构造函数对子类的影响
    return function (child, parent) {
        F.prototype = parent.prototype;
        child.prototype = new F();
        child.prototype.constructor = child;//构造函数换回child本身
        child.superproto = parent.prototype; //superproto语法糖
        return child;
    };
})();


function C() { }
C.prototype.y = 20;
C.prototype.foo = function () { console.log("C#foo"); };
function D() { }
inherit(D, C); //D继承C
D.prototype.foo = function () {
    // 使用"superproto"语法糖
    // 调用父原型的同名方法
    D.superproto.foo.call(this);
    console.log("D#foo");
};

var d = new D();
d.foo();


// 三、极简主义法
console.log('---极简主义法---');
var Cat = {
    createNew: function () {
        var cat = {};
        cat.name = "大毛";
        cat.makeSound = function () { console.log("cat method"); };
        return cat;
    }
};

// 继承
var Animal = {
    createNew: function () {
        var animal = {};
        animal.sleep = function () { console.log("Animal#sleep"); };
        animal.makeSound = function () { console.log("Animal#makeSound"); };
        return animal;
    }
};


var Cat2 = {
    createNew: function () {
        var cat = Animal.createNew();
        cat.name = "大毛2";
        cat.makeSoundParent = cat.makeSound;
        //方法重载
        cat.makeSound = function () {
            //调用父方法
            cat.makeSoundParent();
            console.log("cat2 method");
        };
        return cat;
    }
};

　var cat1 = Cat.createNew();
　　cat1.makeSound();
　var cat2 = Cat2.createNew();
　　cat2.makeSound();
　　cat2.makeSoundParent();