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

    // 标签内容
    list2: [],
    list3: []


  },
  toPXiangQing: function(e) {
    console.log(e)
    var index = e.currentTarget.dataset.id;
    console.log(index)
    console.log(this.data.list3[index].order_number)
    // wx.navigateTo({
    //  url: '/pages/orderP/orderP?order_number=' + this.data.list3[index].order_number,
    // })
    wx.navigateTo({
      url: '/pages/orderP/orderP',
    })
  },
  toDXiangQing: function (e) {
    console.log(e)
    var index = e.currentTarget.dataset.id;
    console.log(index)
    console.log(this.data.list2[index].order_number)
    // wx.navigateTo({
    //  url: '/pages/orderP/orderP?order_number=' + this.data.list3[index].order_number,
    // })
    wx.navigateTo({
      url: '/pages/orderD/orderD',
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

  onLoad: function(options) {
    wx.showLoading({
      title: '加载中....',
    })
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

    //生命周期函数--监听页面加载


  },
  onPullDownRefresh: function() {
    wx.showNavigationBarLoading()
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
    // this.onLoad()
    // setTimeout(() => {
    //   wx.hideNavigationBarLoading()
    //   wx.stopPullDownRefresh()
    // }, 2000);
    
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
  onPullDownRefresh: function() {
    // 页面相关事件处理函数--监听用户下拉动作
  },
  onReachBottom: function() {
    // 页面上拉触底事件的处理函数
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