// lodash/fp FP Guide
// https://github.com/lodash/lodash/wiki/FP-Guide

// lodash/fp的特点

// Capped Iteratee Argument，封装 Iteratee 参数
    // 普通的实现
    _.map(['6', '8', '10'], parseInt);
    // fp的实现
    fp.map(parseInt)(['6', '8', '10']);
    
// Fixed Arity，固化参数个数，便于柯里化
    // `lodash/padStart` accepts an optional `chars` param.
    _.padStart('a', 3, '-')
    // ➜ '--a'

    // `lodash/fp/padStart` does not.
    fp.padStart(3)('a');
    // ➜ '  a'
    fp.padCharsStart('-')(3)('a');
    // ➜ '--a'

// Rearragned Arguments，重新调整参数位置，便于函数之间的聚合
    // `lodash/filter` is data-first iteratee-last:
    // (collection, iteratee)
    var compact = _.partial(_.filter, _, Boolean);
    compact(['a', null, 'c']);
    // ➜ ['a', 'c']

    // `lodash/fp/filter` is iteratee-first data-last:
    // (iteratee, collection)
    var compact = fp.filter(Boolean);
    compact(['a', null, 'c']);
    // ➜ ['a', 'c']

// Iteratee-first和Data-last的好处，用人话就是调换了接口的参数顺序有什么好处呢？
    // 请看最后

// New Methods

// Convert 
    // Specify capping iteratee arguments.
    'cap': true,
    // Specify currying.
    'curry': true,
    // Specify fixed arity.
    'fixed': true,
    // Specify immutable operations.
    'immutable': true,
    // Specify rearranging arguments.
    'rearg': true

// Chaining
    // using functional composition as an alternative to method chaining.
    // https://medium.com/making-internets/why-using-chain-is-a-mistake-9bc1f80d51ba

    // 传统写法
    (_.flatten(_.map([1, 2, 3], x => [x, x*2]))).slice().sort();

    // 使用chain后
    _.chain([1, 2, 3]).map(x => [x, x*2]).flatten().sort().value();
    _.chain使用带来的问题
    // 1.its most common use promotes importing the entirety of lodash to work
    // 很多时候只是用到很少一部分方法，但是却要引入全部的整个chain。
    // 2.it’s hard to extend with new methods.
    // 想在chain加入自己的方法很麻烦，要用到_.mixin或者_.thru,
    
    // 解决方案
    // 1.Currying 
    // partial application 部分应用，可以做到bound (locked-in)
    // Function currying 可以很好地做到partial application， create new functions that “lock in” values
    // 详细概念比较请看
    // Partial Application in JavaScript http://benalman.com/news/2012/09/partial-application-in-javascript/
    // 2.Composition 组合
        st add8 = (x) => add5(add3(x));
    const add8 = compose(add5, add3);
    // 3.1和2一起用
    flow(
        map(x => [x, x*2]),
        flatten,
        sortBy(x => x) 
    )([1,2,3]);

    // 其他问题
    // 问题1 Argument Ordering：Why are the arguments reversed?

    // 大神的解释
    // 从代码实现来看
    compose(
        sortBy(x => x), 
        flatten, 
        map(x => [x, x*2])
    );
    // 其实等价于下面，但是这种写法容易使人感到迷惑，所以有人使用flow格式让代码可读性更强
    sortBy(x => x)(
        flatten(
            map(x => [x, x*2])
        )
    )([1, 2, 3]);

    // 小白的解释
    // Iteratee-first和Data-last的好处，用人话就是调换了接口的参数顺序有什么好处呢？
    // 1.变得更加易读，请看下面解析
    var parseIntFunc = fp.map(parseInt);
    parseIntFunc(['6', '8', '10']);
    // 2.方便Compose，请看下面例子，toUpperHeadNames和toUpperHeadNamesWithoutL函数功能都是通过组合而来
    // from 知乎-刘旸 https://www.zhihu.com/question/36942520
    import toUpper from 'lodash/fp/toUpper';
    import head from 'lodash/fp/head';
    import flow from 'lodash/fp/flow';
    import filter from 'lodash/fp/filter';
    const names = ['liu', 'wang', 'chen'];
    const toUpperHeadNames = flow(
        toUpper,
        head
    );
    const toUpperHeadNamesWithoutL flow(
        toUpperHeadNames,
        filter(letter => letter !== 'L')
    );
    console.log(toUpperHeadNames(names)) // ['L', 'W', 'C']
    console.log(toUpperHeadNamesWithoutL(names)) // ['W', 'C']
    // 3.Iteratee-last和Data-first
    _.chain(['ab','cd','ef']).thru(vowels).value();

    // 我的反思
    // 同一个问题，大神是从代码为何这样实现的由来解答的，小白的解答却是‘现象描述’，他们不会让你理解为什么要用flow，高下立判。

    // 问题2 What happened to .value()
        // 使用组合，也就没了chain的.value()，但是
        // when monolithic， flow/flowRight内部也有用chain

