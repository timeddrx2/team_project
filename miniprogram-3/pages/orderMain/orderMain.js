// pages/orderMain/orderMain.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [{ lou: "35#", add: "玫瑰一楼", fee: "2$", time: "10:00" }, { lou: "35#", add: "玫瑰一楼", fee: "2$", time: "10:00" }, { lou: "35#", add: "玫瑰一楼", fee: "2$", time: "10:00" }, { lou: "35#", add: "玫瑰一楼", fee: "2$", time: "10:00" }, { lou: "35#", add: "玫瑰一楼", fee: "2$", time: "10:00" },]
  },
  toXiangQing: function() {
wx.navigateTo({
  url: '',
})
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },
  onPullDownRefresh: function () {
    wx.showNavigationBarLoading()
    this.onLoad()
    setTimeout(() => {
      wx.hideNavigationBarLoading()
      wx.stopPullDownRefresh()
    }, 2000);
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

  }
})