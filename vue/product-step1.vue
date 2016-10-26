<template>
	<div class="page1" style="display: block;">
		<header class="product-header" data-type="1">
		    <span class="header-left" onclick="javascript:history.go(-1);">
		        <i class="icon-title-back effect-active"></i>
		    </span>
		    <span class="header-center"><p>产品名称</p></span>
		</header>
		<div class="product-wrap">
			<div class="card-container">
				<div class="mui-card mui-card-line" id="productType">
					<div class="mui-card-header">选择您的产品类型</div>
					<div class="mui-card-content">
						<div class="mui-card-content-inner">
							<div class="radio-List">
								<form class="mui-input-group" data-type="radio-list">
									<div class="mui-input-row mui-checkbox" @click="newProduct.type=1;">
										<label>长线玩法 (按人计费)</label>
										<i class="check-icon" :class="newProduct.type ==1 ? 'icon-select':'icon-no-select'" ></i>
									</div>
									<div class="mui-input-row mui-checkbox" @click="newProduct.type=2;">
										<label>特色项目 (按人计费)</label>
										<i class="check-icon" :class="newProduct.type ==2 ? 'icon-select':'icon-no-select'"></i>
									</div>
									<div class="mui-input-row mui-checkbox" @click="newProduct.type=3;">
										<label>向导服务 (按天计费)</label>
										<i class="check-icon" :class="newProduct.type ==3 ? 'icon-select':'icon-no-select'"></i>
									</div>
									<div class="mui-input-row mui-checkbox" @click="newProduct.type=4;">
										<label>机场服务 (按次计费)</label>
										<i class="check-icon" :class="newProduct.type ==4 ? 'icon-select':'icon-no-select'"></i>
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>
				<div class="mui-card mui-card-no-line">
					<div class="mui-card-header">请输入您的产品名称（不超过20个字)</div>
					<div class="mui-card-content">
						<div class="mui-card-content-inner">
							<form class="mui-input-group mui-input-border">
								<div class="mui-input-row">
									<input type="text" placeholder="请输入产品名称" v-model="newProduct.name" maxlength="20">
								</div>
							</form>
						</div>
					</div>
				</div>

			</div>
		</div>
		<footer>
			<a class="footer-button footer-button-next" @click="saveNewProductInfo">保存并继续</a>
		</footer>
	</div>
</template>
<script>
	var Vue=require('vue');
	var router = require('router');
    var Dialog = require('dialog');


    module.exports=Vue.extend({
    	data:function(){
    		return {
    			newProduct:window.newProduct
    		}
    	},
    	beforeCompile:function(){
    		this.$parent.$data.showLoading=false;
    	},
    	methods:{
    		saveNewProductInfo:function(){
    			var _=this;
    			if(!_.validate()) return;

    	// 		_.$http.post({
    	// 			url: '',
    	// 			method: 'POST',
    	// 			data:{
    	// 				postData:JSON.stringify({
    	// 					type:_.$data.newProduct.type,
    	// 					name:_.$data.newProduct.name
    	// 				})
    	// 			},
    	// 			beforeSend: function(){
					// 	_.$parent.$data.showLoading = true
					// }
    	// 		}).then(function(res){
    	// 			_.$parent.$data.showLoading = false;

    	// 			var _data = response.data;

					// if (_data && _data.success && _data.data && _data.data.success) {
					// 	Dialog({
					// 		type: 'info',
					// 		message: '保存成功~'
					// 	});

						router.go({path: 'step2'});
					// 	return;
					// }else{
					// 	Dialog({
					// 		type: 'info',
					// 		message: _data.msg || '请求失败，请重试'
					// 	});
					// }
    	// 		})

    		},
    		validate:function(){
    			var _data=this.$data;
    			if(!_data.newProduct.type){
    				Dialog({
						type: 'info',
						colorType: 'white',
						message: '请选择产品类型'
					});
					return false;
    			}
    			if(!_data.newProduct.name || _data.newProduct.name.trim().length==0){
    				Dialog({
						type: 'info',
						colorType: 'white',
						message: '产品名称不能为空'
					});
					return false;
    			}
    			return true;
    		}
    	},
    	template: '__template__'
    })
</script>