/** 
翻译 – 解释JavaScript的“预解析(置顶解析)
http://www.zhangxinxu.com/wordpress/?p=1162

理解 JavaScript 预解析
http://www.jb51.net/article/20581.htm
 */


(function () {
    var a = 'a';

    var b = 'b';

    var c = 'c'; // antipattern

})();

// 置顶解析

(function () {
    var a, b, c; // variables declared

    a = 'a';

    b = 'b'; // initialized

    c = 'c'; // initialized

})();