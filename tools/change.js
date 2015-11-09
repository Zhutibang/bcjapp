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
    'xiebaoshipin',
    'wentiyule',
    'jujiashenghuo',
    'kekoumeishi',
    'meizhuangpeishi'
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
        item['ship_price'] = item['free_ship']
        delete item['free_ship']
        result.push(item)
    })

    dumpJSON(json_file, json)
})
