	/*************************大型活动**************************/
	var index = 0;
	var demos = 0;
	var unique = GetQueryString('unique') || window.sessionStorage.getItem('unique');
//	ajaxGET('/activities/list','page='+0, function(data) {
//		var totalPages1 = data.totalPages;
//		$("#page1").initPage(totalPages1, 1, tt); //总量（M）第一个，当前页（P）第二个
//	});
	function tt(dd) {
		$('.jp-pros').children().remove();
		$('.loadingTip').show();
		setTimeout(_actGetData(dd - 1), 100);
		
	};
	function _actGetData(index) {
		$('html, body').animate({
			scrollTop: $(".content").offset().top - 90
		}, 0);
		return function() {
			actGetData(index);
		}
	};
	$(function(){
		$("#page1").initPage(1, 1, tt);
	})
	
//	actGetData(0);
	function actGetData(index) {
		ajaxGET('/activities/list1','page=' + index + '&unique='+  unique, function(data) {
//			var totalPages1 = data.totalPages;
//			if(demos ==0){
//				$("#page1").initPage(totalPages1, 1, tt);
//				demos = 1 ;
//			}
			console.log(data);
			var con = data.content;
			$('.loadingTip').hide();
			$(con).each(function(i, item) {
				var _id = getFeild(item, ['id']),
					_title = getFeild(item, ['title']),
					_desc = getFeild(item, ['desc']),
					_headImg = getFeild(item, ['headImg']),
					_company = getFeild(item, ['company']),
					_startDate = getFeild(item, ['startDate']),
					_bgImg = getFeild(item, ['bgImg']),
					_supportCount = getFeild(item, ['doneEnrollCount']),
					_enrollCount = getFeild(item, ['enrollCount']),
					_endDate = getFeild(item, ['endDate']),
					_doneEnrollCount = getFeild(item, ['doneEnrollCount']),
					_goalCount = getFeild(item, ['goalCount']),
					_fees = getFeild(item, ['fees']),
					_Img1 = getFeild(item, ['images', '0']),
					_Img2 = getFeild(item, ['images', '1']),
					_Img3 = getFeild(item, ['images', '2']),
					_actId =  getFeild(item, ['activitiesDesc', 'id']),
					descList = getFeild(item, ['activitiesDesc', 'descList']),
					_percent = Math.floor((_supportCount / _goalCount).toFixed(2) * 100);
					
				_percents = _percent;
				if(_percents >= 100) {
					_percents = 100
				}
				/***********计算剩余天数*************/
				var currentTime = new Date().getTime();
				var iDays = parseInt((_endDate - currentTime) / 1000 / 60 / 60 / 24);
				if(iDays <= 0) {
					iDays = 0;
				}
				if(_enrollCount == '') {
					_enrollCount = 0
				}
				if(_supportCount == '') {
					_supportCount = 0
				}
				var cacheData = {
					"proId": _actId,
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
				var _jppros = $(
					'<div class="hot-pro shadow" id="pro' + i + '">' +
					'<img class="hot-img1" src="' + rightImg(_bgImg) + '" />' +
					'<div class="act-inf"><img class="act-img" src="' + rightImg(_headImg) + '"/><span class="act-name">' + _company + '</span></div>' +
					'<div class="remain-day">剩余' + iDays + '天</div>'+
					'<div class="hot-con1">' +
					'<p style="margin-top:88px">' + _title + '</p>' +
					'<span>' + _desc + '</span>' +
					'<div class="mp-one-circle">'+
						'<input type="hidden" class="circleNum" value="' + _percent + '">'+
						'<div class="dataCircle" style="width: 125px; height: 125px"><i class="pernum"><span class="theper">' + _percent + '%</span><br /><span class="thenum">已完成</span></i></div>'+
					'</div>'+
					'<h4 >已筹金额：<em >' + _supportCount + '元</em></h4>' +
					'<h4 >报名人数：<em >' + _enrollCount + '人</em></h4>' +
//					'<li><em>' + iDays + '天</em><p>剩余时间</p></li>' +
					'</div>' +
					'</div>'
				);
				
				$(".jp-pros").append(_jppros);
				$('#pro' + i).click(function() {
					window.sessionStorage.setItem('cacheData', JSON.stringify(cacheData));
					
					location.href = "activity.html";
				});
	
			});
			$(".dataCircle").ProCircle({
				default_color: '#000000',
				spill_angle: 10,
				kd_width: 6, //刻度的宽
				kd_height: 7, //刻度的高
				default_opacity: 0.2,
				font_size: 20,
				score: 0.5,
				ismult: true
			});
		})
	}
