pro.css(str,'url(public/img/home/home.png)');
store.css(str,'url(public/img/home/store.png)');
mes.css(str,'url(public/img/home/message-c.png)');
my.css(str,'url(public/img/home/my.png)');
_a.css('color','#fff');
mes.css('color','#FAAB00');
$('body').css('background-color','#F8F8F8');

$('.mContain').find('li').click(function(){
	if($(this).attr('id')=='mes1'){
		location.href='project-condition.html';
	}else if($(this).attr('id')=='mes2'){
		location.href='reply-comment.html';
	}else{
		location.href='webNotice.html';
	}
})