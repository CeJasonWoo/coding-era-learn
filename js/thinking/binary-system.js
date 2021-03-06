// 二进制对算法优化很重要

// 我们在做很多”连续“的问题的时候都会用到二进制将他们离散简化
// 1.多重背包问题
// 2.树状数组
// 3.状态压缩DP
// ……………还有很多。。。究其根本还是那句话：化连续为离散。。
// 很多时候我们并不是为了解决一个问题而使用二进制，更多是时候是为了优化而使用它。
// 所以如果你想让你的程序更加能适应大数据的情况，那么学习学习二进制及其算法思想将会对你有很大帮助。

// 引用 
// 矩阵 快速幂 
// http://www.cnblogs.com/yan-boy/archive/2012/11/29/2795294.html
// 算法---求二进制中1的个数
// http://blog.csdn.net/hyqwmxsh/article/details/52493384
// 二进制位运算在算法中的巧妙运用 
// http://www.cnblogs.com/i-fuqiang/archive/2013/05/12/3189477.html

// 求二进制中1的个数
//===========================================================================================
// 1常规写法 n & 1
//  while (n >0)  
//     {  
//         if((n &1) ==1) // 当前位是1  
//             ++c ; // 计数器加1  
//         n >>=1 ; // 移位  
//     }  

// 2快速法 n &= (n – 1)


// 3.查表法

// 4.二分法



// & 运算符，与运算，先写成2进制，然后同位比较，都为1时此位为1，否则为0
//===========================================================================================
// 12=1100
// console.log('num & 1;', 12 & 1); //0
// 13=1101
// console.log('num & 1;', 13 & 1); //1
// 12=1100 8=1000 
// console.log('num & n', 12 & 8); //1000 = 8
// 8=1000 7=0111 
// console.log('num & n', 8 & 7); //0000 = 0

// n & 1 ，判断奇偶数，奇数：1，偶数：0
//===========================================================================================
// 与运算 11=1 10=0 01=0 00=1
// console.log('1&1', 1 & 1); //1
// console.log('1&0', 1 & 0); //0

// n &= (n – 1) ，清除最右边的1
//===========================================================================================
// 为什么n &= (n – 1)能清除最右边的1呢？因为从二进制的角度讲，n相当于在n - 1的最低位加上1。
// 举个例子，8（1000）= 7（0111）+ 1（0001），所以8 & 7 = （1000）&（0111）= 0（0000），
// 清除了8最右边的1（其实就是最高位的1，因为8的二进制中只有一个1）。
// 再比如7（0111）= 6（0110）+ 1（0001），所以7 & 6 = （0111）&（0110）= 6（0110），
// 清除了7的二进制表示中最右边的1（也就是最低位的1）。
// 再比如6（0110）= 5（0101）+ 1（0001），所以6 & 5 = （0110）&（0101）= 4（0100），



//n &= (n – 1) ，判断是否2的n次方
//===========================================================================================
// 2 0010
// 4 0100
// 8 1000
// 2的n次方在二进制上只有一个1，只要清除1，结果都是0
function is_pow(x) {
    x &= x - 1;
    if (!x) return true;
    return false;
}
console.log('is_pow 16', is_pow(16));

// 判断一个数mod2^n次的值，依旧利用位运算符  
//===========================================================================================
// 2^n = 2,4,8,16
// 分析
// for (var i = 0; i < 100; i++) {
//     console.log('num & n test 12&' + i, 12 & i);
// }
// 12&[0-3]=0 12&[4-7]=4 12&[8-11]=8 12&[12-16]=12
// 12%2=0
// 12%4=0=12&[0-3]
// 12%8=4=12&[4-7]
// 推算出m>(2^n)时， m%(2^n) = m&(2^n-1)

