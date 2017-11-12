
const fs = require('fs')

const not_found = {
    deal(req, res){
        // 404 页面
        let source_path = './static/html/not_found.html'
        let content = fs.readFileSync(source_path)

        res.writeHead(404, {"Content-Type": "text/html"})

        res.end(content)
    }
}

module.exports = not_found