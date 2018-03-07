pro.css(str,'url(public/img/home/home.png)');
store.css(str,'url(public/img/home/store.png)');
mes.css(str,'url(public/img/home/message.png)');
my.css(str,'url(public/img/home/my-c.png)');
_a.css('color','#fff');
my.css('color','#FAAB00');
$('body').css('background-color','#F8F8F8');
if (getCookie("userId") && getCookie("userId") != "") {
	
	// if(!getCookie('userId')){
	// 	if(confirm('请登录！')){
	// 		location.href='login.html';
	// 	}
	// }

	//我的账号绑定
	$(".my .myHeader .mySet img").click(function(){
		location.href='idSet.html';
	})
	$('.my .myJoin').click(function(){
		location.href='my-join.html';
	})
	$('.my .mydevelop').click(function(){
		location.href='my-develop.html';
	})
	$('.my .release').click(function(){
		location.href='my-release.html';
	})

	ajaxGET('/user/info','',function(data){

		console.log(data);
		var item = data.data;
		var headImg = getFeild(item,['headImg']),
			nickName =getFeild(item,['nickName']),
			desc =getFeild(item,['desc']);

		desc=desc && desc!='null'?desc:'无';

		$('.my figure img').attr('src',rightImg(headImg));
		$('.my figure h3').text(nickName);
		$('.my figure p').text(desc);
	})
}else{
	gotoLogin();
}
