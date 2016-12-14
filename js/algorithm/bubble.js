
// 反例：交换数组元素位置，这种写法是无效的
// js的数组归根结底就是obj，键值对，这点和java不同。
function swap(a, b) {
    var temp = a;
    a = b;
    b = temp;
}

function swapIndex(a, b, array) {
    var temp = array[a];
    array[a] = array[b];
    array[b] = temp;
}


// 冒泡排序
// 形象的理解，相邻元素比较！

function bubbleSort(array) {

    var isSwap = false;//优化，是否有元素交换位置

    var i, j;
    // i代表的是无序数组的长度
    for (var i = array.length; i > 1; i--) {

        console.log(i);

        // 默认升序排序，比较相邻两个元素的大小，
        // j-1>j,交换位置
        // j-1<j,比较j和j+1的大小

        // 关键点是i和j的关系，每个人的写法都有不同
        for (var j = 1; j < i; j++) {
            console.log('---j', j, array);
            if (array[j - 1] > array[j]) {
                swapIndex(j - 1, j, array);
                isSwap = true;
            }
        }

        // 如果没有元素交换位置，说明排序已经是正确的，退出循环
        if(isSwap === false){
            break;
        }

    }
}

var array = [11, 34, 2, 1, 6, 12];

console.log('result', bubbleSort(array));

