$('.act-share').click(function(){
	location.href='index.html';
})
var proId = GetQueryString('proId');
setCookie('unique',GetQueryString("unique"));
var userId=getCookie('userId');

//参与团购
$('.selfReg').click(function(){
	if (userId && userId != "") {
		ajaxGET('/user/info','',function(data){
			if(data.success){
				var phone=data.data.phone;
				console.log(phone);
				if (phone == null || phone == undefined || phone == '') {
					setCookie("__back__",window.location.href);
					location.href='tel-bind.html?getphone=right';
				}else{
					location.href="selfReg.html?proId="+proId;
				}
			}
		})
	}else{
		gotoLogin();
	}
})
ajaxGET('/activities/findById','id='+proId+'&unique='+GetQueryString("unique"),function(data){
	console.log(data);
	var con=data.data;
	var title=con.title,
		headImg=con.headImg,
		bgImg=con.bgImg,
		images=con.images,
		company=con.company,
		startDate=con.startDate,
		endDate=con.endDate,
		enrollCount=con.enrollCount,		//报名人数
		supportCount=con.supportCount,		//支持人数
		fees=con.fees,
		titleList=getFeild(con,['activitiesDesc','titleList']),
		descList=getFeild(con,['activitiesDesc','descList']);

	enrollCount = enrollCount ? enrollCount : 0;
	supportCount = supportCount ? supportCount : 0;
	
	company = company.replace("方面队","军团");
	if (company.length>4) {
		company=company.slice(0,4);
	}
	
	//倒计时
//	var dateEnd = new Date(endDate);
//	var iCount = setInterval(timeGo,1000);
//	timeGo();
	function timeGo(){
		var dateNow=new Date();
		var arr=adddate(dateNow,dateEnd);
		
		for (var i=0;i<arr.length;i++) {
			arr[i] = arr[i] < 10 ? '0'+arr[i]:arr[i];
		}
		
		var txt=arr[0]+"天"+arr[1]+"小时"+arr[2]+"分"+arr[3]+"秒";
		$('.timeRest p').text(txt);
		
		if(dateNow.getTime() >= dateEnd.getTime()){
			clearInterval(iCount);
			arr = [00,00,00,00];
			$('.timeRest').html("<p>众筹已结束</p><p>十月遵义不见不散</p>").css("color","red").css("font-weight","bolder");
		}
	}
	
	function adddate(date1,date2){
		var date3=date2.getTime()-date1.getTime();  //时间差的毫秒数
		var days=Math.floor(date3/(24*3600*1000));
		var leave1=date3%(24*3600*1000);    //计算天数后剩余的毫秒数
		var hours=Math.floor(leave1/(3600*1000));
		var leave2=leave1%(3600*1000);        //计算小时数后剩余的毫秒数
		var minutes=Math.floor(leave2/(60*1000));
		var leave3=leave2%(60*1000);    //计算分钟数后剩余的毫秒数
		var seconds=Math.floor(leave3/1000);
		var arr=[days,hours,minutes,seconds];
		return arr;
	}
	
	if (userId && userId != "") {
		//是否报名
		ajaxPost('/user/project/isTake',JSON.stringify({activitiesId:proId}),function(data){
			console.log(data);
			if (data.data) {
				$('.register').css('background','#aaa');
				$(".register").unbind();
			}
		})
	}
	
	console.log(new Date(endDate));
	var today=new Date().getTime();
	if (today>endDate) {
		$('.register').css('background','#aaa').text('已结束').unbind();
		$('.selfReg').css('background','#aaa').unbind();
	}
	var startSignDate = new Date(startDate).getTime();
	//我要报名
	if (today < startSignDate) {
		$('.register').css('background','#aaa').text("敬请期待").unbind();
	}else{
		$('.register').click(function(){
			if (userId && userId != "") {
				setCookie('title',title);
				location.href = 'apply.html?proId=' + proId;
			}else{
				gotoLogin();
			}
		});
	}
	


	var _height=$('#banner').css('height');
	var _width=$(document).width();
	var len=images.length;
	var carouselArr=[];
	if(len>=1){
		$(images).each(function(i,item){
			var objImg={image:rightImg(item)};
			carouselArr.push(objImg);
		});
		var renderBanner = function(bannerList){
			var html = '<ul class="slider-list">';
			$.each(bannerList, function(index, _item) {
				html += '<li class="slider-item openParam" data-baidu-label="' + (parseInt(index) + 1) + '">' +
					'<div class="img-wrap"><img class="banner-image" src="' + _item["image"] + changeWidth(parseInt(_width)*2,parseInt(_height)*2)+'"/></div></li>';
			});
			html += '</ul>';
			return html;
		}

		var bannerList = carouselArr;
		var bannerHTML = bannerList ? renderBanner(bannerList) : '';
		$("#banner").html(bannerHTML);
		$("#banner").slider({
			"autoScroll": true,
			"infinite": true
		});
	}else{
		$('.actDetail .slider-wrap').css('background-image','url('+rightImg(bgImg)+')');
	}

	$('.act-event .pic').attr('src',rightImg(headImg));
	$('.act-event .company p').text(company);
	$('.act-event .date').text(new Date(startDate).toLocaleString());
	$('.act-event .content .desc').text(title);
	$('.act-event .fees').text(fees);
	$('.act-event .num').text(enrollCount);
	$('.act-event .supportCount').text(supportCount);

	if (titleList.length > 1) {
		$(titleList).each(function(i,item){
			var titleName=$('<a href="#" hidefocus="true" >'+item+'</a>');
			$('.actDetail .tabs').append(titleName);
			if(i==0){
				$('.tabs').children().first().addClass('active');
			}
			if (i>1) {
				$('.tabs').children().last().hide();
			}
		});
	}
	
	//展开详情，点击收起
	function slideMore(i){
		if ($('.content-slide').eq(i).children().length>16) {
			var moreIn=$('<div class="getMore" index='+i+'><span ifmore="false"><img src="public/img/home/getMore.png"/></span></div>');
			moreIn.insertAfter($('.content-slide').eq(i));
			var moreBtn=$('.content-slide').eq(i).children().eq(15).nextAll()
			moreBtn.hide();
			$('.getMore[index='+i+'] span').click(function(){
				if ($(this).attr('ifmore')=="false") {
					$(this).attr('ifmore',true);
					moreBtn.fadeIn();
					
					$(this).children("img").attr("src","public/img/home/getLess.png");
//					$(this).text('点击收起').css('background-image','url(public/img/home/getLess.png)');
				} else{
					$(this).attr('ifmore',false);
					moreBtn.fadeOut();
					$(this).children("img").attr("src","public/img/home/getMore.png");
//					$(this).text('展开详情').css('background-image','url(public/img/home/getMore.png)');
					$('html,body').animate({scrollTop:$('.swiper-container').offset().top},0);
				}
			})
		}
	}
	function slideMoreImg(){
		var moreIn=$('<div class="getMore" index="0"><span ifmore="false"><img src="public/img/home/getMore.png"/></span></div>');
		moreIn.insertAfter($('.content-slide').eq(0));
		var moreBtn=$('.content-slide').eq(0).children("p").eq(1).nextAll();
		moreBtn.hide();
		$('.getMore[index="0"] span').click(function(){
			if ($(this).attr('ifmore')=="false") {
				$(this).attr('ifmore',true);
				moreBtn.fadeIn();
				//懒加载效果
				console.log('00000000')
				$("img.lazy").lazyload({ effect: "fadeIn" });
				
				$(this).children("img").attr("src","public/img/home/getLess.png");
			} else{
				$(this).attr('ifmore',false);
				moreBtn.fadeOut();
				$(this).children("img").attr("src","public/img/home/getMore.png");
				$('html,body').animate({scrollTop:$('.swiper-container').offset().top},0);
			}
		})
	}
	function slideMoreIcon(){
		var moreIn=$('<div class="getMore" index="0"><span ifmore="false"><img src="public/img/home/getMore.png"/></span></div>');
		moreIn.insertAfter($('.content-slide').eq(0));
		var moreBtn=$('.content-slide').eq(0).children("p").eq(1).nextAll();
		moreBtn.hide();
		$('.getMore[index="0"] span').click(function(){
			if ($(this).attr('ifmore')=="false") {
				$(this).attr('ifmore',true);
				moreBtn.fadeIn();
				
				$("img.lazy").lazyload({ effect: "fadeIn" });
				
				$(this).children("img").attr("src","http://image.yingccn.com/image/5a004295d6c9b651421ac3e9.png");
			} else{
				$(this).attr('ifmore',false);
				moreBtn.fadeOut();
				$(this).children("img").attr("src","http://image.yingccn.com/image/5a0041b2d6c9b651421ac3e7.png");
				$('html,body').animate({scrollTop:$('.swiper-container').offset().top},0);
			}
		})
	}
	
	if (descList.length > 1) {
		$(descList).each(function(i,item){
			if(i==0){
				$('.content-slide').eq(0).html(item);
				var child = $('.content-slide').eq(0).children().first().children();
				if (child && (child.attr("src"))) {
					slideMoreImg();
					
				}else{
					slideMore(i);
				}
			}else if(i==1){
				$('.content-slide').eq(1).html(item);
				slideMore(i);
				$('p img').parent('p').css('text-align','center');
			}else if(i==2){
				$('.content-slide').eq(2).html(item);
				slideMore(i);
			}
		});
	} else{
		$('.content-slide').eq(0).html(descList[0]);
		$('.tabs').hide();
		$('.company').hide();
		$(".content figure").css('margin-top','0.5rem');
		$(".content .pic").css('margin-top','0.3rem');
		slideMoreIcon();
	}
	var tabsSwiper = new Swiper('.swiper-container', {
		speed: 500,
		autoHeight:true,
		setWrapperSize:true,
		onSlideChangeStart: function() {
			$(".tabs .active").removeClass('active');
			$(".tabs a").eq(tabsSwiper.activeIndex).addClass('active');
		},
		onSlideChangeEnd:function(){
			$("div.swiper-wrapper").eq(0).css("height","");
			$("div.swiper-wrapper > div").css("height","");
		}
	});

	$(".swiper-slide , .swiper-wrapper").css("height","100%");
	setTimeout(function(){
		$(".swiper-slide , .swiper-wrapper").css("height","100%");
	},500);


	$(".tabs a").on('touchstart mousedown', function(e) {
		e.preventDefault()
		$(".tabs .active").removeClass('active');
		$(this).addClass('active');
		tabsSwiper.swipeTo($(this).index());
	});

	$(".tabs a").click(function(e) {
		e.preventDefault();
	});

	var loadImages = lazyload();
	loadImages(); //初始化首页的页面图片
	window.addEventListener('scroll', throttle(loadImages, 500, 1000), false);
})


