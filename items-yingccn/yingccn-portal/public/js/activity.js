//var proId = decodeURI(location.href.split('?')[1].split('=')[1]);
var cacheDate = JSON.parse(window.sessionStorage.getItem('cacheData'));
var uniqueId = window.sessionStorage.getItem('unique');
console.log(cacheDate);
var	proId =	cacheDate.proId,
	title = cacheDate.title,
	headImg = cacheDate.headImg,
	bgImg = cacheDate.bgImg,
	fees = cacheDate.fees,
	company = cacheDate.company,
	startDate = cacheDate.startDate,
	enrollCount =cacheDate.enrollCount,
	supportCount = cacheDate.supportCount;
descList = cacheDate.descList;

/***********计算日期*************/
var unixTimestamp = new Date(startDate);
Date.prototype.toLocaleString = function() {
	return this.getFullYear() + "-" + (this.getMonth() + 1) + "-" + this.getDate();
};
var startdate = unixTimestamp.toLocaleString();
var _width =$('.probgimg').width();
var _height =$('.probgimg').height();
//		$('.probgimg').attr('src',  rightImg(bgImg)+ changeWidth(parseInt(_width)*2,parseInt(_height)*2));
$('.probgimg').attr('src',  rightImg(bgImg));
$('.proheadimg').attr('src',  rightImg(headImg));
$(".pro-basic .pro-username").text(company);
$('.title').text(title);
$('.order-money').text(parseInt(fees)+'元');
$('.enrollCount').text(enrollCount+'人');
$('.sup-people em').text(supportCount+'人');
$('.startime span').text(startdate);

var id="5a10f694d6c9b663e5a153b6";
// var id="58ecc33bd6c9b60f2e938e8c";  //old
// var uniqueId = "58e4d8e6d6c9b64412e5cd88"
ajaxGET('/project/findById', 'id=' + id + '&unique='+uniqueId, function(data) {
	console.log(data);
	var con = data.data;
	var descList = getFeild(con, ['activities', 'activitiesDesc', 'descList']);
	
	$(descList).each(function(i, item) {
		if(i == 0) {
			$('.detail-con1').html(item);
		} else if(i == 1) {
			$('.detail-con2').html(item);
		} 
		// else if(i == 2) {
		// 	$('.detail-con3').html(item);
		// }
	});
	var loadImages = lazyload();
	loadImages(); //初始化首页的页面图片
	window.addEventListener('scroll', throttle(loadImages, 500, 1000), false);

})


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
var images = $('.detail-con img');
var len = images.length;
var n = 0; //存储图片加载到的位置，避免每次都从第一张图片开始遍历
return function() {
	var seeHeight = document.documentElement.clientHeight;
	var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
	//		console.log("seeHeight="+seeHeight+"   scrollTop="+scrollTop+"    len="+len);

	for(var i = n; i < len; i++) {
		if(images[i].offsetTop < seeHeight + scrollTop) {
			//				if(images[i].getAttribute('src') === 'public/img/home/loading.gif') {
			//					console.log('33333333333')
			if(images[i].getAttribute('data-src')) {
				images[i].src = images[i].getAttribute('data-src');
			}

			//					console.log(images[i].src);
			//				}
			n = n + 1;
		}
	}
}
}
		
$(function() {
			var project = $(".project-right").offset().top;
			
			$(window).scroll(function() {
					if($(window).scrollTop() > project) {
//						console.log('aa');
						$(".project-right").css({'position':'fixed','top':'90px'});
						var scrollBottom = $(".project-right").height() +$(".project-right").offset().top;;
						var foot = $(".project-left").height() +$(".project-left").offset().top;
//						console.log(foot);
//						console.log(scrollBottom);
						if(scrollBottom >= foot ){
//							console.log('s');
							$(".project-left").css({'vertical-align':'bottom'});
							$(".project-right").css({'position':'static','vertical-align':'bottom'});
						}
					}else{
						$(".project-left").css({'vertical-align':'top'});
						$(".project-right").css({'position':'static','vertical-align':'top'});
					}
			})
			var sup=1;
			var ewtwice = 0;
			$('.once-sup').click(function(){
				if(sup==0){
					$('.sup-ew').hide();
					sup=1;
				}else{
					$('.sup-ew').show();
					sup=0; 
					if(ewtwice ==0){
						var url = "http://wx.yingccn.com/act-detail.html?proId=" + proId + '&unique='+ uniqueId;
						$('.sup-ewm').qrcode({width: 160,height: 160,text: url});
						ewtwice = 1;
					}
				}
			});
			var ewms =0;
			var ewonce = 0;
			$('.sup-btn').click(function(){
				if(ewms ==0){
					$(' .basic-infor .sup-btn .ewms').show();
						if(ewonce == 0){
							var url = "http://wx.yingccn.com/act-detail.html?proId=" + proId + '&unique='+ uniqueId;
							$(' .basic-infor .sup-btn .ewms .ewmsimg').qrcode({width: 120,height: 120,text: url});
							ewonce = 1;
//							$("body").click(function () {
//								$(' .basic-infor .sup-btn .ewms').hide();
//								});
						}
					ewms =1;
				}else{
					$(' .basic-infor .sup-btn .ewms').hide();
					ewms =0;
				}
			})
			/***********右侧导航*********/
			$('.pro-one').click(function(){
				$('.project-detail').show();
				$('.project-knowledge').hide();
				$('.project-news').hide();
				$('html, body').animate({
					scrollTop: $(".project-detail").offset().top - 90
				}, 0);
				$('.right-content ul li').css({"color":"#000000"});
				$(this).css({"color":"#f8a000"})
			});
			$('.pro-two').click(function(){
				$('.project-detail').hide();
				$('.project-knowledge').show();
				$('.project-news').hide();
				$('html, body').animate({
					scrollTop: $(".project-knowledge").offset().top - 90
				}, 0);
				$('.right-content ul li').css({"color":"#000000"});
				$(this).css({"color":"#f8a000"})
			});
			$('.pro-thr').click(function(){
				$('.project-detail').hide();
				$('.project-knowledge').hide();
				$('.project-news').show();
				$('html, body').animate({
					scrollTop: $(".project-news").offset().top - 90
				}, 0);
				$('.right-content ul li').css({"color":"#000000"});
				$(this).css({"color":"#f8a000"})
			});
			$('.back-top').click(function(){
				$('html, body').animate({
					scrollTop: $(".project-left").offset().top -90
				}, 0);
			})
}) 