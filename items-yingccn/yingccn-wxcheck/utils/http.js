var rootDocment = 'https://wx.yingccn.com';
function req(url, data, cb) {
  wx.request({
    url: rootDocment + url +'?'+data,
    method: 'GET',
    header: { 'Content-Type': 'application/json' },
    success: function (res) {
        cb(res.data)
    },
    fail: function () {
      return typeof cb == "function" && cb(false)
    }
  })
}

module.exports = {
  req: req
}  

