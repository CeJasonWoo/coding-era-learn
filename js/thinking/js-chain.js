
// see http://snandy.iteye.com/blog/748348

// 一、方法体内返回对象实例自身(this)
//缺点是它占用了函数的返回值。

function ClassA(){  
    this.prop1 = null;  
    this.prop2 = null;  
    this.prop3 = null;  
}  
ClassA.prototype = {  
    method1 : function(p1){  
        this.prop1 = p1;  
        return this;  
    },  
    method2 : function(p2){  
        this.prop2 = p2;  
        return this;  
    },  
    method3 : function(p3){  
        this.prop3 = p3;  
        return this;  
    }  
}  
// use
var obj = new ClassA();  
obj.method1(1).method2(2).method3(3); // obj -> prop1=1,prop2=2,prop3=3  
console.log('chain 1', obj);








// 二、对象传入后每次调用返回函数自身
//只适合无返回值的链式调用
/** 
 * chain 精简版 
 * @param {Object} obj 
 */  
function oldChain(obj) {
    return function () {
        var Self = arguments.callee; 
        // arguments.callee指向当前正在执行的函数。
        // 在 ECMAScript 第五版 (ES5) 的 严格模式 中禁止使用 arguments.callee()。
        // see https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Functions/arguments/callee
        // console.log('Self', Self);
        Self.obj = obj;
        if (arguments.length == 0) {
            return Self.obj;
        }
        Self.obj[arguments[0]].apply(Self.obj, [].slice.call(arguments, 1));
        return Self;
    }
} 
// 讲解代码
function openChain(obj) {
    //执行chain直接返回一个方法(类)，这样执行chain(obj)('method1',4)就相当于执行这个方法，参数是('method1',4) 
    return function () {
        //定义Self = 本方法的调用者 
        var Self = arguments.callee;
        //给调用者一个属性 即obj参数，这样每次链式调用的时候就可以获得最初的那个obj，而这个obj正好是被链式调用的那个方法，这里是classB 
        Self.obj = obj;
        //一个参数都没有，这是链式调用结束的时候发生的事情，即：...('method3',6)()这里的最后一个括号，此时返回最初的那个obj，这里是classB 
        if (arguments.length == 0) {
            return Self.obj;
        }
        /*执行Self.obj[arguments[0]] 
        比如我们第一次链式调用的时候：('method1',4) 
        这里我们通过 Self.obj[arguments[0]] 取得了method1方法，

        Self.obj[arguments[0]].apply(Self.obj,[].slice.call(arguments,1)); 
        代表把Self.obj[arguments[0]]当做Self.obj的一个方法执行， 
        参数是后面的[].slice.call(arguments,1) 

        [].slice.call(arguments,1) 
        截取arguments数组，从索引第一个截取到最后 
        也可以用Array.prototype.slice.
        */
        Self.obj[arguments[0]].apply(Self.obj, [].slice.call(arguments, 1));
        //返回Self 
        return Self;
    }
} 

/** 
* chain 最易读版 
* @param {Object} obj 
*/ 
function singleChain(obj) {
    var chain = function() {
        if (arguments.length == 0) {
            return chain.obj;
        }
        var methodName = arguments[0], methodArgs = [].slice.call(arguments, 1);
        chain.obj[methodName].apply(chain.obj, methodArgs);
        return chain;
    }
    chain.obj = obj;
    return chain;
}  
  
//定义的function/类ClassB  
function ClassB(){  
    this.prop1 = null;  
    this.prop2 = null;  
    this.prop3 = null;  
}  
ClassB.prototype = {  
    method1 : function(p1){  
        this.prop1 = p1;
        // return XXX; 不适合这种调用
    },  
    method2 : function(p2){  
        this.prop2 = p2;  
    },  
    method3 : function(p3){  
        this.prop3 = p3;  
    }  
}  
// use
var obj = new ClassB();  
singleChain(obj)('method1',4)('method2',5)('method3',6); // obj -> prop1=4,prop2=5,prop3=6  
//返回自身
var result = singleChain(obj)('method1',4)('method2',5)('method3',6)();  
// console.log('chain2', singleChain(obj)('method1',4));
// console.log('chain2', singleChain(obj)());



// 三 AOP实现方式
// 如果嫌在每个方法最后返回this是重复代码，那大可以实现一个wrap函数，用AOP的思路来对需要链式调用的方法进行包装： 
// 缺点和二一样，无法返回值，但是更易读
function aopChain(obj, methods){ 
    for(var i=0; i<methods.length; i++){ 
        var method = methods[i]; 
        obj[method] = (function(oldMethod){ 
            return function(){ 
                oldMethod.apply(obj, arguments); 
                return obj; 
            } 
        })(obj[method]);
    } 
} 

// 有了上面的包装函数，就可以这样使用： 
function Test(){} 
Test.prototype = { 
   methodA: function(){ 
       console.log('chain3 methodA'); 
       return 1;//无法返回
   }, 
   methodB: function(arg){ 
       console.log('chain3', arg); 
   } 
} 
var test = new Test(); 
//声明需要链式调用的方法 
aopChain(test, ['methodA', 'methodB']); 
//try it:) 
test.methodB('arg1').methodA() 
// console.log(test.methodA());

// 抛砖引玉，你还可以让chain去修改构造函数（比如这里的Test）的prototype，这样只需要设置一次，所有的实例都具有链式调用的能力了，是不是和rails中的dsl有点类似呢？呵呵…… 
// 总之，我们在写代码或者设计API的时候，首要的原则就是要保证代码的可读性，SICP里有句话说的好：“程序是写给人看的，机器顺便执行”。








// 四、asynchronous method chains
// see http://www.dustindiaz.com/async-method-queues/

function Queue() {
    // store your callbacks
    this._methods = [];
    // keep a reference to your response
    this._response = null;
    // all queues start off unflushed
    this._flushed = false;
}

Queue.prototype = {
    // adds callbacks to your queue
    add: function (fn) {
        // if the queue had been flushed, return immediately
        // Jason 当_flushed为true，代表操作对象_response已经设置
        if (this._flushed) {
            fn(this._response);
            // otherwise push it on the queue
            // Jason 先设置好callback chain后再设置操作对象
        } else {
            this._methods.push(fn);
        }
    },
    flush: function (resp) {
        // note: flush only ever happens once
        if (this._flushed) {
            return;
        }
        // store your response for subsequent calls after flush()
        this._response = resp;
        // mark that it's been flushed
        this._flushed = true;
        // shift 'em out and call 'em back
        while (this._methods[0]) {
            this._methods.shift()(resp);
        }
    }
};









// Jason
function ClassC() {
    this.prop1 = null;
    this.prop2 = null;
    this.prop3 = null;

    var service = {
        method1: function (p1) {
            this.prop1 = p1;
            return service;
        },
        method2: function (p2) {
            this.prop2 = p2;
            return service;
        },
    }
    return service;
}
var obj2 = new ClassC();  
obj2.method1(1).method2(2);
console.log('chain jason', obj2);