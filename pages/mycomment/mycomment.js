// pages/orderMain/orderMain.js
Page({
  data: {
    // tab切换 
    list: [1, 2, 3, 4, 5],
    currentTab: 0,
    // 标签内容
    list2: [{ n: "吃饱喝足", com: "能顺路赚钱很开心！", fee: "2$", time: "2019-10-22" }, { n: "身体好", com: "谢谢你对我选的菜的喜欢", fee: "2$", time: "2019-10-22" }, { n: "小鸡带饭", com: "小姐姐很爽快", fee: "2$", time: "2019-10-22" }, { n: "少不了", com: "谢谢你对我的信任❤️", fee: "2$", time: "2019-10-22" }, { n: "nice!", com: "3q~", fee: "2$", time: "2019-10-22" },],
    list3: [{ n: "吃饱喝足", com: "很好！很准时！", fee: "2$", time: "2019-10-22" }, {
      n: "身体好", com: "这个同学选的菜很合我胃口👍", fee: "2$", time: "2019-10-22"
    }, { n: "小鸡带饭", com: "不用排队就可以吃食堂，太赞了！", fee: "2$", time: "2019-10-22" }, { n: "少不了", com: "谢谢，菜还是热的", fee: "2$", time: "2019-10-22" }, { n: "nice!", com: "good！", fee: "2$", time: "2019-10-22" },]

  },
  toXiangQing: function() {
wx.navigateTo({
  url: '',
})
  },
//滑块
  swichNav: function (e) {
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
  swiperChange: function (e) {
    console.log(e);
    this.setData({
      currentTab: e.detail.current,
    })

  },
change:function(){
  wx.navigateTo({
    url: '../xiugai-peisong/xiugai-peisong',
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