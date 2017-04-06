var postsData=require("../../../data/posts-data.js");
var app=getApp();
// var util=require("../../../utils/utils.js");
Page({
    data:{},
    onLoad:function (option) {
       var postid=option.id;
       var postData=postsData.postList[postid];
       this.data.currentid=postid;
       this.setData({
          itemkey:postData
      });
        this.setData({
            music:false
        });
      var postsCollected=wx.getStorageSync("posts_Collected");
      if(postsCollected){
          var postcollected=postsCollected[postid];
          this.setData({
              collected:postcollected
          })
      }else{
          var postsCollected={};
          postsCollected[postid]=false;
          wx.setStorageSync("posts_Collected",postsCollected);
      }
      if(app.globalData.g_music&& app.globalData.g_musicindex===postid){
          this.setData({
              music:true
          })
      }
        this.watchMusic();
    },
    /*var globalData=app.globalData;
console.log(globalData)*/
    watchMusic:function(){
        var me=this;
        wx.onBackgroundAudioPause(function(){
            me.setData({
                music:false
            });
            app.globalData.g_music=false;
            app.globalData.g_musicindex=null;
        });
        wx.onBackgroundAudioStop(function(){
            me.setData({
                music:false
            });
            app.globalData.g_music=false;
            app.globalData.g_musicindex=null;
        });
        wx.onBackgroundAudioPlay(function(){
            me.setData({
                music:true
            });
            app.globalData.g_music=true;
            app.globalData.g_musicindex=me.data.currentid;
        })
    },
    collectionTap:function(){
        var curStorage=wx.getStorageSync("posts_Collected");
        var curval=curStorage[this.data.currentid];
        curval=!curval;
        curStorage[this.data.currentid]=curval;
        this.showtoast(curStorage,curval);
    },
    /*showmodal:function(curStorage,curval){
        var me=this;
        wx.showModal({
            title: '收藏',
            content: curval?"收藏该文章":"取消收藏该文章",
            showCancel:true,
            cancelText:"取消",
            cancelColor:"#666",
            confirmText:"确认",
            confirmColor:"#00f",
            success: function(res) {
                if (res.confirm) {
                    //updata 缓存
                    wx.setStorageSync("posts_Collected",curStorage);
                    //updata 数据的绑定
                    me.setData({
                        collected:curval
                    });
                }
            }
        })
    },*/
    showtoast:function(curStorage,curval){
        //updata 缓存
        wx.setStorageSync("posts_Collected",curStorage);
        //updata 数据的绑定
        this.setData({
            collected:curval
        });
        wx.showToast({
            title: curval?"收藏成功":"取消成功",
            icon: 'success',
            duration: 1000
        })
    },
    shareTap:function(event){
        // wx.clearStorage();
        var itemList=['分享给微信好友', '分享到朋友圈', '分享到qq','分享到微博'];
        wx.showActionSheet({
            itemList:itemList,
            itemColor:"#0f0",
            success: function(res) {
                wx.showModal({
                    title:itemList[res.tapIndex],
                    content:"目前不支持分享功能"
                })
            },
            fail: function(res) {
                console.log(res.errMsg)
            }
        })
    },
    musicTap:function(event){
        var isrunning=this.data.music;
        var musicindex= this.data.currentid;
        var pub=postsData.postList[musicindex].music;
        if(isrunning){
            wx.pauseBackgroundAudio();
            this.setData({
                music:false
            });
        }else{
            wx.playBackgroundAudio({
                dataUrl:pub.url ,
                title: pub.title,
                coverImgUrl:pub.pic
            });
            this.setData({
                music:true
            });
        }
    }
});