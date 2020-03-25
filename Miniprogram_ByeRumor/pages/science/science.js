const app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        result: {},
        like: null,
        collected: null,
    },
    //点赞和取消点赞
    clickLike(e) {
        this.setData({
            like: e.detail
        });
        if (e.detail) {
            app.likeAndCollectHandler.call(app, "science", "like", this);
        } else {
            app.likeAndCollectHandler.call(app, "science", "unlike", this);
        }
    },
    //收藏和取消收藏
    clickCollect(e) {
        this.setData({
            collected: e.detail
        });
        if (e.detail) {
            app.likeAndCollectHandler.call(app, "science", "collect", this);
        } else {
            app.likeAndCollectHandler.call(app, "science", "uncollect", this);
        }
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        const _this = this;
        wx.request({
            url: 'https://wdd.free.qydev.com/science/get',
            data: {
                id: options.id
            },
            success(res) {
                if (res.statusCode === 200) {
                    const result = res.data;
                    result.psContext = result.psContext.replace(/^\s+/, '');
                    result.releaseTime = result.releaseTime.slice(0, 10);
                    if (result.psImgSrc) {
                        result.hasImg = result.psImgSrc.indexOf('.mp4') !== -1 ? false : true;
                    }
                    _this.setData({
                        result
                    })
                }
            },
            fail(error) {
                console.log("something wrong")
            },
            complete() {
              //获取是否点赞和收藏数据
                app.likeAndCollectHandler.call(app, "science", "checklike", _this);
                app.likeAndCollectHandler.call(app, "science", "checkcollect", _this);
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