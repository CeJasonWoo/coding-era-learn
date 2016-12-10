// 并查

// 问题：存在几个点 1 2 3 4 5，点之间连接情况是 1-2 3 4-5
// 求出：任意两点是否存在连通
// 1-2-3 数组表示 [1,2,3]

// 快速查找
// 思路
// 同一个集合的点在数组ids标记是相同的              
// 每个点对应的ID ids = [1,2,3,4,5] =>  点 1 2 3 4 5
// [1,2,3,4,5] union 1 2 , ids 变为 [2,2,3,4,5] => 1-2 3 4 5 ids数组中与第一个点的ID相同的值都改为第二个点的ID，也就是数组中的所有1都改为2
// [2,2,3,4,5] union 4 5 , ids 变为 [2,2,3,5,5] => 1-2 3 4-5 数组中的所有4都改为5
// [2,2,3,5,5] union 1 3 , ids 变为 [3,3,3,5,5] => 1-2-3 4-5 
// [3,3,3,5,5] union 1 4 , ids 变为 [5,5,5,5,5] => 1-2-3-4-5

// 如果全部点连为一体，那么ids数组中所有的id都是相同的，是在是妙！
// 参考自算法4 Union-Find http://algs4.cs.princeton.edu/15uf/
// 并查集详解 (转) http://blog.csdn.net/dellaserss/article/details/7724401/
// 高效，只要简单地确认两个点的父级（或者ID），就能确定两点是否在同一个集合

function UF(len) {
    this.ids = [];//每个点对应的ID
    for (var i = 1; i <= len; i++) {
        this.ids.push(i);
    }
}

// 替换a和b所在的集合为他们的并集
// ids数组中与a点的ID相同的值都改为b点的ID
UF.prototype.union = function (a, b) {

    if (this.connected(a, b)) return; //a和b已经同一个集合了

    var aid = this.find(a);
    var bid = this.find(b);

    for (var key in this.ids) {
        if (this.ids[key] === aid) {
            this.ids[key] = bid;
        }
    }
    return this.ids;
}

// a 和 b 是否有链接
// 也即是a和b是否在同一个集合 
// 只要判断a和b对应的id是否相同即可
UF.prototype.connected = function (a, b) {
    var aid = this.find(a);
    var bid = this.find(b);
    return aid === bid;
}

//返回a所在的集合
UF.prototype.find = function (a) {
    var res = this.ids[a - 1]; //注意这里的a-1
    return res;
}

console.log('union find quick test:');
var uf = new UF(5);
console.log(uf);
console.log('find 5', uf.find(5));
console.log('find 6', uf.find(6));
console.log('connected 5,4', uf.connected(5, 4));
console.log('connected 5,1', uf.connected(5, 1));
console.log('union 5,1', uf.union(1, 5));
console.log('connected 5,1', uf.connected(5, 1));
