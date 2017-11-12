const fs = require('fs')
const mime = require('mime')
const not_found = require('./not_found')

const source = {
    deal(req, res){
        let source_path = '.' + req.url
        
        fs.stat(source_path, err=>{
            // not found
            if (err) {
                not_found.deal(req, res)
            } else {
                // console.log("恩恩")
                // 通过 mime 模块的 getType方法（原为lookup）获取请求文件类型
                res.writeHead(200, { "Content-Type": mime.getType(source_path) })
                let content = fs.readFileSync(source_path)
                res.end(content)
            }
        })

      
    }
}

module.exports = source