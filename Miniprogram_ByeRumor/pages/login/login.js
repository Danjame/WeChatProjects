// pages/login/login.js
Page({
    // 获取用户登录数据
    getUserInfo(e) {
      ////获取用户信息
        const userInfo = e.detail.userInfo;
        wx.setStorage({
            key: "userInfo",
            data: userInfo
        });
        //获取登录code和token
        const _this = this;
        wx.login({
            success(res) {
                if (res.code) {
                    wx.request({
                        url: 'https://wdd.free.qydev.com/user/login',
                        data:{code: res.code},
                        method: "POST",
                        success(res) {
                            wx.setStorage({
                                key: "loginInfo",
                                data: res.data
                            });
                        },
                        fail(){
                          console.log("fail")
                        }
                    })
                }
            }
        })

        // 跳回打开页面
        wx.navigateBack({
            delta: 1
        });
    },
})