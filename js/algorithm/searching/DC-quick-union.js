// 动态连接
// 问题：存在几个点 1 2 3 4 5，点之间连接情况是 1-2 3 4-5
// 求出：任意两点是否存在连通
// 1-2-3 数组表示 [1,2,3]

// 快速合并
// 思路
// tree 
// 每个点对应的根节点 root，初始时根节点指向本身  ids = [1,2,3,4,5] =>  点 1 2 3 4 5
// [1,2,3,4,5] union 1 2 , ids 变为 [2,2,3,4,5] => 1->2 3 4 5 ,1的root改为2
// [2,2,3,4,5] union 4 5 , ids 变为 [2,2,3,5,5] => 1->2 3 4->5 ,4的root改为5
// [2,2,3,5,5] union 1 3 , ids 变为 [2,3,3,5,5] => 1->2->3 4->5 ,1的root是2, 2的root改为3
// [2,3,3,5,5] union 1 4 , ids 变为 [2,3,5,5,5] 
// => 1->2->3->5<-4 ,1的root是2, 2的root是3,3root3; 4root5 5root5; 3的root改为5

// 如果全部点连为一体，那么ids数组中所有的id都是相同的，妙！
// 参考自算法4 Union-root Quick-Union http://algs4.cs.princeton.edu/15uf/
// 并查集详解 (转) http://blog.csdn.net/dellaserss/article/details/7724401/
// 高效，只要简单地确认两个点的父级（或者ID），就能确定两点是否在同一个集合

// 缺点
// init：N
// union：N 也要递推查找两个点的root （注意，如果是 1 ，即只要修改一个数组元素，是有问题的写法，看union和unionRoot的区别）
// root: N 递推查找root

// 还是慢
// 1.更好的做法，目的都是为了避免tall tree

// 1.1权重 weighted-quick-union
// 小树作为大树的子树
// 1,2,3,4,5 weightings:[0,0,0,0,0] 
// 1->2 [0,1,0,0,0]
// 4->5 [0,1,0,0,1]
// union 1,3:1->2<-3 [0,1,0,0,1] 1root=2,w2 = 1;w3=0;w2 = w2+w3 = 1;
// union 1,4:1->2<-3 4->5->2 [0,2,0,0,1] 1root=2,w2=1;4root=5,w5=1; w2 = w2+w5 = 2;
// union 1,6:[0,2,0,0,1] 1root=2,w2=2; w6=0; w2>w6; w2=w2+w6=2; 
// 公式
// 注意 初始deep为0的，union前先赋值1，rootWeighting === 0, rootWeighting = 1; 
// rootWeighting = rootWeighting + childWeighting;

// 1.2路径压缩 path compression quick-union
// 每次find的时候每个节点的root改为最终的root，也可以说是把树展平
// 1-5
// 2-5
// 3-5
// 4-5
// 为了代码实现简便，也可以改为祖父根节点，也就是最终树的deep会是1，这种实现不如完全展平好 

// 1.3路径压缩+权重+快速合并

// 2.最好的做法
// 使用二进制表示集合


function UF(len) {
    this.ids = [];//每个点对应的root
    this.weightings = [];
    for (var i = 0; i < len; i++) {
        this.ids.push(i);
        this.weightings.push(0);
    }
}

