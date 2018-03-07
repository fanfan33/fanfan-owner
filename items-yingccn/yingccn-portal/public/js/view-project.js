/*************************游览项目**************************/
var indexDre = 0;
var demoes = 0
//ajaxGET('/project/list', 'page=' + indexDre + '&type=' + typeCount, function(data) {
//	totalPages1 = data.totalPages;
//	$("#page1").initPage(totalPages1, 1, tt); //总量（M）第一个，当前页（P）第二个
//	$('.newList').children().remove();
//});
var uniqueId =  window.sessionStorage.getItem('unique');
// var uniqueId = "58e4d8e6d6c9b64412e5cd88";
getDreamList(0, 0); //最新动态
getDreamList(0, 1); //最快成长
getDreamList(0, 2); //最多支持
function getDreamList(indexDre, typeCount) {
	ajaxGET('/project/list', 'page=' + indexDre + '&type=' + typeCount + '&unique='+ uniqueId, function(data) {
		$('.loadingTip').hide();
		if(demoes == 0){
			totalPages1 = data.totalPages;
			$("#page1").initPage(totalPages1, 1, tt);
			demoes = 1;
		}
		$('.newList').children().remove();
		if(data.content.length == 0) {
			console.log('没有更多数据了！');
		}
		console.log(data);
		if(typeCount == 0) {
			totalPages1 = data.totalPages;
		} else if(typeCount == 1) {
			totalPages2 = data.totalPages;
		} else if(typeCount == 2) {
			totalPages3 = data.totalPages;
		}
		//		console.log(totalPages1);
		//		window.sessionStorage.setItem('dreamData',JSON.stringify(data));
		var con = data.content;
		$(con).each(function(i, item) {
			var _title = getFeild(item, ['title']),
				_id = getFeild(item, ['id']),
				_nickName = getFeild(item, ['nickName']),
				_desc = getFeild(item, ['activities', 'desc']),
				_fees = getFeild(item, ['fees']),
				_getFees = getFeild(item, ['getFees']),
				_supportCount = getFeild(item, ['supportCount']),
				_enrollCount = getFeild(item, ['enrollCount']),
				_endDate = getFeild(item, ['endDate']),
				_doneEnrollCount = getFeild(item, ['doneEnrollCount']),
				_goalCount = getFeild(item, ['goalCount']),
				_bgImg = getFeild(item, ['activities','bgImg']),
				_headImg = getFeild(item, ['headImg']),
				_Img1 = getFeild(item, ['images', '0']),
				_Img2 = getFeild(item, ['images', '1']),
				_Img3 = getFeild(item, ['images', '2']);
			_percent = Math.floor((_getFees / _fees).toFixed(2) * 100);
			if(_percent >= 100) {
				_percent = 100;
			}
			if(!_percent) {
				_percent = 0;
			}
			if(_title == '') {
				_title = '标题'
			}
			if(_desc == '') {
				_desc = '详细叙述'
			}
			if(_supportCount == '') {
				_supportCount = 0
			}
			if(_enrollCount == '') {
				_enrollCount = 0
			}
			//			console.log(_enrollCount);
			/***********计算剩余天数*************/
			var currentTime = new Date().getTime();
			var iDays = parseInt((_endDate - currentTime) / 1000 / 60 / 60 / 24);
			if(iDays <= 0) {
				iDays = 0;
			}
			//			console.log(iDays);

			var _hot = $(
				'<div class="single-pro shadow "  proId="' + _id + '"  >' +
				'<img class="single-img" src="' + rightImg(_bgImg) + '" alt="" />' +
				'<div class="single-top">' +
				'<img class="single-tx" src="' + rightImg(_headImg) + '"/>' +
				'<span class="single-name">' + _nickName + '</span>' +
				'</div>' +
				'<p class="single-des">' + _desc + '</p>' +
				'<div class="single-bar">' +
				'<div class="single-barbg">' +
				'<div class="single-barfill" style="width: ' + _percent + '%;"></div>' +
				'</div>' +
				'<span class="single-barper">' + _percent + '%</span>' +
				'</div>' +
				'<dl class="single-data">' +
				'<dt><i>' + _enrollCount + '人</i><p>报名人数</p></dt>' +
				'<dt><i>' + _supportCount + '人</i><p>支持人数</p></dt>' +
				'<dt><i>' + iDays + '天</i><p>剩余天数</p></dt></dl></div>'
			);
			if(typeCount == 0) {
				$('.newList').append(_hot);
			} else if(typeCount == 1) {
				$('.growFast').append(_hot);
			} else {
				$('.supList').append(_hot);
			};
			if(_percent == 100) {
				//				$('.hot3').append(_hot);circle();
			}
			function adPro() {
				$('.single-pro').on('click', function() {
					var id = $(this).attr('proId');

					location.href = "projects.html?id=" + id+ 'unique='+ uniqueId;

				})
			}
			adPro();
		})
	});
}
/***********分页功能************/
function zz(dd) {
	$('.newList').children().remove();
}

