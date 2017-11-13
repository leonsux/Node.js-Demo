后端路由：根据前端的请求做出对应的回应

## static目录下是网站静态资源
页面布局使用Bootstrap框架搭建

## router目录下是后端路由文件
前端的请求有两种：资源请求，数据请求。资源请求中会存在资源在服务端不存在的情况（可能用户请求地址错误，也可能是服务端资源文件发生变动，删除或者重命名）也就是常见的404，需要单独处理

入口文件(index.js)通过判断请求的url地址调用对应的模块

#### 资源请求
通过fs模块判断请求的资源是否存在
若不存在则返回写好的404页面(static/html中的not_found.html文件)，这里返回的类型(Content-Type)已确认为`text/html`
若存在则返回对应的请求文件，文件可能是各种类型的，自己处理的话会很麻烦，这时候可以使用mime的`mime.getType(source_path)`方法轻松得到文件类型

#### 数据请求
数据请求的方式有两种：GET，POST。需要针对不同的请求方式，封装对应的模块，入口文件为api.js；这里同样也有404的情况，需要考虑进去。登陆和注册都需要解析前端发送来的数据和连接数据，可以把解析数据和连接数据库的操作各自单独封装成一个模块，分别是项目中的getData.js和mysql_Con.js
需要注意的是封装连接数据库模块时需要采用回调函数的方式实现异步操作，因为从数据库读取数据需要一定的时间，否则的话前端接收不到响应值
```
// 连接数据库模块
const mysql = require('mysql')

const mysql_Con = (callback)=>{
    let con = mysql.createConnection({
        host: 'localhost',//mysql服务的域名
        user: 'root',//mysql服务的用户名
        password: '*******',//mysql服务的密码
        database: 'village'//需要操作的database
    })
    con.connect()
    callback(con)
}

module.exports = mysql_Con
```

## 总结
通过这个小项目，总算是跨入了node.js的门，虽然只是一小步，但还是学到了很多东西，语言等工具倒没什么，主要是思想，对前后端的交互有了大体的思路，很有纪念意义。