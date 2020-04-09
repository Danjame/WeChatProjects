Page({
    data: {
        content: ""
    },
    textareaInput: function(e) {
        this.setData({
            content: e.detail.value
        })
    },
    submit: function() {
        const _this = this;
        if (!this.data.content) {
            wx.showModal({
                title: "没法提交没有内容的意见",
                content: "请点击返回按钮返回",
                showCancel: false,
                confirmText: "返回"
            })
        } else {
            wx.showModal({
                title: "确认提交",
                content: "确认提交意见？",
                cancelText: "我再想想",
                confirmText: "提交",
                success: function(res) {
                    if (res.confirm) {
                        //提交意见数据
                        const loginInfo = wx.getStorageSync("loginInfo");
                        wx.request({
                            url: 'https://wdd.free.qydev.com/user/back',
                            data: {
                                context: _this.data.content,
                                userId: loginInfo.userId
                            },
                            success(res) {
                                if (res.data) {
                                    wx.showModal({
                                        title: "感谢您的反馈",
                                        showCancel: false,
                                        confirmText: "返回",
                                        success: function(res) {
                                            if (res.confirm) {
                                                wx.navigateBack({
                                                    delta: 1
                                                })
                                            }
                                        }
                                    })
                                }
                            },
                            fail() {
                                wx.showModal({
                                    title: "NetWork Error!",
                                    showCancel: false,
                                    confirmText: "返回",
                                    success: function(res) {
                                        if (res.confirm) {
                                            wx.navigateBack({
                                                delta: 1
                                            })
                                        }
                                    }
                                })
                            },
                        })
                    }
                }
            })
        }
    }
});