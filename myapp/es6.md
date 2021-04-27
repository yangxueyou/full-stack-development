### 解构

 ES6 内部使用严格相等运算符（===），判断一个位置是否有值。
 所以，只有当一个数组成员严格等于undefined，默认值才会生效。


```
let [x, y = 'b'] = ['a', undefined]; // x='a', y='b'

let { bar, foo } = { foo: 'aaa', bar: 'bbb' }; // foo="aaa" bar="bbb"
let { foo: baz } = { foo: 'aaa', bar: 'bbb' }; // baz="aaa"
```

*（1）交换变量的值
```
let x = 1;
let y = 2;

[x, y] = [y, x];
```


*（2）从函数返回多个值

```
// 返回一个数组
function example() {
    return [1, 2, 3];
  }
  let [a, b, c] = example();
  
// 返回一个对象
function example() {
return {
    foo: 1,
    bar: 2
};
}
let { foo, bar } = example();
```

*（3）函数参数的定义

```
// 参数是一组有次序的值
function f([x, y, z]) { ... }
f([1, 2, 3]);

// 参数是一组无次序的值 (默认值)
function f({x, y, z = 0}) { ... }
f({z: 3, y: 2, x: 1});
```

*（4）提取 JSON 数据

```
let jsonData = {
  id: 42,
  status: "OK",
  data: [867, 5309]
};

let { id, status, data: number } = jsonData;

console.log(id, status, number);
// 42, "OK", [867, 5309]
```

*（5）遍历 Map 结构

```
const map = new Map();
map.set('first', 'hello');
map.set('second', 'world');

for (let [key, value] of map) {
  console.log(key + " is " + value);
}
// first is hello
// second is world
```

*（6）输入模块的指定方法

```
const { SourceMapConsumer, SourceNode } = require("source-map");
```

### 字符串

* 1. 字符的 Unicode 表示法

```
'\z' === 'z'  // true
'\172' === 'z' // true
'\x7A' === 'z' // true
'\u007A' === 'z' // true
'\u{7A}' === 'z' // true    es6新出的可以超过 0xFFFF
```

* 2. 字符串的遍历器接口

这个遍历器最大的优点是可以识别大于0xFFFF的码点，传统的for循环无法识别这样的码点

```
let text = String.fromCodePoint(0x20BB7);

for (let i = 0; i < text.length; i++) {
  console.log(text[i]);
}
// " "
// " "

for (let i of text) {
  console.log(i);
}
// "𠮷"
```
* 3. 模板字符串

```
// 字符串中嵌入变量
let name = "Bob", time = "today";
`Hello ${name}, how are you ${time}?`
```