// pages/denglu/denglu.js
const app = getApp()

Page({
  data: {
    dialogShow1: false,
    dialogShow2: false,
    buttons: [{
      text: '确定'
    }],
    // telephone: "",
  },
  formSubmit: function(e) {
    var that=this
    console.log(e)
    // this.setData({
    //   telephone: e.detail.value.telephone,
    // })
    app.globalData.telephone = e.detail.value.telephone; 
    console.log(app.globalData.telephone)
    wx.request({
      url: 'https://www.sssxfd.top:8080/sign_in',
      header: {
        'content-type': 'application/json'
      },
      data: {
        error_code: 0,
        data: {
          telephone: e.detail.value.telephone,
          password: e.detail.value.password,
        }
      },
      method: "POST",
      success(res) {
        getApp().globalData.telephone = e.detail.value.telephone; 
        console.log(getApp().globalData.telephone)
        console.log(res.data.data.result)
        if (res.data.data.result == 1) {
          wx.switchTab({
            url: '/pages/home/home'
          })
        }
        // 密码错误
        if (res.data.data.result == 0){
          that.setData({
            dialogShow1: true
          })
        }
        //手机号不存在
          if (res.data.data.result == 2){
            that.setData({
              dialogShow2: true
            })
          }
      }
    })
  },
// 显示弹窗
  tapDialogButton(e) {
    this.setData({
      dialogShow1: false,
      dialogShow2: false,
      showOneButtonDialog: false
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  toRegister: function() {
    wx.navigateTo({
      url: '/pages/zhuce/zhuce',
    })
  },
  myMessage: function() {
    wx.navigateTo({
      url: '/pages/home/home',
    })
  }
})