


// 快速排序
// 形象的理解 (o o o) o (o o o)

var array = [11, 34, 2, 1, 6, 12];


//递归的方式实现
function quickSortMethod(targetArray) {
    var len = targetArray.length;

    //4.这里是递归的终点，长度小于2的数组已经是排序的最终结果
    if (len < 2) return targetArray;

    //1.先找一个基准，这里找中间位置的作为基准
    var target = (len % 2 === 0) ? len / 2 : (len + 1) / 2;

    //2.遍历，小于基准的元素放在left，大于基准的元素放在right
    var left = [], right = [];
    for (var i = 0; i < len; i++) {
        if (targetArray[i] < targetArray[target]) {
            left.push(targetArray[i]);
        } else if (targetArray[i] > targetArray[target]) {
            right.push(targetArray[i]);
        }
        //如果出现targetArray[i] = targetArray[target]时，或许应该加一个mid数组
    }

    console.log('---targetArray=', targetArray,
        'left=', left,
        'target value=', targetArray[target], 'target=' + target,
        'right=', right
        );

    //3.递归调用     
    return quickSortMethod(left).concat(targetArray[target]).concat(quickSortMethod(right));


}

console.log('result', quickSortMethod(array));

