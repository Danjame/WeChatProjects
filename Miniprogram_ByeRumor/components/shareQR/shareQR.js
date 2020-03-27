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
  data: {
    clientHeight:"",
    profilePath: "",
    qrPath:""
  },

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
    getClientHeight(callBack) {
      wx.getSystemInfo({
        success: function(res) {
          callBack(res.windowHeight);
        }
      })
    },
    setImageData(callBack) {
      const proPromise = new Promise((resolve, reject)=>{
        wx.getImageInfo({
          src: wx.getStorageSync("userInfo").avatarUrl,
          success(res) {
            resolve(res.path);
          },
        });
      })
      // const qrPromise = new Promise((resolve, reject) => {
      //   wx.getImageInfo({
      //     src: "../../icons/qr.png",
      //     success(res) {
      //       resolve(res.path);
      //     },
      //   });
      // })
      Promise.all([proPromise]).then((res)=>{
        callBack(res);
        this.drawImage();
      })
    },
    //绘制图片
    drawImage() {
      const ctx = wx.createCanvasContext("canvas", this);
      ctx.setFillStyle("white");
      ctx.fillRect(0, 0, 250, 350);
      ctx.drawImage(this.data.profilePath, 20, 20, 50, 50);
      ctx.drawImage("../../icons/qr.png", 25, 125, 200, 200);
      // ctx.draw();
      ctx.draw(wx.canvasToTempFilePath({
        canvasId: "canvas",
        success(res) {
          console.log(res.tempFilePath);
          wx.saveImageToPhotosAlbum({
            filePath: 'res.tempFilePath',
            success(res){
              wx.showToast({
                title: '图片已保存至相册',
              })
            }
          })
        },
        fail() {
          console.log("fail")
        }
      }, this));
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
      this.getClientHeight((height)=>{
        this.setData({
          clientHeight: height
        })
      });
      this.setImageData(res=>{
        this.setData({
          profilePath: res[0],
          qrPath: res[1]
        })
      });
    }
  }
})