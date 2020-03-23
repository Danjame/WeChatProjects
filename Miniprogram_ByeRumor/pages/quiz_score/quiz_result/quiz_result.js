// pages/quiz_score/quiz_result/quiz_result.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
      score:{
        type: Array,
        value: []
      },
      questions:{
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
        toScoreHint(e) {
            const index = e.currentTarget.dataset.index;
            const ques = JSON.stringify(this.data.questions[index]);
            wx.navigateTo({
                url: '/pages/score_hint/score_hint?ques='+ ques
            })
        }
    },
})