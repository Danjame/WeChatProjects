//app.js
App({
  //全局数据
  data: {

  },
  //路由跳转
  to_rumor(params) {
    wx.navigateTo({
      url: '../rumor/rumor?id='+params,
      events: {
        getData(data) {
          console.log(data);
        }
      },
      success(res) {
        res.eventChannel.emit("getData", {
          data: 0
        })
      }
    })
  },
  to_science(params) {
    wx.navigateTo({
      url: '../science/science?id=' + params,
      events: {
        getData() {
          console.log("Data");
        }
      },
      success(res) {
        res.eventChannel.emit("getData", {
          data: 0
        })
      }
    })
  },
  to_dynamic(params) {
    wx.navigateTo({
      url: '../dynamic/dynamic?id=' + params,
      events: {
        getData() {
          console.log("Data");
        }
      },
      success(res) {
        res.eventChannel.emit("getData", {
          data: 0
        })
      }
    })
  },
  dataSetting(page, target) {
    if (page.total >= target.length) {
      return;
    } else {
      let pageSize, total, pageNum;
      //二维数组
      let arr = [[]];
      if (target.length - page.total >= page.pageSize) {
        pageSize = page.pageSize;
        total = page.total + pageSize;
        pageNum = page.pageNum + 1;
        for (let i = (pageNum - 1) * pageSize; i < total; i++) {
          arr[0].push(target[i]);
        }
      } else {
        pageSize = page.pageSize;
        total = page.total + target.length - page.total;
        pageNum = page.pageNum + 1;
        for (let i = (pageNum - 1) * pageSize; i < target.length; i++) {
          arr[0].push(target[i]);
        }
      }
      //截取时间
      arr[0].forEach(item => {
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
    }
  },
  getHeightData(self, searchEle, tabEle) {
    const _this = self;
    wx.createSelectorQuery().select(searchEle).boundingClientRect(rect => {
      _this.setData({
        searchHeight: rect.height
      });
    }).exec();
    wx.createSelectorQuery().in(_this).select(tabEle).boundingClientRect(rect => {
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
    })
  },
})