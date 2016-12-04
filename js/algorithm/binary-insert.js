// 二分插入排序

// 简介
// 二分插入（Binary-insert-sort)排序是一种在直接插入排序算法上进行小改动的排序算法。
// 其与直接插入排序算法最大的区别在于查找插入位置时使用的是二分查找的方式，在速度上有一定提升。

// 思路
// 从第一个元素开始，该元素可以认为已经被排序；
// 取出下一个元素，在已经排序的元素序列中二分查找到第一个比它大的数的位置；
// 将新元素插入到该位置后；
// 重复上述两步。

var array = [11, 34, 12, 2, 1, 6, 12];
var i, j;

function binaryInsertionSort(array) {
    for (var i = 1, len = array.length; i < len; i++) {

        console.log('i=', i, array);
        var temp = array[i];

        //insert sort
        // for (var j = i - 1; j >= 0; j--) {
        //     if (array[j] > temp) {
        //         array[j + 1] = array[j]; //注意:是往后移动一位，是j+1,而不是i
        //     } else {
        //         break;
        //     }
        //     console.log('---j=', j, array);
        // }
        // array[j + 1] = temp;
        // console.log('out---j=', j, array);

        // 此时二分查找的范围是0到i-1
        var low = 0, high = i - 1;
        while (low <= high) {
            var mid = Math.floor((low + high) / 2);

            if (array[mid] < temp) {
                low = mid + 1;
            } else { //if (array[mid] > temp) 
                high = mid - 1;
            }

            // 当范围缩小到只有一个值X的时候,也就是low <= high
            // 此时如果X>temp,low不变
            // 如果X<temp,则low+1
            // 因此最后的low就是我们要找的，妙！
        }
        // low到i-1的元素都往后移动一位
        for (var j = i-1; j >= low; j--) { //注意：这里必须先从最大的i-1开始后移
            array[j+1] = array[j];
        }
        array[low] = temp;

    }
}

binaryInsertionSort(array);
console.log('binaryInsertionSort test', array);