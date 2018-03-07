/*************************移动站试用单位：100px = 1.0rem ***********************************/
var oSize = 40;
var Rem = function() {
	oSize = document.documentElement.clientWidth / 7.5;
	if(oSize > 100) {
		oSize = 100;
	}
	document.documentElement.style.fontSize = oSize + "px";
};
Rem();
window.addEventListener('resize', Rem, false);



//是否绑定手机号
function checkPhone(){
	ajaxGET('/user/info','',function(data){
		if(data.success){
			var phone=data.data.phone;
			console.log(phone);
			if (phone == null || phone == undefined || phone == '') {
//				if (confirm('您还未绑定手机号，请先绑定手机号！')) {
					setCookie("__back__",window.location.href);
//					location.href='tel-bind.html';
					location.href='tel-bind.html?getphone=right';
//				}
			}
		}

	})
}

Date.prototype.toLocaleString = function() {
    return this.getFullYear() + "-" + (this.getMonth() + 1) + "-" + this.getDate();
};
Date.prototype.toLocaleStringEnd = function() {
	var month = (this.getMonth() + 1);
	var day = this.getDate();
	var hours = this.getHours();
	var minutes = this.getMinutes();
	var second = this.getSeconds();

	month　=　month < 10 ? '0'+month:month;
	day　=　day < 10 ? '0'+day :day;
	hours　=　hours < 10 ? '0'+hours :hours;
	minutes　=　minutes < 10 ? '0'+minutes :minutes;
	second　=　second < 10 ? '0'+second :second;

    return this.getFullYear() + "-" + month + "-" + day + " " + hours + ":" + minutes+":"+second;
};
//图片地址转换
function rightImg(img){
	var base =  document.location.protocol + "//image.yingccn.com";
	if (img && img.indexOf('http')>-1) {
		img=img;
	}else if(img){
		img= base + '/image/'+img+'.png';
	}else{
		img = base + '/image/58de4637a1c5840233e71bd3.png';
	}
	return  img;
}


function changeWidth(width,height,color){
	color = color ? color : "FFFFFF" ;
	return '?x-oss-process=image/resize,m_pad,h_'+height+',w_'+width+',color_' + color;
}

function message(msg){
	msg=msg ? msg : '无';
	return msg
}

var token = {};
//
function ajaxGet(url,_data,callback){
	$.ajax({
		type:"get",
		dataType:"json",
		url: url+"?"+_data,
		success:function(data){
			callback(data);
		}
	})
}


function ajaxGET(url,_data,callback){

	if(!token.parameterName){
		ajaxGet("/access/csrfToken.json","t="+new Date().getTime(),function(data){
			token = data;
			ajaxGET(url,_data,callback);
		});
		return;
	}
	$.ajax({
		type:"get",
		dataType:"json",
		url: url+ ".json?t="+new Date().getTime() +
			"&"+ token.parameterName + "=" + token.token + "&"+_data,
		success:function(data){
			callback(data);
		},
		error:function(){
		}
	})
}


function ajaxPost(url,_data,success){
	if(!token.parameterName){
		ajaxGet("/access/csrfToken.json","t="+new Date().getTime(),function(data){
			token = data;
			ajaxPost(url,_data,success);
		});
		return;
	}
	$.ajax({
		type:"post",
		dataType: "json",
		contentType:"application/json;charset=UTF-8",
		url:
			url + ".json?t="+new Date().getTime() +
			"&"+ token.parameterName + "=" + token.token
		,
		data:_data,
		success:function(obj){
			if (obj.success == false && obj.msg == "gotoLogin") {
				gotoLogin();
			}
			success(obj);
		},
		error:function(){
			token = {};
			gotoLogin();
		}
	});
}

