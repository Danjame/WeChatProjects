// pages/quiz/quiz-answer/quiz-answer.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    question:{
      type: Object,
      value: {}
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    activated: null,
    isCorrect: true,
    showShare: false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    nextQues(){
      this.triggerEvent("nextQues");
      this.setData({
        activated: null,
        isCorrect: true,
        showShare: false
      })
    },
    selectAnswer(e){
      //按键样式
      const index = e.currentTarget.dataset.index;
      this.setData({
        activated: index
      })
      // 正误判断
      if ((this.data.activated == "true" && this.data.question.ibResult == "1") || (this.data.activated == "false" && this.data.question.ibResult == "0")){
        console.log("correct");
        this.setData({
          isCorrect: true
        });
        this.nextQues();
      }else{
        console.log("wrong");
        this.setData({
          isCorrect: false
        })
      }
    },
    hideShare(){
      this.setData({
        showShare: false
      })
    },
    showShare(e){
      this.setData({
        showShare: true
      })
    }
  },
})