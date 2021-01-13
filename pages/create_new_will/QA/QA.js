// pages/create_new_will/QA/QA.js
// to do: change the list into dictionary for better data structure 

Page({

  data: {
    qNum: 0,  //question number
    ans_ls: [0, 0, 0],  //answer list
    question: "", //question text
    content: "",  //content text
    //dictionary {Qn: [question, content]}
    dict: {
      "Q1": ["1. 您是否已经写过或希望手写纸质的遗嘱?", "手写的纸质遗嘱，在法律上分为亲笔书写的自书遗嘱和由见证人代写的代书遗嘱，要求所有参与者签字并注明年月日。纸质遗嘱可以直接拍照上传。"],
      "Q2": ["2. 您想要一份具有完整法律效力的遗嘱吗?", "一份具有完整法律效力的遗嘱，需要公证机关或至少两位无继承关系的见证人的参与。如果遗嘱涉及共有财产分配，还需要共有财产人的参与或声明。"],
      "Q3": ["3. 您希望通过口述还是打字记录您的话？", "口述将以录音形式留存，请您在安静、封闭的场地进行录音，以免被干扰。打字的遗嘱完全不具备法律效力，但更为便捷。"]
    }
  },

  /**
   * chanding the card of the new will page 
   */
  changeCard: function(qNum){
    var key = "Q" + String(qNum + 1)
    this.setData({
      question: this.data.dict[key][0],
      content: this.data.dict[key][1]
    })
  },

  /**
   * logging the choice being selected
   */
  logAnser: function(choice){
    if (choice == "noButt") {
      this.data.ans_ls[this.data.qNum] = 0
    } else {
      this.data.ans_ls[this.data.qNum] = 1
    }
  },

  /**
   * the main function that manage the selection card
   */
  tapChoice: function(e) {
    var choice = e.target.id

    if (this.data.qNum < 2) {
      this.logAnser(choice)
      this.data.qNum += 1
      if(this.data.qNum == 1 && choice == "yesButt"){
        wx.redirectTo({
          url: '../will_form/photo_will/photo_will',
        })
      }
      if (this.data.qNum == 2 && choice == "yesButt"){
        wx.redirectTo({
          url: '../will_forms/legal_record_will/legal_record_will',
        })
      }
      this.changeCard(this.data.qNum)
    } else{
      this.logAnser(choice)
      this.data.qNum += 1
      // this.giveResult()
      if (this.data.qNum == 3 && choice == "yesButt") {
        wx.navigateTo({
          url: '../will_forms/text_will/text_will?list=' + JSON.stringify(this.data.ans_ls),
        })
      }
    }
  },

  // /**
  //  * Navigate to the recommendation page with the ans_ls
  //  */
  // giveResult: function(){
  //   wx.navigateTo({
  //     url: '../confirmation/confirmation?list=' + JSON.stringify(this.data.ans_ls)
  //   })
  // },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    this.changeCard(this.data.qNum) //initializing the page
  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function () {
  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow: function () {

  },

  /**
   * Lifecycle function--Called when page hide
   */
  onHide: function () {

  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload: function () {

  },

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh: function () {

  },

  /**
   * Called when page reach bottom
   */
  onReachBottom: function () {

  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage: function () {

  }
})