// components/quizShare/quizShare.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    question:{
      type: Object,
      value: {}
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    shareImage: false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    exitShare(){
      this.triggerEvent("exitShare");
    },
    stopPropa(){
      return;
    },
    shareToMoment() {
      this.setData({
        shareImage: this.data.shareImage? false: true
      })
    },
    preventScroll(){
      return;
    }
  }
})