// ^ 运算符, XOR 等价于 ！= 
//===========================================================================================
// 异或 11=0 10=1 01=1 00=0
console.log('1^1', 1 ^ 1); //0
console.log('1^0', 1 ^ 0); //1
console.log('5^7', 5 ^ 7); //0101^0111 = 0010 = 2
// 用异或求不同数  
//===========================================================================================
console.log('1^1^5^7^5', 1 ^ 1 ^ 5 ^ 7 ^ 5);
// 感觉XOR和-没区别
//===========================================================================================
// 两个数的原地交换  
// 利用异或法实现  
var a = 7, b = 5; a = a ^ b; b = a ^ b; a = a ^ b;
// 利用加减法实现  
var a = 7, b = 5; a = a + b; b = a - b; a = a - b;

// ~ 运算符：按位取反运算符
//===========================================================================================
// 对一个表达式执行位非（求非）运算。
// -3 -2 -1 0 1 2 如 ~0 = -1; ~1 = -2; ~2 = -3; ~99 = -100;

// 解析 
// 参考 http://www.jb51.net/article/46471.htm
// var temp = ~5;
/*
5 二进制 101，补满 32位
00000000000000000000000000000101
按位取反
11111111111111111111111111111010
由于32位开头第一个是1，所以这是一个负数，将二进制转换成负数，需要先反码
00000000000000000000000000000101
之后，再+1
00000000000000000000000000000110
转换成十进制为6，加上符号变成负数 -6
*/
// alert(temp); // 弹出【-6】

// 使用技巧
//  if (!!~(roles.indexOf('*'))) return true;
/*
Q1:为什么要这样写
indexOf return -1, 代表没有找到目标字符串
~-1 = 0
!!0 = false 

indexOf return 0, 有
~0 = -1
!!-1 = true

indexOf return 1, 有
~1 = -2
!!-2 = true

~num num>=0时取反都是负数 num>0时取反都是正数

Q2:为什么不直接!！roles.indexOf('*'):
indexOf return -1, 代表没有找到目标字符串
!!-1 = true 

indexOf return 0, 有
!!0 = false

indexOf return 1，有
!!1 = true

!!num 数字0转为Boolean类型时为false，其他情况（正数、负数）都为true

Q3:为什么不直接roles.indexOf('*')>=0?
比较大小运算没有位运算快吧

 */

// Math.floor更快的实现： ~~14.11
//===========================================================================================
// JS该不该用位运算
// http://blog.csdn.net/cc7756789w/article/details/51055207
// 位运算直接对内存中的二进制位进行操作（注意，只是对整数），不需要额外的资源占用，因为非常快，
// 很多用C语言（当然还有其他静态语言）写的东西都可以看到源码中大量运用位操作进行优化。
// 小数是没有位运算的，对小数进行位运算会直接把小数给舍去。 
// 所以～1.111111取反后的结果就是-2，再把-2取反，还是回到1，因此用这种方式实现了比Math.floor更快的运算。


// n >>= 1; 除以2取整数 
//===========================================================================================
// 右位移去掉末尾1位，用于循环，对于1100 循环下来变成 110 11 1 0000
//===========================================================================================
// 右移赋值 >>= 移位操作 >>>
// var testNum = 8;  //8的二进制位1000。
// testNum >>> 1;  //向右移1位，为0100 就是4
// // console.log('num >>= 1;', 12>>>=1);// Uncaught ReferenceError: Invalid left-hand side in assignment
// var testNum = 12;
// console.log('num >>= 1;', testNum >>= 1); //6 1100 => 0110



// n <<= 1; 乘以2^1
//===========================================================================================
//利用<<做2^6  
console.log('2^6 ', 2 << 5);
for (var i = 0; i < 4; i++) {
    console.log('1 << ' + i, 1 << i);
}
// 对集合的表示：
//===========================================================================================
// 大多数时候，我们可以用一个整数来表示一个包含不超过32（当然如果使用64位整型变量也可以是64个）个元素的集合——对于每一个位，
// 如果元素为1，则表示存在当前位所对应的集合成员，如果是0，则表示这个集合成员是不存在的。
// 比如A=1011 就可以表示集合{0，1，3}，而上面提到的1<<x就表示集合{x}。
// (1 << 0) = 1 = 0001 => {0}
// (1 << 1) = 2 = 0010 => {1}
// (1 << 2) = 4 = 0100 => {2}
// (1 << 3) = 8 = 1000 => {3}
// (1 << x) => {x}
// 下面我们就能推导出一些直观的集合运算。
// 　　我们定义 ALL_BITS 为全集即各二进制位均为1的数。
// 　　集合的并 A|B
// 　　集合的交 A&B
// 　　集合的差 A& ~B
// 　　补集      ALL_BITS^A
// 　　添加特定元素bit A|=1<<bit
// 　　清除特定元素bit A^=1<<bit
// 　　取出特定元素bit A&=1<<bit
// 　　判断是否存在特定元素bit (A&1<<bit)!=0


