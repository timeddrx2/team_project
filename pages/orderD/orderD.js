// pages/order/order.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    order_number:0,
    dialogShow: false,
    canteen:"",
    s_dormitory_1:"",
    money:"",
    scheduled_delivery_time:"",
    requirement_customer:"",
    s_dormitory_2:"",
    neutral_appraise: 0,
    good_appraise: 0,
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
    console.log("options.order_number:"+options.order_number)
    console.log("options:" + options)

    this.setData({
      order_number: options.order_number,
    })
    
    var that = this;
    wx.request({
      url: 'https://www.sssxfd.top:8080/show_order_detail',
      method: "POST",
      data: {
        error_code: 0,
        data: {
          order_number: that.data.order_number,
        },
      },
      success(res) {
        console.log(res)

        that.setData({
          canteen:res.data.data.canteen,
          s_dormitory_1: res.data.data.s_dormitory_1,
          scheduled_delivery_time: res.data.data.scheduled_delivery_time,
          money: res.data.data.money,
          scheduled_delivery_time: res.data.data.scheduled_delivery_time,
          requirement_customer: res.data.data.requirement_customer,
          s_dormitory_2: res.data.data.s_dormitory_2,
        })
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