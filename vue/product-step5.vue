<template>
	<div class="page1">
		<header class="product-header" data-type="1">
		    <span class="header-left" onclick="javascript:history.go(-1);">
		        <i class="icon-title-back effect-active"></i>
		    </span>
		    <span class="header-center"><p>注意事项</p></span>
		</header>
		<div class="product-wrap">
			<div class="card-container">
				<div class="mui-card mui-card-no-line">
					<div class="mui-card-header">温馨提醒</div>
					<div class="mui-card-content">
						<div class="mui-card-content-inner">
							<p class="prompt-title">提醒旅行者旅途前后需要注意的一些事项</p>
							<form class="mui-input-group">
								<div class="mui-form-row">
									<textarea rows="9" style="height:182px" placeholder="途牛产品棒棒哒" v-model="newProduct.attention"></textarea>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
		<footer>
			<a class="footer-button footer-button-next" @click="saveNewProductInfo">完成</a>
		</footer>
	</div>
</template>
<script>
	var Vue=require('vue');
	var router=require('router');
	var Dialog = require('dialog');

	module.exports=Vue.extend({
		data:function(){
			return {
				newProduct:window.newProduct
			}
		},
		methods:{
			saveNewProductInfo:function(){
				var _=this;
				if(!_.$data.newProduct.attention){
					Dialog({
						type: 'info',
						colorType: 'white',
						message: '请填写注意事项'
					});
					return;
				}
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
		template:'__template__'
	})
</script>