// 枚举子集 Enumeration subset 
//===========================================================================================
// 问题描述：输入n, 表示集合S的元素个数，输入m表示S的子集元素个数，然后枚举元素个数为m的S集合子集的所有可能
// e.g. 
// 输入n=5，m=3，即求集合S={1,2,3,4,5}
// 所有元素为3的子集，{1,2,3}、{1,2,4}、{1,2,5}、{1,3,4}、{1,3,5}、{1,4,5}、{2,3,4}、{2,3,5}、{2,4,5}、{3,4,5};
// 从中可以发现一些规律：按顺序枚举，每次循环，找到最右下标为index的元素value，
// 满足 value < (n - (m - 1 - index)), 
// 然后标记position=index，position这个位置的元素增加1，
// 若position < m-1，则后面的元素都等于前一个元素加1.
function subset(len, sublen) {
    var superset = [];
    for (var i = 1; i <= len; i++) {
        superset.push(i);
    }

    if (sublen) {
        // 子集个数二进制
        // len = 1 , [0-1] => [0-1] => sum: 2 = 2^1
        // len = 2 , [00-11] => [0-3] => sum: 4 = 2^2
        // len = 3 , [000-111] => [0-7] => sum: 8 = 2^3
        // len = 4 , [0000-1111] => [0-15] => sum: 16 = 2^4
        var sum = Math.pow(2, len);//所有子集数
        // var sumSub = Math.pow(2,sublen);
        var sunMin = 0;//空子集
        var subMax = sum - 1;//最长子集，二进制就是全是1，即有len个1
        var temp, sub = [], index;
        while (subMax > 0) {
            temp = subMax;
            sub.length = 0;
            index = 0;
            while (temp) {
                if (temp & 1) { //从二进制最低位算起，数组下标：4，3，2，1，0 <-start,结果1就代表有元素
                    sub.push(superset[index]);
                }
                temp >>= 1;
                index += 1;
            }
            if (sub.length === sublen) {
                console.log('---subset,', sub);
            }
            subMax -= 1;
        }
    } else {
        console.log('---subset,', []);
    }
    return superset;
}
console.log('test', subset(3, 2));

// 枚举所有子集  i = (i - 1) & superSet 
//===========================================================================================
// 当我们取出最后一个1的时候，这个1将变成0，而比其低位的0将变成1。
// 与低位技术不同的是，我们并不是要提出某一位1，而是要去除某一位的1，并补上一些我们需要的1。

// 分析
// 9 1001 superSet
// 8 1000 sub
// 1 0001 sub
// 0 0000 sub
// 当superSet为1001时，子集的格式就是X00X，
// 也就是1001&X11X时，总会得到X00X,果然是变态技巧！ 

// 疑问：但是这样做有什么实际意义呢？集合1001我提取成集合11也可以很好的枚举啊
// 11
// 10
// 01
// answer：如果需求只是枚举，是可以这样，但是处理动态链接之类的问题，数组的长度是不变的，这样就无法巴拉巴拉

// 8 1000 superSet
// 0 0000

// 10 1010 superSet
// 1000
// 0010

// 11 1011  superSet
// 10 1010
// 9  1001
// 8  1000
// X  0111 skip
// X  0110 skip
// X  0100 skip
// 3  0011
// 2  0010
// 1  0001

