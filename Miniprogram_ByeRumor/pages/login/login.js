// pages/login/login.js
Page({
  // 获取用户登录数据
  getUserInfo(e){
    wx.setStorage({
      key: "userInfo",
      data: e.detail.userInfo
    });
    // 跳回打开页面
    wx.navigateBack({
      delta:1
    });
  }
})