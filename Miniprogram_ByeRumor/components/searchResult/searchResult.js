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
      type: Object,
      value: {}
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    searchHeight: "",
    tabHeight: "",
    clientHeight: "",
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
  /**
   * 组件的方法列表
   */
  methods: {
    //获取当前index
    tabChange(e) {
      this.setData({
        currentIndex: e.currentTarget.dataset.index
      })
    },
    slideChange(e) {
      this.setData({
        currentIndex: e.detail.current
      })
    },
    enterDetail() {
      const id = e.currentTarget.dataset.index
      switch (this.data.currentIndex) {
        case 0:
          app.toHot_rumor(id);
          break;
        case 1:
          app.toAntiepic_science(id);
          break;
        case 2:
          app.toOffic_dynamic(id);
          break;
      }
    },
    reachBottomHandler() {
      if(!this.data.updating){
        this.setData({
          updating: true,
        });
        switch (this.data.currentIndex) {
          case 1:
            this.getRumors();
            break;
          case 2:
            this.getScience();
            break;
          case 3:
            this.getDynamic();
            break;
        }
      }
      console.log(this.data.ruPage);
      console.log(this.data.rumors);
    },
    getRumors() {
      if (this.data.ruPage.total !== this.data.result.r.length) {
        const result = app.dataSetting(this.data.ruPage, this.data.result.r);
        this.setData({
          rumors: this.data.rumors.concat(result.arr),
          ruPage: result.data,
          updating: false,
        });
      }
    },
    getScience() {
      if (this.data.scPage.total !== this.data.result.ps.length) {
        const result = app.dataSetting(this.data.scPage, this.data.result.ps);
        result.arr[0].forEach(item => {
          item.hasImg = item.psImgSrc.indexOf('.mp4') !== -1 ? false : true;
        })
        this.setData({
          science: this.data.science.concat(result.arr),
          scPage: result.data,
          updating: false,
        });
      }
    },
    getDynamic() {
      if (this.data.dyPage.total !== this.data.result.di.length){
        const result = app.dataSetting(this.data.dyPage, this.data.result.di);
        this.setData({
          dynamic: this.data.dynamic.concat(result.arr),
          dyPage: result.data,
          updating: false,
        })
      }
    },
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
    //数据处理
    this.getRumors();
    this.getScience();
    this.getDynamic();
  },
  options: {
    addGlobalClass: true
  }
})