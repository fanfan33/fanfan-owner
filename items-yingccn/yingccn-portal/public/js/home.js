/****************************轮播图图片获取*****************************/
//ajaxGET('/mainSlide/list', '', function(data) {
//	var carousel = data.data;
//	var carouselArr = [];
//	var imgHeight = $('#slider').height();
//	imgWidth = $(document).width();
//	$(carousel).each(function(i, item) {
//		var objImg = {
//			image: rightImg(item.url)
//		};
//		carouselArr.push(objImg);
//	})
//	console.log(carouselArr);
//	var renderBanner = function(bannerList) {
//		var html = '<div class="slider-inner">';
//		$.each(bannerList, function(index, item) {
//			html += '<div class="item">' +
//				'<img class="img" src="' + item["image"] + '?x-oss-process=image/resize,m_fill,h_' + parseInt(imgHeight) + ',w_' + parseInt(imgWidth) + '">' +
//				'</div>';
//		});
//		html += '</ul>';
//		return html;
//	}
//	var bannerList = carouselArr;
//	var bannerHTML = bannerList ? renderBanner(bannerList) : '';
//	$("#slider").html(bannerHTML);
	//	$("#banner").slider({
	//		"autoScroll": true,
	//		"infinite": true
	//	});
	/**************轮播图****************/
	(function($) {
		$.fn.Slider = function(options) {
			"use strict";

			var settings = $.extend({
				isAuto: true,
				transTime: 3000,
				animateSpeed: 1000,
				sliderMode: 'slide', //'slide | fade',
				pointerControl: true,
				pointerEvent: 'click', //'hover' | 'click',
				arrowControl: true,
			}, options);
			var interval;
			var isAnimating = false;
			var $slider = $(this);
			var $sliderWrap = $slider.find('.slider-inner');
			var sliderCount = $sliderWrap.find('> .item').length;
			var sliderWidth = $slider.width();
			var currentIndex = 0;

			var sliderFun = {
				controlInit: function() {
					// pointerControl
					if(settings.pointerControl) {

						var html = '';
						html += '<ol class="slider-pointer">';
						for(var i = 0; i < sliderCount; i++) {
							if(i == 0) {
								html += '<li class="active"></li>'
							} else {
								html += '<li></li>'
							}
						}
						html += '</ol>'
						$slider.append(html);
						// 指示器居中
						var $pointer = $slider.find('.slider-pointer');
						$pointer.css({
							left: '45%',
							//							marginLeft: -$pointer.width() / 2
						});
					}
					// pointerControl
					if(settings.arrowControl) {
						var html = "";
						html += '<span class="slider-control prev"></span>';
						html += '<span class="slider-control next"></span>'
						$slider.append(html);
					}
					$slider.on('click', '.slider-control.prev', function(event) {
						sliderFun.toggleSlide('prev');
					});
					$slider.on('click', '.slider-control.next', function(event) {
						sliderFun.toggleSlide('next');
					});
				},
				// slider
				sliderInit: function() {
					sliderFun.controlInit();
					// 模式选择
					if(settings.sliderMode == 'slide') {
						// slide 模式
						$sliderWrap.width(sliderWidth * sliderCount);
						$sliderWrap.children().width(sliderWidth);
					} else {
						// mode 模式
						$sliderWrap.children().css({
							'position': 'absolute',
							'left': 0,
							'top': 0
						});
						$sliderWrap.children().first().siblings().hide();
					}
					// 控制事件
					if(settings.pointerEvent == 'hover') {
						$slider.find('.slider-pointer > li').mouseenter(function(event) {
							sliderFun.sliderPlay($(this).index());
						});
					} else {
						$slider.find('.slider-pointer > li').click(function(event) {
							sliderFun.sliderPlay($(this).index());
						});
					}
					// 自动播放
					sliderFun.autoPlay();
				},
				// slidePlay
				sliderPlay: function(index) {
					sliderFun.stop();
					isAnimating = true;
					$sliderWrap.children().first().stop(true, true);
					$sliderWrap.children().stop(true, true);
					$slider.find('.slider-pointer').children()
						.eq(index).addClass('active')
						.siblings().removeClass('active');
					if(settings.sliderMode == "slide") {
						// slide
						if(index > currentIndex) {
							$sliderWrap.animate({
								left: '-=' + Math.abs(index - currentIndex) * sliderWidth + 'px'
							}, settings.animateSpeed, function() {
								isAnimating = false;
								sliderFun.autoPlay();
							});
						} else if(index < currentIndex) {
							$sliderWrap.animate({
								left: '+=' + Math.abs(index - currentIndex) * sliderWidth + 'px'
							}, settings.animateSpeed, function() {
								isAnimating = false;
								sliderFun.autoPlay();
							});
						} else {
							return;
						}
					} else {
						// fade
						if($sliderWrap.children(':visible').index() == index) return;
						$sliderWrap.children().fadeOut(settings.animateSpeed)
							.eq(index).fadeIn(settings.animateSpeed, function() {
								isAnimating = false;
								sliderFun.autoPlay();
							});
					}
					currentIndex = index;
				},
				// toggleSlide
				toggleSlide: function(arrow) {
					if(isAnimating) {
						return;
					}
					var index;
					if(arrow == 'prev') {
						index = (currentIndex == 0) ? sliderCount - 1 : currentIndex - 1;
						sliderFun.sliderPlay(index);
					} else if(arrow == 'next') {
						index = (currentIndex == sliderCount - 1) ? 0 : currentIndex + 1;
						sliderFun.sliderPlay(index);
					}
				},
				// autoPlay
				autoPlay: function() {
					if(settings.isAuto) {
						interval = setInterval(function() {
							var index = currentIndex;
							(currentIndex == sliderCount - 1) ? index = 0: index = currentIndex + 1;
							sliderFun.sliderPlay(index);
						}, settings.transTime);
					} else {
						return;
					}
				},
				//stop
				stop: function() {
					clearInterval(interval);
				},
			};
			sliderFun.sliderInit();
		}
	})(jQuery);
	jQuery(document).ready(function($) {
		$('#slider').Slider();
	});

