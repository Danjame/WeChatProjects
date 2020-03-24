// components/scienceWrapper/scienceWrapper.js
const app = getApp();
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        science: {
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
            app.to_science(id);
        },
    }
})