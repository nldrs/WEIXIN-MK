var util=require("../../../utils/utils.js");
var app=getApp();
Page({
  data:{},
  onLoad:function(options){
      var id=options.id;
      var detailUrl=app.globalData.g_dbaseUrl+'/v2/movie/subject/'+id;
      util.http(detailUrl,this.movieDetail)

  },
   movieDetail:function(data){
      console.log(data)
     if(!data){return;}
       var director={
          avatar:"",
           name:"",
           id:""
       };
       if(data.directors[0]!=null){
           if(data.directors[0].avatars!=null){
               director.avatar=data.directors[0].avatars.large;
           }
           director.name=data.directors[0].name;
           director.id=data.directors[0].id;
       }
       var moviedetail={
           movieImg:data.images?data.images.large:"",
           country:data.countries[0],
           title:data.title,
           originalTitle:data.original_title,
           wishCount:data.wish_count,
           commentCount:data.comments_count,
           year:data.year,
           generes:data.genres.join("、"),
           starts:util.startNum(data.rating.stars),
           score:data.rating.average,
           director:director,
           summary:data.summary,
           casts:util.daoyan(data.casts),
           castsInfo:util.yingping(data.casts)
       };
       this.setData({
           moviedetail:moviedetail
       })
   },
    showImg:function(event){
       var src=event.currentTarget.dataset.src;
        wx.previewImage({
            current: src, // 当前显示图片的http链接
            urls: [src] // 需要预览的图片http链接列表
        })
    }
});