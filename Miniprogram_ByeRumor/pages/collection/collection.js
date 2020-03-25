// pages/collection/colect.js
const app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        result: []
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        const _this = this;
        const loginInfo = wx.getStorageSync("loginInfo");
        wx.request({
            url: 'https://wdd.free.qydev.com/user/collection',
            data: {
                userId: loginInfo.userId
            },
            success(res) {
                let result = [[]];
                //合并所有数组
                result[0] = res.data['Rumor'].concat(res.data['polularScience'], res.data['dynamicInformation']);
                //加上毫秒时间
                result[0].forEach(item => {
                    item.releaseMs = new Date(item.releaseTime.replace(/-/g, "/")).getTime();
                })
                //重新排序
                result[0].sort(() => {
                    return Math.random() - 0.5;
                })
                result[0].sort((a, b) => {
                    if (a.releaseMs > b.releaseMs) {
                        return -1;
                    } else if (a.releaseMs <= b.releaseMs) {
                        return 1;
                    }
                })
                _this.setData({
                    result
                })
            },
            fail() {
                console.log("fail")
            }
        })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    }
})