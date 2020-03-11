// pages/login/login.js
Page({
  // 获取用户登录数据
  handleGetUserInfo(e){
    // console.log(e);
    const {userInfo}=e.detail;
    wx.setStorageSync('userinfo', userInfo);
    // 跳回打开页面
    wx.navigateBack({
      delta:1
    });
  }
})