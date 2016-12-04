 //操作符字符串的隐性转换

// 我的理解
// null 和数字运算时，相当于 0，将null通过Number()转化，结果是0 
// ‘’ 和数字运算时，相当于 0，将字符串å通过Number()转化，结果是0 
// NaN 大部分情况都是返回 NaN
// undefined 大部分情况都是返回 NaN
// Infinity 正无穷 这个结果有点无法预测

// null和undefined的区别是：
// null是存在的但是没有负值，undefined是不存在，没有定义的意思

// 参考 http://www.haorooms.com/post/js_czf_mst

 //乘法
 console.log("-------以下乘法---------");
 console.log(5*"5");
 console.log(5*"a");
 console.log(5*NaN);
 console.log(5*null);
 console.log(5*undefined);
 console.log(5*5);
 console.log("-------以上乘法---------");
 //除法
 console.log("-------以下除法---------");
 console.log(5/"5");
 console.log(5/"a");
 console.log(5/NaN);
 console.log(5/null);
 console.log(null/5);
 console.log(5/undefined);
 console.log(5/5);
 console.log(5/0);
 console.log(0/5);
 console.log(0/0);
 console.log("-------以上除法---------"); 
 //取余、求模
 console.log("-------以下取余、求模--------");
 console.log(16%"5");
 console.log(5%"a");
 console.log(5%NaN);
 console.log(5%null);
 console.log(null%5);
 console.log(5%undefined);
 console.log(5%5);
 console.log(5%0);
 console.log(0%5);
 console.log(0%0);
 console.log("-------以上取余、求模---------"); 

 //加法
 console.log("-------以下加法--------");
 console.log(16+"5");
 console.log(5+"a");
 console.log(5+NaN);
 console.log(5+null);
 console.log(5+undefined);
 console.log(5+5);
 console.log("两个数的和是"+5+5);
 console.log("两个数的和是"+(5+5));
 console.log("-------以上加法--------"); 

 //减法
 console.log("-------以下减法--------");
 console.log(16-"5");
 console.log(5-"a");
 console.log(5-NaN);
 console.log(5-null);
 console.log(5-undefined);
 console.log(5-5);
 console.log(5-true);
 console.log(5-"true");
 console.log(5-"");
 console.log("两个数的差是"+5-5);
 console.log("两个数的差是"+(5-5));
 console.log("-------以上减法--------"); 

 //关系操作符
 console.log("-------以下关系操作符--------");
 console.log(16>"5"); //true
 console.log("16">"5");//false
 console.log(5<"a");//false
 console.log(5>=NaN);//false
 console.log(5<NaN);//false
 console.log(NaN>=NaN);//false
 console.log(5>=null);//true
 console.log(5>=undefined);//false
 console.log(5>=5);//true
 console.log(5>=true);//true
 console.log(5>="true");//false
 console.log(5>="");//true 
 console.log("Brick">"alphabet");//false  B的字符串编码值是66 ，而a的字符串编码是97.因此false
 console.log("brick">"alphabet");//true 小写字母b比a大，所以是true
 console.log("-------以上关系操作符--------"); 