var token = {
    
};
const baseUrl = 'https://wx.yingccn.com';
function ajaxGet(url,_data,callback){
    wx.request({
        url: baseUrl + url + '?' + _data,
        method: "GET",
        success: function(res) {
            callback(res);
        }
    })
}
function ajaxGET(url,_data,callback){
	if(!token.parameterName){
		ajaxGet("/access/csrfToken.json","t="+new Date().getTime(),function(data){
			token = data.data;
			ajaxGET(url,_data,callback);
		});
        return;
	}
    wx.request({
        url: baseUrl + url+ ".json?t=" + new Date().getTime() +
			"&"+ token.parameterName + "=" + token.token + "&"+_data,
        method: "GET",
        success: function(res) {
            callback(res);
        }
    })
}
module.exports = {
    ajaxGET: ajaxGET,
}

function ajaxPost(url,_data,success){
	if(!token.parameterName){
		ajaxGet("/access/csrfToken.json","t="+new Date().getTime(),function(data){
			token = data;
			ajaxPost(url,_data,success);
		});
		return;
	}
	$.ajax({
		type:"post",
		dataType: "json",
		contentType:"application/json;charset=UTF-8",
		url:
			url + ".json?t="+new Date().getTime() +
			"&"+ token.parameterName + "=" + token.token
		,
		data:_data,
		success:function(obj){
			if (obj.success == false && obj.msg == "gotoLogin") {
				gotoLogin();
			}
			success(obj);
		},
		error:function(){
			token = {};
			gotoLogin();
		}
	});
}

function ajaxDelete(url,_data,success){
	if(!token.parameterName){
		ajaxGet("/access/csrfToken.json","t="+new Date().getTime(),function(data){
			token = data;
			ajaxDelete(url,_data,success);
		});
		return;
	}
	$.ajax({
		type:"delete",
		dataType: "json",
		contentType:"application/json;charset=UTF-8",
		url:
			url + ".json?t="+new Date().getTime() +
			"&"+ token.parameterName + "=" + token.token
		,
		data:_data,
		success:success
	});
}


function ajaxFilePost(url,_data,success){
	if(!token.parameterName){
		ajaxGet("/access/csrfToken.json","t="+new Date().getTime(),function(data){
			token = data;
			ajaxFilePost(url,_data,success);
		});
		return;
	}
	$.ajax({
		type:"post",
		dataType: "json",
 		processData: false,
    	contentType: false,
		url:
			url + ".json?t="+new Date().getTime() +
			"&"+ token.parameterName + "=" + token.token
		,
		data:_data,
		success:success
	});
}