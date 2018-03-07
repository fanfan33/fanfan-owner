$('body').css('background-color','#fff');
var ifAct=true;
var ifList=false;

var _list=false;
var index=0;
var indexDre=0;
var indexPage=0;
var indexSup=0;
var indexFinish=0;
var typeCount=1;

$(".act-share").click(function(){location.href="index.html"})
//切换最新大型活动/梦想清单
var changeDiv=$(".home .divide").children();
changeDiv.click(function(){
	changeDiv.removeClass("change");
	$(this).addClass("change");		//改变样式

	var actindex=$(this).attr('actindex');

	$('.homeDiv').hide();
	if(actindex=='0'){
		ifAct=true;
		ifList=false;
		$('.bigAct').fadeIn();
	}else{
		ifAct=false;
		ifList=true;
		_list=true;
		$('.bigActRight').fadeIn();

	}
})

//新增更改
var unique = GetQueryString('unique');
if (unique == '58e4d8e6d6c9b64412e5cd89') {
	// 更改后的团队 个人 对调            //新增更改
	ifAct=false;
	ifList=true;
	$('.divide').hide();
	$('.bigActRight').fadeIn();		
}else{
	actGetData(index);			//首页获得活动接口
}
				

//最新动态、最快成长
var newChange=$(".bigActRight .listCon").children('.newChange');
newChange.click(function(){
	newChange.removeClass('change');
	$(this).addClass('change');

	$('.comList').hide();

	if($(this).attr('class').indexOf('listAct')>-1){	//最新动态
		console.log('111');
		typeCount=0;
		$('.defaultList').fadeIn();
	}else if($(this).attr('class').indexOf('listGrow')>-1){		//最快成长
		console.log('222');
		typeCount=1;
		$('.typeList').fadeIn();
	}else if($(this).attr('class').indexOf('listSup')>-1){		//最多支持
		console.log('333');
		typeCount=2;
		$('.supList').fadeIn();
	}else{										//最新筹满
		console.log('555');
		typeCount=3;
		$('.finishList').fadeIn();
	}
})

