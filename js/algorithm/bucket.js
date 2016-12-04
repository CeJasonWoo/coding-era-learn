// 桶排序

// INFO
// 设置一个定量的数组当作空桶；
// 遍历输入数据，并且把数据一个一个放到对应的桶里去；
// 对每个不是空的桶进行排序；
// 从不是空的桶里把排好序的数据拼接起来。

/*方法说明：桶排序
@param  array 数组
@param  num   桶的数量*/
function bucketSort(array, num) {
    if (array.length <= 1) {
        return array;
    }
    var len = array.length, buckets = [], 
    result = [], 
    min = max = array[0], 
    regex = '/^[1-9]+[0-9]*$/', space, n = 0;
    
    num = num || ((num > 1 && regex.test(num)) ? num : 10);
    for (var i = 1; i < len; i++) {
        min = min <= array[i] ? min : array[i];
        max = max >= array[i] ? max : array[i];
    }
    space = (max - min + 1) / num;
    for (var j = 0; j < len; j++) {
        var index = Math.floor((array[j] - min) / space);
        if (buckets[index]) {   //  非空桶，插入排序
            var k = buckets[index].length - 1;
            while (k >= 0 && buckets[index][k] > array[j]) {
                buckets[index][k + 1] = buckets[index][k];
                k--;
            }
            buckets[index][k + 1] = array[j];
        } else {    //空桶，初始化
            buckets[index] = [];
            buckets[index].push(array[j]);
        }
    }
    while (n < num) {
        result = result.concat(buckets[n]);
        n++;
    }
    return result;
}


var array = [11, 34, 2, 1, 6, 12];
console.log('array', array);
console.log('bucketSort test', bucketSort(array));