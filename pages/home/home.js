Page({
  data: {
    currentTab: 0,
    canteenP: "",
    feeP: "",
    dormP: "",
    touxiangP: "",
    timeP: "",
    canteenD: "",
    feeD: "",
    dormD: "",
    touxiangD: "",
    timeD: "",
    // tab切换 
    aheight: 0,
    list: [1, 2, 3, 4, 5],
//list2:点单 list3:配送
    // 标签内容
    list2: [],
    list3: []
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
    var line;
    if (that.data.currentTab == 0) {
      line = that.data.list2.length;
    } else if (that.data.currentTab == 1) {
      console.log(1)
      line = that.data.list3.length;
    }
    this.setData({
      aheight: 83 + 230 * line
    });
    console.log(line)
  },
  swiperChange: function(e) {
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
      aheight: 83 + 230 * line
    });

  },
  //点单详情
  toDXiangQing: function (e) {
    console.log(e)
    var index = e.currentTarget.dataset.id;
    console.log("D:" + index)
    console.log(this.data.list2[index].order_number)
    wx.navigateTo({
      url: '/pages/orderD/orderD?order_number=' + this.data.list2[index].order_number,
    })
  },
  //配送详情
  toPXiangQing: function (e) {
    console.log(e)
    var index = e.currentTarget.dataset.id;
    console.log("P:" + index)
    console.log(this.data.list3[index].order_number)
    wx.navigateTo({
      url: '/pages/orderP/orderP?order_number=' + this.data.list3[index].order_number,
    })
  },
  load:function(){
    console.log("调用load函数")

    // ===========================simulation =====================
    // var testlist = [
    //   { index: 0, s_dormitory_1: "100", canteen: "100", money: "1000", result_time: "120" },
    //   { index: 1, s_dormitory_1: "100", canteen: "100", money: "1000", result_time: "120" },
    //   { index: 2, s_dormitory_1: "100", canteen: "100", money: "1000", result_time: "120" },
    //   { index: 3, s_dormitory_1: "100", canteen: "100", money: "1000", result_time: "120" },
    //   { index: 4, s_dormitory_1: "100", canteen: "100", money: "1000", result_time: "120" },
    //   { index: 5, s_dormitory_1: "100", canteen: "100", money: "1000", result_time: "120" },
    // ]
    // this.setData({
    //   list2: testlist
    // })
var that = this
    wx.request({
      url: 'https://www.sssxfd.top:8080/refresh_business',
      header: {
        'content-type': ' application/json'
      },
      method: "GET",
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
          line = that.data.list3.length;
        }
        that.setData({
          aheight: 83 + 230 * line
        });
      }
    })
    wx.request({
      url: 'https://www.sssxfd.top:8080/refresh_customer',
      header: {
        'content-type': ' application/json'
      },
      method: "GET",
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
          aheight: 83 + 230 * line
        });
      }
     })
    // var line;
    // if (this.data.currentTab == 0) {
    //   line = this.data.list2.length;
    // } else if (that.data.currentTab == 1) {
    //   line = this.data.list3.length;
    // }
    // this.setData({
    //   aheight: 83 + 230 * line
    // });
    wx.hideLoading()
    wx.hideNavigationBarLoading()
   // ================================simulation ==========================

    
  },
  onLoad: function(options) {
    wx.showLoading({
      title: '加载中....',
    })
    this.load()
    //生命周期函数--监听页面加载
  },
  onPullDownRefresh: function() {
    wx.showToast({
      title: '下拉刷新',
      duration : 1500
    })
    wx.showNavigationBarLoading()
    
    this.load();

    setTimeout(function () {
      // complete
      wx.hideNavigationBarLoading()
      wx.stopPullDownRefresh()
    }, 1500);
  },
  onReachBottom: function (event) {
    console.log("上拉刷新")
    // 暂时用不上了
  //  this.load()
  },
  onReady: function() {

    // 生命周期函数--监听页面初次渲染完成

  },
  onShow: function() {
    // 生命周期函数--监听页面显示
  },
  onHide: function() {
    // 生命周期函数--监听页面隐藏
  },
  onUnload: function() {
    // 生命周期函数--监听页面卸载
  },
  onShareAppMessage: function() {
    // 用户点击右上角分享
    return {
      title: 'title', // 分享标题
      desc: 'desc', // 分享描述
      path: 'path' // 分享路径
    }
  }
})