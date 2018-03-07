$(document).ready(function(){
var pass = 1;
$(".eyes").click(function() {
	if(pass == 1) {
		$("#pas").attr("type", "text");
		$("#regs-img").attr("src", "public/img/login/z-eye.png")
		pass = 0;
	} else {
		$("#pas").attr("type", "password");
		$("#regs-img").attr("src", "public/img/login/b-eye.png")
		pass = 1;
	}
})

/***********验证码倒计时***********/
	$(".code").click(function(djs){
				djs.disabled = true;
				var time = 60;
				var timer = null;
					$(".code").text(time + "s后重新获取");
				timer = setInterval(function() {
						time--;
					$(".code").text(time + "s后重新获取");
					if(time == 0) {
						djs.disabled = false;
						$(".code").text("重获验证码");
						clearInterval(timer);
					}
				}, 1000)
	})
})

