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
    enterDetail(e) {
      const id = e.currentTarget.dataset.index;
      this.data.totalList.forEach(item => {
        if (item.id === id) {
          console.log(item);
          if (item.rTitle) {
            app.toHot_rumor(id);
          } else if (item.psTitle) {
            app.toAntiepic_science(id);
          } else {
            app.toOffic_dynamic(id);
          }
        }
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
      if (this.data.showAllPage.total !== this.data.totalList.length) {
        const result = app.dataSetting(this.data.showAllPage, this.data.totalList);
        this.setData({
          general: this.data.general.concat(result.arr),
          showAllPage: result.data,
          updating: false,
        });
        // console.log(this.data.general);
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
      let totalList = this.data.result;
      totalList['ps'].forEach(item => {
        if (item.psImgSrc) {
          item.hasImg = item.psImgSrc.indexOf('.mp4') !== -1 ? false : true;
        }
      });
      totalList = totalList['r'].concat(totalList['ps'], totalList['di']);
      totalList.forEach(item => {
        item.releaseTime = item.releaseTime.slice(0, 10);
        item.releaseMs = new Date(item.releaseTime.replace(/-/g, "/")).getTime();
      })
      totalList.sort(() => {
        return Math.random() - 0.5;
      })
      totalList.sort((a, b) => {
        if (a.releaseMs > b.releaseMs) {
          return -1;
        } else if (a.releaseMs <= b.releaseMs) {
          return 1;
        }
      })
      this.setData({
        totalList
      })
    }
  },

  ready: function () {
    //获取高度以设置内容高度
    app.getHeightData(this, ".searchWrapper", ".tabWrapper");
    //数据处理
    this.initGeneral();
    this.getRumors();
    this.getScience();
    this.getDynamic();
    this.getAll();
  },
  options: {
    addGlobalClass: true
  }
})