//});

/*************************四个活动 两个长征活动筛选出来**************************/
var index = 0;
actGetData(index); //首页获得活动接口
function actGetData(index) {
	ajaxGET('/activities/listUnique.json', 'page=' + index, function(data) {
		console.log(data);
		var con = data.content;
		
		$(con).each(function(i, item) {
			if (i > 1) {
				var _id = getFeild(item, ['id']),
				_title = getFeild(item, ['title']),
				_desc = getFeild(item, ['desc']),
				_headImg = getFeild(item, ['headImg']),
				_company = getFeild(item, ['company']),
				_startDate = getFeild(item, ['startDate']),
				_bgImg = getFeild(item, ['bgImg']),
				_supportCount = getFeild(item, ['supportCount']) || 0,
				_enrollCount = getFeild(item, ['enrollCount']) || 0,
				_endDate = getFeild(item, ['endDate']),
				_doneEnrollCount = getFeild(item, ['doneEnrollCount']) || 0,
				_unique = item.unique,
				_goalCount = getFeild(item, ['goalCount']),
				_fees = getFeild(item, ['fees']),
				_Img1 = getFeild(item, ['images', '0']),
				_Img2 = getFeild(item, ['images', '1']),
				_Img3 = getFeild(item, ['images', '2']),
				descList = getFeild(item, ['activitiesDesc', 'descList']);

				_percent = Math.floor((_supportCount / _goalCount).toFixed(2) * 100);
				_percents = _percent;
				if(_percents >= 100) {
					_percents = 100
				}
				
				var dateNow = Date.now();
				var going = "http://image.yingccn.com/image/59f2ade3d6c9b651421ac3d3.png";
				var ending = "http://image.yingccn.com/image/59f2ae1dd6c9b651421ac3d5.png";
				var ifGoing = _endDate > dateNow ? going : ending;

				/***********计算剩余天数*************/
				var currentTime = new Date().getTime();
				var iDays = parseInt((_endDate - currentTime) / 1000 / 60 / 60 / 24);
				if(iDays <= 0) {
					iDays = 0;
				}
				var cacheData = {
					"proId": _id,
					//				"images":_headImg,
					"bgImg": _bgImg,
					"headImg": _headImg,
					"company": _company,
					"startDate": _startDate,
					//		    	"remainDate":remainDate,
					"title": _title,
					"fees": _fees,
					"enrollCount": _enrollCount,
					"supportCount": _supportCount,
					//		    	"titleList":titleList,
					"descList": descList,
				};
				//'<input type="hidden" class="circleNum" value="' + _percent + '">'+
				//'<div class="dataCircle" style="width: 125px; height: 125px"><i class="pernum"><span class="thenum">已筹</span><br /><span class="theper">' + _percent + '%</span></i></div>'+
				
				var _jppros = $(
					'<div class="hot-pro shadow index'+_unique+'" id="pro' + i + '" >' +
					'<img class="hot-img1" src="' + rightImg(_Img1) + '" />' +
					'<div class="hot-con1">' +
					'<div class="mp-one-circle">'+
						'<img class="ifGoing" src="'+ifGoing+'" />'+
					'</div>'+
					'<p>' + _title + '</p>' +
					'<span>' + _desc + '</span>' +
					'<ul>' +
					'<li><em>' + _enrollCount + '</em><p>报名人数</p></li>' +
					'<li><em>' + _doneEnrollCount + '</em><p>成功人数</p></li>' +
					'<li><em>' + _supportCount + '</em><p>支持人数</p></li>' +
					'</ul>' +
					'</div>' +
					'</div>'
				)
				$(".teams-detail").append(_jppros);
				$('.index' + _unique).on('click', function() {
					location.href = "team-act.html?unique="+_unique;
					// window.sessionStorage.setItem('cacheData', JSON.stringify(cacheData));
					// window.open('activity.html');
				});
				
			}
			
		});
		// $(".dataCircle").ProCircle({
		// 	default_color: '#000000',
		// 	spill_angle: 10,
		// 	kd_width: 6, //刻度的宽
		// 	kd_height: 7, //刻度的高
		// 	default_opacity: 0.2,
		// 	font_size: 20,
		// 	score: 0.5,
		// 	ismult: true
		// });
	})
}
/*发起人*/
var creWidth = $(window).width();
var creleft = $(".cre-bg").offset().left;
$('.creater-pro .cre-bg').css({
	"width": creWidth,
	"left": -creleft
});
$('.creater-pro .cre-person').css({
	"width": creWidth,
	"left": -creleft
});


