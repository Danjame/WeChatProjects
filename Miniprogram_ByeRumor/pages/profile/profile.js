// pages/profile/profile.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    hasInfo: false,
    userName: ""
  },
  to_Login: function(){
    wx.navigateTo({
      url: "../login/login",
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const userInfo = wx.getStorageSync("userInfo");
     this.setData({userInfo});
     if(Object.keys(this.data.userInfo).length){
      this.setData({
        hasInfo: true
      })
     }
  },
  /**
 * 生命周期函数--监听页面初次渲染完成
 */
  onReady: function () {
    if (this.data.hasInfo) {
      this.setData({
        userName: this.data.userInfo.nickName
      })
    } else {
      this.setData({
        userName: "未登录"
      })
    }
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