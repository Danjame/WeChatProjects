const app = getApp();

Page({
  data: {
    clientHeight: "",
    searchHeight: "",
    tabHeight: "",
    tabTitles: ["热门谣言", "防疫科普", "官方动态"],
    currentIndex: 2,
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
    dyPage:{
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
  //页面跳转
  enterDetail(e) {
    console.log(e.currentTarget.dataset.index);
    console.log(this.data.currentIndex);
    // switch (this.data.currentIndex) {
    //   case 0:
    //     app.toHot_rumor();
    //     break;
    //   case 1:
    //     app.toAntiepic_science();
    //     break;
    //   case 2:
    //     app.toOffic_dynamic();
    //     break;
    // }
  },
  //获取屏幕剩余高度
  getHightStyle() {
    const _this = this;
    wx.createSelectorQuery().select(".searchWrapper").boundingClientRect(rect => {
      _this.setData({
        searchHeight: rect.height
      });
    }).exec();
    wx.createSelectorQuery().select(".tabWrapper").boundingClientRect(rect => {
      _this.setData({
        tabHeight: rect.height
      });
    }).exec();
    wx.getSystemInfo({
      success: function(res) {
        _this.setData({
          clientHeight: res.windowHeight
        });
      }
    })
  },
  getRumors() {
    const _this = this;
    wx.request({
      url: 'https://wdd.free.qydev.com/rumor/list',
      success(res) {
        if (res.statusCode === 200) {
          const pageSize = _this.data.ruPage.pageSize;
          const total = _this.data.ruPage.total + pageSize;
          const pageNum = _this.data.ruPage.pageNum + 1;
          const result = _this.data.rumors;
          //二维数组
          result[pageNum - 1] = [];
          for (let i = (pageNum - 1) * pageSize; i < total; i++) {
            result[pageNum - 1].push(res.data[i]);
          }
          //截取时间
          result[pageNum - 1].forEach((item) => {
            item.releaseTime = item.releaseTime.slice(0, 10);
          })

          _this.setData({
            rumors: result,
            ruPage: {
              pageSize,
              total,
              pageNum
            }
          })
        }
      },
      fail(err) {
        console.log("can not get rumors");
      }
    })
  },
  getScience() {
    const _this = this;
    wx.request({
      url: 'https://wdd.free.qydev.com/science/list',
      success(res) {
        if (res.statusCode === 200) {
          const pageSize = _this.data.scPage.pageSize;
          const total = _this.data.scPage.total + pageSize;
          const pageNum = _this.data.scPage.pageNum + 1;
          const result = _this.data.science;
          //二维数组
          result[pageNum - 1] = [];
          for (let i = (pageNum - 1) * pageSize; i < total; i++) {
            result[pageNum - 1].push(res.data[i]);
          }
          //截取时间和修正图片src
          result[pageNum - 1].forEach((item) => {
            item.releaseTime = item.releaseTime.slice(0, 10);
            if (item.psImgSr) {
              item.psImgSrc = item.psImgSrc.slice(0, -2);
            }
          })

          _this.setData({
            science: result,
            scPage: {
              pageSize,
              total,
              pageNum
            }
          });
          console.log(_this.data.science);
        }
      },
      fail(err) {
        console.log("can not get science");
      }
    })
  },
  getDynamic() {
    const _this = this;
    wx.request({
      url: 'https://wdd.free.qydev.com/dynamic/list',
      success(res) {
        if (res.statusCode === 200) {
          const pageSize = _this.data.dyPage.pageSize;
          const total = _this.data.dyPage.total + pageSize;
          const pageNum = _this.data.dyPage.pageNum + 1;
          const result = _this.data.dynamic;
          //二维数组
          result[pageNum - 1] = [];
          for (let i = (pageNum - 1) * pageSize; i < total; i++) {
            result[pageNum - 1].push(res.data[i]);
          }
          //截取时间
          result[pageNum - 1].forEach((item) => {
            item.releaseTime = item.releaseTime.slice(0, 10);
          })

          _this.setData({
            dynamic: result,
            dyPage: {
              pageSize,
              total,
              pageNum
            }
          })
          console.log(_this.data.dynamic);
        }
      },
      fail(err) {
        console.log("can not get dynamic");
      }
    })
  },
  errorImg(e) {
    console.log(e);
  },
  //下拉触底添加数据
  reachBottomHandler() {
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
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getHightStyle();
    this.getRumors();
    this.getScience();
    this.getDynamic();
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