// pages/rumor/rumor.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showBtn: false, // 首页开始答题
    showAns: false, // 答题页面
    showAnalyze: true // 答案解析页面
  },
  btnShowHide(){
    this.setData({
      showBtn: false, 
      showAns: true, 
      showAnalyze: false 
    })
  },
  exitClickFn(){
    this.setData({
      showBtn: true, 
      showAns: false, 
      showAnalyze: false
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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