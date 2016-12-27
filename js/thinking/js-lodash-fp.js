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

    // 1.变得更加易读，请看下面解析
    var parseIntFunc = fp.map(parseInt);
    parseIntFunc(['6', '8', '10']);

    // 2.方便Compose，请看下面例子，toUpperHeadNames和toUpperHeadNamesWithoutL函数功能都是通过组合而来
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
    using functional composition as an alternative to method chaining.
    https://medium.com/making-internets/why-using-chain-is-a-mistake-9bc1f80d51ba


