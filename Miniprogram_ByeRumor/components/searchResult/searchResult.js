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

      console.log(this.data);
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
        data: {
          pageSize,
          total,
          pageNum
        }
      }
    },
    reachBottomHandler() {
      this.setData({
        updating: true,
      });
      switch (this.data.currentIndex) {
        case 0:
          this.setRumors();
          break;
        case 1:
          this.setScience();
          break;
        case 2:
          this.setDynamic();
          break;
      }
    },
    setRumors() {
      const ruResult = this.dataSetting(this.data.ruPage, this.data.result.r);
      this.setData({
        rumors: this.data.rumors.concat(ruResult.arr),
        ruPage: ruResult.data
      });
    },
    setScience() {
      const scResult = this.dataSetting(this.data.scPage, this.data.result.ps);
      this.setData({
        science: this.data.science.concat(scResult.arr),
        scPage: scResult.data
      });
    },
    setDynamic() {
      const dyResult = this.dataSetting(this.data.dyPage, this.data.result.di);
      this.setData({
        dynamic: this.data.dynamic.concat(dyResult.arr),
        dyPage: dyResult.data
      });
    },
    ready: function () {
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
        success: function (res) {
          _this.setData({
            clientHeight: res.windowHeight
          });
        }
      });
      //数据处理
      this.setRumors();
      this.setScience();
      this.setDynamic();
    }
  }
})