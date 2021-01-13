//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: '留声',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },

  //jumping to according pages
  NavToNewWill: function() {
    wx.navigateTo({
      url: '../new_will/new_will'
    })
  },
  NavToModWill: function () {
    wx.navigateTo({
      url: '../modify_will/modify_will'
    })
  },
  NavToGuide: function () {
    wx.navigateTo({
      url: '../guide/guide'
    })
  },
  NavToNota: function () {
    wx.navigateTo({
      url: '../notarization/notarization'
    })
  },
  
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
