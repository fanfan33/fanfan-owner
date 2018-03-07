$('.dl .act-share').click(function(){
	location.href='index.html#pro';
})


var id=GetQueryString("id");
setCookie('unique',GetQueryString("unique"));
//查询是否点赞
$('.dianzan img').attr('src','public/img/home/zanEmpty.png');
if (getCookie("userId")  && getCookie("userId") != "") {
	ajaxPost('/user/projectAssist/get',JSON.stringify({'projectId':id}),function(data){
		console.log(data);
		if (data.data) {
			$('.dianzan img').attr('src','public/img/home/dianzan.png');
		}
	})
}

$('.dl .dianzan').click(function(){
	if (getCookie("userId") && getCookie("userId") != "") {
		ajaxPost('/user/projectAssist/save',JSON.stringify({'projectId':id}),function(data){
			var assistCount=data.data.vassistCount;
			assistCount = assistCount ? assistCount : 0;
			$('.dianzanNum').text(assistCount);
			$('.dianzan img').attr('src','public/img/home/dianzan.png');
		})
	}else{
		// setCookie("__back__",window.location.href);
		// window.location.href = "login.html";
		gotoLogin();
	}
})
//筹满
function getFull(){
	//盖章动画
	var box=$('<img class="finishItem" src="public/img/home/finished.png"/>');
	$('.dl').append(box);
	box.animate(
		{width:3.0+"rem",height:3.0+"rem"},
		500
	)
	
//全景的透明背景
//	var fullScreen = $(".dl .fullScreen");
//	var clientHeight = $(window).height();
//	var clientWidth = $(window).width();
//	fullScreen.css('height', clientHeight);
//	fullScreen.show();
	
//	var imgFly = $('<img src="public/img/home/finishedFly.png"/>');
//	imgFly.css('left',clientWidth).css('width',clientWidth);
//	fullScreen.append(imgFly);
//	imgFly.animate(
//		{left:-clientWidth},
//		4000,
//		function(){
//			fullScreen.css("background","none");
//			$('.finishItem').show();
//		}
//	);
//	fullScreen.click(function(){
//		$('.finishItem').show();
//		$(this).hide();
//	})
	
}
var issupport = null;
	
