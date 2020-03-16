//app.js
App({
  //全局数据
  data: {

  },
  //路由跳转
  toHot_rumor(params) {
    wx.navigateTo({
      url: '../hot_rumor/hot_rumor?id='+params,
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
  toAntiepic_science(params) {
    wx.navigateTo({
      url: '../antiepic_science/antiepic_science?id=' + params,
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
  toOffic_dynamic(params) {
    wx.navigateTo({
      url: '../offic_dynamic/offic_dynamic?id=' + params,
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
})