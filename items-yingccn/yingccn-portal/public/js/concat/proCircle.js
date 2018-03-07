(function($){
	$.fn.ProCircle = function( options ){
		var opts = $.extend({},$.fn.ProCircle.defaults,options);	
		return $(this).each(function(){
			var _this = $(this),
				score=_this.siblings('.circleNum').val(),
				_width = _this.innerWidth(),
				_height = _this.innerHeight();
			var randomId = 'circleBox' + new Date().getTime()+ Math.floor((Math.random()*99999+1));
			var box = $('<div id="'+randomId+'"></div>');
			box.height(_height);
			box.width(_width);
			box.appendTo(_this);
			
			var paper = new Raphael(randomId,_width,_height);
			
			var anim = new Raphael.animation({
				fill: opts.active_color,
				opacity: opts.active_opacity
			});

			var count = 360/opts.spill_angle;
			var origin = {
				x: _width/2,
				y: _height/2
			}
			var group = [];
			for( var i = 0; i < count; i++ ){
				var deg = opts.start_angle + i*opts.spill_angle;
				var position = getP(origin.x-opts.kd_width/2,origin.y-opts.kd_height/2,origin.x-10,deg);
				var rect = paper.rect(position.x,position.y,opts.kd_width,opts.kd_height);
				rect.attr({
					fill: opts.default_color,
					stroke:'none',
					opacity: opts.default_opacity
				});
				var rdg = opts.start_angle + i*opts.spill_angle;
				rect.rotate(rdg);
				group.push(rect);
			}
			// var originy=opts.ismult?((origin.y+opts.kd_height/2)-10):((origin.y+opts.kd_height/2)-2);
			// var text = paper.text((origin.x+opts.kd_width/2)-2,originy,score+"%");
			// text.attr({
			// 	fill: opts.font_color,
			// 	'font-size': opts.font_size,
			// 	'font-family':'Arial'
			// });
			//动画
			var allCount = Math.floor(group.length * ((score>0&&score<4)?4:(score>100?100:score))/100);
			for(var i = 0; i < allCount ;i++){
				group[i].animate(anim.delay(i*opts.delay));
			}
		});

		function getP(x,y,r,deg){
			return{
				x: x + r * Math.cos(deg * Math.PI / 180 ),
				y: y + r * Math.sin(deg * Math.PI / 180 )
			}
		}
	}
	$.fn.ProCircle.defaults = {
		default_color: '#f0f0f0', //点亮前的颜色
		active_color: '#ef1e2d',	//点亮后的颜色
		default_opacity: 1, //点亮前的透明度
		active_opacity: 1, //点亮后的透明度
		font_color: '#ffba00', //中间文字的颜色
		kd_width: 6, //刻度的宽
		kd_height: 6, //刻度的高
		font_size: 18, //中间文字的大小
		spill_angle: 10, //间隔角度，越小越密集
		start_angle: -90,//从正上方开始
		delay: 50,//每一个点点亮的间隔时间，越短越快
		ismult: false
	}
})(jQuery);