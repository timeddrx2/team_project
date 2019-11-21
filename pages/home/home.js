Page({
  data: {
    // tab切换 
    list: [1, 2, 3, 4, 5],
    currentTab: 0,
    // 标签内容
    list2: [{ lou: "35#", add: "玫瑰一楼", fee: "2$", time: "10:00" }, { lou: "35#", add: "玫瑰一楼", fee: "2$", time: "10:00" }, { lou: "35#", add: "玫瑰一楼", fee: "2$", time: "10:00" }, { lou: "35#", add: "玫瑰一楼", fee: "2$", time: "10:00" }, { lou: "35#", add: "玫瑰一楼", fee: "2$", time: "10:00" },],
    list3: [{ lou: "35#3F", add: "玫瑰一楼", fee: "2$", time: "10:00" }, { lou: "35#6F", add: "玫瑰一楼", fee: "2$", time: "10:00" }, { lou: "35#2F", add: "玫瑰一楼", fee: "2$", time: "10:00" }, { lou: "35#1F", add: "玫瑰一楼", fee: "2$", time: "10:00" }, { lou: "35#5F", add: "玫瑰一楼", fee: "2$", time: "10:00" },]

  },
  toDXiangQing: function () {
wx.navigateTo({
  url: '../orderD/orderD',
})
  },
  toPXiangQing: function () {
wx.navigateTo({
  url: '../orderP/orderP',
})
  },
  swichNav: function(e) {
    console.log(e);
    var that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current,
      })
    }
  },
  swiperChange: function(e) {
    console.log(e);
    this.setData({
      currentTab: e.detail.current,
    })

  },
  
  onLoad: function(options) {
    // 生命周期函数--监听页面加载
    
  },
  onPullDownRefresh: function () {
    wx.showNavigationBarLoading()
    this.onLoad()
    setTimeout(() => {
      wx.hideNavigationBarLoading()
      wx.stopPullDownRefresh()
    }, 2000);
  },

  onReady: function() {
    // 生命周期函数--监听页面初次渲染完成
  },
  onShow: function() {
    // 生命周期函数--监听页面显示
  },
  onHide: function() {
    // 生命周期函数--监听页面隐藏
  },
  onUnload: function() {
    // 生命周期函数--监听页面卸载
  },
  onPullDownRefresh: function() {
    // 页面相关事件处理函数--监听用户下拉动作
  },
  onReachBottom: function() {
    // 页面上拉触底事件的处理函数
  },
  onShareAppMessage: function() {
    // 用户点击右上角分享
    return {
      title: 'title', // 分享标题
      desc: 'desc', // 分享描述
      path: 'path' // 分享路径
    }
  }
})