function tt(dd) {
	console.log('dd');
	$('.loadingTip').show();
	setTimeout(_getDreamList(dd - 1, 0), 500);
	$('.newList').children().remove();
}

function yy(dd) {
	$('.growFast').children().remove();
	$('.loadingTip').show();
	setTimeout(_getDreamList(dd - 1, 1), 500);
}

function uu(dd) {
	$('.supList').children().remove();
	$('.loadingTip').show();
	setTimeout(_getDreamList(dd - 1, 2), 500);
}

function _getDreamList(indexPage, typeCount) {
	$('html, body').animate({
		scrollTop: $(".content").offset().top - 90
	}, 0);
	return function() {
		getDreamList(indexPage, typeCount);
	}
}

$(function() {
	$('.nav-one ul li').click(function() {
		$('.nav-one ul li').css({
			"border-color": "#cccccc",
			"color": "#000000"
		});
		$(this).css({
			"border-color": "#f8a000",
			"color": "#f8a000"
		});
	});
	$('.jxz').click(function() {
		$('.nav-two ul li').css({
			"border-color": "#cccccc",
			"color": "#000000"
		});
		$('.nav-two ul li').eq(0).css({
			"border-color": "#f8a000",
			"color": "#f8a000"
		});
	});
	$('.nav-two ul li').click(function() {
		//		$('.nav-two ul li').css({"border-color":"#cccccc","color":"#000000"});
		//		$(this).css({"border-color":"#f8a000","color":"#f8a000"});
		$(".nav-two ul li").removeClass("nav-select");
		$(this).addClass("nav-select");
	});
	$(".nav-one ul li").eq(0).click(function() {
		$('.newList').show();
		$('.growFast').hide();
		$('.hot3').hide();
		$('.supList').hide();
		$('.nav-two').show();
	});
	$(".nav-one ul li").eq(1).click(function() {
		$('.nav-two').hide();
		$('.newList').hide();
		$('.growFast').hide();
		$('.hot3').show();
		$('.supList').hide();
		$('.page').hide();
	});
	$(".nav-two ul li").eq(0).click(function() {
		hidden();
		$('.newList').show();
		$("#page1").initPage(totalPages1, 1, tt);
		$('#page1').show();
	});
	$(".nav-two ul li").eq(1).click(function() {
		hidden();
		$('.growFast').show();
		$("#page2").initPage(totalPages2, 1, yy);
		$('#page2').show();
	});
	$(".nav-two ul li").eq(2).click(function() {
		hidden();
		$('.supList').show();
		$("#page3").initPage(totalPages3, 1, uu);
		$('#page3').show();
	});

	function hidden() {
		$('.newList').hide();
		$('.growFast').hide();
		$('.supList').hide();
		$('.page').hide();
	}
})

