$(function() {
	/******************密码的明文和秘文*************************/
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
	/********************注册和登陆的转换************************/
	$(".top-login").click(function() {
		$(".login").show();
		$(".register").hide();
	})
	$(".top-register").click(function() {
		$(".login").hide();
		$(".register").show();
	})

	//	登陆与注册功能
	ajaxGet("/access/csrfToken.json", "t=" + new Date().getTime(), function(data) {
		var _csrf = data.token;

		$('#login-btn').click(function() {
			var user = $('#login-id').val(),
				pwd = $('#login-pas').val();

			$.ajax({
				type: "post",
				url: "/login.json",
				dataType: 'json',
				data: {
					'username': user,
					'password': pwd,
					'_csrf': _csrf
				},
				success: function(data) {
					var _userId = data['data']['id'];
					setCookie('userId', _userId);

					var __back__ = getCookie("__back__");
					if (__back__) {
							window.location.href = __back__;
					}else{
							window.location.href = 'index.html';
					}
					token = {};

				},
				error: function() {
					alert('用户名或密码错误！')
				}
			});
		})

		$(".reg-btn").click(function() {

			var ruser = $('#reg-tel').val(),
				rpwd = $('#reg-pas').val();
			rcode = $('#reg-code').text();
			rpwd = $("#reg-pas").val();
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
					console.log(data);
					if (data.success) {
						alert('注册成功!');
						location.reload();
						$('#login-id').val(data.data.phone);
						$('#login-pas').val(data.data.vpassword);
					} else{
						alert(data.msg);
					}
				},
				error: function() {
					alert('注册失败！')
				}
			});
		})


	});
});
/**********验证码***************/
		var InterValObj; //timer变量，控制时间
		var count = 60; //间隔函数，1秒执行
		var curCount; //当前剩余秒数
		var code = ""; //验证码
		var codeLength = 6; //验证码长度
		function sendMessage() {
			curCount = count;
			var phone = $("#reg-tel").val(); //手机号码
			if(phone != "") {
				//产生验证码
				for(var i = 0; i < codeLength; i++) {
					code += parseInt(Math.random() * 9).toString();
				}
				//设置button效果，开始计时
				$(".code-num").attr("disabled", "true").css('color','#aaa');
				$(".code-num").val(curCount + "s后重新获取");
				InterValObj = window.setInterval(SetRemainTime, 1000); //启动计时器，1秒执行一次
				//向后台发送处理数据
						var rtel = $('#reg-tel').val();
						ajaxPost('/access/vcode', JSON.stringify({
							'type': '1',
							'phone': rtel
						}), function(data) {
							console.log(data);
						})
			} else {
				alert("手机号码不能为空！");
			}
		}
		//timer处理函数
		function SetRemainTime() {
			if(curCount == 0) {
				window.clearInterval(InterValObj); //停止计时器
				$(".code-num").val("重获验证码");
				 $(".code-num").removeAttr("disabled");//启用按钮
				code = ""; //清除验证码。如果不清除，过时间后，输入收到的验证码依然有效
			} else {
				curCount--;
				$(".code-num").val(curCount + "s后重新获取");
			}
		}
