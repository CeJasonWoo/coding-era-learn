
// 概念
// http://www.cnblogs.com/mcgrady/archive/2013/09/23/3335847.html
// 代码参考 js数据结构和算法（四）图和图算法
// https://segmentfault.com/a/1190000002410553

// 图的表示
// 顶点 V(G)={V1，V2，V3，V4，V5}
// 边 E(G)={(V1，V2)，(V1，V4)，(V2，V3)，(V2，V5)，(V3，V4)，(V3，V5)，(V4，V5)}

// 图的存储
// 邻接矩阵
// 邻接表

/**
 * 图 邻接矩阵
 * @parameter vertices 顶点集合
 */
function Graph(vertices) {
    this.vertices = vertices;//所有顶点，一维数组[]
    var vlen = vertices.length;
    this.edges = {};//key-[] 或者 二维数组 
    for (var i = 0; i < vlen; i++) {
        this.edges[vertices[i]] = [];//[][]

    }
    this.visits = {};//遍历图专用
    for (var i = 0; i < vlen; i++) {
        this.visits[vertices[i]] = false;

    }
}

/**
 * 顶点 一维null 二维xy 三维xyz
 * @parameter label 顶点
 */
function Vertex(label) {
    this.label = label;
    // this.x = x;
    // this.y = y;

    this.isVisited = false; // js修改困难，还是另外使用一个访问数组存被访问的点

    this.toString = function () {
        return this.label.toString();
    }
}

/**
 * 边 
 * (v -> w) 表示为 edges[v][w]
 * (w -> v) 表示为 edges[w][v]
 * 
 * 邻接矩阵
 *   v  w
 * v 0  vw
 * w wv 0
 * 
 * @parameter v 顶点
 * @parameter w 顶点
 * @value 权值 两点间距离
 * @oriented 1为实线 0为不存在 [v][w]=1 则 v->w
 */
Graph.prototype.addEdge = function addEdge(v, w, value, oriented) {
    this.edges[v.toString()].push(w.toString());
    this.edges[w.toString()].push(v.toString());
    // this.edges++;

    this.value = value;//权值
    this.oriented = oriented;//方向
}

// 深度优先搜索：
Graph.prototype.dfs = function (v) {

    if (!v) v = this.vertices[0];
    if (this.visits[v.toString()] === true) return false;
    this.visits[v.toString()] = true; //todo this.visits.length = 0; //先清空数组
    var vEdges = this.edges[v.toString()];
    var d = vEdges.length; //v的度 无向图： d 有向图： 出度od 入度id

    console.log('---dfs', v.toString(), vEdges);

    if (d === 0) return false;
    for (var i = 0; i < d; i++) {
        //递归
        var vchild = vEdges[i];
        var res = this.dfs(vchild);
        if (res === false) continue;
    }

}

// 广度优先搜索：
Graph.prototype.bfs = function (s) {

    // 为什么要使用队列呢？
    // 比如：1[234] 2[15] 3[16] 4[17]
    //   1   【1层】
    // / | \
    // 4 3 2 【2层】
    // | | |
    // 7 6 5 【3层】
    // 我们要确保2层顶点遍历完才从3层开始遍历，通过队列就能保证遍历完每层的所有顶点
    // 遍历顶点1时，第二层顶点[234]加入队列 
    // 遍历2，2的下一层顶点5加入队列 然后是3的6，4的7
    var queue = [this.vertices[0].toString()];    //队列  

    this.visits.length = 0; //先清空数组
    this.visits[this.vertices[0].toString()] = true;

    while (queue.length > 0) {
        var v = queue.shift();//从队首移除  
        var es = this.edges[v]; //取出下层顶点
        for (var key in es) {
            if (this.visits[es[key]] === false) {
                queue.push(es[key])
                this.visits[es[key]] = true;
            }
        }
        console.log('bfs v =', v, queue);
    }

    //  for (var i in this.edges) {
    //     console.log('---bfs', i); // key
    //      this.visits[i] = true;
    //     var vlen = this.edges[i].length; // value
    //      for (var j = 0; j < vlen; j++) {
    //         if (this.visits[this.edges[i][j]] === true) continue;
    //         console.log('---00bfs', this.edges[i][j]); // key

    //         this.visits[this.edges[i][j]] = true;  

    //      }
    // }

}

// 画图
//   1
// / | \
// 4 3 2
// | | |
// 7 6 5
// 
// 邻接矩阵
// 0  1  2  3  4  5  6  7 
// 1  0  1  1  1          
// 2  1  0        1       
// 3  1      0       1    
// 4  1        0        1 
// 5     1        0       
// 6        1        0    
// 7           1        0  
function paint() {
    var v1 = new Vertex('11');
    var v2 = new Vertex('21');
    var v3 = new Vertex('31');
    var v4 = new Vertex('41');
    var v5 = new Vertex('51');
    var v6 = new Vertex('61');
    var v7 = new Vertex('71');
    var vs = [v1, v2, v3, v4, v5, v6, v7];//顶点集合 一维null 二维xy 三维xyz
    var g = new Graph(vs);
    g.addEdge(v1, v2);
    g.addEdge(v1, v3);
    g.addEdge(v1, v4);
    g.addEdge(v2, v5);
    g.addEdge(v3, v6);
    g.addEdge(v4, v7);
    return g;
}
var g = paint();
console.log('Graph', g); //v = {1234567} e = {1[234] 2[15] 3[16] 4[17]}
// g.dfs();// 1 2 5 3 6 4 7
g.bfs();// 1 2 3 4 5 6 7



