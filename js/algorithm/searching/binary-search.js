// 二分查找(又称折半查找) - 适用于已排好序的线性结构 - 时间复杂度O(logN)


//array为已按"升序排列"的数组，x为要查询的元素
//返回目标元素的下标
function binarySearch(array, x) {
    var low = 0, high = array.length - 1;
    while (low <= high) { //不满足条件就是没有找到

        var mid = Math.floor((low + high) / 2); //下取整   

        if (x == array[mid]) {
            return mid;
        }
        if (x < array[mid]) {
            high = mid - 1; //小于中间值，改变当前范围的最高值
        }
        else {
            low = mid + 1; //大于中间值，改变当前范围的最低值
        }
    }
    return -1;
}