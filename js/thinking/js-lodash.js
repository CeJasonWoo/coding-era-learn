
// Lodash简介  pinggod的博客
// http://www.jianshu.com/p/7436e40ac5d1
/**
    模块组成
    Array，适用于数组类型，比如填充数据、查找元素、数组分片等操作
    Collection，适用于数组和对象类型，部分适用于字符串，比如分组、查找、过滤等操作
    Function，适用于函数类型，比如节流、延迟、缓存、设置钩子等操作
    Lang，普遍适用于各种类型，常用于执行类型判断和类型转换
    Math，适用于数值类型，常用于执行数学运算
    Number，适用于生成随机数，比较数值与数值区间的关系
    Object，适用于对象类型，常用于对象的创建、扩展、类型转换、检索、集合等操作
    Seq，常用于创建链式调用，提高执行性能（惰性计算）
    String，适用于字符串类型

    lodash/fp 模块提供了更接近函数式编程的开发方式，其内部的函数经过包装，
    具有 immutable、auto-curried、iteratee-first、data-last（官方介绍）等特点。
    具体请看js-lodash-fp.js
 */

// Filip Zawada博客 Lodash提高执行速度的思路
// 《How to Speed Up Lo- Dash ×100 ? Introducing Lazy Evaluation》
// http://filimanjaro.com/blog/2014/introducing-lazy-evaluation/

// Lazy Evaluation 懒执行
/**
    // 操作99,999个元素的效率提升
    var phoneNumbers = [5554445555, 1424445656, 5554443333, … ×99, 999];
    // get 100 phone numbers containing „55”
    function contains55(str) {
        return str.contains("55");
    };

    // 先对全部元素执行filter，然后取出100个, value方法真正执行
    var r = _(phoneNumbers).filter(contains55).take(100).value();

    // 进一步优化：每次map遍历都filter and take，直到取出100个结果为止，这样就不用遍历全部99,999个元素！
    var r = _(phoneNumbers).map(String).filter(contains55).take(100);
 */

// Pipelining 懒执行的好处：管道
/**
    // 可读性大大提升，直观性类似+-运算符号
    var result = _(source).map(func1).map(func2).map(func3).value();
 */

// Deferred execution 懒执行的好处：延迟执行
/**
     var wallet = _(assets).filter(ownedBy('me'))
        .pluck('value')
        .reduce(sum);
    $json.get("/new/assets").success(function (data) {
        assets.push.apply(assets, data); // update assets
        wallet.value(); // returns most up-to-date value
    });
 */


// 10 个可用 ES6 替代的 Lodash 特性
// http://www.zcfy.cc/article/10-lodash-features-you-can-replace-with-es6-467.html
// 英文版 《10 Lodash Features You Can Replace with ES6》
// https://www.sitepoint.com/lodash-features-replace-es6/
1. Map, Filter, Reduce
2. Head & Tail
3. Rest & Spread
4. Curry
5. Partial
6. Operators
7. Paths
8. Pick
9. Constant, Identity, Noop
10. Chaining & Flow