function iteratingAllSubSet(superSet) {
    var i = superSet;
    while (i > 0) {
        console.log('---iteratingAllSubSet', 'i=', i, i - 1, superSet);
        i = (i - 1) & superSet; //7 6 5 4 3 2 1
        // i &= (i-1); //7[6] 6[5] 4
    }
    return i;
}
console.log('iteratingAllSubSet', iteratingAllSubSet(11));


//十进制转二进制 
//===========================================================================================
function binary(num) {
    var res = '';
    while (num) {
        res = (num & 1) + res;
        num >>= 1;
    }
    return res;
}
// for (var i = 0; i < 20; i++) {
//     console.log('binary '+i, binary(i));
// }
// 当然也可以直接求余数
// 12 / 2 = 6 ... 0
// 6 / 2 = 3 ... 0
// 3 / 2 = 1 ... 1
// 1100  

//二进制转十进制 
//===========================================================================================
// '0011' => 2^1 + 2^0 = 3
// '0100' => 2^2 = 4
// '0101' => 2^2 + 2^0 = 5
// forin key start->'1100' 3210 <-start
// TODO 这不是最优写法
function decimal(num) {
    var res = 0;
    var len = num.length;
    var index;
    for (var key in num) {
        // console.log('---decimal ', num.substr((key*1+1)*-1,1));
        index = len - 1 - key;
        if (num[index] === '1') {
            res += Math.pow(2, key);
        }
    }
    return res;
}
console.log('decimal ', decimal('1234'));

// index < (size >> 1)
//===========================================================================================
// 前半部分时 从前向后找，后半部分时，从后向前找，这样效率高
var index,size = 10;
if(index < (size >> 1)){
    // for (var i = 0; i < index; i++) //i从min开始
}else{
    // for (var i = size - 1; i > index; i--) //i从max开始
}

// (1<<-1)-1 TODO：这个要如何理解？
//===========================================================================================
console.log('(1<<-1)-1', (1<<-1)-1);
console.log('(1<<-1)', (1<<-1));
console.log('(1<<1)', (1<<1));
console.log('(1>>1)', (1>>1));
console.log('(1>>-1)', (1>>-1));



//===========================================================================================
//===========================================================================================
//===========================================================================================
//===========================================================================================
//===========================================================================================
//===========================================================================================
//===========================================================================================

// 1.计算绝对值
// 　　abs( x ) { 
// 　　    y=x>>31 ; 
// 　　    return(x^y)-y;//也可写作 (x+y)^y 
// 　　}
// 　　这里需要注意的是，上面的x, y 默认为32位有符号整数。

//       2.按位翻转

// x=((x&0xaaaaaaaa)>>1)|((x&0x55555555)<<1);
// x=((x&0xcccccccc)>>2)|((x&0x33333333)<<2);
// x=((x&0xf0f0f0f0)>>4)|((x&0x0f0f0f0f)<<4);
// x=((x&0xff00ff00)>>8)|((x&0x00ff00ff)<<8);
// x=((x&0xffff0000)>>16)|((x&0x0000ffff)<<16);
// 　　如果无符号32位整数x=311=(100110111)2，那么经过上述操作后x=3967811584=(11101100100000000000000000000000)2。
// 　　这里不多作解释（其实研读这段代码是很有意思的一件事情），留给有兴趣的读者思考。
// 　　3.枚举恰好含有k个元素的集合
// 　　我们假设全集为含有N个元素为 {0,1,2,…,N-1}，那么代码段可以写成：
// 　　int s = (1 << k) - 1;
// 　　while (!(s & 1 << N)) {
// 　　    // 由当前集合 s 计算下一个合法的集合
// 　　    int lo = s & -s;       // 求出低位的1
// 　　    int lz = (s + lo) & ~s;      // 求出比lo高的0中，最低位的0
// 　　    s |= lz;                     // 将lz代表的元素加入集合s
//           s &= ~(lz - 1);              // 将比lz位置低的元素全部清空
//           s |= (lz / lo / 2) - 1;      // 将集合元素个数补足为k个
//       }
// 　　当然最后一句话也可以写成s |= (lz >> __builtin_ctz(lo << 1)) – 1来避免除法运算。

//===========================================================================================

//===========================================================================================






