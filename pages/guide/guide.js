// pages/guide/guide.js
Page({

  /**
   * Page initial data
   */
  data: {
    list:[{
      id: 0,
      open: false,
      Q:"使用留声立嘱的流程？",
      A: "指导手册仅适用于中国（大陆），您也可以直接跟随留声的“规范录音遗嘱”流程，创建合法可执行的遗嘱。如果您无需创建严谨合法的遗嘱，我们建"
    }, {
      id: 1,
      open: false,
      Q: "哪些人可以自己独立立遗嘱？",
      A: "asdkjakdjfdf"
    },{
      id: 2,
      open: false,
      Q: "中国（大陆）立遗嘱的法律基础？",
      A: "asdkjakdjfdf"
    },{
      id: 3,
      open: false,
      Q: "未立遗嘱有什么影响？",
      A: "asdkjakdjfdf"
    },{
      id: 4,
      open: false,
      Q: "遗嘱有哪些形式，各包含哪些要件？",
      A: "asdkjakdjfdf"
    },{
      id: 5,
      open: false,
      Q: "能否立多份遗嘱，有多份遗嘱时哪一份有效？",
      A: "asdkjakdjfdf"
    },{
      id: 6,
      open: false,
      Q: "哪些情况可能导致遗嘱产生争议？",
      A: "asdkjakdjfdf"
    },{
      id: 7,
      open: false,
      Q: "非现金资产如何在遗嘱中分配？",
      A: "asdkjakdjfdf"
    },{
      id: 8,
      open: false,
      Q: "因遗嘱争议导致继承权纠纷，如何解决？",
      A: "asdkjakdjfdf"
    },{
      id: 9,
      open: false,
      Q: "如何经公证机关立遗嘱？",
      A: "asdkjakdjfdf"
    },{
      id: 10,
      open: false,
      Q: "没有遗嘱或遗嘱未涉及时，财产如何分配？",
      A: "asdkjakdjfdf"
    },{
      id: 11,
      open: false,
      Q: "《中华人民共和国继承法》全文",
      A: "asdkjakdjfdf"
    }]

  },

  kindToggle: function (e) {
    var id = e.currentTarget.id, list = this.data.list;
    console.log(list)
    for (var i = 0, len = list.length; i < len; ++i) {
      if (list[i].id == id) {
        list[i].open = !list[i].open
      } else {
        list[i].open = false
      }
    }
    console.log(list)
    this.setData({
      list: list
    });
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {

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