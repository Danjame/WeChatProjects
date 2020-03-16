const app = getApp();
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    tabTitles: {
      type: Array,
      value: ""
    },
    currentIndex: {
      type: Number,
      value: 0
    },
    result: {
      type: Array,
      value: []
    },
    science: {
      type: Array,
      value: []
    },
    dynamic: {
      type: Array,
      value: []
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    searchHeight: "",
    tabHeight: "",
    clientHeight: ""
  },

  /**
   * 组件的方法列表
   */
  methods: {
    //获取当前index
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
    enterDetail(){
      console.log("跳转");
    }
  },
  ready: function() {
    //获取屏幕剩余高度
    const _this = this;
    wx.createSelectorQuery().select(".searchWrapper").boundingClientRect(rect => {
      _this.setData({
        searchHeight: rect.height
      });
    }).exec();
    wx.createSelectorQuery().in(this).select(".tabWrapper").boundingClientRect(rect => {
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
    });
  }
})