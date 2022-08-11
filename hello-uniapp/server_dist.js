//1. 引入express
const express = require('express');

//2. 创建应用对象
const app = express();
// 中间键 专门指定静态资源  可提供服务器的部署
app.use(express.static(__dirname + '/dist'))

// JSON格式请求
app.all('/person', (request, response) => {
    // response.setHeader('Access-Control-Allow-Origin', '*')
    /* const data = {
        name: '小红',
        age: 19
    } */
    const data = [
        {
            "id": "001",
            "name": "奔驰",
            "price": "199"
        },
        {
            "id": "002",
            "name": "马自达",
            "price": "109"
        },
        {
            "id": "003",
            "name": "捷达",
            "price": "120"
        }
    ]
    // 想把这个 data对象 传给 json.html文件中   send()方法里面可以接受字符串不能接受对象
    // 所以这里需要对这个对象进行字符串的转换
    let str = JSON.stringify(data);   // 利用JSON的stringify()方法转换为JSON格式字符串
    response.send(str);
    // response.send({
    //     name: 'tom',
    //     age: 18
    // })
});

//4. 监听端口启动服务
app.listen(5002, (err) => {
    if (!err) console.log("服务器已经启动, 5002 端口监听中....");
});
