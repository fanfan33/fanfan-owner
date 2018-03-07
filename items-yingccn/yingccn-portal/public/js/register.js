//	登陆与注册功能
ajaxGet("/access/csrfToken.json", "t=" + new Date().getTime(), function(data) {
	var _csrf = data.token;

	$(".reg-btn").click(function() {

		var ruser = $('#reg-tel').val(),
			rcode = $('#reg-code').val();
		rpwd = $('#reg-pwd').val();
		repwd = $("#rpwds").val();
		if((/^1[3|4|5|8|7][0-9]\d{4,8}$/.test(ruser))) {
			console.log('1');
			if((/^[\w]{6,12}$/.test(rpwd))) {
				if(rpwd != repwd) {
					$('.error-pwd').hide();
					$('.error-rpwd').show();
				} else {
					$.ajax({
						type: "post",
						url: "/register.json?_csrf=" + _csrf,
						dataType: 'json',
						contentType: 'application/json;charset=utf-8',
						data: JSON.stringify({
							'username': ruser,
							'vpassword': rpwd,
							'vcode': rcode
						}),
						success: function(data) {
//							alert(data.msg);
//							$('.alerts').show();
//							$('.alerts .alert-con').text(data.msg);
							$('error').hide();
							Showbo.Msg.alert(data.msg);
						},
						error: function() {
							Showbo.Msg.alert('注册失败！')
						}
					});
				}
			}else{
				$('.error-pwd').show();
			}
		}
	});
	$(document).keydown(function(event){ 
		if(event.keyCode==13){ 
		$(".reg-btn").click(); 
		} 
		}); 
});
/************************验证码倒计时***************************/
$(function() {
	var btn = document.querySelector(".get-code");

	//点击click
	btn.onclick = function() {
		var rtel = $('#reg-tel').val();
		if(!(/^1[3|4|5|8|7][0-9]\d{4,8}$/.test(rtel))) {
			$('.error-tel').show();
			$('.error-tel').text('*请输入正确的电话号码');
			$('#reg-tel').focus();
		} else {
				//调用监听
				monitor($(btn));
				//倒计时效果  getCode回调函数  获取验证码api
				countDown($(this), getCode);
				$('.error-tel').hide();
				
			}

		}

	function getCode() {
		var rtel = $('#reg-tel').val();
		ajaxPost('/access/vcode', JSON.stringify({
			'type': '1',
			'phone': rtel
		}), function(data) {
			console.log(data.msg);
		})

	}
//	$(".cont-detail").focus(function(){
//		$('.error').hide();
//	})

	}
)
/*******************/
//防止页面刷新倒计时失效
/**获取验证码按钮*/
function monitor(obj) {
	var LocalDelay = getLocalDelay();
	if(LocalDelay.time != null) {
		var timeLine = parseInt((new Date().getTime() - LocalDelay.time) / 1000);
		if(timeLine > LocalDelay.delay) {
			//			console.log("过期");
		} else {
			_delay = LocalDelay.delay - timeLine;
			obj.text(_delay + "s后重新发送");
			$(".get-code").disabled = true;
			var timer = setInterval(function() {
				if(_delay > 1) {
					_delay--;
					obj.text(_delay + "s后重新发送");
					setLocalDelay(_delay);
				} else {
					clearInterval(timer);
					obj.text("获取验证码");
					$(".get-code").disabled = false;
				}
			}, 1000);
		}
	}
};

//倒计时效果
/** 获取验证码接口函数*/
function countDown(obj, callback) {
	if(obj.text() == "获取验证码") {
		var _delay = 60;
		var delay = _delay;
		obj.text(_delay + "s后重新发送");
		$(".get-code").disabled = true;
		var timer = setInterval(function() {
			if(delay > 1) {
				delay--;
				obj.html(delay + "s后重新发送");
				setLocalDelay(delay);
			} else {
				clearInterval(timer);
				obj.text("获取验证码");
				$(".get-code").disabled = false;
			}
		}, 1000);

		callback();
	} else {
		return false;
	}
}
//设置setLocalDelay
function setLocalDelay(delay) {
	//location.href作为页面的唯一标识，可能一个项目中会有很多页面需要获取验证码。
	sessionStorage.setItem("delay_" + location.href, delay);
	sessionStorage.setItem("time_" + location.href, new Date().getTime());
}

//getLocalDelay()
function getLocalDelay() {
	var LocalDelay = {};
	LocalDelay.delay = sessionStorage.getItem("delay_" + location.href);
	LocalDelay.time = sessionStorage.getItem("time_" + location.href);
	return LocalDelay;
}