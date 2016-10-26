<template>
	<div class="page1">
		<header class="product-header" data-type="1">
		    <span class="header-left" onclick="javascript:history.go(-1);">
		        <i class="icon-title-back effect-active"></i>
		    </span>
		    <span class="header-center"><p>价格信息</p></span>
		</header>
		<div class="product-wrap">
			<div class="card-container">
				<div class="mui-card mui-card-no-pad">
					<div class="mui-card-header">参考价格</div>
					<div class="mui-card-content">
						<div class="mui-card-content-inner">
							<ul class="mui-table-view">
								<li class="mui-table-view-cell mui-transitioning" style="height: auto;"
									v-touch:swipeleft="swiperSlide"
									v-for="priceInfo in newProduct.priceInfoList">
									<div class="mui-slider-right mui-disabled">
										<a class="mui-btn mui-btn-red" 
											@click="deletePriceInfo(priceInfo)"
											style="transform: translate(0px, 0px);">删除</a>
									</div>
									<div class="mui-slider-handle mui-slider-handle-no-pad" style="transform: translate(0px, 0px);">
										<div class="mui-table-view-cell-content">
											<div class="span3 pull-left">
												<span>{{priceInfo.price}}</span>
												<span class="unit">人民币/天</span>
											</div>
											<div class="span7">{{priceInfo.introduction}}</div>
										</div>
									</div>
								</li>
							</ul>
							<div style="padding-bottom: 15px;">
								<a class="click-add" v-link="{path:'addPrice'}">点击添加</a>
							</div>
						</div>
					</div>
				</div>
				<div class="mui-card mui-card-no-line">
					<div class="mui-card-header">向导提示</div>
					<div class="mui-card-content">
						<div class="mui-card-content-inner">
							<p class="prompt-title">服务包含：请详细说明产品所包含的服务内容</p>
							<p class="prompt-title">与服务时间（10-500个字）</p>
							<form class="mui-input-group">
								<div class="mui-form-row">
									<textarea rows="9" style="height:182px" placeholder="途牛产品棒棒哒"
										maxlength="500" v-model="newProduct.serviceContain"></textarea>
								</div>
							</form>
							<p class="prompt-title" style="margin-top: 20px;">服务不包含：请详细说明产品不包含的服务内容</p>
							<p class="prompt-title">与注意事项（10-500个字）</p>
							<form class="mui-input-group">
								<div class="mui-form-row">
									<textarea rows="9" style="height:182px" placeholder="途牛产品棒棒哒"
										maxlength="500" v-model="newProduct.serviceNotContain"></textarea>
								</div>
							</form>
						</div>
					</div>
				</div>
				<div class="mui-card mui-card-no-line">
					<div class="mui-card-header">退订政策</div>
					<div class="mui-card-content">
						<div class="mui-card-content-inner">
							<div class="radio-List">
								<form class="mui-input-group" data-type="radio-list">
									<div class="mui-input-row mui-checkbox">
										<label>中等退订</label> <i data-index="1" class="check-icon icon-select"></i>
									</div>
								</form>
							</div>
							<p style="margin-top: 10px;">请详细说行程开始前3天以内退订，已付订金不予退还；</p>
							<p>行程开始前3-10天退订，退还已付订金的50%；</p>
							<p>行程开始前10天以上退订，退还已付订金的100%。</p>
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
	var router=require('router');
	var Dialog = require('dialog');
	var $=require("zepto");
	var swiperMaker=window.SwiperMaker;

	module.exports=Vue.extend({
		data:function(){
			return {
				newProduct:window.newProduct
			}
		},
		methods:{
			swiperSlide:function(){
				for(var i=0;i<$(".mui-transitioning").length;i++){
					new swiperMaker({bind:$(".mui-transitioning").eq(i), dire_h: true, backfn: function(o) {
						$(".mui-slider-right .mui-btn-red").css("transform", "translate(0px, 0px)");
						$(".mui-slider-handle").css("transform", "translate(0px, 0px)");
						
						if (o.dire == "L") {
							o.bind.find(".mui-slider-right .mui-btn-red").css("transform", "translate(-100px, 0px)");
							o.bind.find(".mui-slider-handle").css("transform", "translate(-100px, 0px)");
						} else if (o.dire == "R") {
							o.bind.find(".mui-slider-right .mui-btn-red").css("transform", "translate(0px, 0px)");
							o.bind.find(".mui-slider-handle").css("transform", "translate(0px, 0px)");
						}
					}});
				}
			},
			deletePriceInfo:function(priceInfo){
				this.$data.newProduct.priceInfoList.$remove(priceInfo);
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

						router.go({path: 'step5'});
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
				var _data=this.$data.newProduct;
				if(_data.priceInfoList.length==0){
					Dialog({
						type: 'info',
						colorType: 'white',
						message: '请添加至少一个价格报价'
					});
					return false;
				}
				if(!_data.serviceContain || _data.serviceContain.length<10 ||_data.serviceContain.length>500){
					Dialog({
						type: 'info',
						colorType: 'white',
						message: '服务包含内容不符合规范'
					});
					return false;
				}
				if(!_data.serviceNotContain || _data.serviceNotContain.length<10 ||_data.serviceNotContain.length>500){
					Dialog({
						type: 'info',
						colorType: 'white',
						message: '服务不包含内容不符合规范'
					});
					return false;
				}
				return true;
			}
		},
		template:'__template__'
	})
</script>