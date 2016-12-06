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
        var aa = 0;
        var bb = 1;
        console.log(aa);
        console.log(bb);
        while (i < 10) {
            var res = aa + bb;
            aa = bb;
            bb = res;
            console.log(bb);
            i += 1;
        }
    }
    // console.log('Fibonacci2', fibonacci2(10));

    // 下面解法参考 斐波那契数列知乎回答 王希 https://www.zhihu.com/question/28062458
    //求fibonacci数列第n个数 
    //1递归 缺点：大量重复计算
    function fib(n) {
        if (n < 2) return 1; //递归的出口，1，1，2
        return fib(n - 1) + fib(n - 2);
    }
    //2递推
    //当n很大时这个算法还是无能为力
    function fib2(len) {
        var arrayFib = [0, 1];
        for (var i = 2; i < len; i++) {
            arrayFib[i] = arrayFib[i - 1] + arrayFib[i - 2];
        }
        return arrayFib;
    }
    console.log('Fibonacci 递推', fib2(10));
    //3.矩阵递推关系

    // a的n次幂
    // 常规写法 O(n)
    function pow(a, n) {
        var res = 1;
        while (n >= 1) {
            res = res * a;
            n -= 1;
        }
        return res;
    }
    console.log('pow(a, n) 2^4', pow(2, 12));

    // 快速幂
    // 关键点 既然要减少重复计算，那么就要充分利用现有的计算结果
    // 参考
    // 矩阵 快速幂 http://www.cnblogs.com/yan-boy/archive/2012/11/29/2795294.html
    // 代码 http://www.cnblogs.com/ahjesus/p/3261320.html
    // 传统计算方式如果幂次是100就要循环100遍求值，快速幂计算只需要循环7次即可  
    // 解析：
    // 求x的y次方 x^y可以做如下分解
    // 把y转换为2进制，设第n位的值为i，计算第n位的权为x^(2^(n-1)*i) pow(x, pow(2,n-1)*i)

    // 解析2^12： （代码用 pow(2, 12) 表示比较清晰）
    // 12 的二进制是 1100
    // 根据公式pow(2,n-1)*i
    // 12 = pow(2, 4-1) * 1 +  pow(2, 3-1) * 1 + pow(2, 2-1) * 0 + pow(2, 1-1) * 0
    // 12 = pow(2, 3) + pow(2, 2) 
    // 因此 pow(2, 12) = pow(2, (pow(2, 3) + pow(2, 2)) ) =  pow(2, pow(2, 3)) * pow(2, pow(2, 2))


    function quickPow(x, n) {
        var res = 1;
        while (n) {
            if (n & 1) res *= x; //判断奇偶数，奇数：1，偶数：0 //如果最末尾的数是1,储存有效值
            x *= x; //这里即完成了x^(2^(n-1)*i)的计算
            console.log('---myPow n=', n, 'x=', x, 'res=', res);
            n >>= 1; //右位移去掉末尾1位,也可以看成是除以2取整数
        }
        return res;
    }
    console.log('quickPow(a, n) 2^4', quickPow(2, 12));


    // 与运算：先写成2进制，然后同位比较，都为1时此位为1，否则为0
    // 12=1100
    // console.log('num & 1;', 12 & 1); //0
    // 13=1101
    // console.log('num & 1;', 13 & 1); //1
    // 12=1100 8=1000 
    // console.log('num & n', 12 & 8); //1000 = 8
    // 8=1000 7=0111 
    // console.log('num & n', 8 & 7); //0000 = 0
    

    // 右移赋值 >>= 移位操作 >>>
    // var testNum = 8;  //8的二进制位1000。
    // testNum >>> 1;  //向右移1位，为0100 就是4
    // // console.log('num >>= 1;', 12>>>=1);// Uncaught ReferenceError: Invalid left-hand side in assignment
    // var testNum = 12;
    // console.log('num >>= 1;', testNum >>= 1); //6
    // var testNum = 123;
    // console.log('num >>= 1;', testNum >>= 1); //61

    // 幂函数
    // console.log('2^3', Math.pow(2, 3));
    // console.log('2^4', Math.pow(2, 4));

    // 算法思路：
    // 1. 如果是奇数幂，x * p(x,n-1)
    // 2.如果是偶数幂，p(x , n/2) * p (x, n/2)
    // 3. 如果n=0 ，返回1
    // 时间复杂度  ： O(logN)
    function fastPow(x, n) {
        console.log('--fastPow', x, n);
        if (n == 0) {
            return 1;
        }
        if (n % 2 == 1) {
            return fastPow(x, n - 1) * x;
        }
        var r = fastPow(x, n / 2);
        return r * r;
    }

    console.log('fastPow', fastPow(2, 12));
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