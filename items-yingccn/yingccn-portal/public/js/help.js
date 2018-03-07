$(function(){
		var demo=$(".con-left  ul li");
		demo.click(function(){
			demo.css("color","#000000");
			demo.css("background","#FFFFFF");
			$(this).css("color","#F8AA00");
//			$(this).css("background","#F8AA00");
			var index=$(this).attr("index");
			$(".con-right ul li").hide();
			$(".list"+index).fadeIn();
			$(".con-right .con").fadeIn();
			// $(".con-right .con-a").hide();
			$(".open").css({"border-top":"15px solid #CCCCCC","border-bottom":"0"});
		})
		$(".con-right ul li .con").each(function(i, item){
			$(item).next().addClass('defaultHeight');
			var open =  0;
			$(this).click(function(){
			if(open==0){
				$(this).find(".open").css({"border-bottom":"15px solid #CCCCCC","border-top":"0"})
				var inde =$(this).attr("inde");
				$(".demo"+inde).css('height',$(this).next().children().outerHeight()+"px");
				open =1;
			}else{
				$(this).find(".open").css({"border-top":"15px solid #CCCCCC","border-bottom":"0"})
				var inde =$(this).attr("inde");
				$(".demo"+inde).css('height',0);
				open =0;
			}
			
		})
		})
//		$(".con-right .con-back").click(function(){
//			$(".con-right .con-a").hide();
//			$(".con-right .con").show();
//		})
})