// //定义类  
// function Graph(v) {
//     this.vertices = v; //顶点  
//     this.vertexList = [];
//     this.edges = 0;
//     this.adj = [];
//     for (var i = 0; i < this.vertices; ++i) {
//         this.adj[i] = [];
//     };
//     //方法  
//     this.addEdge = addEdge;
//     this.showGraph = showGraph;
//     this.marked = [];
//     this.dfs = dfs;    //深度优先  
//     for (var i = 0; i < this.vertices; ++i) {
//         this.marked[i] = false;
//     };
//     this.bfs = bfs;    //广度优先  
//     this.edgeTo = [];   //最短距离，保存一个顶点到下一个顶点的所有边  
//     this.pathTo = pathTo;
//     this.hasPathTo = hasPathTo;
//     this.topSortHelper = topSortHelper;
//     this.topSort = topSort;
// }

// //类对应的方法  
// function addEdge(v, w) {
//     this.adj[v].push(w);
//     this.adj[w].push(v);
//     this.edges++;
// }


// // 用于显示符号名字而非数字的新函数,打印所有顶点及其相邻顶点列表  
// function showGraph() {
//     var visited = [];
//     for (var i = 0; i < this.vertices; ++i) {
//         var str = '';
//         visited.push(this.vertexList[i + 1]);
//         for (var j = 0; j < this.vertices; ++j) {
//             if (this.adj[i][j] != undefined) {
//                 if (visited.indexOf(this.vertexList[j]) < 0) {
//                     str += this.adj[i][j] + ' ';
//                 }
//             }

//         }
//         console.log(i + '->' + str);
//         visited.pop();
//     }
// }
// //深度优先  
// function dfs(v) {
//     this.marked[v] = true;
//     if (this.adj[v] != undefined) {
//         console.log("Visited vertex: " + v);
//     }
//     for (var w of this.adj[v]) {
//         if (!this.marked[w]) {
//             this.dfs(w);
//         }
//     }
// }
// //广度优先  
// function bfs(s) {
//     var queue = [];    //队列  
//     this.marked[s] = true;
//     queue.push(s);    //添加到队尾,如果用unshift则会由右往左遍历，显示0 2 1 3 4   
//     while (queue.length > 0) {
//         var v = queue.shift();//从队首移除  
//         if (typeof (v) != 'string') {
//             console.log("Visited vertex:" + v);
//         };
//         for (var w of this.adj[v]) {
//             if (!this.marked[w]) {
//                 this.edgeTo[w] = v;
//                 this.marked[w] = true;
//                 queue.push(w);
//             }
//         }
//     }
// }


// function pathTo(startVertices, v) {
//     var source = startVertices;             //bfs遍历的开始的点，根据调用bfs传入的参数修改  
//     if (!this.hasPathTo(v)) {
//         return undefined;
//     }
//     var path = [];
//     for (var i = v; i != source; i = this.edgeTo[i]) {
//         path.push(i);
//     }
//     path.push(source);
//     return path;
// }
// function hasPathTo(v) {
//     return this.marked[v];
// }
// //显示最短距离路径显示的函数  
// function showShortDiatance(paths) {
//     var str = '';                 //以下都为输出顺序的显示  
//     while (paths.length > 0) {
//         if (paths.length > 1) {
//             str += paths.pop() + '-';
//         }
//         else {
//             str += paths.pop();
//         }
//     }
//     console.log(str);
// }
// //拓扑排序  
// function topSort() {
//     var stack = [];
//     var visited = [];
//     for (var i = 0; i < this.vertices; i++) {
//         visited[i] = false;
//     }
//     for (var i = 0; i < this.vertices; i++) {
//         if (visited[i] == false) {
//             this.topSortHelper(i, visited, stack);
//         }
//     }
//     for (var i = 0; i < stack.length; i++) {
//         // if (stack[i] != undefined && stack[i] !== false) {     //stack[i] = 0，但是0 != false 是true，所有应该用严等于  
//         console.log(this.vertexList[stack[i]]);
//     }
// }  

// function topSortHelper(v, visited, stack) {
//     visited[v] = true;
//     for (var w in this.adj[v]) {
//         if (!visited[w]) {
//             this.topSortHelper(visited[w], visited, stack);
//         }
//     }
//     stack.push(v);
// }

// //测试拓扑结构  
// var g = new Graph(6);
// g.addEdge(1, 2);
// g.addEdge(2, 5);
// g.addEdge(1, 3);
// g.addEdge(1, 4);
// g.addEdge(0, 1);
// g.vertexList = ["CS1", "CS2", "Data Structures",
//     "Assembly Language", "Operating Systems",
//     "Algorithms"];
// g.showGraph();
// g.topSort();

//测试其他函数  
/*g = new Graph(5); 
g.addEdge(0,1); 
g.addEdge(0,2); 
g.addEdge(1,3); 
g.addEdge(2,4); 
var startVertices = 0;*/
//console.time('dfs');  
//g.dfs(startVertices);            //用时4ms  
//console.timeEnd('dfs');  
//console.time('bfs');  
//g.bfs(startVertices);              //用时16ms  
//console.timeEnd('bfs');  
//var endVertices = 2;   //从bfs的起点到vertex的最短路径  
//var paths = g.pathTo(startVertices,endVertices);  
//showShortDiatance(paths);  