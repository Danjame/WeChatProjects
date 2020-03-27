const app = getApp();

Page({
  data: {
    tabTitles: ["热门谣言", "防疫科普", "官方动态"],
    currentIndex: 0,
    updating: false,
    ruPage: {
      pageSize: 10,
      pageNum: 0,
      total: 0
    },
    scPage: {
      pageSize: 10,
      pageNum: 0,
      total: 0
    },
    dyPage: {
      pageSize: 10,
      pageNum: 0,
      total: 0
    },
    rumors: [],
    science: [],
    dynamic: [],
  },
  tabChange(e) {
    this.setData({
      currentIndex: e.currentTarget.dataset.index
    });
  },
  slideChange(e) {
    this.setData({
      currentIndex: e.detail.current
    })
  },
  getRumors() {
    wx.showLoading({
      title: "加载中..."
    })
    const _this = this;
    wx.request({
      url: 'https://wdd.free.qydev.com/rumor/list',
      success(res) {
        if (res.statusCode === 200 && _this.data.ruPage.total !== res.data.length) {
          const result = app.dataSetting(_this.data.ruPage, res.data);
          _this.setData({
            rumors: _this.data.rumors.concat(result.arr),
            ruPage: result.data
          })
        }
      },
      fail(err) {
        console.log("can not get rumors");
        _this.setData({
          succeed: false
        })
      },
      complete() {
        wx.hideLoading();
        _this.setData({
          updating: false,
        })
      }
    })
  },
  getScience() {
    const _this = this;
    wx.request({
      url: 'https://wdd.free.qydev.com/science/list',
      success(res) {
        if (res.statusCode === 200 && _this.data.scPage.total !== res.data.length) {
          const result = app.dataSetting(_this.data.scPage, res.data);
          result.arr[0].forEach(item => {
            if (item.psImgSrc) {
              item.hasImg = item.psImgSrc.indexOf('.mp4') !== -1 ? false : true;
            }
          })
          _this.setData({
            science: _this.data.science.concat(result.arr),
            scPage: result.data
          })
        }
      },
      fail(err) {
        console.log("can not get science");
      },
      complete() {
        _this.setData({
          updating: false,
        })
      }
    })
  },
  getDynamic() {
    const _this = this;
    wx.request({
      url: 'https://wdd.free.qydev.com/dynamic/list',
      success(res) {
        if (res.statusCode === 200 && _this.data.dyPage.total !== res.data.length) {
          const result = app.dataSetting(_this.data.dyPage, res.data);
          _this.setData({
            dynamic: _this.data.dynamic.concat(result.arr),
            dyPage: result.data
          })
        }
      },
      fail(err) {
        console.log("can not get dynamic");
      },
      complete() {
        _this.setData({
          updating: false,
        })
      }
    })
  },
  errorImg(e) {
    console.log(e);
  },
  //下拉触底添加数据
  reachBottomHandler() {
    if (!this.data.updating) {
      this.setData({
        updating: true,
      });
      switch (this.data.currentIndex) {
        case 0:
          this.getRumors();
          break;
        case 1:
          this.getScience();
          break;
        case 2:
          this.getDynamic();
          break;
      }
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getRumors();
    this.getScience();
    this.getDynamic();

    //获取高度以设置内容高度
    app.getHeightData(".searchWrapper", ".tabWrapper", this, (res) => {
      this.setData({
        searchHeight: res[0],
        tabHeight: res[1],
        clientHeight: res[2]
      })
    });
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