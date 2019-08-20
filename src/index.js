//引入css
import './css/index.css';
//引入less
import './css/login.less'


(item => console.log(item))

let a = {
    name: 'mingming',
    age: '12'
};
let b = { ...a};





if(module.hot) {
    //实现热更新
    module.hot.accept();
}



console.log(b, 1111111);
console.log('hello');
console.log('这里是打包文件入口-index.js');

var aLi = document.getElementsByTagName('li');
for (var i = 0; i < aLi.length; i++){
    (function (n) {
        aLi[n].onclick = function () {
            console.log(n);
        }
    })(i)
}