// pages/login/login.js
const app = getApp();
Page({
  // 获取用户登录数据
  getUserInfo(e) {
    //获取用户信息
    const userInfo = e.detail.userInfo;
    wx.setStorage({
      key: "userInfo",
      data: userInfo
    });
    wx.showToast({
      title: '登录成功！',
    });
    //获取登录code和token
    app.login();
    // 跳回打开页面
    wx.navigateBack({
      delta: 1
    });
  },
})