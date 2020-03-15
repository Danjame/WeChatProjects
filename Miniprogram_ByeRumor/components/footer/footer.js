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
  },
  /**
   * 组件的方法列表
   */
  methods: {
    clickLikeHandler() {
      this.setData({
        like: this.data.like == false ? true : false
      })
    },
    clickColleHandler() {
      this.setData({
        collection: this.data.collection == false ? true : false
      })
    },
  },
  options:{
    addGlobalClass: true
  }
})
