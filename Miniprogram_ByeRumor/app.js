//app.js
App({
  //全局数据
  data: {

  },
  onShow() {
    this.authorize();
  },
  //登录
  login() {
    wx.login({
      success(res) {
        if (res.code) {
          wx.request({
            url: 'https://wdd.free.qydev.com/user/login',
            data: {
              code: res.code
            },
            method: "POST",
            success(res) {
              if (res.statusCode === 200) {
                wx.setStorage({
                  key: "loginInfo",
                  data: res.data
                });
              }
            },
            fail() {
              console.log("fail")
            }
          })
        }
      }
    });
  },
  //验证token
  authorize() {
    const _this = this;
    const loginInfo = wx.getStorageSync("loginInfo");
    wx.request({
      url: 'https://wdd.free.qydev.com//user/auth',
      data: {
        userId: loginInfo.userId,
        token: loginInfo.token
      },
      method: "POST",
      success(res) {
        if (res.data) {
          console.log("已登录！");
        } else {
          console.log("请登录！");
          // 获取登录code和token
          _this.loin();
        }
      }
    })
  },
  //点赞收藏请求封装
  likeAndCollectHandler(type, action, that) {
    const _this = this;
    const _that = that;
    const loginInfo = wx.getStorageSync("loginInfo");
    wx.request({
      url: _this.defineRequest(type, action),
      data: {
        id: _that.data.result.id,
        userId: loginInfo.userId
      },
      success(res) {
        if (res.statusCode === 200) {
          console.log(`Succeed ${action} a ${type} !`);
          if (action == "checklike") {
            _that.setData({
              like: res.data
            })
          } else if (action == "checkcollect") {
            _that.setData({
              collected: res.data
            })
          }
        }
      },
      fail() {
        console.log("fail");
      },
      complete() {}
    })
  },
  //点赞收藏请求地址封装
  defineRequest(type, action) {
    let url;
    switch (action) {
      case "like":
        url = `https://wdd.free.qydev.com/${type}/stick`;
        break;
      case "unlike":
        url = `https://wdd.free.qydev.com/${type}/nostick`;
        break;
      case "checklike":
        url = `https://wdd.free.qydev.com/${type}/stick/is`;
        break;
      case "collect":
        url = `https://wdd.free.qydev.com/${type}/collection`;
        break;
      case "uncollect":
        url = `https://wdd.free.qydev.com/${type}/nocollection`;
        break;
      case "checkcollect":
        url = `https://wdd.free.qydev.com/${type}/collection/is`;
        break;
    };
    return url;
  },
  //路由跳转
  to_rumor(params) {
    wx.navigateTo({
      url: '../rumor/rumor?id=' + params,
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
  //数据分页和二维数组处理
  dataSetting(page, target) {
    if (page.total >= target.length) {
      return;
    } else {
      let pageSize, total, pageNum;
      //二维数组
      let arr = [
        []
      ];
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
  //获取单个和可视窗口高度
  getContentHeight(ele, that, callBack) {
    const _this = that;
    wx.createSelectorQuery().in(_this).select(ele).boundingClientRect(rect => {
      wx.getSystemInfo({
        success: function (res) {
          callBack(rect.height, res.windowHeight)
        }
      })
    }).exec()
  },
  //获取两个元素和可视窗口高度
  getHeightData(ele1, ele2, that, callBack) {
    const _this = that;
    const sePromise = new Promise((resolve, reject) => {
      wx.createSelectorQuery().in(_this).select(ele1).boundingClientRect(rect => {
        resolve(rect.height);
      }).exec()
    });
    const taPromise = new Promise((resolve, reject) => {
      wx.createSelectorQuery().in(_this).select(ele2).boundingClientRect(rect => {
        resolve(rect.height);
      }).exec()
    });
    const winPromise = new Promise((resolve, reject) => {
      wx.getSystemInfo({
        success: function (res) {
          resolve(res.windowHeight)
        }
      })
    });
    Promise.all([sePromise, taPromise, winPromise]).then((result)=>{
      callBack(result);
    }
    ).catch(error=>{
      console.log("Failure");
    })
  },
})