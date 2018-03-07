$(function() {
	var demo = $(".man-left  .list");
	demo.click(function() {
		demo.css("color", "#000000");
		$(this).css("color", "#f8aa00");
		var index = $(this).attr("index");
		$(".txt").hide();
		$(".list" + index).show();
	})

	$(".rz-nextbtn").click(function() {
		$(".rz-information").hide();
		$(".rz-success").hide();
		$(".rz-ewm").show();
	})

	$(".rz-btn").click(function() {
		$(".rz-information").hide();
		$(".rz-success").show();
		$(".rz-ewm").hide();
	})
	$(".fix-zl").click(function() {
		$(".rz-information").show();
		$(".rz-success").hide();
		$(".rz-ewm").hide();
	})
})
$(function() {
	$("#previewImg").on("change", function() {
		//		console.log(this);
		var objUrl = getObjectURL(this.files[0]);
		$("#imghead").attr("src", objUrl);
	})

	function getObjectURL(file) {
		var url = null;
		if(window.createObjectURL != undefined) { // basic
			url = window.createObjectURL(file);
		} else if(window.URL != undefined) { // mozilla(firefox)
			url = window.URL.createObjectURL(file);
		} else if(window.webkitURL != undefined) { // webkit or chrome
			url = window.webkitURL.createObjectURL(file);
		}
		return url;
	}
})
/************************修改基本信息*******************************/
ajaxGET('/user/info', '', function(data) {
	//				console.log(data);
	var item = data.data;
	var headImg = getFeild(item, ['headImg']),
		imgId = getFeild(item, ['id']);

	var myimg = $('<img id="imghead" border="0" src="' + rightImg(headImg) + '">')
	$("#preview").append(myimg);
	$("#imghead").click(function() {
		$("#previewImg").click();
	})
})

//图片上传
function previewImage(file) {
	ajaxFilePost('/upload', new FormData($('#uploadForm')[0]), function(data) {
		console.log(data);
		var imgId = data.data.id;

		ajaxPost("/user/headImg", JSON.stringify({
			"headImg": imgId
		}), function(obj) {
			console.info(obj);
			//			$("#imghead").attr("src", rightImg(obj.data.headImg));
		});
	});
}
/**********************用户个人信息*************************/
ajaxGET('/user/info', '', function(data) {
	console.log(data);
	var item = data.data;
	var _headImg = getFeild(item, ['headImg']),
		_nickName = getFeild(item, ['nickName']),
		_city = getFeild(item, ['city']),
		_province = getFeild(item, ['province']),
		_area = getFeild(item, ['area']),
		_desc = getFeild(item, ['desc']);

	var myin = $(
		'<img class="own-head" src="' + rightImg(_headImg) + '"/>' +
		'<div class="own-resourse">' +
		'&nbsp;&nbsp;&nbsp;<span class="user-a">用户名：</span><span class="user-name">' + _nickName + '</span>' +
		'<span class="user-b">职业：</span><span class="job">互联网</span>' +
		'<span class="user-c">修改资料</span><img class="fixed-inf" src="public/img/my/my-fixed.png" alt="" />' +
		'<span class="user-d">所在城市：</span><span class="city">' + _city + '</span><br />' +
		//		'<span class="user-e">性别：</span><span class="user-sex">男</span>'+	
		'<span class="user-f">个性签名：</span><span class="sign">' + _desc + '</span></div>'
	)
	$(".own-self").append(myin);

	//点击修改信息
	$(".fixed-inf").click(function() {
		console.log('as');
		var demo = $(".man-left  .list");
		demo.css("color", "#000000");
		$(".fixed-infor").css("color", "#f8aa00");
		$(".txt").hide();
		$(".list" + 4).show();
		$('html, body').animate({
			scrollTop: $(".manage").offset().top - 50
		}, 0);
	})
	//修改信息
	$('#username').val(_nickName);
	$("#usersign").text(_desc);
	$("#province1 option:selected").text(_province);
	$("#city1 option:selected").text(_city);
	$("#district1 option:selected").text(_area);
	$('.basicinfo-btn').click(function() {
		var conts = $('#usersign').val();
		console.log(conts);
		ajaxPost("/user/desc", JSON.stringify({
			'desc': conts
		}), function(data) {
			//					console.log(data);
		});
		var conte = $('#username').val();
		ajaxPost('/user/nickname', JSON.stringify({
			'nickName': conte
		}), function(data) {
			console.log(data);
			//				location.reload();
		});
		var id = getCookie('userId');
		var contents = {
			//			'id':id,
			'province': $("#province1 option:selected").val(),
			'city': $("#city1 option:selected").val(),
			'area': $("#district1 option:selected").val()
		}
		ajaxPost('/user/addr.json', JSON.stringify(contents), function(data) {
			console.log(data);
		})
		if($("#previewImg").length > 0) {
			previewImage($('#previewImg'));
		}
		Showbo.Msg.alert("保存成功！");

	})
})
/***********************我发起的项目***************************/
var indexDevelop = 0;
	Pages1 =0;
	ajaxPost('/user/project/list', JSON.stringify({'page': 0}), function(data) {
		Pages1 = data.totalPages;
		$("#page1").initPage(Pages1, 1, tt); //总量（M）第一个，当前页（P）第二个
		$('#page1').show();
	})
