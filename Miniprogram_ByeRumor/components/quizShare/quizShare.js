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
    }
  }
})