//获得轮播图
ajaxGET('/mainSlide/list','unique='+GetQueryString("unique"),function(data){
	var _height=$('#banner').css('height');
	var _width=$(document).width();
	console.log(data);
	var carousel=data.data;
	var carouselArr=[];
	$(carousel).each(function(i,item){
		var objImg={image:rightImg(item.url)};
		carouselArr.push(objImg);
	})

	var renderBanner = function(bannerList){
		var html = '<ul class="slider-list">';
		$.each(bannerList, function(index, item) {
			var color;
			if(index == 0){
				color = '470807';
			}
			html += '<li class="slider-item openParam" data-baidu-label="' 
			+ (parseInt(index) + 1) + '">'
			+ '<div class="img-wrap"><img class="banner-image" src="' 
			+ item["image"] 
			+ changeWidth(parseInt(_width)*2,parseInt(_height)*2,color) 
			+ '"/></div></li>';
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
})

// actGetData(index);			//首页获得活动接口
getDreamList(indexDre,listType(1));		//最快成长
getDreamList(indexDre,listType(2));		//最多支持
getDreamList(indexDre,listType(0));		//最新动态
getDreamList(indexDre,listType(3));		//最新筹满

$(window).scroll(function(){
	if($(document).scrollTop()+$(window).height()==$(document).height()){
		if(!ifList&&ifAct){
			index++;					//首页活动
			$('.loadScroll').fadeIn();
			setTimeout(_actGetData(index),500);
			function _actGetData(index){
				return function(){
					actGetData(index);
				}
			}
		}else if(!ifAct&&ifList){		
			
			if(typeCount==1){		//最快成长
				indexPage++;
				$('.loadScrollType').fadeIn();
				setTimeout(_getDreamList(indexPage,listType(typeCount)),500);
			}else if(typeCount==2){		//最快支持
				indexSup++;
				$('.loadScrollSup').fadeIn();
				setTimeout(_getDreamList(indexSup,listType(typeCount)),500);
			} 
			else if(typeCount==0) {		//最新动态
				indexDre++;
				$('.loadScrollDre').fadeIn();
				setTimeout(_getDreamList(indexDre,listType(typeCount)),500);
			}else if(typeCount==3){		//最新筹满
				indexFinish++;
				$('.loadScrollFinish').fadeIn();
				setTimeout(_getDreamList(indexFinish,listType(typeCount)),500);
			}
		}
	}
})
function _getDreamList(indexPage,typeCount){
	return function(){
		getDreamList(indexPage,typeCount);
	}
}
function listType(a){
	if (a==3) {
		return '&isDone=true' ;
	} else{
		return '&type='+a ;
	}
}
//梦想清单
function getDreamList(indexDre,typeCount){
	ajaxGET('/project/list','page='+indexDre+typeCount+'&unique='+GetQueryString("unique"),function(data){
		$('.loadScrollDre').hide();
		$('.loadScrollType').hide();
		$('.loadScrollSup').hide();
		$('.loadScrollFinish').hide();
		var _list=data.content;
		var typeNum=typeCount.split('=')[1];
		if(data.content.length==0){
			if (typeNum==0) {
				$('.loadScrollDre p').text('没有更多数据了！');
			} else if(typeNum==1){
				$('.loadScrollType p').text('没有更多数据了！');
			}else if(typeNum==2){
				$('.loadScrollSup p').text('没有更多数据了！');
			}else if(typeNum=="true"){
				$('.loadScrollFinish p').text('没有更多数据了！');
			}
			return;
		}
		console.log(data);
		$(_list).each(function(i,item){
			var act=item.activities;

			var proId=item.activitiesId,
				id=item.id,
				proUserId=item.userId,
				images=item.images,
				bgImg=item.bgImg,
				title=item.title,
				headImg=item.headImg,
				supportCount=item.supportCount,
				desc=item.projectDesc,
				getFees=item.getFees,
				fees=item.fees.toFixed(2),
				projectManifestos=item.projectManifestos,
				projectDesc=item.projectDesc,
				_startDate=item.createTime,
				enrollCount=item.enrollCount,		//报名
				_endDate=item.endDate,
//				remain=Math.round((_endDate-(new Date().getTime()))/86400/1000),
				nickName=item.nickName,
				_supportCount=item.supportCount,
				progressBar=(getFees*100/fees).toFixed(2)+"%",//滚动条所占百分比
				proBarWidth=(getFees/fees)*5.5+"rem",
				titleList=getFeild(act,['activitiesDesc','titleList']),
				descList=getFeild(act,['activitiesDesc','descList']),
				remainMoney=(fees-getFees).toFixed(2);
			
			remainMoney=remainMoney<0?0:remainMoney;

//			remain=remain<0?0:remain;
			var _manifesto;
			if (projectManifestos.length==0) {
				_manifesto=projectDesc;
			}else{
				_manifesto=projectManifestos[0].manifesto;
//				_manifesto=getFeild(item,['projectManifestos[0]','manifesto']);
			}

			enrollCount = enrollCount ? enrollCount : 0;
			supportCount = supportCount ? supportCount : 0;
			getFees = getFees ? getFees.toFixed(2) : 0;
			desc = desc ? desc : "无";
			if (parseFloat(proBarWidth)<0.165&&(parseFloat(proBarWidth)>0.05)) {
				proBarWidth='0.2rem';
			}
			progressBar=parseFloat(progressBar)>100?'100%':progressBar;
			proBarWidth=parseFloat(proBarWidth)>=5.5?'5.5rem':proBarWidth;
			
			var unixTimestamp = new Date(_startDate) ;
		    var startDate = unixTimestamp.toLocaleString();
//		    var endDate=(new Date(_endDate).toLocaleDateString());

		    var mainImageTag = "";
			for (var ind in images) {
				if (ind >= 4) {break;}
				var ig = images[ind];
				var _rightImg=rightImg(ig);
				mainImageTag += '<img src="'+_rightImg+'"/> ';
			}


			//最新动态
			var _homeDreamCon=$(
				'<div id='+id+' class="content dreamCon"> '+
				'<div class="contain"> '+
				'<h3> '+
				'<div style="height: 1px; border-bottom: 1px solid rgb(250, 171, 0); position: absolute; width: 6.6rem;     height: 7px;"></div>' +
				'<em class="title">'+title+'</em> '+
				'</h3> '+
				'<div class="info"> '+
				'<div class="headImg"> '+
				'<img src="'+rightImg(headImg)+'"/> '+
				'</div> '+
				'<div class="infoTop"> '+
				'<p class="title">'+nickName+'</p> '+
				'<p class="date">'+startDate+'</p> '+
				'<div class="clear"></div> '+
				'<p class="text">'+_manifesto+'</p> '+
				'</div> '+
				'<div class="clear"></div> '+
				'</div> '+
				'<div class="imgCon" style="padding-top: 0.1rem;margin-top:0.2rem"> '+
				mainImageTag +
				'<div class="clear"></div> '+
				'</div> '+
//				'<div class="infoBtn"> '+
//				'<p>支持<em class="support">'+supportCount+'</em>人</p> '+
//				'<div class="clear"></div> '+
//				'<div class="imgList"> '+
//				'<div class="clear"></div> '+
//				'</div> '+
//				'</div> '+
				'<div class="progressBar"> '+
				'<div class="scrollShow"> '+
				'<div class="scrollShowOn" style="width: '+proBarWidth+';"></div> '+
				'</div> '+
				'<em>'+progressBar+'</em> '+
				'<div class="clear"></div> '+
				'<div class="proInfo"> '+
				'<p>支持'+supportCount+'人</p> '+
				'<div class="proFullPrice">已筹满<span>'+getFees+'</span>元</div> '+
//				'<div class="proFullDate" style="display:none" >'+endDate+'</div> '+
				'<div class="clear"></div> '+
				'</div></div></div></div>'
			);
			var topNoUrl;
			var topNum;
			if ((indexDre==0)&&(typeNum!="true")) {
				switch (i){
					case 0:
						topNoUrl='public/img/home/no-1.png';
						topNum='';
						break;
					case 1:
						topNoUrl='public/img/home/no-2.png';
						topNum='';
						break;
					case 2:
						topNoUrl='public/img/home/no-3.png';
						topNum='';
						break;
					default:
						topNoUrl='public/img/home/topNum.png';
						topNum=i+1;
				}
			}else{
				topNoUrl='';
				topNum='';
			}
			
			//最快成长
			var growFast=$(
				'<div id='+id+' class="content dreamCon">'+
				'<div class="contain1"><div class="containTop">'+
				'<img class="topNo" src="'+topNoUrl+'" />'+
				'<span class="topNum">'+topNum+'</span>'+
				'<div class="headImg1"><img src="'+rightImg(headImg)+'"/></div>'+
				'<div class="infoTop1">'+
				'<p class="name1">'+nickName+'&nbsp<em>的众筹</em></p>'+
//				'<p class="date1">发起时间：'+startDate+'</p>'+
				'</div>'+ 
				'<div class="clear"></div></div> '+
				'<h3><em class="title1">'+title+'</em></h3> '+
				'<p class="text1">'+_manifesto+'</p> '+
				'<div class="infoBtn1"> '+
				'<div class="supLeft"> '+
				'<ul><li>目标金额</li><li><span>'+fees+'元</span></li></ul> '+
				'<ul><li>剩余金额</li><li><span>'+remainMoney+'元</span></li></ul> '+
				'</div> '+
				'<div class="supCen"> '+
				'<div id="orangecircle" class="c100 p'+parseInt(progressBar)+' orange"> '+
				'<span>已筹<br /><em>'+progressBar+'</em></span> '+
				'<div class="slice"><div class="bar"></div><div class="fill"></div></div> '+
				'</div></div> '+
				'<div class="supRight"> '+
				'<ul><li>发起时间</li><li><span>'+startDate+'</span></li></ul>'+
				'<ul><li>支持人数</li><li><span>'+supportCount+'人</span></li></ul>'+
				'</div>'+
				'<div class="clear"></div> '+
				'</div></div></div>'
			);
			
			if (typeNum==1) {
				$('.home .bigActRight .typeList').append(growFast);
			} else if(typeNum==0){
				$('.home .bigActRight .defaultList').append(_homeDreamCon);
			} else if(typeNum==2){
				$('.home .bigActRight .supList').append(growFast);
			} else if(typeNum=="true"){
//最近完成小于20时，隐藏
				if (data.totalElements<20) {
					$('.listFinish').hide();
					$('.newChange').css("width","33.333%");
				} else{
					$('.listFinish').fadeIn();
					$('.home .bigActRight .finishList').append(growFast);
				}
//				$('.home .bigActRight .finishList').append(growFast);
			}
			circle();
			
			$('img.topNo[src=""]').remove();
		})
		//梦想清单进入
		$('.home .bigActRight .content').on('click',function(){
			var id=$(this).attr('id');
			location.href='share.html?id='+id+'&unique='+GetQueryString('unique');
		})
	});
}
//大型活动
function actGetData(index){
	ajaxGET('/activities/list1','page='+index+'&unique='+GetQueryString("unique"),function(data){
		$('.loadScroll').hide();
		if(data.content.length==0){
			$('.loadScroll p').text('没有更多数据了！');
			return;
		}
		console.log(data);
		var con=data.content;
		var firstEndDate = con[0].endDate;
		var dateEnd = new Date(firstEndDate);
		console.log(dateEnd);
//		var iCount = setInterval(timeGo,1000);
//		timeGo();
		
		function timeGo(){
			var dateNow=new Date();
			var arr=adddate(dateNow,dateEnd);
			for (var i=0;i<arr.length;i++) {
				arr[i] = arr[i] < 10 ? '0'+arr[i]:arr[i];
			}
			
			var txt=arr[0]+"天"+arr[1]+"小时"+arr[2]+"分"+arr[3]+"秒";
			$('.timeRest b').text(txt);
			
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
		
		$(con).each(function(i,item){
			var title=item.title,
				proId=item.id,
				headImg=item.headImg,
				bgImg=item.bgImg,
				company=item.company,
				_startDate=item.startDate,
				desc=item.desc,
				images=item.images,
				projectHeadImgs=item.projectHeadImgs,
				enrollCount=item.enrollCount,		//报名人数
				supportCount=item.supportCount,
				_endDate=item.endDate,
				fees=item.fees,
				titleList=getFeild(item,['activitiesDesc','titleList']),
				descList=getFeild(item,['activitiesDesc','descList']);

				enrollCount = enrollCount ? enrollCount : 0;
				supportCount = supportCount ? supportCount : 0;
				desc = desc ? desc : "无";


//			var remainDate=Math.round((_endDate-_startDate)/86400/1000);		//剩余天数
			var unixTimestamp = new Date(_startDate);
		    var startDate = unixTimestamp.toLocaleString();
			
			var mainImageTag = "";
			for (var ind in images) {
				if (ind >= 4) {break;}
				var ig = images[ind];
				var _rightImg=rightImg(ig);
				mainImageTag += '<img src="'+_rightImg+'"/> ';
			}
			var projectHeadImgsTag = "";
			for (var ind in projectHeadImgs) {
				if (ind >= 8) {break;};
				var ig = projectHeadImgs[ind];
				var _rightImg=rightImg(ig);
				projectHeadImgsTag += '<img src="'+_rightImg+'" /> ' ;
			}
			
			
			
			//大型活动
			var _homeActCon=$('<div proId='+proId+' class="content"> ' +
				'<div class="contain"> ' +
				'<h3> ' +
				// '<span><img src="public/img/home/line.png"/></span> ' +
				'<div style="height: 1px; border-bottom: 1px solid rgb(250, 171, 0); position: absolute; width: 6.6rem;height: 7px;"></div>' +
				'<em class="title">'+title+'</em> ' +

				// '<span><img src="public/img/home/line.png"/></span> ' +
				'</h3> ' +
				'<div class="info"> ' +
				'<div class="headImg"> ' +
				'<img src="'+rightImg(headImg)+'"/> ' +
				'</div> ' +
				'<div class="infoTop"> ' +
				'<p class="title">'+company+'</p> ' +
				'<p class="date">'+startDate+'</p> ' +
				'<div class="clear"></div> ' +
				'<p class="text">('+desc+')</p> ' +
				'</div> ' +
				'<div class="clear"></div> ' +
				'</div> ' +
				'<div class="imgCon"> ' +
				mainImageTag +
				'<div class="clear"></div> ' +
				'</div> ' +
				'<div class="infoBtn"> ' +
				'<p>报名<em class="join">'+enrollCount+'</em>人</p> ' +
				'<p>支持<em class="support">'+supportCount+'</em>人</p> ' +
//				'<p class="remainP">剩余<em class="remain">'+remainDate+'</em>天</p> ' +
				'<div class="clear"></div> ' +
				'<div class="imgList"> ' +
				projectHeadImgsTag +
				'<div class="clear"></div>' +
				'</div> ' +
				'</div> ' +
				'</div> ' +
				'</div>');
			$('.bigAct').append(_homeActCon);
		})
		$('.home .bigAct .contain').on('click',function(){
			var _proId=$(this).parents('.content').attr('proId');
			location.href='act-detail.html?proId='+_proId+'&unique='+GetQueryString("unique");
		});
	})
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