function tt(dd) {
	console.log(dd);
	$('.projectss').children().remove();
	setTimeout(projectss(dd-1),0);
	$('html, body').animate({
			scrollTop: $(".projectss").offset().top - 50
		}, 0);
}
function projectss(page) {
	ajaxPost('/user/project/list', JSON.stringify({
		'page': page
	}), function(data) {
		console.log(data);
		if(data.content.length == 0) {
			$('.proj-infor').hide();
			$('.no-proj').show();
		}
//		Pages1 = data.totalPages;
		var cont = data.content;
		$(cont).each(function(i, item) {
			var _bgImg = getFeild(item, ['bgImg']),
				_tit = getFeild(item, ['title']),
				//				_des =getFeild(item,['activities','desc']),
				_fees = getFeild(item, ['fees']),
				_getFees = getFeild(item, ['getFees']),
				_startDate = getFeild(item, ['startDate']),
				_endDate = getFeild(item, ['endDate']),
				_supCount = getFeild(item, ['supportCount']);
			_percent = Math.floor((_getFees / _fees).toFixed(2) * 100);
			if(_percent >= 100 || _percent == '') {
				_percent = 100;
			}
			if(!_percent) {
				_percent = 0;
			}
			if(_fees == '') {
				_fees = 0;
			}
			if(_supCount == '') {
				_supCount = 0;
			}
			if(_getFees == '') {
				_getFees = 0;
			}
			if(_tit == '') {
				_tit = '项目描述'
			}

			//			_asd = (_getFees / _fees).toFixed(2)*100;
			//			console.log(_percent);
			/***********计算日期*************/
			var unixTimestamp = new Date(_startDate);
			Date.prototype.toLocaleString = function() {
				return this.getFullYear() + "-" + (this.getMonth() + 1) + "-" + this.getDate();
			};
			var startdate = unixTimestamp.toLocaleString();
			var mdcont = $(
				'<ul><li>' +
				'<img src="' + rightImg(_bgImg) + '" />' +
				'<span>' + _tit + '</span>' +
				'</li><li>审核中</li>' +
				'<li>进行中</li>' +
				'<li><div id="orangecircle" class="c100 p' + _percent + ' orange">' +
				'<span>已筹<em>' + _percent + '%</em></span>' +
				'<div class="slice">' +
				'<div class="bar"></div>' +
				'<div class="fill"></div>' +
				'</div>' +
				'</div></li>' +
				'<li><em>￥</em>' + _getFees + '</li>' +
				'</ul>'

			)
			$(".projectss").append(mdcont);
			circle();
		})
	})
}
/************************我参与的*******************************/
var Pages2 =0;
	ajaxPost('/user/support/getMyList', JSON.stringify({'page': 0}), function(data) {
		Pages2 = data.totalPages;
		$("#page2").initPage(Pages2, 1, yy); //总量（M）第一个，当前页（P）第二个
		$('#page2').show();
	})
function yy(dd) {
	console.log(dd);
	$('.supports').children().remove();
	setTimeout(supports(dd-1),0);
	$('html, body').animate({
			scrollTop: $(".my-join").offset().top - 50
		}, 0);
}
function supports(){
ajaxPost('/user/support/getMyList', JSON.stringify({
	'page': 0
}), function(data) {
	//	console.log(data);
	if(data.content.length == 0) {
		var noData = $('<p class="noData">没有数据!</p>');
		$('.joinprojectss').append(noData);
	}
	var cont = data.content;
	$(cont).each(function(i, item) {
		var _headImg = getFeild(item, ['headImg']);
		_nickName = getFeild(item, ['nickName']);
		_startTime = getFeild(item, ['project', 'startDate']);
		_bgImg = getFeild(item, ['project', 'bgImg']);
		_getFees = getFeild(item, ['project', 'getFees']);
		_tit = getFeild(item, ['project', 'title']);
		_des = getFeild(item, ['project', 'projectDesc']);
		_fees = getFeild(item, ['project', 'fees']);
		_supFees = getFeild(item, ['supportFees']);
		_supportCount = getFeild(item, ['project', 'supportCount']);
		_percent = Math.floor((_getFees / _fees).toFixed(2) * 100);
		_orderNo = getFeild(item, ['orderNo']);
		//		_percent = (_getFees / _fees).toFixed(2) * 100;
		/*项目日期*/
		var unixTimestamp = new Date(_startTime);
		Date.prototype.toLocaleString = function() {
			return this.getFullYear() + "-" + (this.getMonth() + 1) + "-" + this.getDate();
		};
		var starts = unixTimestamp.toLocaleString();
		//			console.log(starts);

		var mj = $(
			'<ul><li>' +
			'<img src="' + rightImg(_bgImg) + '" />' +
			'<p>' + _tit + '<br /> <span>发起人：<em>' + _nickName + '</em></span></p>' +
			'</li><li>进行中</li>' +
			'<li><div id="orangecircle" class="c100 p' + _percent + ' orange">' +
			'<span>已筹<em>' + _percent + '%</em></span>' +
			'<div class="slice">' +
			'<div class="bar"></div>' +
			'<div class="fill"></div>' +
			'</div>' +
			'</div></li>' +
			'<li><em>￥</em>' + _getFees + '</li>' +
			'+<li>' + _orderNo + '</li>' +
			'</ul>'
		);
		$(".joinprojectss").append(mj);
		circle();
	})
})
}