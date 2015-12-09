var fs = require('fs')

var json_file_list = [
    'zuixintemai',
    'renqirexiao',
    'nvzhuang',
    'nanzhuang',
    'xiebao',
    'quanbu',
    'chaoliunvzhuang',
    'xingnanfuzhuang',
    'xiebaopeishi',
    'shumawenti',
    'jujiashenghuo',
    'kekoumeishi',
    'hufumeizhuang'
]

var dumpJSON = function(json_file_name, json){
    var target = __dirname+'/api/'+json_file_name+'.json'
    fs.writeFileSync(target, JSON.stringify(json, null, 4));
}


json_file_list.forEach(function(json_file){
    var json_file_path = '../bcj/api/'+json_file+'.json'
    var json = require(json_file_path)
    var result = []
    // console.log(json)

    json.forEach(function(item){
        item['raw_price'] = '2333'
        delete item['ship_price']
        result.push(item)
    })

    dumpJSON(json_file, json)
})
