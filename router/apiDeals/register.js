

const url = require('url')
// 获取数据模块
const getData = require('../getData')

// const qs = require('querystring')

// 获取mysql连接
const mysql_Con = require('../mysql_Con')

module.exports = (req, res)=>{
    getData(req, (params)=>{
        //连接数据库，查看一下有没有这个用户名相同的，如果没有的话插入数据
        mysql_Con((connection) => {

            connection.query('SELECT * FROM  `villagers` WHERE  `username` LIKE  "' + params.username + '"', (err, results) => {
                if (err) throw err;
                if (results.length) {//有用户名相同的用户，失败
                    res.writeHead(200, { "Content-Type": "application/javascript;charset=utf8" })
                    res.end('0')
                    // response(res, '0')
                    connection.end()
                } else {//如果没有此用户名，插入一条数据
                    //INSERT INTO  `village`.`villagers` (`uid` ,`username` ,`password` ,`nickname`)VALUES (NULL ,  '2',  '2',  '二');
                    connection.query('INSERT INTO  `village`.`villagers` (`uid` ,`username` ,`password` ,`nickname`)VALUES (NULL ,  "' + params.username + '",  "' + params.password + '",   "' + params.nickname + '")', (err, results) => {
                        if (err) throw err;
                        if (results.affectedRows == 1) {//插入成功
                            //result.insertId 刚刚插入的数据的主键
                            res.writeHead(200, { "Content-Type": "application/javascript;charset=utf8" })
                            res.end('1')
                            // response(res, '1')
                        } else {
                            res.writeHead(200, { "Content-Type": "application/javascript;charset=utf8" })
                            res.end('0')
                            // response(res, '0')
                        }
                        connection.end()
                    })

                }
            })

        })
    })
}