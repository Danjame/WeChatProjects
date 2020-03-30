const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    result: {},
    about: [],
    like: null,
    collected: null,
    shareImage: false
  },
  //点赞和取消点赞
  clickLike(e) {
    this.setData({
      like: e.detail
    });
    if (e.detail) {
      app.likeAndCollectHandler(this.data.result.id, "science", "like");
    } else {
      app.likeAndCollectHandler(this.data.result.id, "science", "unlike");
    }
  },
  //收藏和取消收藏
  clickCollect(e) {
    this.setData({
      collected: e.detail
    });
    if (e.detail) {
      app.likeAndCollectHandler(this.data.result.id, "science", "collect");
    } else {
      app.likeAndCollectHandler(this.data.result.id, "science", "uncollect");
    }
  },
  shareToMoment() {
    this.setData({
      shareImage: this.data.shareImage ? false : true
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    const _this = this;
    wx.showLoading({
      title: "加载中..."
    })
    wx.request({
      url: 'https://wdd.free.qydev.com/science/get',
      data: {
        id: options.id
      },
      success(res) {
        if (res.statusCode === 200) {
          const about = [
            []
          ];
          about[0] = res.data.about;
          about[0].forEach(item => {
            item.releaseTime = item.releaseTime.slice(0, 10);
            if (item.psImgSrc) {
              item.hasImg = item.psImgSrc.indexOf('.mp4') !== -1 ? false : true;
            }
          })

          const result = res.data.science;
          result.psContext = result.psContext.replace(/^\s+/, '');
          result.releaseTime = result.releaseTime.slice(0, 10);
          if (result.psImgSrc) {
            result.hasImg = result.psImgSrc.indexOf('.mp4') !== -1 ? false : true;
          }
          _this.setData({
            result,
            about
          })
        }else{
          //失败则导入缓存
          _this.setData({
            result: wx.getStorageSync("scienceDetail"),
            about: wx.getStorageSync("scienceAbout")
          })
        }
      },
      fail(error) {
        //失败则导入缓存
        console.log("Something wrong!");
        _this.setData({
          result: wx.getStorageSync("scienceDetail"),
          about: wx.getStorageSync("scienceAbout")
        })
      },
      complete() {
        wx.hideLoading();
        //获取是否点赞和收藏数据
        app.likeAndCollectHandler(_this.data.result.id, "science", "checklike", _this);
        app.likeAndCollectHandler(_this.data.result.id, "science", "checkcollect", _this);
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {
    //离开页面缓存此次数据
    wx.setStorage({
      key: 'scienceDetail',
      data: this.data.result,
    })
    wx.setStorage({
      key: 'scienceAbout',
      data: this.data.about,
    })
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})