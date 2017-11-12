// 资源请求模块
const source = require('./source')
// 404模块
const not_found = require('./not_found')
// 数据请求模块
const api = require('./api')

const router = (req, res) => {
    // 静态资源的连接方式全采用绝对路径，便于请求

    req.url = req.url == '/' ? '/static/html/index.html' : req.url

    // 如果是资源请求，调用资源请求的方法
    if (req.url.indexOf('/static/') == 0) {
        source.deal(req, res)
    } else if (req.url.indexOf('/api/') == 0) {
        api.deal(req, res)
    } else {
        not_found.deal(req, res)
    }
}

module.exports = router