var page=0;
var finishPage=0;
var finish=false;

$("#btn1").on('click', function() {
	$("#btn1").attr("class", "choice");
	$("#btn2").attr("class", "");
	$(".finish").hide();
	$(".zcz").show();
	finish=false;
});
$("#btn2").on('click', function() {
	$("#btn1").attr("class", "");
	$("#btn2").attr("class", "choice");
	$(".finish").show();
	$(".zcz").hide();
	finish=true;
});

$(window).scroll(function(){
	if($(document).scrollTop()+$(window).height()==$(document).height()){
		if (!finish) {
			page++;
			$('.loadImgCon').fadeIn();
			setTimeout(_supportList(page,proId,finish),500);
			function _supportList(page,proId,finish){
			    return function(){
					supportList(page,proId,finish);
				}
			}
		} else{
			finishPage++;
			$('.loadImgConFinish').fadeIn();
			setTimeout(_supportList(finishPage,proId,finish),500);
			function _supportList(finishPage,proId,finish){
			    return function(){
					supportList(finishPage,proId,finish);
				}
			}
		}
	}
})
supportList(page,proId,finish);
supportList(page,proId,true);

//获得底部支持梦想清单
function supportList(page,proId,ifFinish){
	ajaxGET('/project/list','page='+page+'&activitiesId='+proId+'&isDone='+ifFinish+'&unique='+GetQueryString('unique'),function(data){
		var _list=data.content;
		console.log(data);
//		
		$('.loadImgCon').hide();
		$('.loadImgConFinish').hide();

		if (!ifFinish) {
			
//			if (data.totalElements<=20) {
////				$('.loadImgCon').remove();
//				$('.swiper-slide').css('margin-bottom','1.0rem');
//				$(window).unbind('scroll');
//				$('.act-people').hide();
//				
//				return ;
//			}else{
//				$('#btn1 em').text(data.totalElements);
//			}
			$('#btn1 em').text(data.totalElements);
		}else{
			if (data.totalElements<=20) {
				$('#btn2').hide();
			}else{
				$('#btn2 em').text(data.totalElements);
			}
			// $('#btn2 em').text(data.totalElements);
		}

		if(_list.length==0){
			if (!ifFinish) {
				$('.loadImgCon').html('没有更多了');
			} else{
				$('.loadImgConFinish').html('没有更多了');
			}
			return;
		}
		$(_list).each(function(i,item){
			var userId=item.userId,
				headImg=item.headImg,
				nickName=item.nickName,
				supportCount=item.supportCount,
				desc=item.activities.desc,
				getFees=item.getFees,
				fees=item.fees,
				progressBar=(getFees*100/fees).toFixed(2)+"%",
				proBarWidth=(getFees/fees)*5.3+"rem",
				_startDate=item.createTime;
			
			if (parseFloat(proBarWidth)<0.12&&(parseFloat(proBarWidth)>=0.05)) {
				proBarWidth='0.12rem';
			}else if(parseFloat(proBarWidth)<0.05){
				proBarWidth=0;
			}
			getFees = getFees ? getFees.toFixed(2) : 0;

			if(parseInt(progressBar)>=100){
				progressBar=100+'%';
			};
			if(parseInt(proBarWidth)>=5.3){
				proBarWidth=5.3+'rem';
			}

			var unixTimestamp = new Date(_startDate) ;
		    var startDate = unixTimestamp.toLocaleString();

			var zcz=$(
				'<div class="zc-people"> <a href="share.html?id='+item.id+'&unique='+GetQueryString("unique")+'">'+
				'<div class="info">'+
				'<div class="headImg"> <img src="'+rightImg(headImg)+'"> </div>'+
				' <div class="infoTop"> <p class="title">'+nickName+'</p> <p class="date">'+startDate+'</p> <div class="clear"></div> <p class="text">('+desc+')</p> </div> <div class="clear"></div> </div>'+
				'<div class="progressBar"><div class="scrollShow"><div class="scrollShowOn" style="width: '+proBarWidth+';"></div></div><em>'+progressBar+'</em><div class="clear"></div></div>'+
				'<div><span class="zc-supporter">支持者'+supportCount+'人</span><span class="zc-money">已筹'+getFees+'元</span></div></a></div>'
			);

			if (ifFinish==false) {
				$('.zcz').append(zcz);
			} else{
				console.log('11111111111');
				$('.finish').append(zcz);
			}

		})
	});
}
