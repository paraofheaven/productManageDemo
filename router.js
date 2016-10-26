define(function(require, exports, module) {
	var Vue = require('vue');
	var Router = require('vue-router');
	Vue.use(Router);
	var router = new Router();	

	router.map({
		'/': {
			component: function(resolve){
				seajs.use(['product-list'], resolve);
			}
		},
		'/step1': {
			component: function(resolve){
				seajs.use(['product-step1'], resolve);
			}
		},
		'/step2': {
			component: function(resolve){
				seajs.use(['product-step2'], resolve);	
			}
		},
		'/step3':{
			component:function(resolve){
				seajs.use(['product-step3'], resolve);
			}
		},
		'/step3longLine': {
			component:function(resolve){
				seajs.use(['product-step3-longLine'], resolve);
			}
		},
		'/step3#list':{
			component:function(resolve){
				seajs.use(['wanfa-list'], resolve);
			}
		},
		'/addRoute':{
			component:function(resolve){
				seajs.use(['addRoute'], resolve);
			}
		},
		'/step4':{
			component:function(resolve){
				seajs.use(['product-step4'], resolve);
			}
		},
		'/addPrice':{
			component:function(resolve){
				seajs.use(['addPrice'], resolve);
			}
		},
		'/step5':{
			component:function(resolve){
				seajs.use(['product-step5'], resolve);
			}
		},
		'*': {
			component: function(resolve){
				seajs.use(['product-list'], resolve);
			}
		}
	});

	module.exports = router;
});