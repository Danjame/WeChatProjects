// components/footer/footer.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    result:{
      type: Object,
      value: {}
    },
    like:{
      type: Boolean,
      value: false
    },
    collected:{
      type: Boolean,
      value: false
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    share: false
  },
  /**
   * 组件的方法列表
   */
  methods: {
    clickLikeHandler() {
      this.setData({
        like: this.data.like? false : true
      });
      this.triggerEvent("clickLike", this.data.like);
    },
    clickColleHandler() {
      this.setData({
        collected: this.data.collected? false : true
      });
      this.triggerEvent("clickCollect", this.data.collected);
    },
    shareHandler(){
      this.setData({
        share: this.data.share?false:true
      })
    }
  },
})
