// pages/rumor/rumor.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    started: false, // 首页开始答题
    answer: false, // 答题页面
    questions:[],
    index: 0
  },
  startTest(){
    this.setData({
      started: true, 
      answer: true, 
    })
  },

  nextQues(){
    if (this.data.index !== this.data.questions.length-1){
      let index = this.data.index + 1;
      this.setData({
        index
      });
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const _this= this;
    wx.request({
      url: 'https://wdd.free.qydev.com/item/list',
      success(res){
        if(res.statusCode === 200){
          _this.setData({
            questions: res.data
          })
        }
      },
      fail(error){
        console.log("Can not get questions!")
      },
      complete(){
        console.log(_this.data.questions);
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