$(function() {
	//				console.log(window.screen.height);
	// $(".payFooter").css("top",window.screen.height - 2*oSize);
	//				var h = document.body.scrollHeight;
	//			    window.onresize = function(){
	//			        if (document.body.scrollHeight < h) {
	//			            document.getElementsByClassName("payFooter")[0].style.display = "none";
	//			        }else{
	//			            document.getElementsByClassName("payFooter")[0].style.display = "block";
	//			        }
	//			    };

	//获得回报方式
	var projectId = GetQueryString("projectId");
	var _fees = GetQueryString('fees');
	var _getFees = GetQueryString('getFees');
	var addr = GetQueryString('addr');
	var support = GetQueryString('support'); //支持为false让金额隐藏
	var supportStr = "支持";
	if(support == 'false') {
		supportStr = "认购";
		$('.money').hide();
		$('.payTop').hide();

		$("title").text(supportStr);
		$("#support").text(supportStr);
		$(".top-content > p").hide();

	}
	//获得回报方式
	ajaxPost('/user/project/getRequite', JSON.stringify({
		'projectId': projectId
	}), function(data) {
		console.log(data);
		$(data.data).each(function(i, item) {
			var _desc = item.desc;
			_desc = _desc ? _desc : '无';
			var con = $(
				'<figure>' +
				'<img class="returnImg" src="' + rightImg(item.images[0]) + '"/>' +
				'<figcaption style="width: 75%;">' +
				'<span class="rePrice">' + supportStr + '：<em id="rePrice">' + item.fees + '</em> 元</span>' +
				'<span class="reNum">数量：<em id="reNum">' + item.count + '</em></span>' +
				'<p>内容：<em id="reCon">' + _desc + '</em></p>' +
				'</figcaption>' +
				'<span class="round" ifget="false" index="' + item.id + '"></span>' +
				'<div class="clear"></div>' +
				'</figure>'
			);
			$('.replyList').append(con);
		});
		//回报方式选中与否
		$('span.round').click(function() {
			$(".supportTa").removeClass("support_act");
			$('#pN').val('');
			if($(this).attr('ifget') == "false") { //选中
				$('span.round').attr('ifget', false).css('background-image', 'url(public/img/home/ungetcheck.png)');
				$(this).attr('ifget', true).css('background-image', 'url(public/img/home/getcheck.png)');

				var fees = $(this).parents('figure').find('#rePrice').text();
				$('.paySum em').text(fees);

				if(GetQueryString('addr') == 'true') {
					//查询默认地址
					ajaxPost('/user/address/default', '', function(data) {
						console.log(data);
						var obj = data.data;
						if(!obj) {
							$('.defaultAdr').hide(); //没有默认地址则隐藏
							if(confirm('您还没有默认设置地址，点击确定去设置!')) {
								location.href = 'adrSet.html';
							}else{
								$('span.round').attr('ifget', false).css('background-image', 'url(public/img/home/ungetcheck.png)');
								$('.paySum em').text(0);
							}
						} else {
							$('.defaultAdr').show(); //默认地址显示
							$('.realName').text(obj.realName);
							$('.phone').text(obj.phone);
							$('.defadr').text(obj.desc);
							$(".defaultAdr").attr("adrid",obj.id);
						}
					})
				}

			} else {
				$(this).attr('ifget', false).css('background-image', 'url(public/img/home/ungetcheck.png)');
				$('.defaultAdr').hide();
				$('.paySum em').text(0);
			}
		});
		//跳转到地址页
		$('.defaultAdr').click(function() {
			location.href = 'adrSet.html';
		})
	})

	ajaxPost("/user/slogan/random", JSON.stringify({
		type: 1,
		unique: getCookie('unique')
	}), function(obj) {
		if(obj.success) {
			$("#desc").val(obj.data.desc);
		}
	});

	var lock = false;

	//获取订单
	$(".paySub").click(function() { //projectRequiteId

		if(!is_weixn()) {
			alert("请用微信打开支付！");
		}

		var desc = $("#desc").val();
		if(desc == null || desc == '') {
			desc = '兄弟姐妹们，请支持我！';
		}
		var projectId = GetQueryString("projectId");

		var fees = $('.paySum em').text();
		fees = parseFloat(fees);

		if (_fees - _getFees > 1) {
			if(fees < 1) {
				alert("支持金额要大于1元！");
				return;
			}
		}


		if(lock) {
			return;
		}
		lock = true;

		var projectRequiteId = $('span.round[ifget=true]').attr('index');
		ajaxPost("/user/support/create",
			JSON.stringify({
				supportFees: fees,
				desc: $("#desc").val(),
				projectId: projectId,
				unique: getCookie('unique'),
				projectRequiteId: projectRequiteId,
				supportAddrId: $(".defaultAdr").attr("adrid")
			}),
			function(obj) {
				console.log(obj);
				lock = false;
				if(obj.success) {
					// alert("支持成功！");
					//签名
					//支付
					// window.history.back();
					getSign(obj.data.orderNo);
				} else {
					alert(obj.msg);
				}

			});

	});

	var getSign = function(orderNo) {

		ajaxPost("/pay/wxjs/getSign", JSON.stringify({
			orderNo: orderNo
		}), function(obj) {
			var wxSign = obj.data.wxSign;
			if(typeof WeixinJSBridge == "undefined") {

				if(document.addEventListener) {
					document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
				} else if(document.attachEvent) {

					document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
					document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
				}
			} else {

				try {
					onBridgeReady(wxSign);
				} catch(e) {

				}

			}
		});

	}

	// 微信支付 /pay/wxjs/getSign
	function onBridgeReady(wxSign) {

		var request = {
			"appId": wxSign.appId, //公众号名称，由商户传入
			"timeStamp": "" + wxSign.timeStamp, //时间戳，自1970年以来的秒数
			"nonceStr": wxSign.nonceStr, //随机串
			"package": wxSign.packageValue,
			"signType": "MD5", //微信签名方式:
			"paySign": wxSign.sign //微信签名
		};

		WeixinJSBridge.invoke(
			'getBrandWCPayRequest', request,
			function(res) {

				if(res.err_msg == "get_brand_wcpay_request:ok") {
					//      	alert("支付成功！");
					var projectId = GetQueryString("projectId");
					window.location.href = "share.html?id=" + projectId + '&unique='+getCookie('unique');
				}
				// 使用以上方式判断前端返回,微信团队郑重提示:res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。
			}
		);
	}
	//金额选择
	$('.money ul li').click(function() {
			$(".supportTa").removeClass("support_act");
			$(this).addClass("support_act");
			var moneyCount = $(this).children('em').text();
			$('#pN').val('');

			if(moneyCount > (_fees - _getFees)) {
				moneyCount = _fees - _getFees;
			}

			$('.paySum em').text(moneyCount);
			$('span.round').attr('ifget', false).css('background-image', 'url(public/img/home/ungetcheck.png)');
			$('.defaultAdr').hide();
		})
		//输入框
	$('#pN').focus(function() {
		$(".supportTa").removeClass("support_act");
		$('span.round').attr('ifget', false).css('background-image', 'url(public/img/home/ungetcheck.png)');
		$('.paySum em').text(0);
		$('.defaultAdr').hide();
	});
	$('#pN').keyup(function() {
		var fees = $(this).val();
		fees = parseFloat(fees);
		if(fees < 1 || isNaN(fees)) {
			fees = 1;
		}

		if(fees > (_fees - _getFees)) {
			fees = _fees - _getFees;
		}
		$('.paySum em').text(fees);
	});
});
