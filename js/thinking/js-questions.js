// 来源 http://www.cnblogs.com/TomXu/archive/2012/02/10/2342098.html

// ========================================================================================================================
// 找出数字数组中最大的元素（使用Math.max函数）
// var target = [11, 22, 33, 44, 55];
// console.log('Math.max()', Math.max(target));
// 其实max()内部实现，把多个参数放入数组，再使用apply，所以这种写法可以提高效率
// console.log('Math.max.apply', Math.max.apply(this, target));

// ========================================================================================================================
// 转化一个数字数组为function数组（每个function都弹出相应的数字）
// var target = [11,22,33,44,55];
// var result = [];
// var temp;
// for (var i = 0; i < target.length; i++) {
//     temp = (function(value){
//         return function(){
//             alert(value);
//         }
//     })(target[i]);
//     result.push(temp);
// }
// for(var key in target){
//    (function(value){
//         temp = function(){
//             alert(value);
//         }
//    }(target[key]));
//     result.push(temp);
// }
//执行函数数组
// for(var key2 in result){ //注意 这里的key可以在function被引用，所以改成key2
//    result[key2]();
// }

// ========================================================================================================================
// 给object数组进行排序（排序条件是每个元素对象的属性个数）
// var target = [{ a: 1, b: 2 }, { a: 1, b: 2, c: 3 }, { a: 1 }];
// console.log('target', target);
// target.sort(function (a, b) {
//     var ac = bc = 0;
//     for (var key in a) {
//         ac += 1;
//     }
//     for (var key2 in b) {
//         bc += 1;
//     }
//     console.log('ac bc', ac, bc);
//     return ac - bc;
// });
// console.log('after sort', target);

// ========================================================================================================================
// 利用JavaScript打印出Fibonacci数（不使用全局变量）
// 0 1 1 2 3 5 8
(function () {
    //递归
    function fibonacci(len, a, b) {
        if (!a) {
            a = 0;
            console.log(a);
        }
        if (!b) {
            b = 1;
            console.log(b);
        }
        console.log(a + b);
        len -= 1;
        if (len <= 2) return;
        fibonacci(len, b, a + b);
    }
    // console.log('Fibonacci', fibonacci(10));
    //非递归
    function fibonacci2(len) {
        var i = 2;
        var aa = 0; console.log(aa);
        var bb = 1; console.log(bb);
        while (i < 10) {
            var res = aa + bb;
            aa = bb;
            bb = res;
            console.log(bb);
            i += 1;
        }
    }
    // console.log('Fibonacci2', fibonacci2(10));
    // 具体专题请看js-fibonacci.js,感觉最好的写法还是递推
})();


// ========================================================================================================================
// 实现如下语法的功能：var a = (5).plus(3).minus(6); //2
// Number.prototype.plus = function(num){
//     return this + num;
// }
// Number.prototype.minus = function(num){
//     return this - num;
// }
// console.log('(5).plus(3).minus(6)', (5).plus(3).minus(6));

// ========================================================================================================================
// 实现如下语法的功能：var a = add(2)(3)(4); //9
// function add(a){
//     return function(b){
//         return function(c){
//             return a + b + c;
//         }
//     }
// }
// console.log('add(2)(3)(4)', add(2)(3)(4));

// ========================================================================================================================
// ========================================================================================================================
// ========================================================================================================================
// ========================================================================================================================
// ========================================================================================================================
// ========================================================================================================================
// ========================================================================================================================
// ========================================================================================================================
// ========================================================================================================================
// ========================================================================================================================
// ========================================================================================================================
// ========================================================================================================================
// ========================================================================================================================
// ========================================================================================================================
// ========================================================================================================================
// ========================================================================================================================
// ========================================================================================================================
// ========================================================================================================================
// ========================================================================================================================
// ========================================================================================================================
// ========================================================================================================================
// ========================================================================================================================
// ========================================================================================================================
// ========================================================================================================================
// ========================================================================================================================
// ========================================================================================================================
// ========================================================================================================================
// ========================================================================================================================
// ========================================================================================================================
// ========================================================================================================================
// ========================================================================================================================
// ========================================================================================================================
// ========================================================================================================================
// ========================================================================================================================
// ========================================================================================================================
// ========================================================================================================================
// ========================================================================================================================
// ========================================================================================================================
// ========================================================================================================================
// ========================================================================================================================
// ========================================================================================================================
// ========================================================================================================================
// ========================================================================================================================
// ========================================================================================================================
// ========================================================================================================================
// ========================================================================================================================
// ========================================================================================================================
// ========================================================================================================================
// ========================================================================================================================
// ========================================================================================================================
// ========================================================================================================================
// ========================================================================================================================
// ========================================================================================================================
// ========================================================================================================================
// ========================================================================================================================
// ========================================================================================================================
// ========================================================================================================================
// ========================================================================================================================
// ========================================================================================================================
// ========================================================================================================================
// ========================================================================================================================
// ========================================================================================================================
// ========================================================================================================================
// ========================================================================================================================
// ========================================================================================================================
// ========================================================================================================================
// ========================================================================================================================
// ========================================================================================================================
// ========================================================================================================================
// ========================================================================================================================
// ========================================================================================================================
// ========================================================================================================================
// ========================================================================================================================
// ========================================================================================================================
// ========================================================================================================================
// ========================================================================================================================
// ========================================================================================================================
// ========================================================================================================================
// ========================================================================================================================
// ========================================================================================================================
// ========================================================================================================================
// ========================================================================================================================
// ========================================================================================================================
// ========================================================================================================================
