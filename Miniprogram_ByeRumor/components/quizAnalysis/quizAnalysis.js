// components/quizAnalysis/quizAnalysis.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        question: {
            type: Object,
            value: {}
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
        clickHandler() {
            this.triggerEvent("click")
        },
        showShare() {
            this.setData({
                share: true
            })
        },
        hideShare() {
            this.setData({
                share: false
            })
        }
    }
})