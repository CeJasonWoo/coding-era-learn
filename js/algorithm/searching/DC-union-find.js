
// 动态连接
// 问题：存在几个点 1 2 3 4 5，点之间连接情况是 1-2 3 4-5
// 求出：任意两点是否存在连通
// 1-2-3 数组表示 [1,2,3]

// 元素是数组的实现，不推荐

// 并查
function UF(len) {
    this.sets = [];
    for (var i = 1; i <= len; i++) {
        this.sets.push([i]);
    }
}

// 替换a和b所在的集合为他们的并集
UF.prototype.union = function (a, b) {

    //先判断ab是否同一个集合
    // if(this.connected(a,b) === true){
    //     return;
    // }
    // TODO 需优化
    var aset = this.find(a);
    var bset = this.find(b);
    if(aset == bset) return;

    Array.prototype.push.apply(aset, bset); 
    //合并数组有很多方法，其中concat，slice都是返回新的数组 而push是在原数组基础上做改动

    bset.length = 0;//清空数组
    //删除可以使用splice，但是需要指定元素的下标

    return this.sets;

}

// a 和 b 是否有链接
// 也即是a和b是否在同一个集合 
// 缺点 每次调用改方法都要find两次，for循环两次
UF.prototype.connected = function (a, b) {
    var aset = this.find(a);
    var bset = this.find(b);
    return aset == bset;
}

//返回a所在的集合
UF.prototype.find = function (a) {
    var res = null;
    var set;
    for (var key in this.sets) {
        set = this.sets[key];
        if (set.indexOf(a) >= 0) { //searching a
            res = set;
            break;
        }
    }
    return res;
}

var uf = new UF(5);
console.log(uf);
console.log('find 5', uf.find(5));
console.log('find 6', uf.find(6));
console.log('connected 5,4', uf.connected(5, 4));
console.log('connected 5,1', uf.connected(5, 1));
console.log('union 5,1', uf.union(1, 5));
console.log('connected 5,1', uf.connected(5, 1));
