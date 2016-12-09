
// 堆排序 heap

// 参考 
// 基本数据结构――堆的基本概念及其操作 http://www.cnblogs.com/JVxie/p/4859889.html
// 常用排序算法之JavaScript实现 https://segmentfault.com/a/1190000000656344#articleHeader1

// 堆数组：
// 根节点为0时,假设当前节点为i
// 父节点就是 (i-1)/2
// 左右子节点就是 i*2+1 i*2+2 （这样的公式怎么来的呢？因为每个层级的节点数都是上一个层级的节点数的2倍）
// 根节点为1时,假设当前节点为i
// 父节点就是 (i)/2
// 左右子节点就是 i*2 i*2+1

// 堆的几个基本操作：
// 上浮 shift_up；
// 下沉 shift_down
// 插入 push
// 弹出 pop
// 取顶 top
// 堆排序 heap_sort

function swap(a, b, array) {
    var temp = array[a];
    array[a] = array[b];
    array[b] = temp;
}

/**
 * arrayHeap 堆数组
 * i 元素下标
 * 
 * 从当前结点开始,和它的父亲节点比较,若是比父亲节点来的小,就交换,
 * 然后将当前询问的节点下标更新为原父亲节点下标；否则退出。
 */
function shiftUp(arrayHeap, i) {
    while (i > 1) {
        // 小根堆,根节点为1(有效元素从下标1开始),i的父节点为i/2
        var parent = Math.floor(i / 2);
        if (arrayHeap[i] < arrayHeap[parent]) {
            swap(i, parent, arrayHeap);
            i = parent;
        } else {
            break;
        }
    }
}

/**
 * arrayHeap 堆数组
 * i 元素下标
 * 
 * 让当前结点的左右儿子(如果有的话)作比较，得出最小的儿子
 * 再和它的父亲节点比较,若是比父亲节点来的小,就交换,
 * 并更新询问节点的下标为被交换的儿子节点下标，否则退出
 */
function shiftDowm(arrayHeap, i) {

    if (2 * i > arrayHeap.length) { //叶子节点，就不用再向下移了
        return;
    }

    var len = arrayHeap.length;
    if (len < 3) return;

    // 当前堆的节点数,注意根节点为1(有效元素从下标1开始)，因此节点数比数组长度少1
    var nodes = len - 1;

    //左节点没有超出总的节点数时
    while (2 * i <= nodes) {
        //小根堆 左右子节点
        var left = 2 * i;
        var right = 2 * i + 1;

        //存放和父作比较的子节点
        var min = left;

        //右节点没有超出总的节点数时, 比较左右节点大小
        if (right <= nodes) {
            min = arrayHeap[left] < arrayHeap[right] ? left : right;
        }

        // 父节点和最小的子节点比较
        if (arrayHeap[i] > arrayHeap[min]) {
            swap(i, min, arrayHeap);
            i = min;
        } else {
            break;
        }

    }

}

// 插入
function push(arrayHeap, x) {
    //思路：先在数组最后加入目标元素x
    arrayHeap.push(x);
    //然后向上推
    shiftUp(arrayHeap, arrayHeap.length - 1);
}

// 弹出
function pop(arrayHeap) {
    // 把顶元素弹掉
    // 注意：这和“删除堆中的任意元素”是两个概念
    // 思路：让根节点元素和尾节点进行交换，然后让现在的根元素下沉就可以了!

    var len = arrayHeap.length;
    if (len < 2) return; //没有节点

    var res;

    if (len > 2) { //2个以上节点才交换
        swap(1, len - 1, arrayHeap);

        // 删除最后一个并返回
        res = arrayHeap.pop();

        shiftDowm(arrayHeap, 1);
    } else { //只有一个节点
        // 删除最后一个并返回
        res = arrayHeap.pop();
    }
    return res;
}

// 取顶
function getTop(arrayHeap) {
    return arrayHeap[1];
}

// 堆化数组
function makeHeap3(array) {
    var nodes = array.length;
    //var arrayHeap = [null].concat(array);
    array.unshift(null);
    var arrayHeap = array;
    // nodes为堆中的最后一个叶子节点
    // 最后一个叶子节点的父节点为parent
    // 该父节点到根节点依次执行下沉操作
    var parent = Math.floor(nodes / 2);
    for (var i = parent; i >= 1; i--) {
        shiftDowm(arrayHeap, i);
    }
    return arrayHeap;
}
// 堆化数组
function makeHeap4(array) {
    var nodes = array.length;
    var arrayHeap = [null];
    //遍历数组array，通过push逐个插入到堆数组arrayHeap
    for (var i = 0; i < nodes; i++) {
        push(arrayHeap, array[i]);
    }
    return arrayHeap;
}

// LOG
// 小根堆,根节点为1(有效元素从下标1开始)
var arrayHeap = [null, 8, 5, 2, 10, 3, 7, 1, 4, 6];
// console.log('arrayHeap', arrayHeap);
// shiftUp(arrayHeap, 3)
// console.log('shiftUp test', arrayHeap);
// shiftDowm(arrayHeap, 4);
// console.log('shiftDowm test', arrayHeap);
// push(arrayHeap, 0);
// console.log('push test', arrayHeap);
// console.log('pop test', pop(arrayHeap));
// console.log('after pop', arrayHeap);
// console.log('top test', getTop(arrayHeap));
// var arrayTest = [8, 5, 2, 10, 3, 7, 1, 4, 6];
// console.log('makeHeap4', makeHeap4(arrayTest)); //[null, 1, 3, 2, 4, 8, 7, 5, 10, 6]
// // console.log('makeHeap3', makeHeap3(arrayTest));// [null, 1, 3, 2, 4, 5, 7, 8, 10, 6]
// console.log('arrayTest', arrayTest);

//堆排序(非降序排列)
//时间复杂度O(nlogN)
function heapSort(array) {
    //思路：开一个新的数组，每次取堆顶元素放进去，然后弹掉堆顶

    // 1.堆化数组array
    var arrayHeap = makeHeap4(array);

    var res = [];

    while (arrayHeap.length > 1) {
        console.log('---heap', arrayHeap);
        res.push(pop(arrayHeap));
    }

    return res;
}

var array = [11, 34, 2, 1, 6, 12];
console.log('array', array);
console.log('result', heapSort(array));


