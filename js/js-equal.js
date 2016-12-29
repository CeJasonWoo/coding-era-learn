// javascript双等号引起的类型转换，js隐性类型转换步骤
// http://www.haorooms.com/post/js_yinxingleixing


// .toString()方法和.valueOf()方法数值转换
//     通常情况下我们认为，将一个对象转换为字符串要调用toString()方法，转换为数字要调用valueOf()方法，但是真正应用的时候并没有这么简单，看如下代码实例:

var obj = {
    webName: "haorooms前端博客",
    url: "www.haorooms.com"
}
console.log(obj.toString()); //[object Object]

// 同理，我们再看valueOf()方法：
var arr = [1, 2, 3];
console.log(arr.valueOf());//[1, 2, 3] ,return this
// 从上面的代码可以看出，valueOf()方法并没有将对象转换为能够反映此对象的一个数字。相反，我们用toString()

var arr = [1, 2, 3];
console.log(arr.toString());//1,2,3
// 注：很多朋友认为，转换为字符串首先要调用toString()方法， 其实这是错误的认识，
// 我们应该这么理解，调用toString()方法可以转换为字符串，但不一定转换字符串就是首先调用toString()方法。
// 我们看下下面代码：

var arr = {};
arr.valueOf = function () { return 1; }
arr.toString = function () { return 2; }
console.log(arr == 1);//true

var arr = {};
arr.valueOf = function () { return []; }
arr.toString = function () { return 1; }
console.log(arr == 1);//true
// 上面代码我们可以看出，转换首先调用的是valueOf()，假如valueOf()不是数值，那就会调用toString进行转换！

var arr = {};
arr.valueOf = function () { return "1"; }
arr.toString = function () { return "2"; }
console.log(arr == "1");//true
// 假如"1"是字符串，那么它首先调用的还是valueOf()。

var arr = [2];
console.log(arr + "1");//21
// 上面的例子，调用的是toString（）;因为arr.toString（）之后是2。
// 转换过程是这样的:
// 首先arr会首先调用valueOf()方法，但是数字的此方法是简单继承而来，并没有重写（当然这个重写不是我们实现），
// 返回值是数组对象本身，并不是一个值类型，所以就转而调用toString()方法，于是就实现了转换为字符串的目的。

/**
小结
    大多数对象隐式转换为值类型都是首先尝试调用valueOf()方法。
    但是Date对象是个例外，此对象的valueOf()和toString()方法都经过精心重写，
    默认是调用toString()方法，比如使用+运算符，
    如果在其他算数运算环境中，则会转而调用valueOf()方法。
 */

var date = new Date();
console.log(date + "1"); //Sun Apr 17 2014 17:54:48 GMT+0800 (CST)1
console.log(date + 1);//Sun Apr 17 2014 17:54:48 GMT+0800 (CST)1
console.log(date - 1);//1460886888556
console.log(date * 1);//1460886888557



// 举例巩固提高
var a;
console.dir(0 == false);//true

console.dir(1 == true);//true

console.dir(2 == { valueOf: function () { return 2 } });//true

console.dir(a == NaN);//false
console.dir(NaN == NaN);//false

console.dir(8 == undefined);//false

console.dir(1 == undefined);//false

console.dir(2 == { toString: function () { return 2 } });//true

console.dir(undefined == null);//true

console.dir(null == 1);//false

console.dir({ toString: function () { return 1 }, valueOf: function () { return [] } } == 1);//true

console.dir(1 == "1");//true
console.dir(1 === "1");//false