// 参考 http://www.jb51.net/article/47234.htm

// 为了能优雅地写if判断

// if(exp) //exp === (null || undefined ||  0 || '') return false

// exp为num时
// if(!exp) //exp === 0 return true; exp !== 0 return false;
// if(!!exp) //exp === 0 return false; exp !== 0 return true;

// exp为num[-1-正无穷]时
// if(!~exp) //exp === -1 return true; exp !== -1 return false;
// if(!!~exp) //exp === -1 return false; exp !== -1 return true;

// 这种写法可以优雅地替代if(variable1)
// var variable2 = variable1 || ''; 

var variable1 = 0;
// var variable1 = false;
// var variable1 = 222;
var variable2 = variable1 || '111'; 
console.log('variable1 || ""', variable2);


console.log('test -1:', -1, !-1, !!-1, ~-1);
console.log('test 1:', 1, !1, !!1, ~1);
console.log('test 0:', 0, !0, !!0, ~0, ~~0 );
console.log('test null:', null, !null, !!null, ~null);
console.log('test undefined:', undefined, !undefined, !!undefined);
console.log('test “”:', '', !'', !!'');

console.log('false === 0', false === 0); //false
console.log('false == 0', false == 0); //true

// 所以说，当我的判断条件是这样时 exp === (null || undefined || '') return false； exp = 0 return true
// 我TMD还要写成这样：
var exp;
if(exp || exp===0) {

}

// 特别注意 
// 当exp存放的是num时，判断exp是否存在
// 特别容易忽略 exp = 0 的情况啊！！！！！