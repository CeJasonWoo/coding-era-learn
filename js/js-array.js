/**
 
Array 对象api文档
https://msdn.microsoft.com/zh-cn/library/ff679976(v=vs.94).aspx
 */

/**

// // // // // // // // // // //// // // // // // // // // // 
// 遍历操作
// // // // // // // // // // //// // // // // // // // // //

array1.map(callbackfn[, thisArg])

对数组中的所有元素调用指定的回调函数。该回调函数的返回值为累积结果
array1.reduce(callbackfn[, initialValue])







// // // // // // // // // // //// // // // // // // // // // 
// 合并操作
// // // // // // // // // // //// // // // // // // // // //

[Immutable]

返回newArray
组合两个或两个以上的数组
array1.concat([item1[, item2[, . . . [, itemN]]]]) 

[Mutable]

push技巧
将新数组追加到一个数组
Array.prototype.push.apply(arrayObj, [item1])





// // // // // // // // // // //// // // // // // // // // // 
// 插入操作
// // // // // // // // // // //// // // // // // // // // //

[Mutable]

将新元素追加到一个数组
arrayObj.push([item1 [item2 [. . . [itemN ]]]])
用法：
my_array.push (5, 6, 7);

在数组的开头插入新元素。
arrayObj.unshift([item1[, item2 [, . . . [, itemN]]]])






// // // // // // // // // // //// // // // // // // // // // 
// 移除操作
// // // // // // // // // // //// // // // // // // // // //

[Immutable]

返回newArray
返回一个数组中的一部分。
arrayObj.slice(start, [end]) 

[Mutable]

从一个数组中移除元素
arrayObj.splice(start, deleteCount, [item1[, item2[, . . . [,itemN]]]])

从数组中移除最后一个元素并返回该元素。
arrayObj.pop( )

从数组中移除第一个元素并将返回该元素
arrayObj.shift( )






// // // // // // // // // // //// // // // // // // // // // 
// 其他操作
// // // // // // // // // // //// // // // // // // // // //

对 Array 排序。
arrayobj.sort(sortFunction) 
function sortFunction(first, second){
    if (first == second)
        return 0;
    if (first < second)
        return -1;
    else
        return 1; 
}

找出数组中最大元素
Math.max.apply(this, targetArray)

slice技巧
将 array-like object 转换为 true array. 
var argsArray = Array.prototype.slice.apply(argsObj);
名词解释：
[array-like object]
拥有 length 属性的对象，比如 { 0: ‘foo', length: 1 }, 甚至 { length: ‘bar' }. 
最常见的 array-like 对象是 arguments 和 NodeList. 




// // // // // // // // // // //// // // // // // // // // // 
// 技巧
// // // // // // // // // // //// // // // // // // // // //

用 Array.prototype.slice 还是 [].slice ? （from http://www.jb51.net/article/24956.htm）
从理论上讲，[] 需要创建一个数组，性能上会比 Array.prototype 稍差。
但实际上，这两者差不多，就如循环里用 i++ 还是 ++i 一样，纯属个人习惯。

个人理解
还是用slice举例，大体上有2种用法：
1.arrayObj.slice()
2.Array.prototype.slice() 
其实1的内部实现就是基于2，巴拉巴拉，所以用法2可以解锁很少隐藏技能，真的很好玩


 */



