
function swap(a, b) {
    var temp = a;
    a = b;
    b = temp;
}

// function swap(a, b, array) {
//     var temp = array[a];
//     array[a] = array[b];
//     array[b] = temp;
// }


// 插入排序
// 形象的理解，类似于整理扑克牌,参考图片 http://www.cnblogs.com/fanyong/archive/2012/03/23/2413553.html

var array = [11, 34, 2, 1, 6, 12];
var i, j;

// 先从第二个开始排序(假设i前面的是已经排好序的元素)
for (var i = 1, len = array.length; i < len; i++) {

    console.log(i);


    //必须把但前要排序的元素的值存起来，因为array[i]的值是会变的
    var temp = array[i];
    var j = i - 1;

    //比较i和i-1的大小，
    //条件1：如果i-1>i,比较i和i-2的大小，直到满足条件j<i或者j<0,交换j和i的位置（从j到i-1的元素全部往后移动一位）
    //or条件1：如果i-1>i,i-1往后移动一位, 重复前面步骤，比较i和i-2的大小，直到满足条件j<i或者j<0

    //条件2：如果i-1<i,比较结束

    //while比for更快，详情请看js循环优化 http://lifemap.in/javascript-loop-optimization/
    while (j >= 0 && array[j] > temp) {
        console.log('before swap', array,
            '---i=' + i, 'array[i]=' + array[i],
            '---j=' + j, 'array[j]=' + array[j]);

        //swap 往后移动一位
        array[j + 1] = array[j];

        //log
        console.log(
            'after swap', array, 'temp=' + temp,
            '---i=' + i, 'array[i]=' + array[i],
            '---j=' + j, 'array[j]=' + array[j]);

        j -= 1;

    }

    array[j + 1] = temp;
    console.log('result', array);

}


