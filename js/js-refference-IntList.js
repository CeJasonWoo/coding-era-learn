// Javascript引用指针
// http://www.cnblogs.com/justany/archive/2012/11/04/2753096.html

// 题目

/* 创建一个队列，头为head0，尾为tail0 */
function IntList(head0, tail0) {
    this.head = head0 || 0;
    this.tail = tail0 || null;
}
/* 返回一个IntList包含数组中的所有数 */
IntList.list = function (__args) {
    var sentinel = new IntList(),
        len = __args.length,
        p;
    p = sentinel;
    for (var i = 0; i < len; i++) {
        p.tail = new IntList(__args[i]);
        p = p.tail;
    }
    return sentinel.tail;
};
/* 返回该对象的字符串表示 */
IntList.prototype.toString = function () {
    var temp = "";
    temp += "[";
    for (var L = this; L !== null; L = L.tail) {
        temp = temp + " " + L.head;
    }
    temp += " ]";
    return temp;
};

/** 返回一个IntList，包含IntList A和IntList B，
 *  其中B的元素在A的后面。不能使用new关键字。
 */
function dcatenate(A, B) {
    /* 完成功能 */
}

/** 返回一个新的IntList，其长度为len，
 *  以#start元素为开头（其中#0是第一个元素），
 *  不能改变L。
 */
function sublist(L, start, len) {
    /* 完成功能 */
}


// 思考题
// 函数传参数的时候是怎么传的？例如下面代码的引用过程是怎样的？

// var obj = { name: "anything"};
// function getName(__obj){
//     return __obj.name;
// }
// var name = getName(obj);