var indexTurn = 0;
var width = 285;

var listContainner = $("#list");
var left = 0;
var intervalId;
var firstStart = true;
var len  = listContainner.find("img").length;
var offSetTop = $('.creater-pro').offset().top;

listContainner.css('width', width*len +'px');

function roll() {
	indexTurn ++;
	if (indexTurn >= len-3) {
		indexTurn= 0;
		listContainner.animate({left: 0},1000);
	}else{
		listContainner.animate({left: -width*indexTurn+"px"},1000);
	}
}
// setTimeout(startInterval, 3000);
$(window).scroll(function() {
	
	if (firstStart) {
		console.log(parseInt($(document).scrollTop())+'-----'+offSetTop)
		if (parseInt($(document).scrollTop()) >= parseInt(offSetTop)-500) {
			firstStart = false;
			console.log($(document).scrollTop() + "--"+ firstStart);
			startInterval();
		}
	}
	
})

function startInterval() {
	$(".cre-bg").animate({opacity: 0.5},400)
	intervalId = setInterval(roll, 3000);
}
function stopInterval() {
	$(".cre-bg").animate({opacity: 1},400)
	clearInterval(intervalId);
} 
listContainner.hover(stopInterval, startInterval)

/*合作媒体*/
var speed = 10;
var tab = document.getElementById("par-media");
var tab1 = document.getElementById("par-medias");
var tab2 = document.getElementById("par-kinds");
tab2.innerHTML = tab1.innerHTML;

function Marquee() {
	if(tab2.offsetWidth <= tab.scrollLeft)
		tab.scrollLeft -= tab1.offsetWidth
	else {
		tab.scrollLeft++;
	}
}
var MyMar = setInterval(Marquee, speed);
tab.onmouseover = function() {
	clearInterval(MyMar)
};
tab.onmouseout = function() {
	MyMar = setInterval(Marquee, speed)
};