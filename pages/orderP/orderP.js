// pages/order/order.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    order_number:"",
    canteen: "",
    money: "",
    scheduled_delivery_time: "",
    s_dormitory_1: "",
    s_dormitory_2: "",
    requirement_customer: "",
    requirement_delivery: "",
    telephone_delivery:"",
    telephone_customer:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

    console.log("options.data:" +options.order_number)
    console.log("option:" + options)

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
          order_number: options.order_number,
        },
      },
      success(res) {
        console.log(res)
        that.setData({
          canteen: res.data.data.canteen,
          money: res.data.data.money,
          scheduled_delivery_time: res.data.data.scheduled_delivery_time,
          s_dormitory_1: res.data.data.s_dormitory_1,
          s_dormitory_2: res.data.data.s_dormitory_2,
          requirement_customer: res.data.data.requirement_customer,
          requirement_delivery: res.data.data.requirement_delivery,
          telephone_delivery: res.data.data.telephone_delivery,
          telephone_customer: res.data.data.telephone_customer
        })
      }

    })
  },
  formsubmit: function(e) {
    var that = this
    console.log(e)
    wx.request({
      url: 'https://www.sssxfd.top:8080/get_order',
      method: "POST",
      data: {
        error_code: "0",
        data: {
          order_number: that.data.order_number,
          order_type: "1",
          order_status: "0",
          canteen: that.canteen,
          s_dormitory_1: that.data.s_dormitory_1,
          s_dormitory_2: that.data.s_dormitory_2,
          money: that.money,
          requirement_customer: that.data.requirement_customer,
          requirement_delivery: that.data.requirement_delivery,
          telephone_delivery: that.data.telephone_delivery,
          telephone_customer: that.data.telephone_customer,
        },
        success(res){
          console.log(res)
        
        }
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