// pages/will_forms/photo_will/photo_will.js

const WeValidator = require('../../../../src/we-validator')
const app = getApp()

Page({
  data: {
    images:[]
  },

  /** 
   * initiate te form validator with the required feilds and noticing text
   */
  initValidator() {
    this.validatorInstance = new WeValidator({
      // the set of the rules applied to the form
      rules: {
        realname: {
          required: true
        },
        idnum: {
          required: true,
          idcard: true
        },
        telnum: {
          required: true,
          mobile: true
        },
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
    console.log(db)
    const photo_will_by_user = db.collection('photo_will_by_user')

    console.log(app)
    photo_will_by_user.add({
      // data 字段表示需新增的 JSON 数据
      data: {
        // _id: 'todo-identifiant-aleatoire', // 可选自定义 _id，在此处场景下用数据库自动分配的就可以了
        realname: input_data.realname,
        idnum: input_data.idnum,
        telnum: input_data.telnum,
        image: input_data.image,
      },
      success: function (res) {
        // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
        console.log(res)
      }
    })
  },

  /**
     * 上传图片方法
     */
  // upload: function () {
  //   //let that = this;
  //   wx.chooseImage({
  //     count: 1, // 默认9
  //     sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
  //     sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
  //     success: function(res){
  //       wx.showLoading({
  //         title: '正在上传...',
  //       })
  //       // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
  //       const filePath = res.tempFilePaths[0];
  //       const cloudPath = 'my-image' + filePath.match(/\.[^.]+?$/)[0]

  //       // that.setData({
  //       //   tempFilePaths: tempFilePaths
  //       // })

  //       /**
  //        * 上传完成后把文件上传到服务器
  //        */
  //       //var count = 0;
  //       //for (var i = 0, h = tempFilePaths.length; i < h; i++) {
  //         //上传文件
  //           wx.cloud.uploadFile({
  //             cloudPath,
  //             filePath,
 
  //             success: res => {
  //               // count++;
  //               //如果是最后一张,则隐藏等待中  
  //               console.log('[上传文件] 成功：', res)

  //               app.globalData.fileID = res.fileID
  //               app.globalData.cloudPath = cloudPath
  //               app.globalData.imagePath = filePath

  //               wx.navigateTo({
  //                 url: '../all_choices/all_choices',
  //               })
  //             },
  //             fail: function (res) {
                
  //               wx.hideLoading();
  //               wx.showModal({
  //                 title: '错误提示',
  //                 content: '上传图片失败',
  //                 showCancel: false,
  //                 success: function (res) { }
  //               })
  //             }
  //           });
  //       //}

  //     }
  //   })
  // },



  /**
   * 预览图片方法
   */
  // listenerButtonPreviewImage: function (e) {
  //   let index = e.target.dataset.index;
  //   let that = this;
  //   wx.previewImage({
  //     current: that.data.tempFilePaths[index],
  //     urls: that.data.tempFilePaths,
  //     //这根本就不走
  //     success: function (res) {
  //       //console.log(res);
  //     },
  //     //也根本不走
  //     fail: function () {
  //       //console.log('fail')
  //     }
  //   })
  // },

  /**上传图片 */

  upload: function () {
    // 选择图片
    wx.chooseImage({
      count: 1,
      sizeType: ['original','compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {

        wx.showLoading({
          title: '上传中',
        })

        const filePath = res.tempFilePaths[0]
        console.log('[选择文件] 成功：', res)
        // 上传图片
        // 这部分可以自行处理图片的命名方式，这里图片进行了固定命名为 my-image
        const cloudPath = 'my-images' + filePath.match(/\.[^.]+?$/)[0]
        console.log('[改名] 成功：', cloudPath)
        wx.cloud.uploadFile({
          cloudPath,
          filePath,
          success: res => {
            console.log('[上传文件] 成功：', res)

            app.globalData.fileID = res.fileID
            app.globalData.cloudPath = cloudPath
            app.globalData.imagePath = filePath

            // 上传成功后，页面进行跳转，在详情页加载图片显示等操作
            // wx.navigateTo({
            //   url: '../storageConsole/storageConsole'
            // })
          },
          fail: e => {
            console.error('[上传文件] 失败：', e)
            wx.showToast({
              icon: 'none',
              title: '上传失败',
            })
          },
          complete: () => {
            wx.hideLoading()
          }
        })

      },
      fail: e => {
        console.error(e)
      }
    })
  },
  

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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