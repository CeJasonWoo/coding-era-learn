// JavaScript 中的 this 
// http://qiutc.me/post/this-this-this-in-javascript.html

//  js this 指向的到底是什么 from javascript语言精髓
//  http://blog.csdn.net/java_goodstudy/article/details/53668050

// 1. 方法调用模式
// 当一个函数被保存为对象的一个属性时, 我们称它为一个方法, 当一个方法被调用时, this指向该对象, 如:

var obj = {  
 value: 1,  
 getValue: function() {  
  alert(this.value);  
 }  
};  
obj.getValue(); // 输出1, 此时的this指向obj  


注意: 该模式中, this到对象的绑定发生在方法被调用的时候.

// 2. 函数调用模式
// 当一个函数并非一个对象的属性时, 它被当作一个函数来调用, 此时的this指向全局对象(window), 如:

window.value = 1;  
function getValue() { alert(this.value); }  
getValue(); // 输出1, 此时的this指向window.  

// 3. 构造器调用模式
// 结合new前缀调用的函数被称为构造器函数, 此时的this指向该构造器函数的实例对象, 如:

function show(val) {  
 this.value = val;  
};  
show.prototype.getVal = function() {  
 alert(this.value);  
};  
var func = new show(1);  
func.getVal(); // 输出1  
alert(func.value) // 输出1  
// 从上面的结果, 可以看出, 此时的this指向了func对象.  

// 4. apply/call调用模式
// apply和call方法可以让我们设定调用者中的this指向谁, 如: 

var fun = function(str) {  
 this.status = str;  
}  
fun.prototype.getStatus = function() {  
 alert(this.status);  
}  
var obj = {  
 status: "loading"  
};  
fun.prototype.getStatus.apply(obj); // 输出"loading", 此时getStatus方法中的this指向了obj  