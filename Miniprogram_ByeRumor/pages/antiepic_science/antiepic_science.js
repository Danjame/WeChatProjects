// pages/antiepic_science/antiepic_science.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    result: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const _this = this;
    wx.request({
      url: 'https://wdd.free.qydev.com/dynamic/get',
      data: {
        id: 3853
      },
      success(res) {
        const result = res.data;
        console.log(result);
      //   if (result.rContext.includes("要点：")) {
      //     const targetIndex = result.rContext.indexOf("要点：");
      //     result.rSummary = result.rContext.slice(targetIndex + 3);
      //     result.rDescription = result.rContext.slice(0, targetIndex);
          result.releaseTime = result.releaseTime.slice(0, 10);
      //   }
        _this.setData({
          result: res.data
        })
      },
      fail(error) {
        console.log("something wrong")
      },
      complete() {
        // console.log(_this.data.result);
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})