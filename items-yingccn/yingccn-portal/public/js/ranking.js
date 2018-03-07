var indexDre=0;
var _list =false;
var lastestUnique = "58e4d8e6d6c9b64412e5cd89";
window.sessionStorage.setItem('unique',lastestUnique)
getDreamList(indexDre,1);		//最快成长
getDreamList(indexDre,2);		//最多支持

function getDreamList(indexDre,typeCount){
	ajaxGET('/project/list','page='+indexDre+'&type='+typeCount+'&unique='+lastestUnique,function(data){
		var _list=data.content;
		var typeNum = typeCount;
		console.log(data);
		$(_list).each(function(i,item){
			var act=item.activities;

			var proId=item.id,
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
				remain=Math.round((_endDate-(new Date().getTime()))/86400/1000),
				nickName=item.nickName,
				_supportCount=item.supportCount,
				progressBar=(getFees*100/fees).toFixed(2)+"%",//滚动条所占百分比
				proBarWidth=(getFees/fees)*5.5+"rem",
				titleList=getFeild(act,['activitiesDesc','titleList']),
				descList=getFeild(act,['activitiesDesc','descList']),
				remainMoney=(fees-getFees).toFixed(2),
				company= getFeild(item, ['activities', 'company']);
			
			remainMoney=remainMoney<0?0:remainMoney;

			remain=remain<0?0:remain;
//			var _manifesto;
//			if (projectManifestos.length==0) {
//				_manifesto=projectDesc;
//			}else{
//				_manifesto=projectManifestos[0].manifesto;
//			}

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
		    var endDate=(new Date(_endDate).toLocaleDateString());

		  
			
			//最快成长
			var growFast=$(
				'<li  proId='+proId+'><div class="ranking-inf">'+
					'<div class="ranking-name">'+
						'<div class="ranking-names">'+
							'<div class="ranking-hz ">'+ (i+1) +'</div>'+
							'<div class="ranking-user-name">'+
								'<img class="user-tou" src="'+rightImg(headImg)+'" />'+
								'<span class="rankname">'+nickName+'</span>'+
								'<span class="teamnames">'+company+'</span>'+
							'</div></div></div>'+
					'<div class="ranking-data">'+
						'<div class="ranking-shuju">'+
							'<div class="ranking-finishing">'+
								'<p>已筹</p>'+
								'<p>'+progressBar+'</p>'+
							'</div><div class="ranking-progress">'+
								'<div class="ranking-barbg">'+
									'<div class="ranking-bar" style="width: '+parseInt(progressBar)+'%;"></div>'+
								'</div></div>'+
							'<div class="ranking-surplus">'+
								'<p>剩余</p>'+
								'<p>￥'+parseInt(remainMoney)+'</p>'+
							'</div><div class="ranking-sup">'+
								'<p>支持人数</p>'+
								'<p>'+supportCount+'人</p>'+
						'</div></div></div></div></li>'
				
			);
			
			if (typeNum==1) {
				$('.ranking-cz ul ').append(growFast);
			} 
			if(typeNum==2){
				$('.ranking-zc ul').append(growFast);
			}
		})
			// for(var lis=3;lis<10;lis++){
			// 	$(".ranking-cz ul li").eq(lis).find(".ranking-hz").text(lis+1);
			// 	$(".ranking-zc ul li").eq(lis).find(".ranking-hz").text(lis+1);
			// }
		// $('.ranking ul li').on('click',function(){
		// 	var id =$(this).attr('proId');
		// 	window.open("projects.html?id="+id);
		// })
	});
}