function ajaxDelete(url,_data,success){
	if(!token.parameterName){
		ajaxGet("/access/csrfToken.json","t="+new Date().getTime(),function(data){
			token = data;
			ajaxDelete(url,_data,success);
		});
		return;
	}
	$.ajax({
		type:"delete",
		dataType: "json",
		contentType:"application/json;charset=UTF-8",
		url:
			url + ".json?t="+new Date().getTime() +
			"&"+ token.parameterName + "=" + token.token
		,
		data:_data,
		success:success
	});
}


function ajaxFilePost(url,_data,success){
	if(!token.parameterName){
		ajaxGet("/access/csrfToken.json","t="+new Date().getTime(),function(data){
			token = data;
			ajaxFilePost(url,_data,success);
		});
		return;
	}
	$.ajax({
		type:"post",
		dataType: "json",
 		processData: false,
    	contentType: false,
		url:
			url + ".json?t="+new Date().getTime() +
			"&"+ token.parameterName + "=" + token.token
		,
		data:_data,
		success:success
	});
}

//懒加载
function throttle(fn, delay, atleast) {
	var timeout = null,
		startTime = new Date();
	return function() {
		var curTime = new Date();
		clearTimeout(timeout);
		if(curTime - startTime >= atleast) {
			fn();
			startTime = curTime;
		} else {
			timeout = setTimeout(fn, delay);
		}
	}
}

function lazyload() {
	var images = $('.swiper-slide img');
	var len = images.length;
	var n = 0; //存储图片加载到的位置，避免每次都从第一张图片开始遍历
	return function() {
		var seeHeight = document.documentElement.clientHeight;
		var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
		//清除文档高度
		$("div.swiper-wrapper").eq(0).css("height","");
		$("div.swiper-wrapper > div").css("height","");

		for(var i = n; i < len; i++) {
			if(images[i].offsetTop < seeHeight + scrollTop) {
					if (images[i].getAttribute('data-src')) {
						images[i].src = images[i].getAttribute('data-src');
					}

				n = n + 1;
			}
		}
	}
}

function setCookie(name, value, expires, path, domain, secure) {
	var cookieText = encodeURIComponent(name) + '=' + encodeURIComponent(value);
	if (expires instanceof Date)  {
		cookieText += '; expires=' + expires;
	}
	if (path) {
		cookieText += '; expires=' + expires;
	}
	if (domain) {
		cookieText += '; domain=' + domain;
	}

	document.cookie = cookieText;
}
function getCookie(name) {
	var cookieName = encodeURIComponent(name) + '=';
	var cookieStart = document.cookie.indexOf(cookieName);
	var cookieValue = null;

	if (cookieStart > -1) {
		var cookieEnd = document.cookie.indexOf(';', cookieStart);
		if (cookieEnd == -1) {
			cookieEnd = document.cookie.length;
		}
		cookieValue = decodeURIComponent(
		document.cookie.substring(cookieStart + cookieName.length, cookieEnd));
	}
	return cookieValue;
}
function setCookieDate(day) {
	if (typeof day == 'number' && day > 0) {
		var date = new Date();
		date.setDate(date.getDate() + day);
	} else {
		throw new Error('传递的day必须是一个天数，必须比0大');
	}
	return date;
}
//删除cookie
function unsetCookie(name) {
	document.cookie = name + "= ; expires=" + new Date(0);
}


function clearCookie(){
	var keys=document.cookie.match(/[^ =;]+(?=\=)/g);
	if (keys) {
		for (var i = keys.length; i--;)
			document.cookie=keys[i]+'=0;expires=' + new Date( 0).toUTCString()
	}
}

/****************接口数据为空时*********************/
function getFeild(obj,feilds){
    if(obj != null){
        var temp = obj;
        for(var ind in feilds){
            var f = feilds[ind];
            temp = temp[f];
            if(temp == null){
                break;
            }
        }
        return temp;
    }
    return null;
}


/********************/

function matchStr(name,str){
	var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
	var r = str.match(reg);
	if(r!=null)return  unescape(r[2]); return null;
}

