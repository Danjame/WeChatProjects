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
    updating: false,
    showAllPage: {
      pageSize: 10,
      pageNum: 0,
      total: 0
    },
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
    general: [],
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
    reachBottomHandler() {
      if (!this.data.updating) {
        this.setData({
          updating: true,
        });
        switch (this.data.currentIndex) {
          case 0:
            this.getAll();
            break;
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
    },
    getAll() {
      if (this.data.showAllPage.total !== this.data.genData.length) {
        const result = app.dataSetting(this.data.showAllPage, this.data.genData);
        this.setData({
          general: this.data.general.concat(result.arr),
          showAllPage: result.data,
          updating: false,
        });
      }
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
          if (item.psImgSrc) {
            item.hasImg = item.psImgSrc.indexOf('.mp4') !== -1 ? false : true;
          }
        })
        this.setData({
          science: this.data.science.concat(result.arr),
          scPage: result.data,
          updating: false,
        });
      }
    },
    getDynamic() {
      if (this.data.dyPage.total !== this.data.result.di.length) {
        const result = app.dataSetting(this.data.dyPage, this.data.result.di);
        this.setData({
          dynamic: this.data.dynamic.concat(result.arr),
          dyPage: result.data,
          updating: false,
        })
      }
    },
    //合并排列数据
    initGeneral() {
      let genData = this.data.result;
      //判断媒体类型
      genData['ps'].forEach(item => {
        if (item.psImgSrc) {
          item.hasImg = item.psImgSrc.indexOf('.mp4') !== -1 ? false : true;
        }
      });
      genData = genData['r'].concat(genData['ps'], genData['di']);
      //时间格式处理并加上毫秒时间
      genData.forEach(item => {
        item.releaseTime = item.releaseTime.slice(0, 10);
        item.releaseMs = new Date(item.releaseTime.replace(/-/g, "/")).getTime();
      })
      //打乱排序
      genData.sort(() => {
        return Math.random() - 0.5;
      })
      //按时间排序
      genData.sort((a, b) => {
        if (a.releaseMs > b.releaseMs) {
          return -1;
        } else if (a.releaseMs <= b.releaseMs) {
          return 1;
        }
      })
      this.setData({
        genData
      })
    }
  },
  lifetimes: {
    ready() {
      //数据处理
      this.initGeneral();
      this.getRumors();
      this.getScience();
      this.getDynamic();
      this.getAll();
      //获取高度以设置内容高度
      app.getHeightData(".searchWrapper", ".tabWrapper", this, (res) => {
        this.setData({
          searchHeight: res[0],
          tabHeight: res[1],
          clientHeight: res[2]
        })
      });
    },
  }
})