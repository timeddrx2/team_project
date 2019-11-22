const app = getApp()
Page({
      data: {
        list: [1, 2, 3, 4, 5],
        currentTab: 0,
        list2: [{
          hall_name: "丁香二楼",
          status: "0",
          price: "0.5",
          time: "10:00",
        }, {
          hall_name: "玫瑰",
          status: "1",
          price: "2",
          time: "水饺"
        }, {
          hall_name: "玫瑰",
          status: "2",
          price: "2",
          time: "水饺"
        }, {
          hall_name: "玫瑰",
          status: "3",
          price: "2",
          time: "水饺"
        }, {
          hall_name: "玫瑰",
          status: "1",
          price: "2",
          time: "水饺"
        }, {
          hall_name: "玫瑰",
          status: "2",
          price: "2",
          time: "水饺"
        }],

        list3: [{
          hall_name: "丁香二楼",
          status: "0",
          price: "0.5",
          time: "10:00",
        }, {
          hall_name: "玫瑰",
          status: "1",
          price: "2",
          time: "水饺"
        }, {
          hall_name: "玫瑰",
          status: "2",
          price: "2",
          time: "水饺"
        }, {
          hall_name: "玫瑰",
          status: "3",
          price: "2",
          time: "水饺"
        }, {
          hall_name: "玫瑰",
          status: "1",
          price: "2",
          time: "水饺"
        }, {
          hall_name: "玫瑰",
          status: "2",
          price: "2",
          time: "水饺"
        }]
      },
    
        detail1: function() {
          wx.navigateTo({
            url: '/pages/order_detail_ing/order_detail_ing',
          })
        },
        detail2: function() {
          wx.navigateTo({
            url: '/pages/order_detail/order_detail',
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
            aheight: 230 * line
          });
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
            aheight: 230 * line
          });

        },

        onLoad: function(options) {
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
          // 生命周期函数--监听页面加载

        },
        onPullDownRefresh: function() {
          wx.showNavigationBarLoading()
          this.onLoad()
          setTimeout(() => {
            wx.hideNavigationBarLoading()
            wx.stopPullDownRefresh()
          }, 2000);
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