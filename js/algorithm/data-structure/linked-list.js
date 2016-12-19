/*
参考
单向链表 http://blog.csdn.net/yinhaixiang/article/details/46048163

提醒：下面这个博客的内容仅供参考思路，代码实现命名等非常糟糕，作为反例
数据结构与算法－单向链表(js实现) http://cobain-li.iteye.com/blog/2337634
数据结构与算法－双向链表(js实现) http://cobain-li.iteye.com/blog/2337898
数据结构与算法－循环链表(js实现) http://cobain-li.iteye.com/blog/2340642

SkipList跳表基本原理 http://blog.sina.com.cn/s/blog_72995dcc01017w1t.html
*/

// 本人参考了java源码实现

// 提示 
// linked有涉及js引用的知识，关注js的引用指针，请看js-pointer

// 单向链表 Insert fast Search slow
// 0->1->2->3->4->5->null
// 双向链表 
// null<->0<->1<->2<->3<->4<->5<->null
// 循环
// 0-1-2-3-4-5-0

// add() 添加元素 默认从最后添加
// clear() 清空链表
// contains(element) 是否包含元素
// display() 显示链表
// get(index) 得到索引位置的元素 from 0 to size-1
// isEmpty() 链表是否为空
// remove(index) 移除索引位置的元素
// reverse() 倒置链表
// set(index, element) 向链表指定位置设置修改元素
// size() 返回链表的长度

// 节点
function Node(prev, element, next) {
    this.element = element;//当前节点的数据 

    this.prev = prev;//前一个节点数据  
    this.next = next;//下一个节点数据  
}

// 链表
function LinkedList() {
    this.first = null;
    this.last = null;
    this.size = 0;
}

LinkedList.prototype.size = function () {
    return this.size;
}

LinkedList.prototype.isElementIndex = function (index) {
    return index >= 0 && index < this.size;
}
LinkedList.prototype.checkElementIndex = function (index) {
    if (!this.isElementIndex(index)) throw 'IndexOutOfBoundsException:Jason is the King';
}

LinkedList.prototype.isEmpty = function () {
    return this.size == 0 && this.first == null;
}

// Links element as first element.
LinkedList.prototype.linkLast = function (element) {
    //prevNode-newNode-null
    //null-newNode-null => fisrt = last = newNode

    var prev = this.last;// 保存原先最后一个node的引用
    var newNode = new Node(prev, element, null);
    this.last = newNode;
    if (prev) {
        prev.next = newNode;
    } else {//初始时 first = last = null
        this.first = newNode;
    }
    this.size += 1;
}
// Links element as last element.
LinkedList.prototype.linkFirst = function (element) {
    //null-newNode-lastNode
    //null-newNode-null => fisrt = last = newNode

    var next = this.first;// 保存原先第一个node的引用
    var newNode = new Node(null, element, next);
    this.first = newNode;//修改第一个node的引用
    if (next) {
        next.prev = newNode;
    } else {//初始时 first = last = null
        this.last = newNode;
    }
    this.size += 1;
}
// Inserts element before non-null Node.
LinkedList.prototype.linkBefore = function (element, beforeNode) {

}

LinkedList.prototype.add = function (element) {
    // 这种写法在add重载时可以用，但是可读性不好
    // var newelement = arguments[0];// add参数个数有多个 
    // var index = arguments[1] || this.size;// add参数个数有多个 

    // 默认在最后添加元素
    this.linkLast(element);
    return true;
}

LinkedList.prototype.display = function () {
    console.log('first', this.first, 'last', this.last, 'size', this.size);
    var target = this.first;
    while (target.next) {
        target = target.next;
        console.log('---', target);
    }
}

/**
 * @return the target element
 * @throws IndexOutOfBoundsException 
 */
LinkedList.prototype.get = function (index) {
    this.checkElementIndex(index);
    var target;
    if (index <= (this.size >> 1)) { //index小于中间值从开始查找
        target = this.first;//从index=0开始
        for (var i = 0; i < index; i++) {//从index=1执行循环
            target = target.next;
        }
    } else { //index大于中间值从最后查找
        target = this.last;//从size-1开始
        for (var i = this.size - 1; i > index; i--) {//从index=size-2执行循环
            target = target.prev;
        }
    }
    return target;
}

/**
 * @return the element previously at the specified position
 * @throws IndexOutOfBoundsException 
 */
LinkedList.prototype.set = function (index, element) {
    // this.checkElementIndex(); //get方法已经校验，TODO 这种设计似乎不合理,待优化
    var target = this.get(index);
    var oldElement = target.element;
    target.element = element;
    return oldElement;
}

LinkedList.prototype.unlinkLast = function () {
    // this.size -= 1;
}
LinkedList.prototype.unlinkFirst = function () {
    // this.size -= 1;    
}

/**
 * @return the element previously at the specified position
 * @throws IndexOutOfBoundsException 
 */
LinkedList.prototype.remove = function (index) {
    // 要考虑情况
    // 1.prevNode-(target)-nextNode => prevNode-nextNode
    // 2.null-(first)-nextNode => null-nextNode, nextNode变成first
    // 3.prevNode-(last)-null => prevNode-null, prevNode变成last
    // 4.null-(target)-null => null-null, size=0, first=last=null

    var target = this.get(index);
    var prevNode = target.prev;
    var nextNode = target.next;

    if (prevNode) {
        prevNode.next = nextNode;
    } else {
        this.first = nextNode;
    }

    if (nextNode) {
        nextNode.prev = prevNode;
    } else {
        this.last = prevNode;
    }

    //不用担心减到size<0的情况，因为不符合条件的都会抛出IndexOutOfBoundsException
    this.size -= 1;

    return target;
}

LinkedList.prototype.clear = function () {
    //简单写法
    // this.first = null;

    var x = this.first;
    while (x !== null) {
        // x = null; 这样写只是将x指向空引用，影响不了原先的引用

        var next = x.next;
        x.prev = null;
        x.element = null;
        x.next = null;
        x = next;
    }

    this.size = 0;
}

LinkedList.prototype.indexOf = function (element) {
    var x = this.first;
    var index = 0;
    while (x !== null) {
        if(x.element === element) return index;
        console.log('---indexOf', index);
        x = x.next;
        index += 1;
    }
    return -1;
}

LinkedList.prototype.contains = function (element) {
    return this.indexOf(element) !== -1;
}

// 测试
var nodes = new LinkedList();

nodes.linkFirst(3);
nodes.linkFirst(2);
nodes.linkFirst(1);

nodes.linkLast(11);
nodes.linkLast(22);
nodes.linkLast(33);

// nodes.add(44);

// List  1 2 3 11 22 33 44
// index 0 1 2 3  4  5  6
nodes.display();

console.log('contains 22', nodes.contains(22), nodes.indexOf(22));
console.log('contains 44', nodes.contains(44), nodes.indexOf(44));

// nodes.set(2, 999);

// nodes.remove(0);//删除 
// nodes.display();

console.log('get 0', nodes.get(0)); //1
console.log('get 1', nodes.get(1)); //2
console.log('get 2', nodes.get(2)); //3
console.log('get 6', nodes.get(6)); //44
console.log('get 5', nodes.get(5)); //33
// console.log('get 100', nodes.get(100));//hehe











