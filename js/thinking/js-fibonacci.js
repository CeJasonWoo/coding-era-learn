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
    //这个是在快速幂的基础上改进quick-pow.js