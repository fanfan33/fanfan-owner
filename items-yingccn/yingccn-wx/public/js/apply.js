window.onload = function() {
	
//	是否绑定
	checkPhone();
	
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
						setCookie('prevAdr',location.href);
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
		setCookie('prevAdr',location.href);
		location.href = 'adrSet.html';
	})


	/***********验证码倒计时***********/
	$(".code-num").click(function(djs){
		djs.disabled = true;
		var time = 60;
		var timer = null;
			$(".code-num").text(time + "s后重新获取");
		timer = setInterval(function() {
				time--;
			$(".code-num").text(time + "s后重新获取");
			if(time == 0) {
				djs.disabled = false;
				$(".code-num").text("重获验证码");
				clearInterval(timer);
			}
		}, 1000)
	})
	var activitiesId=location.href.split('?')[1].split('=')[1];
	//查看是否有回报方式

	ajaxPost('/user/slogan/random',JSON.stringify({unique:getCookie('unique')}),function(data){
		$('.fabu .declaration').text(data.data.desc);
	});

	$('.ap-top').text(getCookie('title'));

	$(".backway").click(function(){
		$('.fabu').hide();
		$('#backway').show();
	});

	var projectRequiteArr=[];
	function replyList(){

		var reply=$('.reply');
		//回报方式
		var getReturn=JSON.parse(window.sessionStorage.getItem('returnCon'));
		if (getReturn) {
			reply.show();
			reply.html();
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
				location.href='add-backway.html?index='+$(this).index();
			})
		} else{
			reply.hide();
		}
	}
	replyList();

	//发布
	$('.sub').click(function(){
		//发布
		var ifSupTrue=$('#div1').attr('class');
		var startSup=ifSupTrue=='open1'?true:false;

		var ifAdrTrue=$('#div3').attr('class');
		var adrSup=ifAdrTrue=='open3'?true:false;

		var manifesto=$('.fabu .declaration').text();
		var projectManifestos={'manifesto':manifesto};


		var box={'support':startSup,'addr':adrSup,'activitiesId': activitiesId ,'projectManifestos':[projectManifestos],"projectRequite":projectRequiteArr};
		
		console.log(JSON.stringify(box));

		var _getReturn=JSON.parse(window.sessionStorage.getItem('returnCon'));
		if (!startSup && !_getReturn) {
			alert('请添加回报方式!');
		} 
		else{
			var $this=$(this);
			$this.attr('disabled',true);
			ajaxPost('/user/project/create',JSON.stringify(box),function(data){
				$this.attr('disabled',false);
				console.log(data);
				if (!data.success) {
					alert(data.msg);
				} else{
					var id=data.data.id;
					window.sessionStorage.removeItem('returnCon');
					location.href='share.html?id='+id+'&unique='+getCookie('unique');
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
		if (!fees) {
			alert('请输入支持金额！');
		}else if(!count){
			alert('请输入限制数量！');
		}else if (!desc) {
			alert('请输入回报方式内容！')
		}else{
			var returnObj={
				"fees":fees,
				"count":count,
				"desc":desc
			};
			returnObj.imgArr = _imgArr;
			var returnArr=[];
			if(window.sessionStorage.getItem('returnCon')){
				var temp=window.sessionStorage.getItem('returnCon');
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
			window.sessionStorage.setItem('returnCon',JSON.stringify(returnArr));
			$('#backway').hide();
			$('.fabu').show();
			replyList();
		}
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
			imgAdd.setAttribute("class", "z_addImg");
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
