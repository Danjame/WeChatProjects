const app = getApp();

Page({
  data: {
    clientHeight: "",
    searchHeight: "",
    tabHeight: "",
    tabTitles: ["热门谣言", "防疫科普", "官方动态"],
    currentIndex: 0,
    updating: true,
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
  //页面跳转
  enterDetail(e) {
    // console.log(e.currentTarget.dataset.index);
    // console.log(this.data.currentIndex);
    switch (this.data.currentIndex) {
      case 0:
        app.toHot_rumor();
        break;
      case 1:
        app.toAntiepic_science();
        break;
      case 2:
        app.toOffic_dynamic();
        break;
    }
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
          const result = _this.dataSetting.call(_this, _this.data.ruPage, res.data);
          _this.setData({
            rumors: _this.data.rumors.concat(result.arr),
            ruPage: result.data
          });
        }
      },
      fail(err) {
        console.log("can not get rumors");
      },
      complete() {
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
        if (res.statusCode === 200) {
          const result = _this.dataSetting.call(_this, _this.data.scPage, res.data);
          result.arr[0].forEach(item => {
            item.hasImg = item.psImgSrc.indexOf('.mp4') !== -1 ? false : true;
          })
          _this.setData({
            science: _this.data.science.concat(result.arr),
            scPage: result.data
          });
          // console.log(_this.data.science);
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
        if (res.statusCode === 200) {
          const result = _this.dataSetting.call(_this, _this.data.dyPage, res.data);
          _this.setData({
            dynamic: _this.data.dynamic.concat(result.arr),
            dyPage: result.data
          })
          // console.log(_this.data.dynamic);
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
  dataSetting(page, target) {
    const pageSize = page.pageSize;
    const total = page.total + pageSize;
    const pageNum = page.pageNum + 1;
    const arr = [];
    //二维数组
    arr[0] = [];
    for (let i = (pageNum - 1) * pageSize; i < total; i++) {
      arr[0].push(target[i]);
    }
    //截取时间
    arr[0].forEach((item, index) => {
      item.releaseTime = item.releaseTime.slice(0, 10);
    })
    return {
      arr,
      data:{
        pageSize,
        total,
        pageNum
      }
    }
  },
  errorImg(e) {
    console.log(e);
  },
  getData() {
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
  },
  //下拉触底添加数据
  reachBottomHandler() {
    if (!this.data.updating) {
      this.getData();
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