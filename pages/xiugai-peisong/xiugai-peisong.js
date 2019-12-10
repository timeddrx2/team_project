// pages/xiugai-peisong/xiugai-peisong.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array: ['10',
      '15', '20',
      '25', '30',
      '35', '40',
      '45', '50',
      '55', '60'
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
    //设置食堂初始值
    array1: ['玫瑰园一楼', '玫瑰园二楼', '紫荆园一楼', '紫荆园二楼', '丁香园一楼', '丁香园二楼', '京元餐厅一楼', '京元餐厅二楼'],
    objectArray1: [{
      id: 0,
      name: '玫瑰园一楼'
    }, {
      id: 1,
      name: '玫瑰园二楼'
    }, {
      id: 2,
      name: '紫荆园一楼'
    }, {
      id: 3,
      name: '紫荆园二楼'
    }, {
      id: 4,
      name: '丁香园一楼'
    }, {
      id: 5,
      name: '丁香园二楼'
    },
    {
      id: 6,
      name: '京元餐厅一楼'
    }, {
      id: 7,
      name: '京元餐厅二楼'
    },
    ],
    index1: 0,

  },
  //普通选择器的点击事件
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
  bindPickerChange1: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index1: e.detail.value
    })
  },
  formSubmit: function (e) {
    console.log(e)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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

  },
  submit: function () {
    wx.navigateTo({
      url: '/susu/order_detail/order_detail',
    })
  }
})