// 替换a和b所在的集合为他们的并集
// 这个是反例 a点的root改为b点 
UF.prototype.union = function (a, b) {
    // 反例 这种写法会破坏之前建立的关系，详情看下面测试
    this.ids[a] = b;
    return this.ids;
}
// a点的root的root改为b点的root
UF.prototype.unionRoot = function (a, b) {
    var aid = this.root(a);
    var bid = this.root(b);

    this.ids[aid] = bid;

    //b作为a的root，深度加1
    if (this.weightings[bid] === 0) {
        this.weightings[bid] = 1;
    }
    this.weightings[bid] += this.weightings[aid];

    return { 'ids': this.ids.toString(), 'ws': this.weightings.toString() };
}
//  升级版 比较权重
UF.prototype.unionRootWeigthed = function (a, b) {
    var aid = this.root(a);
    var bid = this.root(b);

    if(aid === bid) return false;// root相同

    var bigTree, smallTree;
    if (this.weightings[aid] > this.weightings[bid]) {
        bigTree = aid;
        smallTree = bid;
    } else {
        bigTree = bid;
        smallTree = aid;
    }
    //大树作为小树的root
    this.ids[smallTree] = bigTree;

    //b作为a的root，深度加1
    if (this.weightings[bigTree] === 0) {
        this.weightings[bigTree] = 1;
    }
    this.weightings[bigTree] += this.weightings[smallTree];

    return { 'ids': this.ids.toString(), 'ws': this.weightings.toString() };
}

// a 和 b 是否有链接
// 也即是a和b是否在同一个集合 
// 只要判断a和b对应的root是否相同即可
UF.prototype.connected = function (a, b) {
    var aid = this.root(a);
    var bid = this.root(b);
    return aid === bid;
}

//返回a所root
UF.prototype.root = function (a) {
    // var index = a;
    // var root = this.ids[a];
    // while(root != index){
    //     index = root;
    //     root = this.ids[index];
    // }
    // return root;

    // // 优雅版
    // while (a != this.ids[a]) {
    //     a = this.ids[a];
    // }
    // return a;


    // 路径压缩
    // 非完全展平 : 为了代码实现简便，root改为祖父根节点
    // 1<-2<-3 => 2->1<-3
    while (a != this.ids[a]) {
        // console.log('---a=', a, this.ids[this.ids[a]], !!this.ids[this.ids[a]]);
        if (this.ids[this.ids[a]] || this.ids[this.ids[a]] === 0){ // grandfather存在时
            this.ids[a] = this.ids[this.ids[a]]; // 只要一句代码，效率产生质的变化！！！！！！！！！
        }
        a = this.ids[a];
    }
    return a;
}

console.log('union root quick test:');
var uf = new UF(5);// 0 1 2 3 4
console.log(uf);
console.log('root 4', uf.root(4));
console.log('root 6', uf.root(6));
console.log('connected 4,3', uf.connected(4, 3));
console.log('connected 4,1', uf.connected(4, 1));

function unionRootTest() {
    console.log('union 4,1', uf.unionRoot(4, 1));
    console.log('union 2,3', uf.unionRoot(2, 3));

    // 比较union unionRoot
    // console.log('union 4,2', uf.unionRoot(4, 2)); // 1 root 3
    // console.log('union 4,2', uf.union(4, 2)); //4 root 2 ，这样就会改了4和1的关系 ,破坏了之前的线
    // console.log('connected 4,1', uf.connected(4, 1));//false 关系被union(4, 2)破坏了

    console.log('union 1,2', uf.unionRoot(1, 2)); //1 root 2 
    console.log('union 1,0', uf.unionRoot(1, 0)); //1 root 0;w 3,1,0,2,0
}
unionRootTest();

function unionRootWeigthedTest() {
    console.log('union 4,1', uf.unionRootWeigthed(4, 1)); // 4->1
    console.log('union 2,3', uf.unionRootWeigthed(2, 3)); // 2->3
    console.log('union 1,2', uf.unionRootWeigthed(1, 2)); // 1root1,2root3;1->3 
    console.log('union 1,0', uf.unionRootWeigthed(1, 0)); //0 root 1;w 0,1,0,2,0
}
// unionRootWeigthedTest();

// console.log('root 2', uf.root(2));// root 03303
// console.log('root 1', uf.root(1));// root 00000

console.log('connected 4,2', uf.connected(4, 2));

// TODO 还要优化成可以自定义参数 option = {weighted：true， pathCompression:true}
// 快速合并
// 权重比较+快速合并
// 路径压缩+快速合并
// 路径压缩+权重+快速合并
// and
// 使用二进制表示集合