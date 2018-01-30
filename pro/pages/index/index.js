Page({

  /**
   * 页面的初始数据
   */
  data: {
    yanjiao: [],
    beijing: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let yanjiao = [{
      "id": "yj1",
      "nickname": "小牛小羊烧烤家常菜",
      "adr": "燕灵路537号理想新城对面",
      "atTime": "10:00-24:00",
      "tele": "15843571199",
      "desc": "",
      "images": []
    },
    {
      "id": "yj2",
      "nickname": "徐小妹的麻辣宴遇",
      "adr": "纳丹堡南门底商235号",
      "atTime": "10:00-24:00",
      "tele": "0316-5988311",
      "desc": "",
      "images": []
    },
    {
      "id": "yj3",
      "nickname": "丹尼尔西餐",
      "adr": "燕郊汉王路福城四期西门对过",
      "atTime": "10:00-22:30",
      "tele": "15732604421 0316-5991023",
      "desc": "",
      "images": []
    },
    {
      "id": "yj4",
      "nickname": "三分钟快捷食尚餐厅",
      "adr": "燕顺路星河皓月住达广场一楼（京客隆旁边）上上城三季西门对面",
      "atTime": "24小时",
      "tele": "13315637104",
      "desc": "继续回馈新老顾客从1月13号开始,《菜品8.8折优惠菜品8.8折优惠》活动截止时间待定《仅现进店消费正餐时间折扣不参与外卖》。本店主营:《湘菜   家常菜    烧烤   早餐》；主打:   《湘菜》；经过菜品的调整现在的香菜既能满足不吃辣顾客的需求，也能让想吃正宗湘菜口味儿的顾客满意。我们以原汁原味，健康实惠为经营理念，打造大众百姓消费的精品餐厅。",
      "images": []
    }];
    var str = "";
    for(let i=0;i < yanjiao.length; i++) {
      for (let j = 1; j < 5; j++) {
        str = 'store' + (i+1) + '_' + j;
        yanjiao[i].images.push(str);
      }
    }
    let beijing = [{
      "nickname": "鲜之语面包房",
      "adr": "沙阳路沙阳花园16号院",
      "atTime": "7:00/10:00",
      "tele": "15732604421 0316-5991023",
      "desc": "",
      "images": []
    },
    {
      "nickname": "珍橙",
      "adr": "王府井新燕莎金街广场6层",
      "atTime": "10:00/21:00",
      "tele": "18310675978",
      "desc": "",
      "images": []
    }];
    var _str = "";
    for (let m = 0; m < beijing.length; m++) {
      for (let n = 1; n < 5; n++) {
        _str = 'store' + (m + 1) + '_' + n;
        beijing[m].images.push(_str);
      }
    }
    this.setData({
      yanjiao: yanjiao,
      beijing: beijing
    });
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