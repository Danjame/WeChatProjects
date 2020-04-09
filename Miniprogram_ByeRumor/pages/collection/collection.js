// pages/collection/colect.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    result: [],
  },
  //长按删除收藏
  longpress(e) {
    const _this = this;
    wx.showModal({
      content: '取消收藏？',
      success(res) {
        if (res.confirm) {
          let result = _this.data.result;
          const id = e.detail;
          result[0].forEach((item, index) => {
            if (item.id == id) {
              if (item.rTitle) {
                app.likeAndCollectHandler(id, "rumor", "uncollect");
              } else if (item.psTitle) {
                app.likeAndCollectHandler(id, "science", "uncollect");
              } else {
                app.likeAndCollectHandler(id, "dynamic", "uncollect");
              }
              result[0].splice(index, 1);
            }
          })
          _this.setData({
            result
          })
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    const _this = this;
    const loginInfo = wx.getStorageSync("loginInfo");

    wx.showLoading({
      title: "加载中..."
    });
    wx.request({
      url: 'https://wdd.free.qydev.com/user/collection',
      data: {
        userId: loginInfo.userId
      },
      success(res) {
        if (res.statusCode === 200) {
          let result = [
            []
          ];
          //合并所有数组
          result[0] = res.data['Rumor'].concat(res.data['polularScience'], res.data['dynamicInformation']);
          //时间格式化
          result[0].forEach(item => {
            item.releaseTime = item.releaseTime.slice(0, 10);
          })

          // //加上毫秒时间
          // result[0].forEach(item => {
          //   item.releaseMs = new Date(item.releaseTime.replace(/-/g, "/")).getTime();
          // })
          // //重新排序
          // result[0].sort(() => {
          //   return Math.random() - 0.5;
          // })
          // result[0].sort((a, b) => {
          //   if (a.releaseMs > b.releaseMs) {
          //     return -1;
          //   } else if (a.releaseMs <= b.releaseMs) {
          //     return 1;
          //   }
          // })
          _this.setData({
            result
          })
        } else {
          //失败则导入缓存
          _this.setData({
            result: wx.getStorageSync("collectionInfo")
          })
        }
      },
      fail() {
        //失败则导入缓存
        _this.setData({
          result: wx.getStorageSync("collectionInfo")
        })
      },
      complete() {
        wx.hideLoading();
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
      key: 'collectionInfo',
      data: this.data.result,
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