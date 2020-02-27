// pages/quiz/ans-analyze/ans-analyze.js
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
    showAnl: true, //显示分析组件
    showShare: false //显示分享组件
  },

  /**
   * 组件的方法列表
   */
  methods: {
    showBtnFn(){
      this.triggerEvent('exitClickFn')
    },
    showAnl(){
      this.triggerEvent('nextClickFn')
    },
    // 显示分享组件
    showShare(){
      this.setData({
        showAnl:false,
        showShare: true
      })
    },
    // 点击透明背景，取消分享
    hideShare(){
      this.setData({
        showAnl: true,
        showShare: false
      })
    },
    cancleBubble(){}
  }
})
