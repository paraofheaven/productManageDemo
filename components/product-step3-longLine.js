define(function(require, exports, module) {
	var Vue=require('vue');
	var router=require('router');
	var Dialog = require('dialog');
	module.exports=Vue.extend({
		data:function(){
			return {
				routeManageArray:[]
			}
		},
		ready:function(){
			this.$data.routeManageArray=window.newProduct.routeManageArray
		},
		methods:{
			removeRoute:function(parentIndex,index){
				var _=this;
				_.$data.routeManageArray.map(function(v,i){
					if(i==parentIndex){
						_.$data.routeManageArray[i].wanfaArray.map(function(ve,io){
							if(io==index){
								_.$data.routeManageArray[i].wanfaArray.$remove(ve);
								window.newProduct.routeManageArray[i].wanfaArray.$remove(ve);
							}
						})
					}
				});
			},
			removeRouteManage:function(routeManage){
				this.$data.routeManageArray.$remove(routeManage);
			},
			saveNewProductInfo:function(){
				var _=this;
				if(!_.validate()) return;
				// _.$http.post({
				// 	url:'',
				// 	methods:'POST',
				// 	data:{
				// 		postData:JSON.stringify({
				// 		})
				// 	},
				// 	beforeSend: function(){
				// 		_.$parent.$data.showLoading = true
				// 	}
				// }).then(function(res){
				// 	_.$parent.$data.showLoading = false;
				// 	var _data = res.data;
				// 	if (_data && _data.success && _data.data && _data.data.success) {
				// 		Dialog({
				// 			type: 'info',
				// 			message: '保存成功~'
				// 		});
						router.go({path: 'step4'});
				// 		return;
				// 	}else{
				// 		Dialog({
				// 			type: 'info',
				// 			message: _data.msg || '请求失败，请重试'
				// 		});
				// 	}
				// })
			},
			validate:function(){
				var _data=this.$data;
				var validateFlag=true;
				var dateIndex;
				for(var i=0;i<_data.routeManageArray.length;i++){
					if(_data.routeManageArray[i].wanfaArray.length==0){
						validateFlag=false;
						dateIndex=i+1;
						break;
					}
				}
				if(!validateFlag){
					Dialog({
						type: 'info',
						colorType: 'white',
						message: '第'+dateIndex+'天请至少添加一种玩法'
					});
				}
				return validateFlag;
			}
		},
		template: '<div class="page1" style="display: block;"><header class="product-header" data-type="1"><a class="header-left" v-link="{path:&#39;/step2&#39;}"><i class="icon-title-back effect-active"></i></a><span class="header-center"><p>玩法详情</p></span></header><div class="product-wrap"><div class="card-container"><div class="mui-card mui-card-no-line card-1" v-for="routeManage in routeManageArray"><div class="mui-card-header">第{{$index+1}}天</div><div class="mui-card-content"><div class="mui-card-content-inner"><ul class="mui-table-view"><li class="mui-table-view-cell mui-table-view-cell-inline" v-for="route in routeManage.wanfaArray"><div class="mui-table-view-cell-column" name="content">{{route.title}}</div><div class="mui-table-view-cell-column" @click="removeRoute($parent.$index,$index)"><div class="mui-btn-remove-icon"></div></div></li></ul></div></div><div class="mui-card-footer"><a class="mui-btn-add" v-link="{path:&#39;/step3#list&#39;,query:{new:false,index:$index}}">添加项目</a><a class="mui-btn-remove" @click="removeRouteManage(routeManage)" v-show="$index">删除一天</a></div></div></div><div><a class="click-add" v-link="{path:&#39;/step3#list&#39;,query:{new:true}}">增加一天</a></div></div><footer><a class="footer-button footer-button-next" @click="saveNewProductInfo">保存并继续</a></footer></div>'
	})
});