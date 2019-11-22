// pages/order/order.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    order_number:0,
    dialogShow: false,
    buttons: [{
      text: '取消'
    }, {
      text: '去填写'
      }
      ],
    
  },

  submit: function() {
    this.setData({
      dialogShow: true
    })
    
    console.log("接单成功！")
    // wx.navigateTo({
    //   url: '../index/index',
    // })
    // console.log("111")

  },
  tapDialogButton(e) {
    this.setData({
      dialogShow: false,
    }) 
    wx.navigateTo({
      url: '/pages/denglu/denglu',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // this.setData({
    //   order_number: options.data.order_number,
    // })
    console.log(options)
    this.setData({
      order_number: "1",
    })
    console.log(this.data.order_number)
    var that = this;
    // wx.request({
    //   url: 'https://www.sssxfd.top:8080/show_order_detail',
    //   method: "POST",
    //   data: {
    //     error_code: 0,
    //     data: {
    //       order_number: that.data.order_number,
    //     },
    //   },
    //   success(res) {
    //     console.log(res)

    //   }

    // })
    this.setData({
      order_number:options.data.order_number,
    })
    wx.request({
      url: '',
      header:{},
      method:"POST",
      data:{},
      success(res){
        
      }
    })
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