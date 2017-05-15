// spec 私有属性
// my question方法的构造函数
function questionCreator(spec, my) {
    // 每次返回新的对象
    var that = {};

    my = my || {};
    my.label = spec.label;
// 用一个私有的spec属性替换掉了前面question方法的构造函数属性，
// 因为我们封装了render行为进行操作，
// 不再需要把这些属性暴露给外部代码了。
// Jason 不懂 啥意思？？？ 

    my.renderInput = function () {
        throw "not implemented";
        // 这里renderInput没有实现，主要目的是让各自问题类型的实现代码去覆盖整个方法
    };

    that.render = function (target) {
        var questionWrapper = document.createElement('div');
        questionWrapper.className = 'question';

        var questionLabel = document.createElement('div');
        questionLabel.className = 'question-label';
        var label = document.createTextNode(spec.label);
        questionLabel.appendChild(label);


        // Jason 模板方法 延迟到子类执行
        // 基于 工厂方法
        var answer = my.renderInput();
        // 该render方法是同样的粗合理代码
        // 唯一的不同就是上面的一句my.renderInput()
        // 因为不同的问题类型有不同的实现

        questionWrapper.appendChild(questionLabel);
        questionWrapper.appendChild(answer);
        return questionWrapper;
    };

    return that;
}

// 子类 下拉选择
function choiceQuestionCreator(spec) {

    var my = {},
        that = questionCreator(spec, my);

console.log('my',my);
console.log('spec',spec);

    // choice类型的renderInput实现
    my.renderInput = function () {
        var input = document.createElement('select');
        var len = spec.choices.length;
        for (var i = 0; i < len; i++) {
            var option = document.createElement('option');
            option.text = spec.choices[i];
            option.value = spec.choices[i];
            input.appendChild(option);
        }

        return input;
    };

    return that;
}

// 子类 文本框
function inputQuestionCreator(spec) {

    var my = {},
        that = questionCreator(spec, my);

    my.renderInput = function () {
        var input = document.createElement('input');
        input.type = 'text';
        return input;
    };

    return that;
}

// 全部问题渲染
var view = {
    render: function (target, questions) {
        for (var i = 0; i < questions.length; i++) {
            target.appendChild(questions[i].render());
        }
    }
};

// 问题对象的数组
var questions = [
     // Jason 策略模式？错了，其实应该叫基于工厂方法
    choiceQuestionCreator({
        label: 'Have you used tobacco products within the last 30 days?',
        choices: ['Yes', 'No']
    }),
    inputQuestionCreator({
        label: 'What medications are you currently using?'
    })
];

// use
// 渲染区域对象
var questionRegion = document.getElementById('questions');

view.render(questionRegion, questions);

console.log('jason test question',inputQuestionCreator({
        label: 'What medications are you currently using?'
    })
);

function baseCreator(spec, my) {
    // 每次返回新的对象
    var that = {};

    my = my || {};
    // my.label = spec.label;

    return my;
    // return that;
}
function chil(spec) {
    var my = {},
        that = baseCreator(spec, my);
    return that;
}

console.log('test', chil({label:1}));