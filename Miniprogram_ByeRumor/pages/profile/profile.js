// pages/profile/profile.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    userinfo:{},
    userName:''
  },
  goToLogin: function(){
    // console.log('123')
    wx.navigateTo({
      url: "../login/login",
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

    const userinfo = wx.getStorageSync("userinfo");
    this.setData({userinfo});
  },
  /**
 * 生命周期函数--监听页面初次渲染完成
 */
  onReady: function () {
    console.log(this.data.userinfo)
    if (this.data.userinfo && this.data.userinfo.length !== 0) {
      this.setData({
        userName: this.data.userName = this.data.userinfo.nickName
      })
    } else {
      this.setData({
        userName: this.data.userName = "未登录"
      })
    }
    console.log(this.data.userName)


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