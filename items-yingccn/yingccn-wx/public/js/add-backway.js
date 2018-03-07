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
			for (var ind=0;ind<imgLotArr.length;ind++) {
				
			}
			if(ind==imgLotArr.length){
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
			};
		}
	}
}