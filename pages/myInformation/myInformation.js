// pages/myInformation/myInformation.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  toorderMain: function () {
    console.log("返回主页")
    wx.navigateTo({
      url: "../orderMain/orderMain"
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.request({
      url: 'https://www.sssxfd.top:8080/show_personal_information',
      method: "POST",
      header:{
        'content-type':' application/json'
      },
      data: {
        "error_code": 0,
        "data": {
          "telephone": "13252142852",
        }
      },
      success(res) {
        var name = res.data.name
        var sex = res.data.sex
        var academy = res.data.academy
        var student_id = res.data.student_id
        var tel = res.data.telephone
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})