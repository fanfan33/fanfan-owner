//index.js
//获取应用实例
const app = getApp()
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    imgUrls: [
      'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
    ],
  },

  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        console.log(res);
        if (!res.authSetting['scope.userInfo']) {
          wx.authorize({
            scope: 'scope.userInfo',
            success: () => {
              wx.getUserInfo({
                success: res => {
                  console.log(res);
                  this.setData({
                    userInfo: res.userInfo,
                  })
                }
              })
            }
          })
        } else {
          wx.getUserInfo({
            success: res => {
              console.log(`已经授权${res}`);
              this.setData({
                userInfo: res.userInfo,
              })
            }
          })
        }
      },
      fail: (fail) => {
        console.log(fail)
      },
      complete: (msg) => {
        console.log(msg)
      }
    })
  },

})
