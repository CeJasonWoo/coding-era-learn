
// 归并排序 merge
// 形象的理解，？？

var array = [11, 34, 2, 1, 6, 12];

// 合并两个有序数组为一个有序数组
// 注意 arrayA 和 arrayB 是有序数组
function mergeSort(arrayA, lenA, arrayB, lenB) {

    // 存放两个有序数组比较好的结果
    var arrayC = [];

    var i = j = 0;
    while (i < lenA && j < lenB) {

        console.log('mergeSort---i=', i, '---j=', j, 'a=', arrayA, 'b=',arrayB, arrayC);

        if (arrayA[i] < arrayB[j]) {
            arrayC.push(arrayA[i]);
            i += 1;
        } else if (arrayA[i] > arrayB[j]) {
            arrayC.push(arrayB[j]);
            j += 1;
        }

    }
    console.log('mergeSort---i=', i, '---j=', j, 'a=', arrayA, 'b=',arrayB, arrayC);

    if (i < lenA) {
        arrayC.push.apply(arrayC, arrayA.slice(i));
    }
    if (j < lenB) {
        var tempB = arrayB.slice(j);
        // 注意 concat是返回新的数组，不改变原有数组，会造成资源浪费
        // arrayC.concat(tempB);
        // 推荐下面的写法
        arrayC.push.apply(arrayC, tempB);
    }

    console.log('mergeSort result=', arrayC);
    return arrayC;
}

// var a = [1, 3, 5];
// var b = [2, 4, 6];
// var c = mergeSort(a, a.length, b, b.length);
// console.log('result', c);


function mergeSortMethod(arrayTarget) {

    // 分治法，将arrayTarget数组拆分成两个子数组a和b，见1
    // 确保数组a和b必须是有序的,通过递归拆分，直至拆分为两个有序数组，见2，3
    // 合并两个有序数组：比较a和b相同下标的值，最小的值存入数组c，直到a和b完全合并到c，实现过程见4

    var len = arrayTarget.length;

    //3.递归的终点，当只剩下一个元素的时候，可以认为这个是有序数组
    if (len < 2) return arrayTarget;

    //1.拆分为两个子数组
    var target = (len % 2 == 0) ? len / 2 : (len - 1) / 2;
    var arrayA = arrayTarget.slice(0, target);
    var arrayB = arrayTarget.slice(target);

    //2.递归,目的是确保返回的a，b是有序数组
    var a = mergeSortMethod(arrayA);
    var b = mergeSortMethod(arrayB);

    console.log('arrayTarget=', arrayTarget, 'a=', a, 'b=', b);

    //4.归并比较
    return mergeSort(a, a.length, b, b.length);

}
console.log('result', mergeSortMethod(array));


// 空间复杂度还需优化
// mergeSortMethod每次递归slice都new了2个新的数组

