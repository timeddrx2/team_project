const app = getApp()
Page({
  data: {
    list: [1, 2, 3, 4, 5],// list2:点单 list3:配送
    currentTab: 0,
    telephone: "",
    order_number: 0,
    dialogShow1: false,//控制取消点单弹窗显示
    dialogShow2: false,//控制取消配送弹窗显示
    buttons: [{
      text: '确定'
    }],
  },
  //swiper
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
    var line;
    if (that.data.currentTab == 0) {
      line = that.data.list2.length;
    } else if (that.data.currentTab == 1) {
      console.log(1)
      line = that.data.list3.length;
    }
    this.setData({
      aheight: 230 * line
    });
  },
  swiperChange: function (e) {
    console.log(e);
    this.setData({
      currentTab: e.detail.current,
    })
    var line;
    if (this.data.currentTab == 0) {
      line = this.data.list2.length;
    } else if (this.data.currentTab == 1) {
      console.log(1)
      line = this.data.list3.length;
    }
    this.setData({
      aheight: 230 * line
    });

  },
  //点单
  detail1: function (e) {
    console.log(e)
    wx.navigateTo({
      url: '/pages/order_detail/order_detail?order_number' + this.data.list2[index].order_number,
    })
  },
  //配送
  detail2: function (e) {
    console.log(e)
    wx.navigateTo({
      url: '/pages/order_detail_ing/order_detail_ing?order_number' + this.data.list3[index].order_number,
    })
  },
  //控制弹窗显示
  tapDialogButton(e) {
    this.setData({
      dialogShow1: false,
      dialogShow2: false,
    })
  },
  //修改配送单
  changeOrderP: function () {
    wx.navigateTo({
      url: '/pages/xiugai-peisong/xiugai-peisong',
    })
  },
  //修改点单
  changeOrderD: function () {
    wx.navigateTo({
      url: '/pages/xiugai-diandan/xiugai-diandan',
    })
  },
  //取消点单
  cancelOrder1: function (e) {
    console.log(e),
      console.log("id:" + e.currentTarget.dataset.id)
    var index = e.currentTarget.dataset.id;
    console.log("list2_order_number:" + this.data.list2[index].order_number)
    console.log("是这里出错了吗")
    
    var that = this;
    that.setData({
      order_number: data.list2[index].order_number,
    })

    console.log("这里有没有出错呢")
    console.log("order_number:" + order_number)

   
    wx.request({
      url: 'https://www.sssxfd.top:8080/delete_order',
      header: {
        'content-type': ' application/json'
      },
      method: "POST",
      data: {
        error_code: 0,
        data: {
          order_number: thta.data.list2[index].order_number,
        }
      },
      success(res) {
        console.log(res)
        that.setData({
          dialogShow2: true
        })
        
      }
    })
  },
  //取消配送单
  cancelOrder2: function (e) {
    console.log(e),
      console.log("id:" + e.currentTarget.dataset.id)
    var index = e.currentTarget.dataset.id;
    console.log("list3_order_number:" + this.data.list3[index].order_number)
    this.setData({
      order_number: this.data.list3[index].order_number
    })
    // console.log("order_number:" + order_number)
    var that = this;
    wx.request({
      url: 'https://www.sssxfd.top:8080/delete_order',
      header: {
        'content-type': ' application/json'
      },
      method: "POST",
      data: {
        error_code: 0,
        data: {
          order_number: that.data.order_number,
        }
      },
      success(res) {
        console.log(res)
        console.log("取消成功！")
        that.setData({
          dialogShow2: true
        })
        console.log("show2"+that.data.dialogShow2)
      }
    })
  },
  load:function(){
    console.log("加载订单数据")
    var that = this;
    //点单
    wx.request({
      url: 'https://www.sssxfd.top:8080/show_historical_business_orders',
      header: {
        'content-type': ' application/json'
      },
      method: "POST",
      data: {
        error_code: 0,
        data: {
          telephone: app.globalData.telephone,
        }
      },
      success(res) {
        console.log(res)
        that.setData({
          list3: res.data.data
        })
        wx.hideLoading()
        wx.hideNavigationBarLoading()
        wx.stopPullDownRefresh()
        var line;
        if (that.data.currentTab == 0) {
          line = that.data.list2.length;
        } else if (that.data.currentTab == 1) {
          console.log(1)
          line = that.data.list3.length;
        }
        that.setData({
          aheight: 230 * line
        });
      }
    })
    //配送单
    wx.request({
      url: 'https://www.sssxfd.top:8080/show_historical_customer_orders',
      header: {
        'content-type': ' application/json'
      },
      method: "POST",
      data: {
        error_code: 0,
        data: {
          telephone:app.globalData.telephone,
        }
      },
      success(res) {
        console.log(res)
        that.setData({
          list2: res.data.data
        })
        wx.hideLoading()
        wx.hideNavigationBarLoading()
        wx.stopPullDownRefresh()
        var line;
        if (that.data.currentTab == 0) {
          line = that.data.list2.length;
        } else if (that.data.currentTab == 1) {
          line = that.data.list3.length;
        }
        that.setData({
          aheight: 230 * line
        });
      }
    })
  },
  onLoad: function (options) {
    console.log("options:" + options)
   this.load()
  },
  onPullDownRefresh: function () {
    wx.showNavigationBarLoading()
    wx.showToast({
      title: '下拉刷新',
      duration: 1500
    })
    this.onLoad()
    setTimeout(() => {
      wx.hideNavigationBarLoading()
      wx.stopPullDownRefresh()
    }, 2000);
  },

  onReady: function () {
    // 生命周期函数--监听页面初次渲染完成
  },
  onShow: function () {
    // 生命周期函数--监听页面显示
  },
  onHide: function () {
    // 生命周期函数--监听页面隐藏
  },
  onUnload: function () {
    // 生命周期函数--监听页面卸载
  },
  onShareAppMessage: function () {
    // 用户点击右上角分享
    return {
      title: 'title', // 分享标题
      desc: 'desc', // 分享描述
      path: 'path' // 分享路径
    }
  }
})