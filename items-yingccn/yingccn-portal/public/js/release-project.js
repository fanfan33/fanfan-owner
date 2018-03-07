$(function() {
	if(!getCookie('userId')){
   	alert('您好，请先登录才能发布项目!');
	location.href='login.html';
	console.log(Showbo.Msg.alert('您好，请先登录才能发布项目!'))
   	
// 	$('.alerts').show();
//	$('.alerts .alert-con').text(请登录后再发布);
   }
	/************************三个过程**************************/
	$(".infor-next").click(function() {
		
		var money =$("#saveMoney").val();
		var datecount =$("#dateCount").val();
		if(!money){
			alert("请输入众筹金额！");
		}else{
			if(!datecount){
				alert("请输入众筹天数！");
			}else{
				$(".basic-information").css("display", "none");
				$(".detail-inf").css("display", "block");
				$(".set-return").css("display", "none");
				backs();
				follow();
				/****************项目分标题滚动功能*******************/
					$(window).scroll(function() {
						var det = $(".det-video").offset().top;
							detl = $('.det-left').offset().left;
		//					console.log(detl);
							if($(window).scrollTop() > det) {
								$('.det-right').css({'margin-left':'200px'});
								$('.det-left').css({'position':'fixed','top':'20px',"left":detl});
							}else{
								$(".det-left").css({'position':'static'});
								$('.det-right').css({'margin-left':'0'});
							}
					})
			}
		}
	})
	$(".det-prev").click(function() {
		$(".basic-information").css("display", "block");
		$(".detail-inf").css("display", "none");
		$(".set-return").css("display", "none");
		backs();
	})
	$(".det-next").click(function() {
		$(".basic-information").css("display", "none");
		$(".detail-inf").css("display", "none");
		$(".set-return").css("display", "block");
		backs();
		follows();
		/****************项目分标题滚动功能*******************/
			$(window).scroll(function() {
				var det = $(".return-right").offset().top;
					detl = $('.return-left').offset().left;
					console.log(detl);
					if($(window).scrollTop() > det) {
						$('.return-right').css({'margin-left':'200px'});
						$('.return-left').css({'position':'fixed','top':'20px',"left":detl});
					}else{
						$(".return-left").css({'position':'static'});
						$('.return-right').css({'margin-left':'0'});
					}
			})
	})
	$(".return-prev").click(function() {
		$(".basic-information").css("display", "none");
		$(".detail-inf").css("display", "block");
		$(".set-return").css("display", "none");
		backs();
	})
	function backs(){
		$('html, body').animate({
			scrollTop: $(".pro-content").offset().top -50
		}, 0);
	}
	
	/***********************发布项目分标题*************************/
	function del() {
		$(".create-pro .detail-tit img").click(function() {
			var a = $(this).parent().attr("index");
			console.log(a);
			$(".det-left .tit" + a).hide();
			$(this).parent().hide();
		})
	}
	del();
	var index = 3;
		i = 2;
	$(".add-tit").click(function() {
//		$(".create-pro").append('<div class="detail-tit shadow" index="' + i + '"><img class="det-del" src="public/img/project/del.png"/>项目分标题' + index + ':  <input type="text" class="fentit" placeholder="标题长度不得超过20字"/> <br />项目详情：<div class="declaration fencontent" contenteditable="true" placeholder="请输入200字以内项目详情文字"></div></div>');
		$(".create-pro").append('<div class="detail-tit fol'+i+'" index="' + i + '"><img class="det-del" src="public/img/project/rdel.png" /> <span class="fbt">项目分标题' + index + '</span> <input type="text" class="fentit" placeholder="请输入标题" /> <br /><span class="xmxq">项目详情</span><div class="declaration fencontent" contenteditable="true" placeholder="请输入项目详情文字"></div></div>');
		$(".det-left ul").append('<li class="tit' + i + '" follow="'+i+'">项目分标题' + index + '</li>');
		index++;
		i++;
		del();
		follow();
	})
	/***********************回报方式*****************************/
	function delway() {
		$(".return-way .del-way").click(function() {
			$(this).parent().parent().parent().hide();
			var a = $(this).parent().parent().parent().attr("reindex");
			$(".return-left .ti" + a).hide();
		})
	}
	delway();
	var indexWay = 2;
		reindex = 1;
	$(".return-way .rw-add").click(function() {
		var htmlStr = '<div class="ret-way fw'+reindex+'" reindex="'+reindex+'"><dl><dd class="tr-one"><em>*</em>回报方式&nbsp;' + indexWay + ' <img class="del-way" src="public/img/project/rdel.png" alt="" /></dd><dd><span>支持金额(元)</span><input class="remoney" type="" name="" id="" value="" placeholder="12800.00" /></dd><dd><span>回报内容</span><input class="recont" type="" name="" id="" value="" /></dd><dd><span>人数上线</span><div class="renums"><div class="xzrs">限制 <input type="text" class="renum" name="" id="" value="" placeholder="0" />人</div></div></dd><dd><span>上传图片</span>'+
										'<div class="return-type tran-img">'+
											'<div class="z_photo  z_photo'+indexWay+'">'+
												'<div class="z_file  z_file'+indexWay+'">'+
													'<form id= "uploadForm'+indexWay+'"  method= "post" enctype ="multipart/form-data">'+
														'<input type="file" style="height: 100px; font-size: 0;" id="file'+indexWay+'" name="file" accept="*"  onchange="addBackImg(\'file'+indexWay+'\',\'uploadForm'+indexWay+'\');" />'+
													'</form></div></div></div></dd></dl></div>';
		$('.return-left ul').append('<li class="ti'+reindex+'" fd="'+reindex+'">回报方式'+indexWay+'</li>');										
//													console.info(htmlStr);
		$(".return-right").append($(htmlStr));
		indexWay++;
		reindex++;
		delway();
		follows();
	});
	 $('label').click(function(){
    var radioId = $(this).attr('name');
    $('label').removeAttr('class') && $(this).attr('class', 'checked');
    $('input[type="radio"]').removeAttr('checked') && $('#' + radioId).attr('checked', 'checked');
  });
  function follow(){
  	$(".det-left ul li ").click(function(){
	  		var follows =$(this).attr("follow");
	  		$('html, body').animate({
				scrollTop: $('.det-right .fol'+follows).offset().top 
			}, 0);
  	})
  }
	function follows(){
  	$(".return-left ul li ").click(function(){
	  		var follows =$(this).attr("fd");
	  		 var demo =$('.return-right .fw'+follows).offset().top;
	  		console.log(demo);
	  		$('html, body').animate({
				scrollTop: $('.return-right .fw'+follows).offset().top 
			}, 0);
  	})
  }
})

