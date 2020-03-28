const app = getApp();
Page({
    /**
     * 页面的初始数据
     */
    data: {
        started: true, // 首页开始答题
        questions: [],
        index: 0,
        score: []
    },
    startTest() {
        this.setData({
            started: true,
        });
    },
    exitAnswer() {
        this.setData({
            started: false,
            index: 0,
            score: []
        })
    },
    nextQues() {
        const _this = this;
        if (this.data.index == this.data.questions.length - 1) {
            const score = JSON.stringify(this.data.score);
            const questions = JSON.stringify(this.data.questions);
            wx.navigateTo({
                url: '../quiz_score/quiz_score?score=' + score + '&questions=' + questions,
                events: {
                    getData() {
                        _this.setData({
                            started: false,
                            index: 0
                        })
                    }
                },
                success(res) {
                    console.log("succeed!")
                }
            });
        } else {
            let index = this.data.index + 1;
            this.setData({
                index
            });
        }
    },
    getScore(e) {
        this.setData({
            score: e.detail
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
      const _this = this;
        wx.request({
            url: 'https://wdd.free.qydev.com/item/list',
            success(res) {
                if (res.statusCode === 200) {
                    _this.setData({
                        questions: res.data
                    })
                }else{
                  //失败则导入缓存
                  _this.setData({
                    questions: wx.getStorageSync("questions")
                  })
                }
            },
            fail(error) {
                console.log("Can not get questions!");
              //失败则导入缓存
              _this.setData({
                questions: wx.getStorageSync("questions")
              })
            },
            complete() {
                // console.log(_this.data.questions);
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
      //离开页面缓存此次数据
      wx.setStorage({
        key: 'questions',
        data: this.data.questions,
      })
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