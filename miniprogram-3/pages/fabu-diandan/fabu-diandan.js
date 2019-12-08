// pages/fabu-diandan/fabu-diandan.js
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    dialogShow: false,
    buttons: [{
      text: '确定'
    }
    ],
    telephone:"",
    // tab切换 
    list: [1, 2, 3, 4, 5],
    currentTab: 0,
    //设置初始值
    array: ['10',
      '15',  '20',
      '25',  '30',
      '35',  '40',
      '45', '50',
       '55',  '60'
    ],
    objectArray: [{
        id: 10,
        name: '10'
      },
      {
        id: 15,
        name: '15'
      },
      {
        id: 20,
        name: '20'
      },
      {
        id: 25,
        name: '25'
      },
      {
        id: 30,
        name: '30'
      },
      {
        id: 35,
        name: '35'
      },
      {
        id: 40,
        name: '40'
      },
      {
        id: 45,
        name: '45'
      },
      {
        id: 50,
        name: '50'
      },
      {
        id: 55,
        name: '55'
      },
      {
        id: 60,
        name: '60'
      },
    ],
    index: 0,
  },
  //普通选择器的点击事件
  bindPickerChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
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
  // 发布点单
  formSubmit: function (e) {
    console.log(e)
    var that = this;
    wx.request({
      url: 'https://www.sssxfd.top:8080/issue_order',
      method:"POST",
      data:{
        error_code: 0,
        data: {
          order_number: null,
          order_type: "0",
          order_status: "0",
          canteen: e.detail.value.restaurant,
          s_dormitory_1: e.detail.value.lou,
          s_dormitory_2: e.detail.value.men,
          money: e.detail.value.fee,
          requirement_customer: e.detail.value.require,
          requirement_delivery: null,
          order_delivery_time: "null",
          scheduled_delivery_countdown: that.data.array[e.detail.value.time1],
          result_countdown: e.detail.value.time2,
          telephone_delivery: null,
          telephone_customer: that.data.telephone,
        }
      },
      success(res){
        console.log(res)
        if(res.data.data.result == 1){
          that.setData({
            dialogShow: true
          })
          // wx.switchTab({
          //   url: '/pages/home/home',
          // })
        }
      }
    })

  },
  //发布配送单
  formSubmit1: function (e) {
    console.log(e)
    var that = this;
    wx.request({
      url: 'https://www.sssxfd.top:8080/issue_order',
      method: "POST",
      data: {
        error_code: 0,
        data: {
          order_number: null,
          order_type: "1",
          order_status: "0",
          canteen: e.detail.value.restaurant_,
          s_dormitory_1: e.detail.value.lou_,
          s_dormitory_2: "",
          money: e.detail.value.fee_,
          requirement_customer: null,
          requirement_delivery: e.detail.value.remarks_,
          order_delivery_time: "null",
          scheduled_delivery_countdown: that.data.array[e.detail.value.time1_],
          result_countdown: e.detail.value.time2_,
          telephone_delivery: null,
          telephone_customer: that.data.telephone,
        }
      },
      success(res) {
        console.log(res)
        if (res.data.data.result == 1) {
          that.setData({
            dialogShow: true
          })
          // wx.switchTab({
          //   url: '/pages/home/home',
          // })
        }
      }
    })

  },
  // 显示弹窗
  tapDialogButton(e) {
    this.setData({
      dialogShow: false,
    })
    wx.switchTab({
      url: '/pages/home/home',
    })
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      telephone: app.globalData.telephone
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

  },
  jump: function() {
    wx.navigateTo({
      url: '/pages/fabu-peisong/fabu-peisong',
    })
  },
  submit: function() {
    wx.navigateTo({
      url: '/susu/order_detail/order_detail',
    })
  }
})