// components/footer/footer.js
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
    like: false,
    collection: false,
    share: false
  },
  /**
   * 组件的方法列表
   */
  methods: {
    clickLikeHandler() {
      this.setData({
        like: this.data.like? false : true
      })
    },
    clickColleHandler() {
      this.setData({
        collection: this.data.collection? false : true
      })
    },
    shareHandler(){
      this.setData({
        share: this.data.share?false:true
      })
    }
  },
})
