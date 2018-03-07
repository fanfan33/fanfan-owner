$(function(){
	/***********二维码展示****************/
	$(".public-num-img").hide();
	$(".public-tel-img").hide();
	$(".public-num").mouseover(function(){
		$(".public-num-img").show(); 	
	});
	$(".public-num").mouseout(function(){
		$(".public-num-img").hide();
	});
//	$(".public-tel").mouseover(function(){
//		$(".public-tel-img").show(); 	
//	})
//	$(".public-tel").mouseout(function(){
//		$(".public-tel-img").hide();
//	})
	/**************用户反馈***************/
	$(".feedback").click(function(){
		$(".opinion").show();
	});
	$(".close-opinion").click(function(){
		$(".opinion").hide();
	});
	$('.option-submit').click(function(){
		var types = $(".opinion-back select option:selected").text();
			opcontent =$(".op-content").val();
			console.log(types);
		ajaxPost("/feedback/save", JSON.stringify({"type": types,"desc":opcontent,}), function(obj) {
			console.info(obj);
		});
		alert('您好，您的意见我们以接收，感谢您的慷慨意见');
		$(".opinion").hide();
	})
	/********提示弹出框********/
	$('.alert-close').click(function(){
		$('.alerts').hide();
	});
	$('.header-nav ul li').mouseenter(function(){
		$('.current').css('border-color','transparent');
		$('.header-nav ul li').css('border-color','transparent');
		$(this).css('border-color','#F8AA00');
	});
	$('.header-nav ul').mouseleave(function(){
		$('.current').css('border-color','#F8AA00');
	});
  	 /****************底部功能模块*************/
  	$(".footer-ways ul li").eq(0).hide();
  	$(".footer-ways ul li").eq(3).hide();
	$(".footer-ways ul li").eq(1).click(function(){
		window.open('clause.html');
	});
  	$(".footer-ways ul li").eq(2).click(function(){
		window.open('contact.html')
  	});
	$(".footer-ways ul li").eq(4).click(function(){
		window.open('help.html')
  	});
  	/*******头部跳转*******/
  	$(".header-tit-con > span em").click(function(){
  		window.location.href='home.html';
  	});
	$('.header-nav').append('<div class="header-home"></div>');
	$(".header-home").click(function(){
  		window.location.href='home.html';
  	});
	/****************判断登录***************/
	if(getCookie('userId')){
		ajaxGET('/user/info', '', function(data) {
		var item = data.data;
		var _headImg = getFeild(item, ['headImg']);
		var myhead = $('<a href="my.html"><img src="' + rightImg(_headImg) + '"/>'+
						'<span>个人中心</span></a>')
		$('.oneself').append(myhead);
			});
		$('.ylogin').html("退出<a href='login.html'><i>登录</i></a>");
  	 };
	/*****视频尺寸调整*****/
	$('iframe').css('max-height','500px');
	$('iframe').css('height','500px');
})

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
		success:success
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
                return temp ? temp : ""; 
            }
            return "";
        }
/*********************图片地址转换*********************/
//function rightImg(img){
//	if (img && img.indexOf('http')>-1) {
//		img=img;
//	}else{
//		img='/image/'+img+'.json';
//	}
//	return img;
//}
function rightImg(img){
	var base = "http://image.yingccn.com";
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
/**********************进度条**********************/
	function circle() {
	var rotationMultiplier = 3.6;
	// For each div that its id ends with "circle", do the following.
	$( "div[id$='circle']" ).each(function() {
		// Save all of its classes in an array.
		var classList = $( this ).attr('class').split(/\s+/);
		// Iterate over the array
		for (var i = 0; i < classList.length; i++) {
		   /* If there's about a percentage class, take the actual percentage and apply the
				css transformations in all occurences of the specified percentage class,
				even for the divs without an id ending with "circle" */
		   if (classList[i].match("^p")) {
			var rotationPercentage = classList[i].substring(1, classList[i].length);
			var rotationDegrees = rotationMultiplier*rotationPercentage;
			$('.c100.p'+rotationPercentage+ ' .bar').css({
			  '-webkit-transform' : 'rotate(' + rotationDegrees + 'deg)',
			  '-moz-transform'    : 'rotate(' + rotationDegrees + 'deg)',
			  '-ms-transform'     : 'rotate(' + rotationDegrees + 'deg)',
			  '-o-transform'      : 'rotate(' + rotationDegrees + 'deg)',
			  'transform'         : 'rotate(' + rotationDegrees + 'deg)'
			});
		   }
		}
	});
}
	
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