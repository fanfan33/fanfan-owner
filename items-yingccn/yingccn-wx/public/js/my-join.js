$(function() {
	var userId = getCookie('userId');
	var indexMj=0;
	myJoin(indexMj);
	$(window).scroll(function(){
		if ($(document).height()==$(window).height()+$(document).scrollTop()) {
			if ($('.loadImgCon')) {
				$('.loadImgCon').show();
			}
			indexMj++;
			setTimeout(_myJoinData(indexMj),200);
			function _myJoinData(indexMj){
				return function(){
					myJoin(indexMj);
				}
			}
		}
	})
	//我参与的列表
	function myJoin(page){
		ajaxPost('/user/support/getMyList', JSON.stringify({ 'page': page }), function(data) {
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
			$(cont).each(function(i,item){
				var _headImg =getFeild(item,['project','headImg']),
					_nickName =getFeild(item,['project','nickName']),
					_startTime =getFeild(item,['project','startDate']),
					_bgImg =getFeild(item,['project','bgImg']),
					_tit =getFeild(item,['project','title']),
					_des =getFeild(item,['project','projectDesc']),
					_fees =getFeild(item,['project','fees']),
					_supFees =getFeild(item,['supportFees']),
					company = getFeild(item,['project','activities','company']),
					_supportCount=getFeild(item,['project','supportCount']);
					var _id=getFeild(item,['project','id']);
				_des =_des?_des:'无';
				var	progressBar=(_supFees*100/_fees).toFixed(2)+"%";//滚动条所占百分比
				progressBar=parseFloat(progressBar)>100?'100%':progressBar;
	
				var	proBarWidth=(_supFees/_fees)*5.6+"rem";
				proBarWidth=parseFloat(proBarWidth)>=5.6?'5.6rem':proBarWidth;
				if ((parseFloat(progressBar))<3.5&&(parseFloat(progressBar)>0.5)) {
					proBarWidth='0.15rem';
				}
				var startTime=(new Date(_startTime).toLocaleString());
	
				var fullOn=parseInt(progressBar);
				var bgSrc='';
				if (fullOn>=100) {
					bgSrc='public/img/home/finished.png';
				}
				var mjcont= $(
					'<div class="mJ-content" index="'+_id+'">'+
					'<img class="finishImg" src="'+bgSrc+'"/>'+
					'<div class="top">'+
					'<img src="'+rightImg(_headImg)+'"/>'+
					'<div class="topName">'+_nickName+'</div>'+
					'<div class="topDate">'+startTime+'</div><div class="clear"></div></div>'+
					'<div class="conImg"><img src="'+rightImg(_bgImg)+'"/></div>'+
					'<h3>'+_tit+'('+company+')</h3>'+
					'<p>('+_des+')</p>'+
					'<div class="progressBar">'+
					'<div class="scrollShow">'+
					'<div class="scrollShowOn"  style="width: '+proBarWidth+';"></div>'+
					'</div><em>'+progressBar+'</em><div class="clear"></div>'+
					'<div class="proInfo">'+
					'<div class="proFullPrice">众筹<span>'+_fees+'</span>元</div>'+
					'<div class="proSupPrice">您支持Ta<span>'+_supFees+'</span>元</div>'+
					'<div class="proFullNum">共<span>'+_supportCount+'</span>人支持</div>'+
					'<div class="clear"></div></div></div></div>'
				);
	
				$(".mJ").append(mjcont);
				if (!$('.finishImg').attr('src')) {
					$('.finishImg[src=""]').hide();
				}
			})
			
			$('.mJ-content').click(function(){
				var id=$(this).attr('index');
				location.href='share.html?id='+id;
			})
		})
	}
	
})
