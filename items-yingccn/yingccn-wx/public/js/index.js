//路由
var routes = {
	view: '#ui-view',
	router: {
		'pro': {
			templateUrl: 'pro.html',
			controller: 'public/js/pro.js'
		},
		'store': {
			templateUrl: 'store.html',
			controller: 'public/js/store.js'
		},
		'message': {
			templateUrl: 'message.html',
			controller: 'public/js/message.js'
		},
		'my': {
			templateUrl: 'my.html',
			controller: 'public/js/my.js'
		},
		'defaults': 'pro' //默认路由
	},
	errorTemplateId:'#error'
};
vipspa.start(routes);

//底部选择
var _li=$(".index ul li");
var _a=_li.children();
var pro=$('.footProIcon')
var store=$('.footStoreIcon');
var str='background-image';
var mes=$('.footMesIcon');
var my=$('.footMyIcon');

$(".indexBtn").show();
