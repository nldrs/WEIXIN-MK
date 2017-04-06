// pages/movies/more-movie/more-movie.js
var util=require("../../../utils/utils.js");
var app=getApp();
Page({
  data:{
      movies:{},
      requestUrl:"",
      starttotal:0,
      isEmpty:true
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
      var kindmovie=options.kind;
      this.setData({kind:kindmovie});
      var dataUrl="";
      switch (kindmovie){
          case "即将上映":
            dataUrl=app.globalData.g_dbaseUrl+'/v2/movie/coming_soon';
              util.http(dataUrl,this.morexuanran);
            break;
          case "正在热映":
            dataUrl=app.globalData.g_dbaseUrl+'/v2/movie/in_theaters';
              util.http(dataUrl,this.morexuanran);
            break;
          case "豆瓣Top250":
            dataUrl=app.globalData.g_dbaseUrl+'/v2/movie/top250';
              util.http(dataUrl,this.morexuanran);
            break;
      }
      this.setData({
          requestUrl:dataUrl
      })
  },
    onReachBottom:function (event) {
      var nextUrl=this.data.requestUrl+"?start="+this.data.starttotal+"&count=20";
        util.http(nextUrl,this.morexuanran);
        wx.showNavigationBarLoading();
    },
    onPullDownRefresh:function (event) {
        var refreshUrl=this.data.requestUrl+"?start=0&count=20";
        // console.log(1);
        this.data.movies={};
        this.data.isEmpty=true;
        this.data.starttotal=0;
        util.http(refreshUrl,this.morexuanran);
        wx.showNavigationBarLoading();
    },
    morexuanran:function (moviesDB) {
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
        var totalmovies={};
        if(!this.data.isEmpty){
            totalmovies=this.data.movies.concat(xuanranArr);
        }else{
            totalmovies=xuanranArr;
            this.data.isEmpty=false;
        }
        this.setData({
            movies:totalmovies
        });
        wx.hideNavigationBarLoading();
        wx.stopPullDownRefresh();
        this.data.starttotal+=20;
    },
  onReady:function (event) {
      wx.setNavigationBarTitle({
          title: this.data.kind
      })
  },
    onDetail:function (event) {
        var id=event.currentTarget.dataset.movieid;
        wx.navigateTo({
            url:"../movie-detail/movie-detail?id="+id
        })
    }
});