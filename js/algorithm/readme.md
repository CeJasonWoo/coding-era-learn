# Algorithm 算法

## 时间复杂度

- 参考 
  - [如何计算时间复杂度](http://m.blog.csdn.net/article/details?id=8008987)
  - [理解O(log2N)和O(Nlog2N)](http://m.blog.csdn.net/article/details?id=52775202)

- 大O记法
  >（n表示数据规模， “O”表示量级 ）

  - O(1) 常数阶 我的理解(与n无关)
  - O(n) 线性阶 我的理解(单个for循环)
  - O(n^2) 平方阶 我的理解(2重for循环嵌套)
  - O(n^3) 立方阶 我的理解(3重for循环嵌套)
  - O(log2n)  对数阶 我的理解(递归)
  - O(n*log2n)  线性对数阶
  - k次方阶O(n^k)
  - 指数阶O(2^n)

  > 其中 O(2^n) 不实用， O(log2n) 在n比较大时效率较高

- 空间复杂度
  > 执行算法所要用到的内存

- 常用排序算法之性能比较
  - [Big-O Algorithm Complexity Cheat Sheet](http://www.bigocheatsheet.com/)
  - [Big O Reference](http://bigoref.com/)
  - [Big-O Complexities pdf download](https://github.com/ro31337/bigoposter/blob/master/bigoposter.pdf)
    利用图表，可以根据不同数据规模n找到合适的算法和数据结构
  - [数据结构和算法动态可视化](https://zh.visualgo.net/)
    可视化非常有助于理解抽象的问题








## Sorting 排序
- 冒泡排序
- 插入排序
- 选择排序
- 归并排序
- 快读排序
- 堆排序
- 希尔排序 Shell Sort(h=2^k-1)
- 桶排序 Bucket sort
- 基数排序 Radix sort











## Searching 查找
- Depth First Search (DFS)
- Breadth First Search (BFS)
- 二分查找
- 线性查找 Linear (Brute force)
- 最短路径
  - Shortest path by Dijkstra,Min-heap as priority queue
  - Shortest path by Dijkstra,unsorted array as priority queue
  - Shortest path by Bellman-Ford











## Common Data Structure 常规数据结构
- 参考
  - [js数据结构](https://segmentfault.com/bookmark/1230000002226693)

- 数组
  - Access	
  - Search	
  - Insertion
  - Deletion
- 栈 
- 队列
- 链表    
  - 单向链表 Singly-Linked List
  - 双向链表 Doubly-Linked List	
  - 跳表 Skip List
- 哈希表
- 二叉树
- 笛卡尔树 Cartesian Tree
- B-Tree
- Red-Black Tree
- 伸展树 Splay Tree
- AVL Tree
- KD Tree
- 堆
  - Binary Heap 默认
  - Binomial Heap 
  - Fibonnaci Heap
- 图
  - Adjacency List 邻接表
  - Incidence List 关联表
  - Adjacency Matrix 邻接矩阵
  - Incidence Matrix

- 字典
- 散列

- trie树
- 动态规划

- +ΟΟ
  - 分治法
  - 归并法
  - 递推法
  - 递推法
  
  - 枚举子集
  - Fibonacci数列
  - 二进制算法思想











## 参考
- [英文术语](http://www.nowamagic.net/librarys/veda/detail/1866) menu
- [常用排序算法之JavaScript实现](https://segmentfault.com/a/1190000000656344#articleHeader8) done

    一、插入排序 二、二分插入排序 三、选择排序 四、冒泡排序 五、快速排序 六、堆排序 七、归并排序 八、桶排序 九、计数排序

- [javascript常用经典算法实例详解](http://www.jb51.net/article/75437.htm) done

    线性查找 二分查找 字符串反转 单链表实现 堆排序 
    不相交集合查找、合并 归纳法 多数问题 全排列 分治法 split算法的思想应用
 
- [常见算法是js实现汇总](http://www.cnblogs.com/super-d2/archive/2011/10/16/2212865.html) done

    去重 十六进制颜色值的随机生成 求字符串长度 希尔排序 js模拟多线程 近似字符串匹配问题
    来文史特距离(Levenshtein Distance)

- [JavaScript探索者](http://www.108js.com/index5.html) lib

- [一步一步写算法](http://blog.csdn.net/feixiaoxing/article/category/878822/4) menu

- [xingoo博客](http://www.cnblogs.com/xing901022/category/414816.html) menu

  - AVL树 非递归版归并排序 希尔排序
  - 二叉排序树1 二叉排序树的删除操作
  - AOE关键路径 
  - AOV网络拓扑排序
  - Floydjs-questions.js
  - Dijkstra
  - Kruskal算法 Kruskal算法-最小生成树
  - Prim算法
  - 邻接图的深度广度优先遍历
  - 矩阵图的深度广度遍历
  - 经典二叉树
  - KMP算法初探 循环队列 共享栈 栈 
  - 链表之链式存储 链表之顺序存储 
  - 大数加法 精度计算-乘法（大数乘大数） 精度计算-大数乘小数  精度计算-大数阶乘-ACM常用算法
  - Gossip费氏数列
  - 最大团问题-分支限界 0-1背包-分支限界 布线问题-分支限界法
  - 河内之塔
  - 圆排列问题-回溯法 0-1背包-回溯法 n后问题-回溯法 符号三角形问题-回溯法 批处理作业调度-回溯法 装载问题-回溯法 回溯法算法框架
  - 图m着色问题
  - 单源最短路径
  - 贪心算法 活动安排问题--贪心算法
  - 0-1背包
  - 流水作业调度
  - 多边形游戏
  - 最大子段和
  - 最长公共子序列
  - 动态规划 动态规划基本要素
  - 矩阵连乘
  - 大整数乘法
  - 二分搜索技术 不相交集类 不相交集类应用：迷宫生成 
  - STL priority实例 
  - 二项队列 斜堆 左式堆 二叉堆
  - 散列 
  - B树 B-树 B+树 B*树
  - 伸展树
  - AVL树

- [汤姆大叔的博客 深入理解JavaScript系列](http://www.cnblogs.com/TomXu/archive/2011/12/15/2288411.html) base


- [知识库 算法与数据结构](http://lib.csdn.net/base/datastructure) lib

- [李可可的博客](http://cobain-li.iteye.com/category/365366) done
  - 数据结构与算法-字典(js实现)
  - 数据结构与算法－链表(js实现)
  - 数据结构与算法－队列篇(js实现)
  - 数据结构与算法－栈篇(js实现)

- github
  日本人写的算法动画，可做参考 https://github.com/norahiko/sort-visualize
