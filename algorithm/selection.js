
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


// 选择排序
// 形象的理解：每次遍历出余下无序元素中的最小元素( min1 min2 min3 )

var array = [11, 34, 2, 1, 6, 12];
var i, j;

//min变量用于存放无序队列中最小的元素下标
var minIndex;

for (var i = 0, len = array.length; i < len; i++) {

    console.log(i, array);

    // 先假设位置i的元素是最小值
    minIndex = i;

    // 遍历数组寻找无序数组中最小的元素的下标
    for (var j = i + 1, len = array.length; j < len; j++) {

        console.log('find minIndex',
            'minIndex=', minIndex, 'array[minIndex]=' + array[minIndex],
            '---j=' + j, 'array[j]=' + array[j]);

        if (array[j] < array[minIndex]) {
            minIndex = j;
        }

    }

    // swap
    swapIndex(i, minIndex, array);

    console.log('result', array);

}


