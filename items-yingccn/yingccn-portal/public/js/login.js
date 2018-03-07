var _csrf = null;
function initLoginBtn(){
	$('#login-btn').click(function() {
		var user = $('#login-id').val(),
			pwd = $('#login-pwd').val();

		$.ajax({
			type: "post",
			url: "/login.json",
			dataType: 'json',
			data: {
				'username': user,
				'password': pwd,
				'_csrf': _csrf
			},
			success: function(success) {
				var suc = success.success;
					console.log(success);
				if(!suc){
					$('.errorpwd').show();
					console.log(suc);
				}else{
					location.href = 'home.html';
					console.log('登录成功');
					var _userId = success.data.id;
					setCookie('userId', _userId);
						console.log(_userId);
				}

			},
			error: function() {
			}
		});
	});
	$(document).keydown(function(event){ 
		if(event.keyCode==13){ 
		$("#login-btn").click(); 
		} 
		}); 
}

function initLogin(id){
	setTimeout(function(){
		$.ajax({
			type: "post",
			url: "/access/getCode.json?_csrf=" +  _csrf,
			contentType:"application/json;charset=UTF-8",
			dataType: 'json',
			data:JSON.stringify({id:id}),
			success: function(obj) {
				if(obj.success){
					if (obj.data) {
						loging(obj.data.code);
					}else{
						initLogin(id);
					}
				}else{
					$("#msg").text(obj.msg);
				}
			}
		});
	},1000);
}

function loging(code){

		$.ajax({
			type: "post",
			url: "/wxredirect.json?_csrf=" +  _csrf,
			contentType:"application/json;charset=UTF-8",
			dataType: 'json',
			data: JSON.stringify({code:code}),
			success: function(obj) {
				if(obj.success){
					location.href = 'home.html';
					console.log('登录成功');
					var _userId = obj.data.id;
					setCookie('userId', _userId);
					console.log(_userId);
				}
			}
		});

}


function initLoginf(){

	$('.loginf').click(function(){
		$.ajax({
			type: "post",
			url: "/access/qrid.json",
			dataType: 'json',
			data: {
				'_csrf': _csrf
			},
			success: function(success) {
				var suc = success.success;
					console.log(success);
				if(suc){
					var url = "http://wx.yingccn.com/qrcode.html?id=" + success.data.id;
					$('#qrcode').qrcode({width: 160,height: 160,text: url});
					$('.loginf').css("display","none");
					$('.loginb').css("display","inline-block");
					initLogin(success.data.id);

				}

			}
		});


	});

}


//	登陆功能
ajaxGet("/access/csrfToken.json", "t=" + new Date().getTime(), function(data) {
	_csrf = data.token;
	initLoginBtn();
	initLoginf();
	
})




$(function(){
	$('.left-con').focus(function() {
		$('.errorpwd').hide();
	})
})
