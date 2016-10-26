seajs.use(['vue', 'vue-resource', 'vue-router', 'router','vue-touch'], function(Vue, VueResource, VueRouter, router,vueTouch){
	Vue.use(VueResource);
	Vue.use(vueTouch);
	var App = Vue.extend({
		data: function(){
			return {
				showLoading: window.showLoading,
				success: true
			}
		},
		init: function(){
			var _ = this;			
		}
	});
	router.beforeEach(function () {
	  window.scrollTo(0, 0);
	});
	router.start(App, '.wrapper');
});