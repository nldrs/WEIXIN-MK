var util=require("../../utils/utils.js");

var app=getApp();
Page({
    data:{
      jjsy:{},
      zzry:{},
      top250:{},
      searchMovie:{},
      kindmovie:true,
      searchmovie:false
    },
    onLoad:function(event){
     var jjsyUrl=app.globalData.g_dbaseUrl+'/v2/movie/coming_soon'+'?start=0&count=3';
     var zzryUrl=app.globalData.g_dbaseUrl+'/v2/movie/in_theaters'+'?start=0&count=3';
     var top250Url=app.globalData.g_dbaseUrl+'/v2/movie/top250'+'?start=0&count=3';
     this.getdb(jjsyUrl,'jjsy','即将上映');
     this.getdb(zzryUrl,'zzry','正在热映');
     this.getdb(top250Url,'top250','豆瓣Top250');
    },
    more:function(event){
        var kind=event.currentTarget.dataset.kind;
        wx.navigateTo({
            url:"more-movie/more-movie?kind="+kind
        })
    },
    onDetail:function (event) {
        var id=event.currentTarget.dataset.movieid;
        wx.navigateTo({
            url:"movie-detail/movie-detail?id="+id
        })
    },
    cancelSearch:function (event) {
        this.setData({
            kindmovie:true,
            searchMovie:{},
            searchmovie:false
        })
    },
    onBindFocus:function (event) {
     this.setData({
         kindmovie:false,
         searchmovie:true
     })
    },
    bindconfirm:function(event){
        var inputval=event.detail.value;
       var searchUrl=app.globalData.g_dbaseUrl+'/v2/movie/search?q='+inputval;
        this.getdb(searchUrl,'searchMovie','');
    },
    getdb:function(url,setmodal,ContentTitle){
          var me=this;
          wx.request({
         url: url,
         method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
         header: {"Content-Type":'json'}, // 设置请求的 header
         success: function(res){
                      // success
         me.xuanran(res.data,setmodal,ContentTitle);
         },
         fail: function(res) {
           console.log(res)
         }
      })
    },
    xuanran:function(moviesDB,setmodal,ContentTitle){
        var xuanranArr=[];
        for(var index in moviesDB.subjects){
          var moveItem= moviesDB.subjects[index];
          var title=moveItem.title;
          if(title.length>6){
            title=title.substring(0,6)+"...";
          }
          var temp={
            starts:util.startNum(moveItem.rating.stars),
            title:title,
            average:moveItem.rating.average,
            coverUrl:moveItem.images.large,
            movieId:moveItem.id
          };
          xuanranArr.push(temp);
        }
        var obj={};
        obj[setmodal]={movies:xuanranArr,ContentTitle:ContentTitle};
        this.setData(obj);
         //console.log(this.data)
    }
});