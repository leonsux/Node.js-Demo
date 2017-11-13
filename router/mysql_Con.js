// 连接数据库模块
const mysql = require('mysql')

const mysql_Con = (callback)=>{
    let con = mysql.createConnection({
        host: 'localhost',//mysql服务的域名
        user: 'root',//mysql服务的用户名
        password: '1134517316',//mysql服务的密码
        database: 'village'//需要操作的database
    })
    con.connect()
    callback(con)
}

module.exports = mysql_Con