define(function(require, exports, module) {
	var Vue=require('vue');
	var router=require('router');
	var Dialog = require('dialog');
	module.exports=Vue.extend({
		data:function(){
			return {
				newPrice:{
					introduction:''
				}
			}
		},
		methods:{
			numberThePrice:function(){
				var _=this;
				if(parseInt(_.$data.newPrice.price) ==_.$data.newPrice.price){
					_.$data.newPrice.price=_.$data.newPrice.price
				}else{
					_.$data.newPrice.price=""
				}
			},
			comfirmAddPrice:function(){
				var _data=this.$data.newPrice;
				if(!(/^([1-9]\d*)$/).test(_data.price)){
					Dialog({
						type: 'info',
						colorType: 'white',
						message: '产品报价不符合规范'
					});
					return;
				}
				if(_data.introduction.trim().length==0 || _data.introduction.trim().length>20){
					Dialog({
						type: 'info',
						colorType: 'white',
						message: '价格说明不符合规范'
					});
					return;
				}
				window.newProduct.priceInfoList.push(_data);
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
						window.history.go(-1);
				// 		return;
				// 	}else{
				// 		Dialog({
				// 			type: 'info',
				// 			message: _data.msg || '请求失败，请重试'
				// 		});
				// 	}
				// })
			}
		},
		template:'<div class="page2" style="display: block;"><header class="product-header"><span class="header-left" onclick="javascript:history.go(-1);"><i class="icon-title-back effect-active"></i></span><span class="header-center"><p>产品报价</p></span><span class="header-right"><a href="javascript:;" class="header-right-button" @click="comfirmAddPrice">确认</a></span></header><div class="product-wrap"><div class="card-container"><div class="mui-card mui-card-no-line"><div class="mui-card-header">价格</div><div class="mui-card-content"><div class="mui-card-content-inner"><form class="mui-input-group mui-input-border-label" style="margin-top: 0;"><input type="text" placeholder="请输入整数" name="price" style="width: 70%;" v-model="newPrice.price" @keyup="numberThePrice | debounce"><label for="price">人民币/天</label></form></div></div></div><div class="mui-card mui-card-no-line"><div class="mui-card-header">价格说明（不超过20个字）</div><div class="mui-card-content"><div class="mui-card-content-inner"><form class="mui-input-group" style="margin-top: 0;"><div class="mui-form-row"><textarea rows="9" style="height:92px" placeholder="途牛产品棒棒哒" maxlength="20" v-model="newPrice.introduction"></textarea></div></form></div></div></div></div></div></div>'
	})
});