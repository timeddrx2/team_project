// page/comment.js
const app = getApp()

Page({
  /**
   * 页面的初始数据
   */

  data: {
    telephone:"",
    nickName:"",
    head_link:"",
  },
toDingDan:function(){
  wx.navigateTo({
    url: '/pages/myorder/myorder',
  })
},
toInformation:function(){
  wx.navigateTo({
    url: '/pages/myInformation/myInformation',
  })
},
toMyComment:function(){
  wx.navigateTo({
    url: '/pages/mycom/mycom',
  })
},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      telephone: app.globalData.telephone
    })
    console.log(this.data.telephone)
    console.log(this.data.telephone)
    var that = this
    wx.request({
      url: 'https://www.sssxfd.top:8080/show_personal_information',
      method:"POST",
      data:{
        error_code: 0,
        data: {
          telephone: that.data.telephone,
        }
      },
      success(res){
        console.log(res)
        that.setData({
          nickName:res.data.data[0].wechat_name,
          head_link:res.data.data[0].head_link
        })
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