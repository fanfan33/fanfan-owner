if(GetQueryString('getphone') == 'right') {
	alert('您还未绑定手机号，请先绑定手机号！');
}
var pass = 1;
$(".eye").click(function() {
	if(pass == 1) {
		$("#login-pas").attr("type", "text");
		$("#login-img").attr("src", "public/img/login/z-eye.png")
		pass = 0;
	} else {
		$("#login-pas").attr("type", "password");
		$("#login-img").attr("src", "public/img/login/b-eye.png")
		pass = 1;
	}
})
$(".eyes").click(function() {
	if(pass == 1) {
		$("#reg-pas").attr("type", "text");
		$("#reg-img").attr("src", "public/img/login/z-eye.png")
		pass = 0;
	} else {
		$("#reg-pas").attr("type", "password");
		$("#reg-img").attr("src", "public/img/login/b-eye.png")
		pass = 1;
	}
})

var telePhone = GetQueryString('phone');
if(telePhone) {
	if(telePhone.length == 11) {
		$('.tel-bind').show();
		$('.telChange').hide();
		$('.tel-num').text(telePhone);
	}
} else {
	$('.tel-bind').hide();
	$('.telChange').show();
}
$(".telePhone .code-num").click(function(djs) {
	var _tele = $('.telePhone #reg-tel').val();
	var $this=$(this);
	if(!(/^1[34578]\d{9}$/.test(_tele))) {
		alert('请输入正确的11位手机号码!');
	} else {
		ajaxPost('/access/vcode', JSON.stringify({
			'type': 2,
			'phone': _tele
		}), function(data) {
			console.log(data);
			if(!data.success) {
				alert(data.msg);
			} else {
				/***********验证码倒计时***********/
				$this.attr('disabled',true);
				var time = 60;
				var timer = null;
				$(".code-num").val(time + "s后重新获取");
				timer = setInterval(function() {
					time--;
					$(".code-num").val(time + "s后重新获取");
					if(time == 0) {
						$this.attr('disabled',false);
						$(".code-num").val("重获验证码");
						clearInterval(timer);
					}
				}, 1000)
			}
		});
	}
})

$('.telePhone .reg-btn').click(function() {
	var _tele = $('.telePhone #reg-tel').val();

	var _vcode = $('#reg-code').text();
	var _pwd = $('#reg-pas').val();

	var $this=$(this);
	$this.attr('disabled',true);
	ajaxPost('/user/phone', JSON.stringify({
		'phone': _tele,
		'vcode': _vcode,
		'vpassword': _pwd
	}), function(data) {
		$this.attr('disabled',false);
		console.log(data);
		if(data.success) {

			$('.telChange').hide();
			$('.tel-bind').show();
			var _phone = data.data.phone;
			var mphone = _phone.substr(0, 3) + '****' + _phone.substr(7);
			$('.tel-bind .tel-num').text(mphone);

			setTimeout(function() {
				var __back__ = getCookie("__back__");
				if(__back__) {
					window.location.href = __back__;
				}
			}, 1000);

		} else {
			alert(data.msg);
		}
	})
})