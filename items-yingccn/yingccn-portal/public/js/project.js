if (!GetQueryString("finishIndex")) {
	var index =location.href.split('?')[1].split('=')[1];
	var nameIndex=location.href.split('?')[1].split('=')[0];
	var cacheDate;
	if (nameIndex=="hotitem") {
		cacheDate = JSON.parse(window.sessionStorage.getItem('hot'));
		if (index=="0") {
			$('.project-left').append(currentDesc.flowers);
		}else if(index=="1"){
			$('.project-left').append(currentDesc.barbecue);
		}else if(index=="2"){
			$('.project-left').append(currentDesc.fm);
		}
	} else if(nameIndex=="sucitem"){
		cacheDate = JSON.parse(window.sessionStorage.getItem('suc'));
		if (index=="0") {
			$('.project-left').append(currentDesc.wtzy);
		}else if(index=="1"){
			$('.project-left').append(currentDesc.xizang);
		}else if(index=="2"){
			$('.project-left').append(currentDesc.school);
		}
	}
	
	console.log(cacheDate);
	$(cacheDate.list).each(function(i, item) {
		if(item.index == index) {
			var title = item.title,
				headImg = item.headImg,
				bgImg = item.bgImg,
				fees = item.fees,
				getfees=item.getFees,
				company = item.username,
				startDate = item.startDate,
				enrollCount=item.enrollCount,		//报名人数
				supportCount = item.support,
				descList = item.descList,
				selfsup=item.selfsup,
				progressBar=item.progressBar,
				progressWidth=progressBar/100*300,
				replyList=item.replyList;
			$('.proGoing em').text(progressBar+'%');
			$('.scrollShowOn').css('width',progressWidth);
			$(".pro-basic .pro-username").text(company);
			$('.probgimg').attr('src', bgImg);
			$('.proheadimg').attr('src',headImg);
			$('.title').text(title);
			$('.remainMon').text('￥' + (fees-getfees));
			$('.startime span').text(startDate);
			$('.order-money').text('￥' + fees);
			$('.sup-people em').text(supportCount +'人');
			$('.right-content').text(selfsup);
			
			$(replyList).each(function(ind,value){
				var replyListCon=$(
					'<span class="right-m">￥'+value.money+'</span><span>'+value.limit+'</span>'+
					'<i>'+value.alreadysup+'人</i>'+
					
					'<span class="right-content">'+value.descBtn+'</span>'+
					'<i>预计回报时间:'+value.endDate+'</i>'+
					'<div class="hrs"></div>'+
					'<i class="hri">项目众筹成功30天后</i>'+
					'<div class="immediately-btn">立即支持</div>'
					
				)
				$('.reListCon').append(replyListCon);
				
			})
			
		}
	})
} else {
	var contain=JSON.parse(window.sessionStorage.getItem("finishdata"));
	var finishindex=GetQueryString("finishIndex");
	$(contain.list).each(function(i,item){
		if (item.index == finishindex) {
			var title = item.title,
				headImg = item.headImg,
				bgImg = item.bgImg,
				fees = item.fees,
				getfees=item.getFees,
				company = item.username,
				startDate = item.startDate,
				enrollCount=item.enrollCount,		//报名人数
				supportCount = item.support,
				descList = item.descList,
				selfsup=item.selfsup,
				replyList=item.replyList;
			
			$(".pro-basic .pro-username").text(company);
			$('.probgimg').attr('src', bgImg);
			$('.proheadimg').attr('src',headImg);
			$('.title').text(title);
			$('.remainMon').text('￥' + (fees-getfees));
			$('.startime span').text(startDate);
			$('.order-money').text('￥' + fees);
			$('.sup-people em').text(supportCount +'人');
			$('.right-content').text(selfsup);
			
			$(replyList).each(function(ind,value){
				var replyListCon=$(
					'<span class="right-m">￥'+value.money+'</span><span>'+value.limit+'</span>'+
					'<i>'+value.alreadysup+'人</i>'+
					
					'<span class="right-content">'+value.descBtn+'</span>'+
					'<i>预计回报时间:'+value.endDate+'</i>'+
					'<div class="hrs"></div>'+
					'<i class="hri">项目众筹成功30天后</i>'+
					'<div class="immediately-btn">立即支持</div>'
					
				)
				$('.reListCon').append(replyListCon);
			})
			if (finishindex=="0") {
				$('.project-left').append(currentDesc.flowers);
			}else if (finishindex=="1") {
				$('.project-left').append(currentDesc.fm);
			}else if(finishindex=="2"){
				$('.project-left').append(currentDesc.xizang);
			}else if(finishindex=="3"){
				$('.project-left').append(currentDesc.wtzy);
			}else if(finishindex=="4"){
				$('.project-left').append(currentDesc.barbecue);
			}else if(finishindex=="5"){
				$('.project-left').append(currentDesc.school);
			}
		}
	})
}
var project = $(".project-right").offset().top;
				
			$(window).scroll(function() {
				if($(window).scrollTop() > project) {
	//						console.log('aa');
					$(".project-right").css({'position':'fixed','top':'0'});
					var scrollBottom = $(".project-right").height() +$(".project-right").offset().top;;
					var foot = $(".project-left").height() +$(".project-left").offset().top;
	//						console.log(foot);
	//						console.log(scrollBottom);
					if(scrollBottom >= foot ){
	//							console.log('s');
						$(".project-left").css({'vertical-align':'bottom'});
						$(".project-right").css({'position':'static','vertical-align':'bottom'});
					}
				}else{
					$(".project-left").css({'vertical-align':'top'});
					$(".project-right").css({'position':'static','vertical-align':'top'});
				}
			})



