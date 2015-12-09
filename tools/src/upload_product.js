var request = require('request')
var _ = require('lodash')
var async = require('async')

var default_conf = require('./conf/default.conf')
var conf = {}

try{
    conf = require('./conf/local.conf')
}catch(e){}

var baseurl = 'http://api.fenxiangbei.com'
if(process.env['mode'] === 'dev'){
    baseurl = 'http://fenxiangbei.dev:8081/duoshuang'
}

var categorys = [
    'chaoliunvzhuang',
    'hufumeizhuang',
    'jujiashenghuo',
    'kekoumeishi',
    'shumawenti',
    'wentiyule',
    'xiebaopeishi',
    'xingnanfuzhuang',
    'zuixintemai'
]

var products = []

categorys.forEach(function(category){
    // products = products.concat(require('../../bcj/api/v1/{category}.json'.replace('{category}', category)))
    var ps = require('../../bcj/api/v1/{category}.json'.replace('{category}', category))
    var newProducts = ps.map(function(p){
        p['category'] = category
        return p
    })
    products = products.concat(newProducts)

})
async.series([
    function(cb){
        request.post({
            url: baseurl + '/Bcj/Product/deleteAll',
            formData: {
                token: conf.token
            }
        }, function(err, httpResponse, body){
            if(err){
                console.log(err)
                return
            }
            console.log(body)
            if(body.error_code){
                console.log(body.msg)
                return
            }
            cb()
        })
    }
    ,function(cb){
        request({
            method: "POST",
            url: baseurl + '/Bcj/Product/batchAdd',
            form: {
                token: conf.token,
                json: JSON.stringify(products)
            }
        }, function(err, req, response){
            if(err){
                console.log(err)
                return
            }
            console.log(response)
        })
    }
])
