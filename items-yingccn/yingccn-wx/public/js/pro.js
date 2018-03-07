pro.css(str,'url(public/img/home/home-c.png)');
mes.css(str,'url(public/img/home/message.png)');
store.css(str,'url(public/img/home/store.png)');
my.css(str,'url(public/img/home/my.png)');
_a.css('color','#fff');
pro.css('color','#FAAB00');
$('body').css('background-color','#efefef');

$(".ActDivide img").click(function(){
	$(".ActDivide img").removeClass('getActive');
	$(this).addClass('getActive');
	
	var className = $(this).attr('class');
	$(".pMainDet").hide();
	
	if ($(this).attr('index') == "0") {
		$(".pCon").fadeIn();
	} else{
		$(".pConRight").fadeIn();
	}
})

//活动
getActivities();
function getActivities(){
	ajaxGET(
		'/activities/listUnique.json',
		'page=0',
		function(data){
			console.log(data);
			var content = data.content;
			$(content).each(function(i,item){
				var title = item.title,
					desc = item.desc,
					startDate = new Date(item.startDate).toLocaleString(),
					doneEnrollCount = item.doneEnrollCount,
					enrollCount = item.enrollCount,
					supportCount = item.supportCount,
					endDate = item.endDate,
					unique = item.unique;
					
				var bgImg = item.images[0];
				var dateNow = Date.now();
				var going = "http://image.yingccn.com/image/59f2ade3d6c9b651421ac3d3.png";
				var ending = "http://image.yingccn.com/image/59f2ae1dd6c9b651421ac3d5.png";
				var ifGoing = endDate > dateNow ? going : ending;
				
				var doneCountIfShow =  "hidden";				//成功人数隐藏
				
				var con = $(
					'<div unique='+unique+' class="proActDiv">'+
					'<img class="ifGoing" src="'+ifGoing+'" />'+
					'<p class="pTitle">'+title+'</p>'+
					'<div class="pDesc">'+
						'<p>('+desc+')</p>'+
						'<p class="pDate">'+startDate+'</p>'+
						'<div class="clear"></div>'+
					'</div>'+
					'<img class="index-proact" src="'+rightImg(bgImg)+'"/>'+
					'<div class="pDetail">'+
						'<ul>'+
							'<li>报名人数:<span>'+enrollCount+'</span></li>'+
							'<li style="visibility:'+doneCountIfShow+';" class="pProgress">成功人数:<span><em>'+doneEnrollCount+'</em></span></li>'+
							'<li class="pSupNum">支持人数:<span><em>'+supportCount+'</em></span></li>'+
							'<div class="clear"></div>'+
						'</ul>'+
					'</div><div/>'
				);
				
				if (title && (title.indexOf('长征')>-1)) {
					$(".pCon").append(con);
				}else{
					$(".pConRight").append(con);
				}
				
			})
			$(".proActDiv").click(function(){
				location.href="home.html?unique="+$(this).attr("unique");
			})
		}
	)
}


$(".actcon").attr("ifshow",false).hide();
var last_bottom = $(".sceneCon").last().next();

$(".sceneCon").click(function(){ 
	
	var sceneCon = this;
	$(".sceneCon").each(function(i,item){
		 
		var next = $(this).next();
		if(item==sceneCon){ 
			console.info(next.attr("ifshow"));
			if(next.attr("ifshow") == "true"){
				next.attr("ifshow",false);
			 	next.fadeOut();
			 	console.info("fadeOut");
			}else{ 
				next.attr("ifshow",true);
				next.fadeIn();  
				console.info("fadeIn");
			}
			
		}else{ 
			next.fadeOut();
			next.attr("ifshow",false);
		}
	});
	
	if (last_bottom.attr("ifshow") == "false") {
		$(".sceneCon").last().css("margin-bottom","1.2rem");
	} else{
		$(".sceneCon").last().css("margin-bottom","0");
		last_bottom.css("margin-bottom","2.0rem");
	}
	if ($(this).next().attr("class").indexOf("yingccn-goods") != -1) {
		var h = $(document).height() - $(window).height();
		$(document).scrollTop(h);
	}
})
if (last_bottom.attr("ifshow") == "false") {
	$(".sceneCon").last().css("margin-bottom","1.2rem");
}


var index = 0;
getPros(0,0);

$(".loadMore").click(function(){
	index++;
	getPros(index,0);
})
function getPros(indexDre,typeCount){
	ajaxGET('/project/list','page='+indexDre+'&type='+typeCount+'&activit=false',function(data){
		console.log(data);
		var resArr = data.content;
		if (data.totalPages<2) {
			$(".loadMore").hide();
		}
		if (resArr.length == 0) {
			$(".loadMore").text("暂无更多数据");
			return;
		}
		$(resArr).each(function(i,item){
			var proCon = $(
				'<figure id='+item.id+'>'+
					'<img src="'+rightImg(item.bgImg)+'"/>'+
					'<figcaption>'+
						'<h3>'+item.title+'</h3>'+
						'<p class="desc">'+item.projectDesc+'</p>'+
						'<div class="price">'+
							'<del><em>原价：'+item.price+item.unit+'</em></del>'+
							'<p>参团价：<span>'+item.discount+item.unit+'</span></p>'+
						'</div>'+
					'</figcaption>'+
					'<div class="clear"></div>'+
				'</figure>'
			);
			if (i == 1) {
				$(proCon).insertBefore($(".loadMore"));
			}
			
		})
		
		$(".proMain figure").click(function(){location.href="proDetail.html?projectId="+$(this).attr("id")});
	})
}

//项目展示
$(".content").click(function(){location.href="projectShow.html"});

