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
    result: {},
    tabTitles: ["显示全部", "热门谣言", "防疫科普", "官方动态"],

    hisList: ["口罩", "新增确诊"],
    rankList: [],

    rankPage:{
      pageSize: 10,
      pageNum: 0,
      total: 0
    },
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
  //搜索关键字选择
  selectResult(e) {
    this.setData({
      inputValue: e.detail.item
    })
    this.searchConfirm();
  },
  selectRanking(e){
    app.toHot_rumor(e.detail);
  },
  //确定搜索关键字
  searchConfirm() {
    if (this.data.inputValue) {
      const _this = this;
      wx.request({
        url: 'https://wdd.free.qydev.com/common/search',
        data: {
          keyCode: _this.data.inputValue,
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
          });
          //去除重复的搜索记录并且前置最新记录
          const hisList = _this.data.hisList
          hisList.forEach((item, index) => {
            if (item == _this.data.inputValue) {
              hisList.splice(index, 1);
            }
          })
          _this.setData({
            hisList: [_this.data.inputValue, ...hisList],
          })
        },
      })
    }
  },
  //关键字匹配
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
  // 搜索谣言
  onInputSearch(){
    wx.request({
      url: 'https://wdd.free.qydev.com/rumor/sort',
      keyCode: this.data.inputValue,
      success(){

      },
      fail(){

      },
      complete(){
        
      }
    })
  },
  getRanking(pageData, target) {
    if (pageData.total !== target.length) {
      const result = app.dataSetting(pageData, target);
      this.setData({
        rankList: this.data.rankList.concat(result.arr),
        rankPage: result.data
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    const _this = this;
    wx.request({
      url: 'https://wdd.free.qydev.com/rumor/sort',
      success(res){
        if(res.statusCode===200){
          _this.getRanking(_this.data.rankPage, res.data);
        }
      },
      fail(error){
        console.log("Network Error!")
      },
      complete(){

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