/**************************图片上传*********************************/
var imgLotArr=[];
function imgChange(obj1, obj2) {
	//获取点击的文本框
	var file = document.getElementById("sendfile");
	//存放图片的父级元素
	var imgContainer = document.getElementsByClassName(obj1)[0];
	//获取的图片文件
	var fileList = file.files;
	//文本框的父级元素
	var input = document.getElementsByClassName(obj2)[0];
	
	var imgArr = [];
	//遍历获取到得图片文件
	for(var i = 0; i < fileList.length; i++) {
		var imgUrl = window.URL.createObjectURL(file.files[i]);
		imgArr.push(imgUrl);
		var img = document.createElement("img");
		img.setAttribute("src", imgArr[i]);
		var imgAdd = document.createElement("div");
		imgAdd.setAttribute("class", "send_addImg");
		imgAdd.appendChild(img);
		imgContainer.appendChild(imgAdd);
		$('.send_file').hide();
	};
	//上传多张图片数组
	
	ajaxFilePost('/upload', new FormData($('#uploadFormSend')[0]), function(data) {
		console.log(data);
		var imgId = data.data.id;
		
		if(window.sessionStorage.getItem('imgList')){
			imgLotArr=JSON.parse(window.sessionStorage.getItem('imgList'));
		}
		if (imgLotArr.length==0) {
			imgLotArr.push(imgId);
		} else{
			for (var i=0;i<imgLotArr.length;i++) {
				
			}
			if(i==imgLotArr.length){
				imgLotArr.push(imgId);
			}
		}
		window.sessionStorage.setItem('imgList',JSON.stringify(imgLotArr));
		console.log(imgLotArr);
		imgRemove(imgId);
	})

};

