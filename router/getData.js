
const url = require('url')

const qs = require('querystring')

const getData = (req, callback) =>{
    if (req.method == 'GET') {
        // 取到url中的 username='leon'&password='111'，并转换成对对象
        return qs.parse(url.parse(req.url).query)
    } else {
        let params = ''
        req.on("data", function (chunk) {
            params += chunk
        })
        req.on("end", function (chunk) {
            callback(qs.parse(params))
            // console.log(qs.parse(params))
        })
    }
}

module.exports = getData