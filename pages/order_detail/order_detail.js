// 点单详情
const app = getApp()
Page({
  data: {
    text: "这是一个页面",
    order_number: 0,
    canteen: "",
    //bad_appraise: 0,
   // neutral_appraise: 0,
   // good_appraise: 0,
    money: "",//配送费
    order_date: "",//订单日期
    order_delivery_time: "",//订单配对时间
   // order_status: 3,
   // order_type: "0",
    requirement_customer: "",//顾客订单备注
    requirement_delivery: null,//配送员
    //result_time: "",
    s_dormitory_1: "",//楼号
    s_dormitory_2: "",//门号
    scheduled_delivery_time: "",//预计送达时间
    telephone_customer: "",//点单人电话
    telephone_delivery: null//配送员电话
  },
  onLoad: function(options) {
    console.log("查看配送单详情")
    console.log("options.order_number:" + options.order_number)
    console.log("options:" + options)

    this.setData({
      order_number: options.order_number
    })
    var that = this;
    wx.request({
      url: 'https://www.sssxfd.top:8080/show_order_detail',
      header: {
        'content-type': ' application/json'
      },
      method: "POST",
      data: {
        error_code: 0,
        data: {
          order_number: that.data.order_number
        }
      },
      success(res) {
        console.log(res)
        that.setData({
          order_number: res.data.data.order_number,
          canteen: res.data.data.canteen,
          money: res.data.data.money,//配送费
          order_date: res.data.data.order_date,//订单日期
          requirement_customer: res.data.data.requirement_customer,//顾客订单备注
          requirement_delivery: res.data.data.requirement_delivery,//配送员
          s_dormitory_1: res.data.data.s_dormitory_1,//楼号
          s_dormitory_2: res.data.data.s_dormitory_2,//门号
          scheduled_delivery_time: res.data.data.scheduled_delivery_time,//预计送达时间
          telephone_customer: res.data.data.telephone_customer,//点单人电话
          telephone_delivery: res.data.data.telephone_delivery,//配送员电话
          order_delivery_time: res.data.data.order_delivery_time//订单配对时间
        })
      }
    })
    // 页面初始化 options为页面跳转所带来的参数
  },
  // onReady: function () {
  //   // 页面渲染完成
  // },
  // onShow: function () {
  //   // 页面显示
  // },
  // onHide: function () {
  //   // 页面隐藏
  // },
  // onUnload: function () {
  //   // 页面关闭
  // },
})