ajaxGET('/project/findById','id='+id+'&unique='+GetQueryString('unique'),function(data){
	console.log(data);
	var con=data.data;
	issupport=con.support;
	var nickName=con.nickName,
		bgImg=con.bgImg,
		images=con.images,
		done=con.done,
		userId=con.userId,
		_startTime=con.createTime,
		_startData=(new Date(_startTime).toLocaleString()),
		endDate=con.endDate,
		assistCount=con.assistCount,
		headImg=con.headImg,
		activity=con.activit,
		unique = con.unique,
		
		activitiesId=con.activitiesId,
		addr=con.addr,
		support=con.support,
		title=con.title,
		supportCount=con.supportCount,
		projectRequite=con.projectRequite,		//回报方式
		fees=con.fees,
		getFees=con.getFees,
		company=getFeild(con,['activities','company']),
		titleList=getFeild(con,['activities','activitiesDesc','titleList']),
		descList=getFeild(con,['activities','activitiesDesc','descList']),
		remainMoney=fees-getFees,
		projectDesc=con.projectDesc,
		projectManifestos=getFeild(con,['projectManifestos']),
		progressBar=(getFees*100/fees).toFixed(2)+"%",
		proBarWidth=(getFees/fees)*5.3+"rem";
	
	setCookie('unique',unique);
	if (company) {
		company = company.replace("方面队","军团");
		if (company.length>4) {
			company=company.slice(0,4);
		}
	}
	if (!activity) {
		$(".supBtn").css("margin","auto");
		$(".timeRest").hide();
		$(".banText span").hide();
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
	//进度条
	var num=parseFloat(progressBar);
	var getspan=$('.probtn .btnTop');
	if (num>0&&num<25) {
		if (num<=3) {
			proBarWidth=0.25+'rem';
			getspan.css('border-radius','50%');
		}
		getspan.css('background','#3079F9');
	}else if (num>=25&&num<50) {
		getspan.css('background','#F8AA00');
	} else if (num>=50&&num<75) {
		getspan.css('background','#25D50D');
	}else if (num>=75&&num<=100) {
		getspan.css('background','#EC0909');
	}else if (num>100) {
		getspan.css('background','#EC0909');
		num=100;
		proBarWidth=5.3+'rem';
	}
	$('.probtn .btnTop').css('width',proBarWidth);
	$('.pronum').text(num+'%');
	
   	$('title').text(title);
		if (!issupport) {
			$('.selectSup').text('认购');
			$(".buyTop").show();
			$(".supTop").hide();
		}else{
			$(".buyTop").hide();
			$(".supTop").show();
		}


   	//判断底部出现
	$('.dl .footerDiv').hide();
	if(userId==getCookie('userId')){
		$('.footShare').show();
		if (done) {
			$('.dl .paySelf').css('background','#999');
		} else{
			$('.dl .paySelf').click(function(){		//自己付款
				var id = GetQueryString("id");
				location.href='support-ta.html?projectId='+id+'&addr='+addr+'&support='+support+'&fees='+fees+'&getFees='+getFees;	//支持他
			})
		}
		$('.dl .selUpdate').click(function(){
			location.href='update-dt.html?id='+id+'&title='+title;
		});


	}else{
		$('.select').show();
		if (done) {
			$('.selectSup').css('background','#999');
		} else{
			$('.selectSup').click(function(){
				if (getCookie('userId') && getCookie("userId") != "") {
					location.href='support-ta.html?projectId='+id+'&addr='+addr+'&support='+support+'&fees='+fees+'&getFees='+getFees;		//支持他
				}else{
					gotoLogin();
				}

			})
		}



		if (!activity) {
			$('.selectJoin').text('发布项目');
			$('.selectJoin').click(function(){
				location.href='my-release.html';
			})
		} else{
			$('.selectJoin').text('我要报名');

			$('.selectJoin').click(function(){
				if (getCookie("userId") && getCookie("userId") != "") {
						location.href='apply.html?id='+activitiesId;
					}else{
						gotoLogin();
					}

			})


			if (getCookie("userId") && getCookie("userId") != "") {
				ajaxPost('/user/project/isTake',JSON.stringify({activitiesId:activitiesId}),function(data){
					console.log(data);
					if (data.data) {
						$('li.selectJoin').css('background-color','#aaa');
						$("li.selectJoin").unbind();
					}
				})
			}



		}
	};
	var today=new Date().getTime();
	if (today > endDate) {
		$('.footerDiv').hide();
		$('.proEnd').show();
	}
	setCookie('title',title);
	var _manifesto;
	if (projectManifestos.length==0) {
		_manifesto=projectDesc;
		$('.dl .cont-detail').hide();
		$('.current').append('<div class="addManifesto"><h3>项目描述：</h3><p>'+_manifesto+'</p></div>');
		$('.bannerText p').text('无');
		$('.dl .zcThanks').hide();
	}else{
//		_manifesto=projectManifestos[0].manifesto;
		_manifesto=getFeild(con,['projectManifestos[0]','manifesto']);
		$(projectManifestos).each(function(i,item){
			var manifesto=getFeild(item,['manifesto']);			//item.manifesto;
			var _date=new Date(getFeild(item,['createTime'])).toLocaleStringEnd();
			
			var mainImageTag = "";
			for (var ind in images) {
				if (ind >= 4) {break;}
				var ig = images[ind];
				var _rightImg=rightImg(ig);
				mainImageTag += '<img src="'+_rightImg+'"/> ';
			}
			
			
			var manifestoImg="";
			var conText;
			if (item.images.length!=0) {
				for (var i=0;i<item.images.length;i++) {
					if (i>=2) {break;}
					manifestoImg+='<img src="'+rightImg(item.images[i])+'"/> ';
				}
				conText=$('<div><span>'+manifesto+'</span><div class="upLoadImg">'+manifestoImg+'</div><p>'+_date+'</p></div>');
			}else{
				conText=$('<div>'+manifesto+'<p>'+_date+'</p></div>');
			}
			$('.zcText').append(conText);
		})
		$('.bannerText p').text(_manifesto);
	}

	//如果不是活动，则使用项目中的
	var isAct=con.activit;
	var proDescList=con.projectDescList;

	if(!isAct && proDescList != null){
		titleList=getFeild(con,['projectDescList','titleList']);
		descList=getFeild(con,['projectDescList','descList']);
		$('.dl .cont-detail').show();
		$('.addManifesto').hide();

	} else{
		$('.dl .cont-detail').hide();
		$('.addManifesto').show();
		_manifesto=projectDesc;
	}
	if (isAct) {
		$('.dl .cont-detail').show();
		$('.addManifesto').show();
	}

	if (!company) {
		$('.banText span p').hide();
	}else{
		$('.banText span p').text(company);
	}
	progressBar=parseInt(progressBar)>=100?'100%':progressBar;
	proBarWidth=parseInt(proBarWidth)>=5.6?'5.6rem':proBarWidth;
	remainMoney=remainMoney>0?remainMoney.toFixed(2):0;
	assistCount = assistCount ? assistCount : 0;
	$('.dianzanNum').text(assistCount);
	$('.banTitle p span').text(nickName);
	$('.banHeadIcon img').attr('src',rightImg(headImg));
	$('.supBtn .banDate span').text(_startData);
	$('.banText h3').text(title);
	$('.moneyDiv #goalMoney').text(fees);
	$('#lastMoney').text(remainMoney);
	$('#supNum').text(supportCount);
	$('.moneyDiv #orangecircle').attr('class','c100 p' + parseInt(progressBar) + ' orange');
	$('.moneyDiv #orangecircle span em').text(progressBar);
	circle();


	$(titleList).each(function(i,item){
		
		var _title=$('<a href="#" hidefocus="true" class="">'+item+'</a>');
		$('.dl .tabs').append(_title);
		if(i==0){
			$('.tabs').children().first().addClass('active');
		}
		if (i>1) {
			$('.tabs').children().last().hide();
		}
	});
	//展开详情，点击收起
	function slideMore(i){
		if ($('.content-slide').eq(i).children().length>16) {
			var moreIn=$('<div class="getMore" index='+i+'><span ifmore="false"><img src="public/img/home/getMore.png"/></span></div>');
			moreIn.insertAfter($('.content-slide').eq(i));
			var moreBtn=$('.content-slide').eq(i).children().eq(15).nextAll();
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
//					$(this).text('展开详情').css('background-image','url(public/img/home/getMore.png)');
					$(this).children("img").attr("src","public/img/home/getMore.png");
					$('html,body').animate({scrollTop:$('.swiper-container').offset().top},0);
				}
			})
		}
	}
	function slideMoreImg(){
		var moreIn=$('<div class="getMore" index="0"><span ifmore="false"><img src="public/img/home/getMore.png"/></span></div>');
		moreIn.insertAfter($('.content-slide').eq(0));
		var moreBtn=$('.content-slide').eq(0).children("p").eq(1).nextAll("p");
		moreBtn.hide();
		$('.getMore[index="0"] span').click(function(){
			if ($(this).attr('ifmore')=="false") {
				$(this).attr('ifmore',true);
				moreBtn.fadeIn();
				
				//懒加载
				$("img.lazy").lazyload({ effect: "fadeIn" });
				
				$(this).children("img").attr("src","public/img/home/getLess.png");
//					$(this).text('点击收起').css('background-image','url(public/img/home/getLess.png)');
			} else{
				$(this).attr('ifmore',false);
				moreBtn.fadeOut();
//					$(this).text('展开详情').css('background-image','url(public/img/home/getMore.png)');
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
				//懒加载
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
					console.log("00000")
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
		$('.dl .slider-wrap').css('background-image','url('+rightImg(bgImg)+')');
	}

	//判断是否有回报方式
	if (projectRequite) {
		$(projectRequite).each(function(i,item){
			var _desc=item.desc ? item.desc : '无';
			var con=$(
				'<figure>'+
				'<img class="returnImg" src="'+rightImg(item.images[0])+'"/>'+
				'<figcaption>'+
				'<span class="rePrice">认购金额：<em id="rePrice">'+item.fees+'</em> 元/份</span>'+
				'<span class="reNum" style="float: right;">数量：<em id="reNum">'+item.count+'</em> 份</span>'+
				'<p style="padding-top: 5px;">内容：<em id="reCon">'+_desc+'</em></p>'+
				'</figcaption>'+
//				'<span class="round" ifget="false" index="'+item.id+'"></span>'+
				'<div class="clear"></div>'+
				'</figure>'
			);
			$('.replyCon').append(con);
		})
	}

	if (done) {
		getFull();
	}
	
	//懒加载
	var loadImages = lazyload();
	loadImages(); //初始化首页的页面图片
	window.addEventListener('scroll', throttle(loadImages, 500, 1000), false);

	var tabsSwiper = new Swiper('.swiper-container', {
		speed: 500,
		autoHeight:true,
		onSlideChangeStart: function() {
			$(".tabs .active").removeClass('active');
			$(".tabs a").eq(tabsSwiper.activeIndex).addClass('active');
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
	//覆盖分享
	var cover = $(".dl .shareCover");
	var height = $(document).height();
	var _share=$('.dl .footShare .selShare');
	var clientHeight=$(window).height();
	cover.css('height', clientHeight);
	_share.click(function(){

		cover.show();
		$('body').css('overflow','hidden');
		var _scrollTop=$(document).scrollTop();
		cover.css('top',_scrollTop+'px');
		console.log(_scrollTop+'   '+clientHeight)
		cover.bind('touchmove',function(e){
			e.preventDefault();
		})
	})
	cover.click(function(){
		$('body').css('overflow','auto');
		$(this).hide();
	})

	//分页加载支持者
	hisSup(supIndex);


	if (endPage) {

		$(window).scroll(function(){
			if ($(document).height()==$(window).height()+$(document).scrollTop()) {

				supIndex++;
				console.log(supIndex);
				hisSup(supIndex);
			}
		})
	}


})

var supIndex=0;
var endPage=false;
//TA的支持者
function hisSup(index){
	ajaxGET('/support/list','page='+index+'&projectId='+id+'&unique='+GetQueryString('unique'),function(data){
		console.log(data);
		var totalSup=data.totalElements;
		$('.supNum p em').text(totalSup);
		var dataCon=data.content;
		$(dataCon).each(function(ind,item){
			var nickName=item.nickName,
				supportNickName=item.supportNickName,
				supportFees=item.supportFees,
				desc=item.desc,
				imgUrl=item.imgUrl,
				userId=item.userId,
				supportUserId=item.supportUserId;
				paytime=new Date(item.payTime).toLocaleStringEnd();
			
			if (supportFees && supportFees.toString().indexOf('.')>-1) {
				supportFees=supportFees.toFixed(2);
			}

			var commentList = item.commentList;

			var commentListStr = "";
			for (var i = 0; i < commentList.length; i++) {
				var common = commentList[i];
				var _userId=getFeild(common,['userId']);
				var ifShow='block';
				if (getCookie("userId")!=_userId) {
					ifShow='none';
				}
				var z = 100-i;
				var desc = common.comment ? common.comment : '';
				var nickName = common.nickName ? common.nickName : '';
				commentListStr += '<div class="mesReturn" style="z-index: '+z+';"><ul>'+
				'<li class="textRe">'+nickName+'：'+desc+'<span style="display:'+ifShow+'" class="list" index="'+getFeild(common,['id'])+'" userId="'+getFeild(common,['userId'])+'"></span></li>'+
				'</ul></div>';

			}

			var supportList= "";

			if (!issupport) {

				// $(".buyTop").show();
				// $(".supTop").hide();
				supportList=$(
					'<div class="messageList" style="min-height:0.5rem;">'+
					'<div class="headIcon">'+
					'<img src="'+rightImg(imgUrl)+'"/>'+
					'</div>'+
					'<div id="mesCon'+item.id+'" class="mesCon">'+
					'<ul>'+
					'<li class="supName">'+item.nickName+'</li>'+
					'<li>认购 1份 </li>'+
					'<li class="supPrice">'+supportFees+'元</li>'+
					'<div class="clear"></div>'+
					'</ul>'+
					'<div class="supMessage">'+
					'<div class="mesLeft">'+
					'<p>'+item.desc+'</p>'+
					'</div>'+
					'<div class="mesIcon"><img src="public/img/home/mesIcon.png"/></div>'+
					'<div class="clear"></div>'+
					'</div>'+
					'<div class="mesDate"><p>'+paytime+'</p></div>'+
					'</div>'+
					'<div class="clear"></div>'+
					commentListStr  +
					'</div>'
				);
			}else{
				// $(".buyTop").hide();
				// $(".supTop").show();
				supportList=$(
					'<div class="messageList" style="min-height:0.5rem;">'+
					'<div class="headIcon">'+
					'<img src="'+rightImg(imgUrl)+'"/>'+
					'</div>'+
					'<div id="mesCon'+item.id+'" class="mesCon">'+
					'<ul>'+
					'<li class="supName">'+item.nickName+'</li>'+
					'<li class="supNickNamelim">支持 <span>'+item.supportNickName+'</span></li>'+
					'<li class="supPrice">'+supportFees+'元</li>'+
					'<div class="clear"></div>'+
					'</ul>'+
					'<div class="supMessage">'+
					'<div class="mesLeft">'+
					'<p>'+item.desc+'</p>'+
					'</div>'+
					'<div class="mesIcon"><img src="public/img/home/mesIcon.png"/></div>'+
					'<div class="clear"></div>'+
					'</div>'+
					'<div class="mesDate"><p>'+paytime+'</p></div>'+
					'</div>'+
					'<div class="clear"></div>'+
					commentListStr  +
					'</div>'
				);

			}

			$('.hisSupport').append(supportList);

			var cuserId = getCookie("userId");
			$('#mesCon'+item.id).click(function(){
				 if (cuserId) {
					if(cuserId == userId || supportUserId == cuserId){
						window.location.href = "common.html?supportId="+item.id+"&nickname="+item.nickName+"&proId="+GetQueryString("id");
				 	}
				 }else{
				 	gotoLogin();
				 }
			});


		});

		$('.textRe .list[bind!=true]').each(function(){
			var $this=$(this);
			$this.attr("bind","true");
			$this.click(function(){
				var $this=$(this);
				console.log(data);
				if($this.attr("userId") == getCookie("userId")){
					var _id=  $this.attr("index");
					console.log(_id)
					if (confirm("确定要删除该评论吗?")) {
						ajaxPost('/user/comment/del',JSON.stringify({"id":_id}),function(data){
							console.log(data);
							$this.parents('.mesReturn').remove();
						})
					}
				}
			});
		});
	})
	endPage=true;
}



/**********************进度条**********************/

function circle() {
	var rotationMultiplier = 3.6;
	// For each div that its id ends with "circle", do the following.
	$( "div[id$='circle']" ).each(function() {
		// Save all of its classes in an array.
		var classList = $( this ).attr('class').split(/\s+/);
		// Iterate over the array
		for (var i = 0; i < classList.length; i++) {
		   /* If there's about a percentage class, take the actual percentage and apply the
				css transformations in all occurences of the specified percentage class,
				even for the divs without an id ending with "circle" */
		   if (classList[i].match("^p")) {
			var rotationPercentage = classList[i].substring(1, classList[i].length);
			var rotationDegrees = rotationMultiplier*rotationPercentage;
			$('.c100.p'+rotationPercentage+ ' .bar').css({
			  '-webkit-transform' : 'rotate(' + rotationDegrees + 'deg)',
			  '-moz-transform'    : 'rotate(' + rotationDegrees + 'deg)',
			  '-ms-transform'     : 'rotate(' + rotationDegrees + 'deg)',
			  '-o-transform'      : 'rotate(' + rotationDegrees + 'deg)',
			  'transform'         : 'rotate(' + rotationDegrees + 'deg)'
			});
		   }
		}
	});
}
