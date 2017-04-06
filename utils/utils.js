function fenshu(start) {
    var num = start.toString().substring(0, 1);
    var arr = [];
    for (var i = 1; i <= 5; i++) {
        if (i <= num) {
            arr.push(1);
        }
        else {
            arr.push(0);
        }
    }
    return arr;
}
function http(url,callback) {
    wx.request({
        url: url,
        method: 'GET',
        header: {"Content-Type":'json'}, // 设置请求的 header
        success: function(res){
           callback(res.data);
        },
        fail: function(res) {
            console.log(res)
        }
    })
}
function daoyan(casts){
    var daoyan="";
    for(var index in casts){
        daoyan=daoyan+casts[index].name+"/"
    }
    return daoyan.substring(0,daoyan.length-1);
}
function yingping(casts){
    var yingpingArr=[];
    for(var index in casts){
        var yingping={
            img:casts[index].avatars?casts[index].avatars.large:"",
            name:casts[index].name
        }
        yingpingArr.push(yingping)
    }
    return yingpingArr;
}
module.exports={
    startNum:fenshu,
    http:http,
    daoyan:daoyan,
    yingping:yingping
}