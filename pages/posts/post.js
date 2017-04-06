var postsData=require("../../data/posts-data.js");

Page({
  data:{
  },
  onLoad:function(options){
    // 生命周期函数--监听页面加载
      this.setData({"post_key":postsData.postList});
  },
    onPostTap:function (event) {
      var postId=event.currentTarget.dataset.postid;
        wx.navigateTo({
          url:"post-detail/post-detail?id="+postId
        })
    },
    swiperjump:function (event) {
        var postId=event.target.dataset.postid;
        wx.navigateTo({
            url:"post-detail/post-detail?id="+postId
        })
    }
})