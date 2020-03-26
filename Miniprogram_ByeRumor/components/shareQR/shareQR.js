// components/shareQR/shareQR.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {},

  /**
   * 组件的方法列表
   */
  methods: {
    preventScroll() {
      return;
    },
    stopPropagation() {
      return;
    },
    getClientHeight() {
      const _this = this;
      wx.getSystemInfo({
        success: function(res) {
          _this.setData({
            clientHeight: res.windowHeight
          });
        }
      })
    },
    drawImage() {
      //绘制二维码图片
      const ctx = wx.createCanvasContext("shareQR", this);
      //绘制头像
      wx.getImageInfo({
        src: wx.getStorageSync("userInfo").avatarUrl,
        success(res) {
          ctx.setFillStyle("white");
          ctx.fillRect(0, 0, 250, 300);
          ctx.drawImage(res.path, 100, 0, 50, 50);
          ctx.draw();
        },
        fail() {
          console.log("Fail to get profilePath!")
        }
      })
      //绘制二维码
      // wx.getImageInfo({
      //   src: '',
      //   success(res) {
      //     ctx.drawImage(res.path, 50, 150, 200, 200);
      //   },
      //   fail(){
      //     console.log("Fail to get qrPath!")
      //   }
      // })
    },
    canvasToImage() {
      //保存图片
      wx.canvasToTempFilePath({
        canvasId: "shareQR",
        success() {

        }
      })
    },
    saveImge() {
      wx.saveImageToPhotosAlbum({
        filePath: "",
        success(res) {
          console.log("succeed!")
        }
      })
    }
  },
  lifetimes: {
    ready() {
      this.getClientHeight();
      this.drawImage();
    }
  }
})