function GetQueryString(name)
{
	 var r = window.location.search.substr(1);
	 return matchStr(name,r);
}


function is_weixn(){
	var ua = navigator.userAgent.toLowerCase();
	if(ua.match(/MicroMessenger/i)=="micromessenger") {
			return true;
	} else {
			return false;
	}
}


function wxLogin(){
	if (! is_weixn()) {
		return ;
	}
	if (getCookie('__lock__') == 'false' || !getCookie('__lock__') ) {
		setCookie('__lock__',false);
		return;
	}
	var userId = getCookie("userId");
	var code = GetQueryString("code");

	if (code == null) {

		setCookie('__lock__',false);
		// alert("取消登录");
		window.location.href = "index.html";

	}

	//如果是扫码支付 发送code
	if(window.location.href.indexOf('qrcode') >= 0){
		console.info("qrcode");
		// var __back__ = getCookie("__back__");
		// __back__ = __back__.substr(__back__.indexOf("?")+1);
		// var id = matchStr("id",__back__);
		var id = GetQueryString("id");
		ajaxPost("/access/updateCode",JSON.stringify({code:code,id:id}),function(data){
			setCookie('__lock__',false);
			if (data.success) {
				//提示登录成功
				console.info(data);

			}else{
				alert("登录失败");
			}
		});


		return;
	}

	if(  code  && !userId )  {
		wxredirect({code:code});
	}


}

function wxredirect(param){

	token = {};
	ajaxPost("/wxredirect",JSON.stringify(param),function(data){
		setCookie('__lock__',false);
		if (data.success) {
			setCookie('userId',data.data.id);
			setCookie('openId',data.data.openId);
			token = {};
			var __back__ = getCookie("__back__");
			if (__back__) {
					window.location.href = __back__;
			}
		}else{
			// alert("登录失败");
			clearCookie();
			// window.location.reload();
			window.location.href= "index.html";

		}
	});

}

function openLogin(){

	var code = GetQueryString("code");
	if (is_weixn()) {
		var baseUrl = "https://open.weixin.qq.com/connect/oauth2/authorize";
		var herf = window.location.href;
		if (code) {
			var herf1 = herf.substring(herf.indexOf('?')+1);
			var herf2 = herf.substring(0,herf.indexOf('?')+1);
			herf1 = herf1.substring(0,herf.indexOf('code'));
			herf = herf2 + herf1;
		}

		setCookie("__back__",herf);

		var openId = getCookie("openId");
		if(openId != undefined && openId != null){
			wxredirect({openid:openId});
			return;
		}

		if (herf.indexOf("yingccn.com") < 0) {
			herf = "http://wx.yingccn.com/index.html";
		}

		var appid	= "?appid=" + "wx38e45fb1e4cbe9d6";
		var redirect_uri = "&redirect_uri=" + encodeURIComponent(herf);
		var response_type	= "&response_type=code";
		var scope = "&scope=snsapi_userinfo";
		var state = "";//"&state=STATE";
		baseUrl = baseUrl + appid + redirect_uri + response_type +  scope + state + "#wechat_redirect";
		window.location.href= baseUrl;
	}
}

// setCookie('__lock__',false);
function gotoLogin(){

	checkLogin();


}

function checkLogin(){
	//获得用户详情
	ajaxGET('/user/info','',function(data){

		if (data.success) {
			var _userId = data['data']['id'];
			setCookie('userId', _userId);
		}else{

			if (getCookie('__lock__') == 'true') {
				// setCookie('__lock__',false);
				return;
			}
			setCookie('__lock__',true);
			// setCookie("__back__",window.location.href);
			setCookie("userId",null);
			unsetCookie("userId");
			// alert("请重新登录");
			if (is_weixn()) {
				openLogin();
			}else{
				window.location.href = "login.html";
			}

		}



	});

}

// http://wx.yingccn.com/share.html?id=58ff0f17d6c9b65289db39ef&from=singlemessage&isappinstalled=0

