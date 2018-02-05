const formatTime = (date, current) => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()
  if (current) {
      return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':')
  } else {
      return [year, month, day].map(formatNumber).join('-');
  }
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}
//地址转换
function rightImg(img){
	var base =  "https://image.yingccn.com";
	if (img && img.indexOf('http')>-1) {
		img=img;
	}else if(img){
		img= base + '/image/'+img+'.png';
	}else{
		img = base + '/image/58de4637a1c5840233e71bd3.png';
	}
	return  img;
}

function isEmpty(obj){
    if (typeof(obj) == "undefined" || (!obj && typeof(obj)!="undefined" && obj!=0)) {
        return true;
    }
    for (let i in obj){
        return false;
    }
    return true;
}

function urlParamCombine(arr) {
    var param = "?";
    for (var key in arr) {
        if(typeof(arr[key]) == 'array' || typeof(arr[key]) == 'object') {
            for (var k in arr[key]) {
                param += (k + "=" + arr[key][k] + "&");
            }
        } else {
            param += (key + "=" + arr[key] + "&");
        }
    }
    return param.substr(0, param.length-1);
}

function getUrl(route, params) {
    var param = "";
    if (!isEmpty(params)) {
        param = urlParamCombine(params);
    }
    return `https://${conf.baseDomain}${route}${param}`;
}

function matrixArr(list, elementsArr) {
    let matrix = [], i, k;
    for (i = 0, k = -1; i < list.length; i += 1) {
        if (i % elementsArr === 0) {
            k += 1;
            matrix[k] = [];
        }
        matrix[k].push(list[i]);
    }
    return matrix;
}

function imgUrlFix(url) {
    if (isEmpty(url)) {
        return url;
    }
    let matchStr = url.match(/:\/\/(ww)\d/);
    return isEmpty(matchStr) ? url : url.replace(matchStr[1], 'ws');
}
module.exports = {
  formatTime: formatTime,
  rightImg: rightImg,
  isEmpty: isEmpty,
  getUrl: getUrl,
  matrixArr: matrixArr,
  imgUrlFix: imgUrlFix
}