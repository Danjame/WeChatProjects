// pages/collection/colect.js
const app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        collection: {},
        ruPage: {
            pageSize: 20,
            pageNum: 0,
            total: 0
        },
        scPage: {
            pageSize: 20,
            pageNum: 0,
            total: 0
        },
        dyPage: {
            pageSize: 20,
            pageNum: 0,
            total: 0
        },
        rumors: [],
        science: [],
        dynamic: []
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
                if (res.data.Rumor.length) {
                    const rumors = app.dataSetting(_this.data.ruPage, res.data.Rumor).arr;
                    _this.setData({
                        rumors,
                    })
                }
                if (res.data.polularScience.length) {
                    const science = app.dataSetting(_this.data.scPage, res.data.polularScience).arr;
                    science[0].forEach(item => {
                        if (item.psImgSrc) {
                            item.hasImg = item.psImgSrc.indexOf('.mp4') !== -1 ? false : true;
                        }
                    })
                    _this.setData({
                        science,
                    })
                }
                if (res.data.dynamicInformation.length) {
                    const dynamic = app.dataSetting(_this.data.dyPage, res.data.dynamicInformation).arr;
                    _this.setData({
                        dynamic
                    })
                }
            },
            fail(){
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