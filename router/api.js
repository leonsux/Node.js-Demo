
const url = require('url')
const apiDeals = require('./apiDeals')
const not_found = require('./not_found')

const api = {
    deal(req, res){
        // url为： /api/login?username=%E5%B0%8F%E8%BF%B7%E5%A6%B9&password=sdf
        let url_info = url.parse(req.url)
        // 这里url_info里的pathname为/api/login，为了区分注册和登陆，需要获取api后的login或register
        let api_type = url_info.pathname.replace('/api/', '')
        // 如果这里的api_type既不是login，register，那当然是调到404页面了
        if (!apiDeals[api_type]) {
            not_found(req, res)
        } else {
            // 根据api_type调用对应的方法
            apiDeals[api_type](req, res)
        }
    }
}

module.exports = api