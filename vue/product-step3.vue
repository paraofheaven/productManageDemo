<template>
	<div class="page1">
		<header class="product-header" data-type="1">
		    <span class="header-left" onclick="javascript:history.go(-1);">
		        <i class="icon-title-back effect-active"></i>
		    </span>
		    <span class="header-center"><p>玩法详情</p></span>
		</header>
		<div class="product-wrap">
			<div class="card-container">
				<div class="mui-card mui-card-no-line">
					<div class="mui-card-header">请填写服务内容（10-500个字）</div>
					<div class="mui-card-content">
						<div class="mui-card-content-inner">
							<form class="mui-input-group" style="margin-top:0">
								<div class="mui-form-row">
									<textarea rows="9" style="height:182px" placeholder="途牛产品棒棒哒" v-model="newProduct.serviceDetail" maxlength="500"></textarea>
								</div>
							</form>
						</div>
					</div>
				</div>
				<div class="mui-card mui-card-no-line">
					<div class="mui-card-header">请上传玩法图片</div>
					<div class="mui-card-content">
						<div class="mui-card-content-inner">
							<p class="prompt-title">通过照片述说完整的行程，支持JPG,PNG,GIF格式图片；</p>
							<p class="prompt-title">每张不超过1.5M，图片不超过6张</p>
							<div class="pictureList">
								<div class="mui-content-padded">
									<p v-for="pic in newProduct.wanfaPics">
										<img :src="pic.url" alt="图片正在路上呢">
										<i class="icon-delete" @click="deleteWanfaPic(pic)"></i>
									</p>
								</div>
								<div>
									<a class="click-add"
										v-show="newProduct.wanfaPics.length < newProduct.wanfaPicsMaxLenth"
										@click="addWanfaPic">点击添加</a>
									<input type="file" style="display: none;" id="upload-icon1" name="Filedata"></div>
							</div>
						</div>
					</div>
				</div>
				<div class="mui-card mui-card-no-line">
					<div class="mui-card-header">车辆信息</div>
					<div class="mui-card-content">
						<div class="mui-card-content-inner">
							<div class="radio-List">
								<form class="mui-input-group" data-type="radio-list">
									<div class="mui-input-row mui-checkbox" @click="comfirmHasCar">
										<label>有车</label>
										<i data-index="1" class="check-icon " :class="newProduct.hasCar?'icon-select' : 'icon-no-select'"></i>
									</div>
									<div class="mui-input-row mui-checkbox" @click="cancelHasCar">
										<label>没有车</label>
										<i data-index="2" class="check-icon" :class="newProduct.hasCar?'icon-no-select' : 'icon-select'"></i>
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>
				<div class="mui-card mui-card-no-line" v-show="newProduct.hasCar">
					<div class="mui-card-header">请填写车辆型号</div>
					<div class="mui-card-content">
						<div class="mui-card-content-inner">
							<form class="mui-input-group mui-input-border">
								<div class="mui-input-row">
									<input type="text" placeholder="请输入车型号" v-model="newProduct.carNum"></div>
							</form>
						</div>
					</div>
				</div>
				<div class="mui-card mui-card-no-line" v-show="newProduct.hasCar">
					<div class="mui-card-header">请上传车辆图片</div>
					<div class="mui-card-content">
						<div class="mui-card-content-inner">
							<p class="prompt-title">支持JPG,PNG,GIF格式图片，每张不超过1.5M，</p>
							<p class="prompt-title">图片不超过3张</p>
							<div class="carImages">
								<div class="mui-content-padded">
									<p v-for="cpic in newProduct.carPics">
										<img :src="cpic.url" alt="图片正在路上呢">		
										<i class="icon-delete" @click="deleteCarPic(cpic)"></i>
									</p>
								</div>
								<div>
									<a class="click-add" 
										v-show="newProduct.carPics.length < newProduct.carPicsMaxLength"
										@click="addCarPic">点击添加</a>
									<input type="file" style="display: none;" id="upload-icon2" name="Filedata"></div>
							</div>
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

	module.exports=Vue.extend({
		data:function(){
			return {
				newProduct:window.newProduct
			}
		},
		methods:{
			deleteWanfaPic:function(pic){
				this.$data.newProduct.wanfaPics.$remove(pic);
			},
			deleteCarPic:function(cpic){
				this.$data.newProduct.carPics.$remove(cpic);
			},
			addWanfaPic:function(){
				var _ = this;
				$("#upload-icon1").click();
				$("#upload-icon1").fileupload({
			        url: "http://www.tuniu.com/explorer/guideService/uploadimage",
			        dataType: 'json',
			        done: function (e, data) {
			            if(data.result.success){
			            	_.$data.newProduct.wanfaPics.push({url:data.result.url});
			            }else{
			                Dialog({
								type: 'info',
								message: data.result.msg
							});
			            }
			        }
			    });
			},
			addCarPic:function(){
				var _ = this;
				$("#upload-icon2").click();
				$("#upload-icon2").fileupload({
			        url: "http://www.tuniu.com/explorer/guideService/uploadimage",
			        dataType: 'json',
			        done: function (e, data) {
			            if(data.result.success){
			            	_.$data.newProduct.carPics.push({url:data.result.url});
			            }else{
			                Dialog({
								type: 'info',
								message: data.result.msg
							});
			            }
			        }
			    });
			},
			comfirmHasCar:function(){
				var _=this;
				if(_.$data.newProduct.hasCar) return;
				_.$data.newProduct.hasCar=!_.$data.newProduct.hasCar;
			},
			cancelHasCar:function(){
				var _=this;
				if(!_.$data.newProduct.hasCar) return;
				_.$data.newProduct.hasCar=!_.$data.newProduct.hasCar;
			},
			validate:function(){
				var _data =this.$data.newProduct;
				if(!_data.serviceDetail || _data.serviceDetail.length<10 || _data.serviceDetail.length>500){
					Dialog({
						type: 'info',
						colorType: 'white',
						message: '项目详情描述不符合规范'
					});
					return false;
				}
				if(_data.wanfaPics.length==0){
					Dialog({
						type: 'info',
						colorType: 'white',
						message: '请上传玩法图片'
					});
					return false;
				}
				if(_data.hasCar){
					if(!_data.carNum){
						Dialog({
							type: 'info',
							colorType: 'white',
							message: '请填写车辆型号'
						});
						return false;
					}
					if(_data.carPics.length==0){
						Dialog({
							type: 'info',
							colorType: 'white',
							message: '请上传车辆图片'
						});
						return false;
					}
				}
				return true;
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
			}
		},
		template:'__template__'
	})
</script>