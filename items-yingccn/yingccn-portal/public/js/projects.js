var id = GetQueryString("id");
var uniqueId = window.sessionStorage.getItem('unique');
if (id) {
	ajaxGET('/project/findById','id='+id+'&unique='+uniqueId,function(data){
	console.log(data);
	var con=data.data;
	var nickName=con.nickName,
		bgImg=con.bgImg,
		images=con.images,
		userId=con.userId,
		startdate=con.startDate,
		assistCount=con.assistCount,
		headImg=con.headImg,

		title=con.title,
		goalCount=getFeild(con,['activities','goalCount']),
		supportCount=con.supportCount,

		fees=(con.fees).toFixed(2),
		getFees=con.getFees,
		titleList=getFeild(con,['activities','activitiesDesc','titleList']),
		descList=getFeild(con,['activities','activitiesDesc','descList']),
		remainMoney=fees-getFees,
		projectDesc=con.projectDesc,
		projectManifestos=getFeild(con,['projectManifestos']),
		progressBar=(getFees*100/fees).toFixed(2)+"%",
		progressBars=(getFees*100/fees).toFixed(2),
		yufees = (fees -getFees).toFixed(2);
		if(yufees < 0){
			yufees = 0;
		}
		progressBar=parseInt(progressBar)>100?'100%':progressBar;
		
//		console.log(progressBar);
		if(progressBars <100){
			$('.conditiondes').text('进行中');
		}else{
			$('.conditiondes').text('已完成');
		}
		/***********计算日期*************/
		var unixTimestamp = new Date(startdate);
		Date.prototype.toLocaleString = function() {
			return this.getFullYear() + "-" + (this.getMonth() + 1) + "-" + this.getDate();
		};
		var startdate = unixTimestamp.toLocaleString();
		
		$('.probgimg').attr('src',  rightImg(bgImg));
		$('.proheadimg').attr('src',  rightImg(headImg));
		$(".pro-basic .pro-username").text(nickName);
		$('.title').text(title);
		$('.order-money em').text(parseInt(fees)+'元');
		$('.yu-money').text(parseInt(yufees)+'元');
		$('.scrollShow .scrollShowOn').attr("style","width:"+progressBar+";");
		$('.sup-people em').text(supportCount+'人');
		$('.jindu em').text(parseInt(progressBar)+'%');
		$('.startime em').text(startdate);
		
		console.log(descList);
		$(descList).each(function(i, item) {
			//			if($(item).find('img')){
			//				var url=$('.swiper-slide img').attr('src');
			//				console.log(url);
			//				var anoter=$('.swiper-slide img').attr('data-original',url);
			//			}
			if(i == 0) {
				$('.detail-con1').html(item);
			} else if(i == 1) {
				$('.detail-con2').html(item);
			} 
			// else if(i == 2) {
			// 	$('.detail-con3').html(item);
			// } 
		});
		var loadImages = lazyload();
		loadImages(); //初始化首页的页面图片
		window.addEventListener('scroll', throttle(loadImages, 500, 1000), false);

	})
}

//懒加载
function throttle(fn, delay, atleast) {
	var timeout = null,
		startTime = new Date();
	return function() {
		var curTime = new Date();
		clearTimeout(timeout);
		if(curTime - startTime >= atleast) {
			fn();
			startTime = curTime;
		} else {
			timeout = setTimeout(fn, delay);
		}
	}
}

function lazyload() {
	var images = $('.detail-con img');
	var len = images.length;
	var n = 0; //存储图片加载到的位置，避免每次都从第一张图片开始遍历
	return function() {
		var seeHeight = document.documentElement.clientHeight;
		var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
		//		console.log("seeHeight="+seeHeight+"   scrollTop="+scrollTop+"    len="+len);

		for(var i = n; i < len; i++) {
			if(images[i].offsetTop < seeHeight + scrollTop) {
				//				if(images[i].getAttribute('src') === 'public/img/home/loading.gif') {
				//					console.log('33333333333')
				if (images[i].getAttribute('data-src')) {
					images[i].src = images[i].getAttribute('data-src');
				}
				
				//					console.log(images[i].src);
				//				}
				n = n + 1;
			}
		}
	}
}
$(function() {
			var project = $(".project-right").offset().top;
			$(window).scroll(function() {
					
					if($(window).scrollTop() > project) {
//						console.log('aa');
						$(".project-right").css({'position':'fixed','top':'90px'});
						var scrollBottom = $(".project-right").height() +$(".project-right").offset().top;;
						var foot = $(".project-left").height() +$(".project-left").offset().top;
//						console.log(foot);
//						console.log(scrollBottom);
						if(scrollBottom >= foot ){
							console.log('s');
							$(".project-left").css({'vertical-align':'bottom'});
							$(".project-right").css({'position':'static','vertical-align':'bottom'});
						}
					}else{
						$(".project-left").css({'vertical-align':'top'});
						$(".project-right").css({'position':'static','vertical-align':'top'});
					}
					/*****视频尺寸调整*****/
					$('iframe').css('max-height','500px');
					$('iframe').css('height','500px');
			});
			var sup=1;
			var ewtwice = 0;
			$('.once-sup').click(function(){
				if(sup==0){
					$('.sup-ew').hide();
					sup=1;
				}else{
					$('.sup-ew').show();
					sup=0; 
					if(ewtwice ==0){
						var url = "http://wx.yingccn.com/share.html?id=" + id+'&unique='+uniqueId;
						$('.sup-ewm').qrcode({width: 160,height: 160,text: url});
						ewtwice = 1;
					}
				}
			});
			var ewms =0;
			var ewonce = 0;
			$('.sup-btn').click(function(){
				if(ewms ==0){
					$(' .basic-infor .sup-btn .ewms').show();
						if(ewonce == 0){
							var url = "http://wx.yingccn.com/share.html?id=" + id;
							$(' .basic-infor .sup-btn .ewms .ewmsimg').qrcode({width: 120,height: 120,text: url});
							ewonce = 1;
//							$("body").click(function () {
//								$(' .basic-infor .sup-btn .ewms').hide();
//								});
						}
					ewms =1;
				}else{
					$(' .basic-infor .sup-btn .ewms').hide();
					ewms =0;
				}
			})
			/***********右侧导航*********/
			$('.pro-one').click(function(){
				$('.project-detail').show();
				$('.project-knowledge').hide();
				$('.project-news').hide();
				$('html, body').animate({
					scrollTop: $(".project-detail").offset().top - 90
				}, 0);
			});
			$('.pro-two').click(function(){
				$('.project-detail').hide();
				$('.project-knowledge').show();
				$('.project-news').hide();
				$('html, body').animate({
					scrollTop: $(".project-knowledge").offset().top - 90
				}, 0);
			});
			$('.pro-thr').click(function(){
				$('.project-detail').hide();
				$('.project-knowledge').hide();
				$('.project-news').show();
				$('html, body').animate({
					scrollTop: $(".project-news").offset().top - 90
				}, 0);
			});
			$('.back-top').click(function(){
				$('html, body').animate({
					scrollTop: $(".project-left").offset().top - 90
				}, 0);
			})
			
}) 