wxLogin();

if(window.location.href.indexOf('qrcode') >= 0){

	if (getCookie('__lock__') != 'true') {
		// setCookie('__lock__',false);
		// return;
		setCookie('__lock__',true);
		// setCookie("__back__",window.location.href);
		setCookie("userId",null);
		unsetCookie("userId");
		// alert("请重新登录");
		if (is_weixn()) {
			openLogin();
		}

	}


	// gotoLogin();
}


function getDesc(){
	var zc = $(".zcText > p").text();
//	if (zc.length <= 0) {
//		zc = $(".content-slide:first").text().substring(0,100);
//	}
//	if (zc.length <= 0) {
//		zc = $(".text1:first").text();
//	}

	
	
	if (zc.length <= 0) {
		zc = $(".zcText div:first").text();
		
		var txt = $('.company>p').text()
		if(txt.length > 0){
			zc = txt;
		}
	}
	
	return zc;
}

 var loaded = [];
 var loadScript = function(src) {
    if(loaded[src]) return loaded[src].promise();

    var deferred = $.Deferred();
    var script = window.document.createElement('script');
    script.src = src;
    script.onload = function(e) {
      deferred.resolve(e);

    };

    script.onerror = function(e) {
      deferred.reject(e);
    };

    window.document.body.appendChild(script);
    loaded[src] = deferred;
    return deferred.promise();
  };






function getShareSign(){
	ajaxPost("/sharesign",JSON.stringify({url:window.location.href}),function(obj){

		// "signature": "2bf28905c3c694df34f8336544887783d3cc49e1",
		// "jsapi_ticket": "kgt8ON7yVITDhtdwci0qeQer1lO-v2Xt8gSBP4Ge72xB4V_ejaEajfZbzLOKnE_FsK643ZE0j1LVTW6jyRN5Rg",
		// "url": "http://wx.yingccn.com",
		// "nonceStr": "c249ef46-aeed-440f-98fe-a5b7f3aa2447",
		// "timestamp": "1493021242"
		wx.config({
		    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
		    appId: 'wx38e45fb1e4cbe9d6', // 必填，公众号的唯一标识
		    timestamp: obj.data.timestamp, // 必填，生成签名的时间戳
		    nonceStr: obj.data.nonceStr, // 必填，生成签名的随机串
		    signature: obj.data.signature,// 必填，签名，见附录1
		    jsApiList: ['onMenuShareTimeline','onMenuShareAppMessage'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
		});

		wx.ready(function(){
		    // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，
				// 则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
		});


		var configration = function(){
			var config = {
				title: $("h3:first").text() || $("title").text(), // 分享标题
				desc: getDesc(), // 分享描述
				link: window.location.href, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
				imgUrl: $("li[data-baidu-label=1] img[src*=yingccn]:first").attr("src") || $("img[src*=yingccn]").eq(1).attr("src"), // 分享图标
				success: function () {
					// 用户确认分享后执行的回调函数
				},
				cancel: function () {
					// 用户取消分享后执行的回调函数
				}
			};
			var config2 = {
				title: $("h3:first").text() || $("title").text() + "  " + getDesc(), // 分享标题
				desc: getDesc(), // 分享描述
				link: window.location.href, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
				imgUrl: $("li[data-baidu-label=1] img[src*=yingccn]:first").attr("src") || $("img[src*=yingccn]").eq(1).attr("src"), // 分享图标
				success: function () {
					// 用户确认分享后执行的回调函数
				},
				cancel: function () {
					// 用户取消分享后执行的回调函数
				}
			};
			wx.onMenuShareAppMessage(config);
			wx.onMenuShareTimeline(config2);
		}

		configration();
		setTimeout(function(){
			configration();
		},1000);

	});
}



$(function(){
	if (is_weixn()) {

		loadScript("https://res.wx.qq.com/open/js/jweixin-1.2.0.js").then( function(){
			getShareSign();
		});
	}
});
