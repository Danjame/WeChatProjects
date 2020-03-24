// components/rumorWrapper/rumorWrapper.js
const app = getApp();
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        rumors: {
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
        enterDetail(e) {
            const id = e.currentTarget.dataset.index;
            app.to_rumor(id);
        }
    },
    ready(){
        console.log(this.data.rumors);
    }
})