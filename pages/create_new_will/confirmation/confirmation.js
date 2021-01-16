// pages/create_new_will/confirmation/confirmation.js

var cardDic = {
  "照片遗嘱" : {
    "ans_ls": [],
    "dir": "../will_forms/photo_will/photo_will",
    "content": "您需要找到一个光线充足的场所，将手写遗嘱拍照上传。遗嘱上必须包括您的签名和手写的年月日。如果由人代书，还需有代书人和至少一位见证人的签字和手写的年月日。",
  },
  "文字遗嘱": {
    "ans_ls": [],
    "dir": "../will_forms/text_will/text_will",
    "content": "您只需将遗嘱输入文本框并保存即可。文字遗嘱没有任何法律效力，因而无法保证执行，只能作为最后的留言。 如果涉及大额财产分配，建议您改用其他形式的遗嘱。"
  },
  "录音遗嘱": {
    "ans_ls": [],
    "dir": "../will_forms/record_will/record_will",
    "content": "您需要找到一个安静封闭的环境，口述您的遗嘱并录音。录音中必须报出您的姓名、身份证号（或其他身份验证信息）和年月日。您可以选择增加见证人。"
  },
  "规范录音遗嘱": {
    "ans_ls": [],
    "dir": "../will_forms/legal_record_will/legal_record_will",
    "content": "留声设置的一种录音遗嘱程序，其程序和内容符合现行《继承法》的要求。我们会将遗嘱拆分为章节，您必须遵循程序逐章完成文字稿，而后在至少两位见证人的陪同下念出您的遗嘱全文，并与见证人依次报出姓名、身份证号（或其他身份验证信息）和年月日。"
  }
}

Page({
  data: {
    title: "文字遗嘱",
    content: "您只需将遗嘱输入文本框并保存即可。文字遗嘱没有任何法律效力，因而无法保证执行，只能作为最后的留言。 如果涉及大额财产分配，建议您改用其他形式的遗嘱。",
    animationData: {},
    clicked: 0
    },

  /**
   * Function direct to appropriate new will page
   */
  createWill: function() {
    wx.navigateTo({
      url: cardDic[this.data.title].dir
    })
  },

  /**
   * Utility function that load card content according to users answer list
   */
  loadCard: function(ans_ls) {
    var key = ""
    // decide which content and title to use
    if (ans_ls[0] == 1) {
      key = "规范录音遗嘱"
    } else if (ans_ls[1] == 1) {
      key = "照片遗嘱"
    } else if (ans_ls[2] == 1) {
      key = "录音遗嘱"
    } else {
      key = "文字遗嘱"
    }
    this.setData({
      title: key,
      content: cardDic[key].content
    })
  },

  /**
   * create the animation of moving the card
   */
  moveCard: function() {
    //create the animation 
    var animation = wx.createAnimation({
      duration: 1000,
      timingFunction: 'ease',
    })

    //insert the animation into the queue
    this.animation = animation
    this.setData({
      animationData: animation.export(),
      showResult: 1
    })

    // move the animation out of the queue
    setTimeout(function() {
      animation.translateY(-100).opacity(1).step()
      this.setData({
        animationData: animation.export()
      })
    }.bind(this), 1000)
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function(options) {
    // test received list
    console.log("接收到的参数是list=" + options.list);
    // load the card with appropritate data
    this.loadCard(JSON.parse(options.list))
    this.moveCard()
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