// components/generalWrapper/generalWrapper.js
const app = getApp();
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    result: {
      type: Array,
      value: []
    },
    rawData: {
      type: Array,
      value: []
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
    longpressHandler(e) {
      const id = e.currentTarget.dataset.index;
      this.triggerEvent("longpressHandler", id);
    },
    enterDetail(e) {
      const id = e.currentTarget.dataset.index;
      this.data.rawData.forEach(item => {
        if (item.id === id) {
          if (item.rTitle) {
            app.to_rumor(id);
          } else if (item.psTitle) {
            app.to_science(id);
          } else {
            app.to_dynamic(id);
          }
        }
      })
    },
  },
})