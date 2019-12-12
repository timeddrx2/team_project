// pages/zhuce/zhuce.js
// pages/zhuce/zhuce.js
var app = getApp()


Page({

    /**
     * 页面的初始数据
     */
    data: {
      telephone: "",
      password: "",
      userInfo: {},
      hasUserInfo: false,
      canIUse: wx.canIUse('button.open-type.getUserInfo')
    },
    formSubmit: function(e) {
      console.log(e)
      console.log(this.data.userInfo)
      var that = this;
      wx.request({
        url: 'https://www.sssxfd.top:8080/sign_up',
        header: {
          'content-type': 'application/json'
        },
        data: {
          error_code: 0,
          data: {
            telephone: e.detail.value.telephone,
            password: e.detail.value.password,
            name: e.detail.value.name,
            sex: e.detail.value.sex,
            academy: e.detail.value.academy,
            student_id: e.detail.value.student_id,
            wechat_name: that.data.userInfo.nickName,
            head_link: that.data.userInfo.avatarUrl,
          }
        },
        method: "POST",
        success(res) {
          console.log(res.data.data)
          if (res.data.data.result == 1) {
            wx.showModal({
              title: '注册成功',
              content: '快去登录吧！',
              showCancel: false, //是否显示取消按
              confirmText: "确定", //默认是“确定”
              confirmColor: '#fde073', //确定文字的颜色
              success: function(res) {
                if (res.confirm) {
                  //点击确定,默认隐藏弹框
                }
              },
              fail: function(res) {}, //接口调用失败的回调函数
              complete: function(res) {}, //接口调用结束的回调函数（调用成功、失败都会执行）
            })
          that.setData({
            telephone: e.detail.value.telephone,
            password: e.detail.value.password,
          })
          console.log(that.data.telephone)
          }
        }
      })
    },
    toEntry: function() {
      var that=this
      wx.request({
        url: 'https://www.sssxfd.top:8080/sign_in',
        header: {
          'content-type': 'application/json'
        },
        data: {
          error_code: 0,
          data: {
            telephone:that.data.telephone,
            password: that.data.password,
          }
        },
        method: "POST",
        success(res){
          console.log(res)
          wx.switchTab({
            url: '/pages/home/home',
          })
        }
      })
    },

  /**
   * 生命周期函数--监听页面加载
   */

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
  onLoad: function() {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
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
})