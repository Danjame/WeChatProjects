// components/searchState/searchState.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    keyWords:{
      type: Array,
      value:[]
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
    selectInput(e){
      const index = e.currentTarget.dataset.index;
      const item = this.data.keyWords[index];
      this.triggerEvent("selectResult", {item, index});
    }
  }
})
