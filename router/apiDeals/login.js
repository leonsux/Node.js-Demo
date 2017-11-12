
const url = require('url')
// 获取数据模块
const getData = require('../getData')

// const qs = require('querystring')

// 获取mysql连接
const mysql_Con = require('../mysql_Con')


module.exports = (req, res) =>{
    // 取出通过GET获取到数据
    let params = getData(req)
    // console.log("收到：", req.method, url.parse(req.url))

    console.log("得到了", params)

    // mysql_Con.query('select * form `villagers` where `username` like "' + params.username + '" and `password` like "' + params.password + '"', function(err, result){

    // })
    mysql_Con((con)=>{
        // 通过调用回调函数，实现异步操作
        con.query('SELECT * FROM  `villagers` WHERE  `username` LIKE  "' + params.username + '" AND  `password` LIKE  "' + params.password + '"', function (err, result) {
            if (err) {
                console.log("sql error", err)
                throw err
            } else if (result.length) {
                let json = {
                    "uid": result[0].uid,
                    "username": result[0].username,
                    "nickname": result[0].nickname
                }
                // console.log(json)
                let jsonStr = JSON.stringify(json)
                // 在服务端找到匹配数据，将其返回至客户端
                res.writeHead(200, {"Content-Type": "application/json; charset=utf8"})
                res.end(jsonStr)
                console.log("要返回的数据：", jsonStr)
            } else {
                // 并没有找到
                res.writeHead(200, { "Content-Type": "application/json; charset=utf8" })
                res.end('0')
                console.log("sql: ", result)
            }
            
        })
        con.end()
    })
}