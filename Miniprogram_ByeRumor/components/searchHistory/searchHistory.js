const app = getApp();
Component({
  /**
   * 组件的属性列表
   */
  properties: {
      hisList: {
        type: Array,
        value: []
      },
      rankList: {
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
    selectHistory(e) {
      const index = e.currentTarget.dataset.index;
      const item = this.data.hisList[index];
      this.triggerEvent("selectResult", {item, index});
    },
    deleteHistory() {
      this.triggerEvent("deleteHis");
    },
    selectRanking(e){
      const index = e.currentTarget.dataset.index;
      this.triggerEvent("selectRanking", index);
    },
  },
})
