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
    qrPath:"",
    tempFilePath: ""
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
    //获取图片本地地址
    setImageData(callBack) {
      const proPromise = new Promise((resolve, reject)=>{
        wx.getImageInfo({
          src: wx.getStorageSync("userInfo").avatarUrl,
          success(res) {
            resolve(res.path);
          },
        });
      })
      const qrPromise = new Promise((resolve, reject) => {
        wx.getImageInfo({
          src: "",
          success(res) {
            resolve(res.path);
          },
        });
      })
      Promise.all([proPromise]).then((res)=>{
        callBack(res);
      })
    },
    //绘制图片并下载
    drawImage(profilePath, qrPath) {
      const _this = this;
      const ctx = wx.createCanvasContext("canvas", this);
      ctx.setFillStyle("white");
      ctx.fillRect(0, 0, 250, 350);
      //圆头像
      ctx.save();
      ctx.beginPath();
      ctx.arc(45, 45, 25, 0, 2*Math.PI, false);
      ctx.clip();
      ctx.drawImage(profilePath, 20, 20, 50, 50);
      ctx.restore();
      //二维码
      ctx.drawImage(qrPath, 25, 125, 200, 200);
      //文字
      ctx.setFontSize(15);
      ctx.setFillStyle("#aaa");
      ctx.fillText(wx.getStorageSync("userInfo").nickName, 90, 35);
      ctx.fillText("邀请您使用辟谣助手", 90, 65);
      ctx.setFontSize(18);
      ctx.setFillStyle("#ef962d");
      ctx.fillText("逍遥平台", 90, 100);
      //开始绘制
      ctx.draw(false, ()=>{
        wx.canvasToTempFilePath({
          canvasId: "canvas",
          success(res) {
            _this.setData({
              tempFilePath: res.tempFilePath
            })
          },
          fail() {
            console.log("fail to save imgPath")
          }
        }, this)
      });
    },
    //保存图片
    saveImge() {
      const _this = this;
      wx.saveImageToPhotosAlbum({
        filePath: _this.data.tempFilePath,
        success(res) {
          wx.showToast({
            title: "图片已保存至手机相册，赶紧分享到朋友圈吧！",
            icon: "none"
          })
        },
        fail(){
          wx.showToast({
            title: "保存失败",
            icon:"none"
          })
        }
      })
    }
  },
  lifetimes: {
    ready() {
      //获取可视高度
      this.getClientHeight((height)=>{
        this.setData({
          clientHeight: height
        })
      });
      //获取图片地址
      this.setImageData(res=>{
        this.setData({
          profilePath: res[0],
          qrPath: res[1]
        })
        //绘图图片
        this.drawImage(this.data.profilePath,"../../icons/qr.png");
      });
    }
  }
})