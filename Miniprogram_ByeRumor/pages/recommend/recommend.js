Page({
data:{
  content:""
},
textareaInput: function (e) {
    this.setData({
      content: e.detail.value
    })    
},
submit:function (){
  if (this.data.content == ''){
    wx.showModal({
      title: '没法提交没有内容的意见',
      content: '请点击返回按钮返回',
      showCancel: false, 
      confirmText: "返回" 
    })
  }else{
    wx.showModal({
      title: '确认提交',
      content: '确认提交意见？',
      cancelText: "我再想想",
      confirmText: "提交" ,
      confirmColor: 'green',
      success: function (res) {
        if (res.confirm) {
          //提交数据
          wx.showModal({
            title: '感谢您的反馈',
            showCancel: false,
            confirmText: "返回",
            success:function (res){
              if(res.confirm){
                wx.navigateBack({
                  delta:1
                })
              }
            }
          })
        }
      }
    })
  }
}
});