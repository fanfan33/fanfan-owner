var http = require('../../utils/http.js');
var util = require('../../utils/util.js');
Page({
  data: {
    actList: [],
    showOur: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    var that = this;
    // http.ajaxGET("/activities/listUnique", "page=0", function(res) {
    //   console.log(res);
    //   var content = res.data.content;
        
    //   for(let i=0; i<content.length; i++) {
    //     var cons = content[i];
    //     cons["startDate"] = util.formatTime(new Date(cons["startDate"]), false);
    //     cons["bgImg"] = util.rightImg(cons["images"][0]);
    //     if(cons["title"] && cons["title"].indexOf("长征") > -1) {
    //       cons["ifOur"] = true;
    //     }
    //   }
    //   that.setData({
    //     actList: content,
    //   })
    // })
  },
  //分类切换
  topCategroy: function(e) {
    if(e.target.id == "our") {
      this.setData({
        showOur: true
      })
    }else{
      this.setData({
        showOur: false
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})