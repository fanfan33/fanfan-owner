$(function() {
	var indexDevelop=0;
	developData(indexDevelop);
	$(window).scroll(function(){
		if ($(document).scrollTop()+$(window).height()==$(document).height()) {
			if ($('.loadImgCon')) {
				$('.loadImgCon').show();
			}
			indexDevelop++;
			setTimeout(_deData(indexDevelop),200);
			function _deData(indexDevelop){
				return function(){
					developData(indexDevelop);
				}
			}
			
		}
	})
	function developData(page){
		ajaxPost('/user/project/list', JSON.stringify({ 'page': page }), function(data) {
			$('.loadImgCon').hide();
			console.log(data);
			if(data.content.length==0){
				if ($('.loadImgCon')) {
					$('.loadImgCon').remove();
				}
				$('p.tit').show();
				return ;
			}
			var cont = data.content;
			$(cont).each(function(i, item) {
				var _bgImg ,_tit ,_des ,_fees, _getFees, _endDate ,_supCount, company;
				_getFees =item.getFees.toFixed(2);
				
				if (item.activit) {
					_bgImg =getFeild(item,['activities','bgImg']);
					_tit =getFeild(item,['activities','title']);
					_des =getFeild(item,['activities','desc']);
					_fees =getFeild(item,['activities','fees']);
					_supCount=getFeild(item,['activities','supportCount']);
					_endDate =getFeild(item,['activities','endDate']);
					company=getFeild(item,['activities','company']);
				} else{
					_bgImg =item.bgImg;
					_tit =item.title?item.title:'无';
					_des =item.projectDesc?item.projectDesc:'无';
					_fees =item.fees;
					_supCount=item.supportCount;
					_endDate =item.endDate;
					company='';
				}
				var _id=item.id;
				
				var progressBar=(_getFees*100/_fees).toFixed(2)+"%";//滚动条所占百分比
				var proBarWidth=(_getFees/_fees)*5.6+"rem";
				progressBar=parseFloat(progressBar)>100?'100%':progressBar;
				proBarWidth=parseFloat(proBarWidth)>=5.6?'5.6rem':proBarWidth;
				if (parseFloat(progressBar)<3.5&&(parseFloat(progressBar)>0.5)) {
					proBarWidth='0.15rem';
				}
					
					/***********计算剩余天数*************/
				var currentTime=new Date().getTime();
				var	iDays = parseInt((_endDate - currentTime) / 1000 / 60 / 60 / 24);
				var ifFinish,classCheck;
				if(iDays <=0){
					ifFinish='已结束';
					classCheck='finish';
					iDays = 0;
				}else{
					ifFinish='进行中';
					classCheck='going';
				}
	
				var fullOn=parseInt(progressBar);
				var bgSrc='';
				if (fullOn>=100) {
					bgSrc='public/img/home/finished.png';
				}
				var mdcont = $(
					'<div class="mD-content" index="'+_id+'">'+
					'<img class="finishImg" src="'+bgSrc+'"/>'+
					'<div class="conImg">'+
					'<img src="'+rightImg(_bgImg)+'"/>'+
					'<span class="'+classCheck+'">'+ifFinish+'</span>'+
					'<span class="remainD">剩余<em>'+iDays+'</em>天</span>'+
					'</div><h3>'+_tit+'('+company+')</h3>'+
					'<p>(' + _des + ')</p>'+
					'<div class="progressBar">'+
					'<div class="scrollShow">'+
					'<div class="scrollShowOn" style="width: '+proBarWidth+';"></div>'+
					'</div>'+
					'<em>'+progressBar+'</em><div class="clear"></div>'+
					'<div class="proInfo">'+
					'<div class="proFullPrice">众筹<span>' +_fees+ '</span>元</div>'+
					'<div class="proSupPrice">已筹<span>' + _getFees + '</span>元</div>'+
					'<div class="proFullNum">已有<span>'+_supCount+'</span>人支持</div>'+
					'<div class="clear"></div></div></div></div>'
				);
				$(".mD").append(mdcont);
//				if (!$('.finishImg').attr('src')) {
					$('.finishImg[src=""]').hide();
//				}
			})
			$('.mD-content').click(function(){
				var id=$(this).attr('index');
				location.href='share.html?id='+id;
			})
		})
	}
})