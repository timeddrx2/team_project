const app = getApp()
Page({
  data: {
    list: [{ hall_name: "丁香二楼", status: "等待接单中...", price: "0.5",time:"10:00"}, { hall_name: "玫瑰", status: "已完成", price: "2", time: "水饺" }, { hall_name: "玫瑰", status: "已完成", price: "2", time: "水饺" }, { hall_name: "玫瑰", status: "已完成", price: "2", time: "水饺" }]
  },
  // onLoad: function (options) {
  //   // 页面初始化 options为页面跳转所带来的参数
  // },
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
  jump:function() {
    wx.navigateTo({
      url: '/pages/index/index',
    })
  },
  detail: function () {
    wx.navigateTo({
      url: '/pages/order_detail_ing/order_detail_ing',
    })
  }
})






















