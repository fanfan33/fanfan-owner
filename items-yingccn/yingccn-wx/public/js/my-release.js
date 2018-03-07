window.onload = function() {
	//是否绑定
	checkPhone();
	
	if (window.sessionStorage.getItem('imgList')) {
		window.sessionStorage.removeItem('imgList');
	}
	var div2 = document.getElementById("div2");
	var div1 = document.getElementById("div1");
	div1.onclick = function() {
		div1.className = (div1.className == "close1") ? "open1" : "close1";
		div2.className = (div2.className == "close2") ? "open2" : "close2";
	}
	div3.onclick = function() {
		div3.className = (div3.className == "close3") ? "open3" : "close3";
		div4.className = (div4.className == "close4") ? "open4" : "close4";
		
		//需要支持者填写收件地址
		var _needAdr = $('#div3').attr('class');
		var needAdr = _needAdr == 'open3' ? true:false;
		if (needAdr) {
			//查询默认地址
			ajaxPost('/user/address/default', '', function(data) {
				console.log(data);
				var obj = data.data;
				if(!obj) {
					$('.defaultAdr').hide(); //没有默认地址则隐藏
					if(confirm('您还没有默认设置地址，点击确定去设置!')) {
						location.href = 'adrSet.html';
					}else{
						$('#div3').attr('class','close3');
						$('#div4').attr('class','close4');
					}
				} else {
					$('.defaultAdr').show(); //默认地址显示
					$('.realName').text(obj.realName);
					$('.phone').text(obj.phone);
					$('.defadr').text(obj.desc);
					$(".defaultAdr").attr("adrid",obj.id);
				}
			})
		}
	}
	//跳转到地址页
	$('.defaultAdr').click(function() {
		location.href = 'adrSet.html';
	})
	
	//滚动显示截止日期
	var nowDate=new Date();
	nowDate.setDate(nowDate.getDate()+3);
	var _time=nowDate.toLocaleString();
	$('.endDate').text(_time);
	
	var timeBtn=$('.sup-date .days em i');
	function changePx(box){
		return parseFloat(box)/parseFloat(basePx)+'rem';
	}
	var basePx=$('html').css('font-size');
	var offSetLeft=$('.sup-date .days em').offset().left;
	var _width=$('.sup-date .days em').css('width');
	var endLeft=(parseFloat(_width)+parseFloat(offSetLeft));
	console.log()
	var start_x, end_x, last_x, num, longTime , endDate;
	timeBtn.on('touchstart',function(e){
		e.preventDefault();
	})
	timeBtn.on('touchmove',function(e){
		
		end_x = e.originalEvent.targetTouches[0].clientX;
		var _left=changePx(end_x-offSetLeft);
		num=Math.floor(parseFloat(_left)*27/parseFloat(changePx(_width)));
		$(this).css('left',_left);
		if (end_x<offSetLeft) {
			$(this).css('left',0);
			num=0;
		} else if(end_x>=(endLeft-0.3)){
			var _endLeft=parseFloat(changePx(endLeft))-0.3-parseFloat(changePx(offSetLeft));
			$(this).css('left',_endLeft+'rem');
			num=27;
		}
		longTime = new Date().getTime() + (parseInt(num)+3)*24*60*60*1000;
		endDate = new Date(longTime);
		var addTime=endDate.toLocaleString();
		$('.endDate').text(addTime);
		$('#dateCount').text(3+num);
		
	})
	longTime=longTime?longTime:nowDate.getTime();

	$(".backway").click(function(){
		$('.fabu').hide();
		$('#backway').show();
	});
	
	var projectRequiteArr=[];
	function listReturn(){
		var reply=$('.reply');
		//回报方式
		var getReturn=JSON.parse(window.sessionStorage.getItem('returnConMy'));
		if (getReturn) {
			$('#div1').attr('class','open1');
			reply.show();
			reply.html("");
			$(getReturn).each(function(i,item){
				var con=$(
					'<figure>'+
					'<img class="returnImg" src="'+rightImg(item.imgArr[0])+'"/>'+
					'<figcaption>'+
					'<span class="rePrice">支持：<em id="rePrice">'+item.fees+'</em> 元</span>'+
					'<span class="reNum">数量：<em id="reNum">'+item.count+'</em></span>'+
					'<p>内容：<em id="reCon">'+item.desc+'</em></p>'+
					'</figcaption>'+
					'<img class="returnArrow" src="public/img/home/myArrow.png"/>'+
					'<div class="clear"></div>'+
					'</figure>'
				);
				reply.append(con);
				
				var projectRequite={
					'fees':item.fees,
					'desc':item.desc,
					'count':item.count,
					'images':item.imgArr
				}
				projectRequiteArr.push(projectRequite);
			})
			
			$('.reply figure').click(function(){
				console.log($(this).index());
				location.href='addreply.html?index='+$(this).index();
			})
		} else{
			reply.hide();
		}
	}
	
	listReturn();
	//发布
	$('.sub').click(function(){
		//发布
		var ifSupTrue=$('#div1').attr('class');
			var startSup=ifSupTrue=='open1'?true:false;
			
			var ifAdrTrue=$('#div3').attr('class');
			var adrSup=ifAdrTrue=='open3'?true:false;
			
			var projectDesc=$('.fabu .declaration').text();
			var startDate=new Date().getTime();
			var fees=$('#saveMoney').val();
			var title=$('#itemTitle').val();
			var temp=window.sessionStorage.getItem('imgList');
			var images=temp?JSON.parse(temp):[];
			
			var _getReturn=JSON.parse(window.sessionStorage.getItem('returnConMy'));
			
			if (!startSup && !_getReturn) {
				alert('请添加回报方式!');
			}else if(!fees){
				alert('请输入目标金额!');
			} else if(!title){
				alert('请输入项目标题!');
			}else if(!projectDesc){
				alert('请输入项目描述!');
			}else{
				var box={'support':startSup,'addr':adrSup,'images':images,'fees':fees,'title':title,'startDate':startDate,'endDate':longTime,'projectDesc':projectDesc,"projectRequite":projectRequiteArr};
				console.log(JSON.stringify(box)); 
				var $this=$(this);
				$this.attr('disabled',true);
				ajaxPost('/user/project/create',JSON.stringify(box),function(data){
					console.log(data);
					$this.attr('disabled',false);
					if (!data.success) {
						alert(data.msg);
					} else{
						var id=data.data.id;
						window.sessionStorage.removeItem('returnConMy');
						location.href='share.html?id='+id;
					}
				});
			}
		
	})
	
	
	//保存回报方式
	var _imgArr=[];
	$('.add-btn').click(function(){
		
		var fees=$('#supMoney').val(),
		count=$('#supNum').val(),
		desc=$('#backway .declaration').text();
		
		var returnObj={
			"fees":fees,
			"count":count,
			"desc":desc
		};
		returnObj.imgArr = _imgArr;
		var returnArr=[];
		if(window.sessionStorage.getItem('returnConMy')){
			var temp=window.sessionStorage.getItem('returnConMy');
			returnArr=JSON.parse(temp);
		}
		
		if(returnArr.length==0){
			returnArr.push(returnObj);
		}else{
			for (var i=0;i<returnArr.length;i++) {
				
			}
			if(i==returnArr.length){
				returnArr.push(returnObj);
			}
		}
		window.sessionStorage.setItem('returnConMy',JSON.stringify(returnArr));
		$('#backway').hide();
		$('.fabu').show();
		listReturn();
	})
	
	$('#file').change(function(){
		//获取点击的文本框
		var file = document.getElementById("file");
		//存放图片的父级元素
		var imgContainer = document.getElementsByClassName('z_photo')[0];
		//获取的图片文件
		var fileList = file.files;
		//文本框的父级元素
		var input = document.getElementsByClassName('z_file')[0];
		console.log(fileList);
		var imgArr = [];
		//遍历获取到得图片文件
		for(var i = 0; i < fileList.length; i++) {
			var imgUrl = window.URL.createObjectURL(file.files[i]);
			imgArr.push(imgUrl);
			var img = document.createElement("img");
			img.setAttribute("src", imgArr[i]);
			var imgAdd = document.createElement("div");
			imgAdd.appendChild(img);
			imgContainer.appendChild(imgAdd);
		};
		ajaxFilePost('/upload', new FormData($('#uploadForm')[0]), function(data) {
			console.log(data);
			var imgId = data.data.id;
			_imgArr.push(imgId);
		})
	})

}