const app = getApp();

Page({
  data: {
    clientHeight: "",
    searchHeight: "",
    tabHeight: "",
    tabTitles: ["热门谣言", "防疫科普", "官方动态"],
    currentIndex: 0,
    rumors: [],
    science: [],
    dynamic: [],
  },

  tabChange(e) {
    this.setData({
      currentIndex: e.currentTarget.dataset.index
    });
  },

  slideChange(e) {
    this.setData({
      currentIndex: e.detail.current
    })
  },
  //页面跳转
  enterDetail() {
    switch (this.data.currentIndex) {
      case 0:
        app.toHot_rumor();
        break;
      case 1:
        app.toAntiepic_science();
        break;
      case 2:
        app.toOffic_dynamic();
        break;
    }
  },
  //获取屏幕剩余高度
  getHightStyle() {
    const _this = this;
    wx.createSelectorQuery().select(".searchWrapper").boundingClientRect(rect => {
      _this.setData({
        searchHeight: rect.height
      });
    }).exec();
    wx.createSelectorQuery().select(".tabWrapper").boundingClientRect(rect => {
      _this.setData({
        tabHeight: rect.height
      });
    }).exec();
    wx.getSystemInfo({
      success: function(res) {
        _this.setData({
          clientHeight: res.windowHeight
        });
      }
    })
  },
  getData() {
    const _this = this;
    // wx.request({
    //   url: 'https://wdd.free.qydev.com/rumor/list',
    //   success(res) {
    //     if (res.statusCode === 200) {
    //       const result = res.data;
    //       result.forEach((item) => {
    //         item.releaseTime = item.releaseTime.slice(0, 10);
    //       })

    //       _this.setData({
    //         rumors: result
    //       })
    //     }
    //   },
    //   fail(err) {
    //     console.log(err);
    //   }
    // });
    // wx.request({
    //   url: 'https://wdd.free.qydev.com/science/list',
    //   success(res) {
    //     if (res.statusCode === 200) {
    //       const result = res.data;
    //       result.forEach((item) => {
    //         item.releaseTime = item.releaseTime.slice(0, 10);
    //         if (item.psImgSr){
    //           item.psImgSrc = item.psImgSrc.slice(0, -2);
    //         }
    //       })

    //       _this.setData({
    //         science: result
    //       })
    //     }
    //   },
    //   fail(err) {
    //     console.log(err);
    //   }
    // });
    wx.request({
      url: 'https://wdd.free.qydev.com/dynamic/list',
      success(res) {
        if (res.statusCode === 200) {
          const result = res.data;
          result.forEach((item) => {
            item.releaseTime = item.releaseTime.slice(0, 10);
          })
          _this.setData({
            dynamic: result
          })
          console.log(_this.data.dynamic);
        }
      },
      fail(err) {
        console.log(err);
      }
    })
  },
  errorImg(e) {
    console.log(e);
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getHightStyle();
    this.getData();
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