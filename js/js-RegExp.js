
console.log('js-RegExp');

// 我的快速记忆
// 正则基础 http://www.jb51.net/tools/zhengze.html#backreference
// 元字符 \b \d \w \s . ^ $
// 字符转义 \
// 重复 *(any) +(1 or more) ?(0 or 1) {n,} {n,m} {n}
// 字符类 [a-z 0-9 A-Z]
// 分支条件 |
// 分组 (...){n}
// 反义 \W \D \B \S [^X]
// 反向引用 (...)\1\2
// 捕获 (...)  (?:...) 零宽断言(?=...) (?<...) 负向零宽断言(?!...) (?<!...)
// 注释 (?#comment)
// 贪婪 默认
// 懒惰 ?
// 平衡组 1入栈: (?'name') 2出栈: (?'-name') 3IFELSE: (?(name) yes|no) 4总是失败: (?!)

// 一 js正则的多种定义
// var reg = new RegExp("abc","g")
// var re2 = /[1-9]/g;

// 二 正则的使用方法
// var text = "index.aspx?test=1&ww=2&www=3";
// var re = /([^&=]+)=?([^&]*)/g;

// var result = re.test(text);
// console.log('res', result);

// var result2 = re.exec(text);
// console.log('res', result2);

// var result3 = text.match(re);
// console.log('res', result3);

// 三 exec match 区别
// exec与全局是否定义无关系，而match则于全局相关联，当定义为非全局，两者执行结果相同
// 参考 http://www.jb51.net/article/46374.htm

// var reg = new RegExp("a(bc)") ; //result same
// var reg = new RegExp("abc") ; //result same
// var reg = new RegExp("a(bc)","g") ; 
// var reg = new RegExp("abc","g") ; 
// var str = "3abc4,5abc6";
// console.log('exec', reg.exec(str));
// console.log('match', str.match(reg));

// 四 其他
// 参考  
// js分解url参数 http://www.jb51.net/article/31024.htm
// js获取url的参数和值的N种有效方法 http://qiaolevip.iteye.com/blog/1672330

var url = "www.taobao.com?key0=a&key1=b&key2=c";
var re = /([^&?]+)=([^&]*)/g; 
// 正则解析：
// 先匹配格式params=value，再使用()分别捕获params和value；
// +代表params至少要有一个字符
// *代表value可以为空

var result = {}; //创建一个对象，用于存name，和value 
var m;
while (m = re.exec(url)) {
    // 在执行exec方法时，如果有属性g，将该对象的匹配的开始位置设置到紧接这匹配子串的字符位置，
    // 当第二次调用exec时，将从lastIndex所指示的字符位置开始检索。
    // 利用这个特点可以反复调用exec遍历所有匹配，此时等价于match具有g属性的情况
    // （其实就是将匹配的结果放入Matches集合中去了）。
    // http://www.cnblogs.com/withasi/archive/2012/04/23/2466933.html
    console.log('---', m);
    //使用 decodeURIComponent() 对编码后的 URI 进行解码 
    result[decodeURIComponent(m[1])] = decodeURIComponent(m[2]);

}
console.log('result', result);