function imgRemove(imgId) {
	var imgList = document.getElementsByClassName("send_addImg");
	var mask = document.getElementsByClassName("z_mask")[0];
	var cancel = document.getElementsByClassName("z_cancel")[0];
	var sure = document.getElementsByClassName("z_sure")[0];
	for(var j = 0; j < imgList.length; j++) {
		imgList[j].index = j;
		imgList[j].onclick = function() {
			console.log('11111')
			var t = this;
			mask.style.display = "block";
			cancel.onclick = function() {
				mask.style.display = "none";
			};
			sure.onclick = function() {
				mask.style.display = "none"; //蒙层消失
				//删除数组中图片id
				var _index=$(t).index()
				if(_index>-1){
					imgLotArr.splice(_index-1,1);
					window.sessionStorage.setItem('imgList',imgLotArr);
				}
				t.parentNode.removeChild(t);
				
				//删除图片请求
				ajaxDelete('/upload', JSON.stringify({
					'id': imgId
				}), function(data) {
					console.log(data);
				})
				$('.send_file').show();
				
			};
		}
	}
}
/***回报方式里的图片上传***/
var _imgArr=[];
function addBackImg(obj1,obj2){
	obj1 = obj1.trim();
	obj2 = obj2.trim();
		//获取点击的文本框
		var file = $("#"+obj1)[0]; //document.getElementById(obj1.trim());
		//存放图片的父级元素
		var formById = $('#'+obj2);
		 
		var imgContainer = formById.parent().parent()[0] ; //formById document.getElementsByClassName('z_photo')[0];
		//获取的图片文件
		var fileList = file.files;
		//文本框的父级元素
		var input = formById.parent()[0];// document.getElementsByClassName('z_file')[0];
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
		ajaxFilePost('/upload', new FormData(formById[0]), function(data) {
			console.log(data);
			var imgId = data.data.id;
			_imgArr.push(imgId);
		});
		console.info(obj1);
	}
/**********添加回报方式信息***********/
	var projectRequiteArr=[];
function addtit(){
		var con = $(".ret-way");
		var returnArr=[];
		$(con).each(function(i,item){
			var fees = $(item).find('.remoney').val();
				count = $(item).find('.renum').val();
				desc = $(item).find('.recont').val();
				var returnObj = {
					"fees":fees,
					"count":count,
					"desc":desc
				};
			projectRequiteArr.push(returnObj);
			console.log(projectRequiteArr)	;
				})
		
}
/**********添加项目详情*************/
	var projectDescList={};
	projectDescList.titleList = [];
	projectDescList.descList = [];
	function addPro(){
		var cons = $(".detail-tit");
		var returnArrs=[];
		
		
		$(cons).each(function(i,item){
			var fentit = $(item).find('.fentit').val();
				fencontent = $(item).find('.fencontent').text();
				projectDescList.titleList.push(fentit);
				projectDescList.descList.push(fencontent);
//				var returnObjs = {
//					"fentit":fentit,
//					"fencontent":fencontent,
//				};
//			projectDescList.push(returnObjs);
				})
		
	}
/***********************发布项目************************/
$('.return-btn').click(function(){
		//发布
		var startSup=$(".sponsors label[class=checked]").text();
		startSup= startSup=="是"?true:false;
//		var adrSup=$("#div2").prop("checked");
		addPro();
		addtit();
		var imageStr = JSON.parse( window.sessionStorage.getItem('imgList'));// window.sessionStorage.getItem('imgList');
//		imageStr = imageStr ? imageStr : '';
		var images= imageStr ; //imageStr.split(',');
		var title=$('#itemTitle').val();
		var projectDesc=$('#itemdesc').val();
		var fees=$('#saveMoney').val();
		var num = $("#dateCount").val();
		var longTime = new Date().getTime()  + parseInt(num)*24*60*60*1000;
		var startDate=new Date().getTime();
		var vedioUrl = $("#vedioUrl").val();
		
		var box={'support':startSup,'adrSup':'','images':images,'fees':fees,'title':title,'startDate':startDate,'endDate':longTime,'projectDesc':projectDesc,"projectRequite":projectRequiteArr,"vedioUrl":vedioUrl,"projectDescList":projectDescList};
		
		console.log(JSON.stringify(box)); 

		if (!startSup) {
			Showbo.Msg.alert('请开启友情赞助');
		} else{
			ajaxPost('/user/project/create',JSON.stringify(box),function(data){
				console.log(data);
				if (!data.success) {
//					Showbo.Msg.alert(data.msg);
					alert('恭喜您,项目发布成功');
					location.href = 'view-project.html';
				} else{
					var id=data.data.id;
					alert("请按要求填入信息");
					window.sessionStorage.removeItem('returnConMy');
				}
			});
		}
	})
//保存回报方式
