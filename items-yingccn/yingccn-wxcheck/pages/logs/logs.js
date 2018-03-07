//logs.js
var util = require('../../utils/util.js')
var num = 1;  //1代表今日，2
var todayPage = 0;
var totalPage = 0;
var currentDate;
Page({
  data: {
    _num: 1,
    ifMsg: false,
    ifMsgTotal: false,
  },
  viewChange: function(e){
    var marknum = e.target.dataset.num;
    num = marknum;
    this.setData({
      _num: marknum,
    })
  },
  onLoad: function () {
    
  },
  onReachBottom: function(){
    var that = this;
    if(num == 1){
      console.log('今日排行 at bototm!')
      todayPage++;
      todayRequest(that, todayPage);
    }else if(num == 2){
      console.log('总排行 at bototm!')
      totalPage++;
      totalRequest(that, totalPage);
    }
  },
  onShow: function(){
    var that = this;
    currentDate = util.formatTime(new Date(Date.now()))
    todayPage = 0;
    totalPage = 0;
    todayRequest(that,0);
    totalRequest(that,0);
    getMyToday(that);
    getMyTotal(that)
  },
  onShareAppMessage: function (res) {
    wx.showShareMenu({
      withShareTicket: true
    })
    if (res.from === 'button') {
      //来自页面内转发按钮
      console.log(res.target);
    }
    return {
      title: "步数排行榜",
      path: "pages/logs/logs",
      success: function (res) {
        console.log("转发成功");
      },
      fail: function () {
        console.log("转发失败");
      }
    }
  }
})

function getMyToday(that){
  wx.request({
    url: 'https://wx.yingccn.com/weChatTopMy.json',
    data: JSON.stringify({ sessionId: wx.getStorageSync("loginSessionId"), date: currentDate }),
    method: 'POST',
    success: function(res){
      console.log(res);
      var con = res.data.data;
      var order = con.order;
      var step = con.checkStep;
      var head = con.userInfo.avatarUrl;
      console.log(head)
      that.setData({ 
        todayHead: head,
        todayList: order,
        todayStep: step,
      })
    }
  })
}
function getMyTotal(that) {
  wx.request({
    url: 'https://wx.yingccn.com/weChatTopMy.json',
    data: JSON.stringify({ sessionId: wx.getStorageSync("loginSessionId") }),
    method: 'POST',
    success: function (res) {
      console.log(res);
      var con = res.data.data;
      var order = con.order;
      var step = con.checkStep;
      var head = con.userInfo.avatarUrl;
      console.log(head)
      that.setData({
        headImg: head,
        stepList: order,
        totalStep: step,
      })
    }
  })
}
//单日数据请求
function todayRequest(that, page) {
  
  wx.request({
    url: 'https://wx.yingccn.com/weChatToplist.json',
    data: JSON.stringify({ date: currentDate, page: page }),
    method: 'POST',
    success: function (res) {
      var list = res.data.content
      var _totalPages = res.data.totalPages;
      console.log(res);
      if(list.length == 0 && page == 0){
        that.setData({
          ifMsg: true
        })
      }
      if (_totalPages < 2 ){
        that.setData({ myStepShow: false })
      }else{
        that.setData({ myStepShow: true })
      }
      if(page > 0){
        list=that.data.infoArr.concat(list);
      }
      that.setData({ infoArr: list })
    }
  })
}

//总排行请求
function totalRequest(that, page) {
  // console.log(page+"page--总")
  wx.request({
    url: 'https://wx.yingccn.com/weChatToplist.json',
    data: JSON.stringify({ page: page }),
    method: 'POST',
    success: function (res) {
      var listTotal = res.data.content

      if (page > 0) {
        listTotal = that.data.infoArrTotal.concat(listTotal);
      }
      that.setData({ infoArrTotal: listTotal })
    }
  })
}