//logs.js
const util = require('../../utils/util.js')
const sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置
Page({
  data: {
    logs: [],
    grids: [0, 1, 2, 3, 4, 5, 6, 7, 8],
    tabs: ["选项一", "选项二", "选项三"],

    sliderOffset: 0,
    // tabbar
    winWidth: 0,
    winHeight: 0,
    // tab切换
    currentTab: 0,
  },
  onLoad: function () {
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          winWidth: res.windowWidth,
          winHeight: res.windowHeight
        });
      }
    });
    this.setData({
      logs: (wx.getStorageSync('logs') || []).map(log => {
        return util.formatTime(new Date(log))
      })
    })
  },
  bindChange: function (e) {
    var that = this;
    console.log(e);
    that.setData({
      currentTab: e.detail.current,
      sliderOffset: e.detail.current * that.data.winWidth/3,
    });
  },
  tabClick: function (e) {
    console.log(e)
    if (this.data.currentTab == e.currentTarget.id) {
      return false;
    } else {
      this.setData({
        currentTab: parseInt(e.currentTarget.id),
        sliderOffset: e.currentTarget.offsetLeft,
      })
    }
  }
})
