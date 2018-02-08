// pages/home/home.js
var newPx = 0;  //转换px
Page({
  data: {
    imgUrls: [
      'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 2000,
    duration: 1000,
    isActive: 1,
  },
  onLoad: function (options) {
    //绘制进度条
    drawCircleProgress(0.5);
  },
  isActive: function (e) {
    var num = e.target.dataset.num
    this.setData({isActive: num})
    
  },


  onPullDownRefresh: function () {
  
  },

  onReachBottom: function () {
  
  },

  onShareAppMessage: function () {
  
  }
})
// rpx --> px
function pxChange(value) {
    wx.getSystemInfo({
      success: function(res) {
        newPx = parseInt(res.windowWidth) * value / 750;
      }
    })
    return newPx.toFixed(1);
}
function drawCircleProgress(value) {
  var newVal = 2*value;
  var point = pxChange(75);
  var ctx = wx.createCanvasContext('round-progress');
  ctx.setLineWidth(6);
  ctx.setStrokeStyle('#d2d2d2');
  ctx.beginPath();
  ctx.arc(point, point, pxChange(66), 0, 2*Math.PI);
  ctx.stroke();

  ctx.setLineWidth(6);
  ctx.setStrokeStyle('#FAAB00');
  ctx.translate(point,point);
  ctx.rotate(1.5*Math.PI);
  ctx.translate(-point,-point);
  ctx.beginPath();
  
  ctx.arc(point, point, pxChange(66), 0, newVal*Math.PI);
  ctx.stroke();

  ctx.draw();
}