const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    inputValue: "",
    placeholder: "搜索的内容",
    focus: false,
    searchState: false,
    searchResult: false,
    keyWords: [],
    result:{},
    tabTitles: ["显示全部", "热门谣言", "防疫科普", "官方动态"],

    hisList: ["防疫种类", "防疫手段", "口罩", "酒精喷雾", "新增确诊", "国外疫情"],
    rankList: ["99.7的无水乙醇可以稀释到75%后做消毒用",
      "99.7的无水乙醇可以稀释到75%后做消毒用",
    ],

    recoWords: [{
        text: "肺炎",
        type: "ru"
      },
      {
        text: "高温杀死新型肺炎病毒",
        type: "ru"
      }, {
        text: "出门需带口罩",
        type: "sc"
      }, {
        text: "广东连续3天无新增确诊",
        type: "dy"
      }
    ],
  },

  //删除搜索历史
  deleteHis() {
    this.setData({
      hisList: []
    })
  },
  //得失焦点
  inputFocus() {
    this.setData({
      focus: true,
      searchResult: false,
    })
  },
  inputBlur() {
    this.setData({
      focus: false,
    })
  },
  //搜索关键字匹配
  lastSearch: Date.now(),
  throttle: 500,
  inputChange(e) {
    const _this = this;
    let result = _this.data.recoWords;
    this.setData({
      inputValue: e.detail.value
    })
    if (Date.now() - this.lastSearch > this.throttle) {
      this.lastSearch = Date.now();
      this.timer = setTimeout(() => {
        const promise = new Promise((resolve, reject) => {
          if (!e.detail.value) {
            _this.setData({
              keyWords: []
            })
            reject();
          } else {
            result = result.filter(item => item.text.includes(e.detail.value));
            resolve(result);
          }
        });
        promise.then(result => {
          _this.setData({
            keyWords: result
          })
        }, err => console.log("Fail"));
      }, this.throttle);
    }
  },
  //确定搜索关键字
  searchConfirm(){
    const _this = this;
    wx.request({
      url: 'https://wdd.free.qydev.com/common/search',
      data: {
        keyCode: _this.data.inputValue
      },
      success(res) {
        if (res.statusCode === 200) {
          const result = res.data;
          _this.setData({
            result,
          });
        }
      },
      fail(error) {
        console.log("something wrong")
      },
      complete() {
        _this.setData({
          focus: false,
          searchState: false,
          searchResult: true,
        })
        console.log(_this.data.result);
      },
    });
    const searchResult = this.selectComponent("#searchResult");
    searchResult.setRumors();
    searchResult.setScience();
    searchResult.setDynamic();
  },
  //搜索关键字选择
  selectResult(e) {
    this.setData({
      inputValue: e.detail.item.text
    })
    //确定搜索
    this.searchConfirm();
  },

  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

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