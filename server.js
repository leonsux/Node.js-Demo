const http = require('http')
// 调用路由模块，得到的router是一个函数
const router = require('./router')

// 将路由函数当做requestListener函数，每当有客户端访问时，就会调用
const server = http.createServer(router)

server.listen(3000, ()=>{
    console.log("servering...")
})