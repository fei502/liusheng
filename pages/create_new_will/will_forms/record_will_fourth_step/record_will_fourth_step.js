// pages/create_new_will/will_forms/text_will/text_will.js

const WeValidator = require('../../../../src/we-validator')
const app = getApp()

Page({
  data: {

  },

  nextButt: function () {
    wx.redirectTo({
      url: '../../will_forms/record_will_save/record_will_save',
    })
  },

  /** 
   * initiate te form validator with the required feilds and noticing text
   */
  initValidator() {
    this.validatorInstance = new WeValidator({
      // the set of the rules applied to the form
      rules: {
        realname: {
          // required: true
        },
        idnum: {
          // required: true,
          // idcard: true
        },
        telnum: {
          // required: true,
          // mobile: true
        },
        willtxt: {
          // required: true,
          //todo: set a max length? 
        }
      },
      // the message if the rules are violated
      messages: {
        realname: {
          required: '请输入真实姓名'
        },
        idnum: {
          required: '请输入身份证号',
          idcard: '请输入正确的身份证号'
        },
        telnum: {
          required: '请输入手机号',
          mobile: '手机号格式不正确'
        },
        willtxt: {
          required: '请输入您的留声'
        }
      },
    })
  },

  // submit the form and save to the cloud
  onSubmitForm(e) {
    let { value } = e.detail

    if (!this.validatorInstance.checkData(value))
      return
    console.log(this.validatorInstance.data)

    //save the form to database
    //todo: think of ways of securly transfer the data between cloud and userend 
    this.saveFormTodb(this.validatorInstance.data)

    //todo: navigate to the next page
  },

  //testing the adding to db function
  saveFormTodb: function (input_data) {

    // initializing constant for db
    const db = wx.cloud.database()
    var record_will_by_user = db.collection('record_will_by_user')

    record_will_by_user.add({
      // data 字段表示需新增的 JSON 数据
      data: {
        // _id: 'todo-identifiant-aleatoire', // get the id of the user
        realname: input_data.realname,
        idnum: input_data.idnum,
        telnum: input_data.telnum,
        willtxt: input_data.willtxt,
      },
      success: function (res) {
        // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
        console.log(res)
      }
    })
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    console.log("接收到的参数是list=" + options.list);
  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function () {
    this.initValidator()
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