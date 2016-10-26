<template>
	<div class="page1" v-if="!isAddThemeTips">
		<header class="product-header" data-type="1">
		    <a class="header-left" v-link="{path:'/step1'}">
		        <i class="icon-title-back effect-active"></i>
		    </a>
		    <span class="header-center"><p>基础信息</p></span>
		</header>
		<div class="product-wrap">
			<div class="card-container">
			    <div class="mui-card mui-card-no-line">
				    <div class="mui-card-header">请选择主题标签（最多添加3个标签）</div>
				    <div class="mui-card-content">
			    		<div class="mui-card-content-inner">
			    			<li class="mui-table-view-cell mui-table-view-cell-inline" @click="isAddThemeTips=!isAddThemeTips">
			       				<div class="mui-table-view-cell-column" style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap;font-size:15px;">{{themeList}}</div>
			       				<div class="mui-table-view-cell-column">
			        				<div class="mui-btn-arrow-right-icon"></div>
			       				</div>
			       			</li>
			    		</div>
				    </div>
			    </div>
		    	<div class="mui-card mui-card-no-line">
			    	<div class="mui-card-header">请输入玩法简介（10-500个字）</div>
		    		<div class="mui-card-content">
		     			<div class="mui-card-content-inner">
		      				<p class="prompt-title">请概括介绍项目服务内容，10-500字</p>
		      				<form class="mui-input-group">
			       				<div class="mui-form-row">
			        				<textarea rows="9" style="height:182px" maxlength="500" placeholder="途牛产品" 
			        				v-model="newProduct.introduce"></textarea>
			       				</div>
		      				</form>
		     			</div>
		    		</div>
		    	</div>
			    <div class="mui-card mui-card-no-line">
				    <div class="mui-card-header">请上传产品封面图片</div>
				    <div class="mui-card-content">
				     	<div class="mui-card-content-inner">
				      		<p class="prompt-title">设置产品封面图片，支持JPG,PNG,GIF格式图片；</p>
				      		<p class="prompt-title">图片大小不超过3MB，数量不超过3张。</p>
				      		<div class="pictureList">
				       			<div class="mui-content-padded">
				        			<p v-for="pictrue in newProduct.headerPics">
				        				<img src="{{pictrue.url}}" />
				        				<i class="icon-delete" @click="removeHeadPic(pictrue)"></i>
				        			</p>
				       			</div>
					       		<div>
						        	<a class="click-add" 
						        		@click="addHeadPic"
						        		v-show="newProduct.headerPics.length < newProduct.headerPictureMaxLength">点击添加</a>
						        	<input type="file" style="display: none;" id="upload-icon" name="Filedata" />
						    	</div>
				    		</div>
						</div>
					</div>
				</div>
				<footer>
					<a class="footer-button footer-button-next" @click="saveNewProductInfo">保存并继续</a>
				</footer>
			</div>
		</div>
	</div>
	<!-- 主题标签 -->
	<div class="page2" v-else>
		<header class="product-header" data-type="1">
		    <span class="header-left" @click="isAddThemeTips=!isAddThemeTips">
		        <i class="icon-title-back effect-active"></i>
		    </span>
		    <span class="header-center"><p>主题标签</p></span>
		    <span class="header-right">
				<a href="javascript:;" class="header-right-button" @click="addThemeTips">确认</a>
		    </span>
		</header>
		<div class="product-wrap">
			<div class="card-container">
				<div class="mui-card mui-card-no-line">
					<div class="mui-card-header">最多添加3个标签</div>
					<div class="mui-card-content">
						<div class="mui-card-content-inner">
							<ul class="mui-table-view tag">
								<div class="mui-content-padded mui-content-padded-fill">
									<span class="mui-btn mui-btn-success mui-btn-fill" v-for="productTip in newProduct.themeArray">
										<span class="mui-btn-fill-label" data-value="1">{{productTip}}</span>
										<i class="arrow-right icon-delete" @click="removeproductTip(productTip)"></i>
									</span>
								</div>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>
		<footer class="footer-tag">
			<div class="mui-card">
				<div class="mui-card-header mui-card-header-inline-height">
					<div class="mui-card-header-inline">
						<p class="mui-card-header-inline-center">选择主题标签</p>
					</div>
				</div>
				<div class="mui-card-content">
					<div class="mui-content mui-row mui-fullscreen">
						<div class="mui-col-xs-3">
							<div id="segmentedControls" class="mui-segmented-control mui-segmented-control-inverted mui-segmented-control-vertical">
								<li class="mui-control-item" 
									v-for="themeTitle in themeTitleList"
									:class="themeTitle.isActive? 'mui-active':''"
									@click="changeThemeTitle($index)">{{themeTitle.text}}</li>
							</div>
						</div>
						<div id="segmentedControlContents" class="mui-col-xs-9" style="border-left: 1px solid #c8c7cc;">
							<div class="mui-control-content"
								v-for="themeContent in themeContentList"
								:class="themeTitleList[$index].isActive ? 'mui-active':'' ">
								<ul class="mui-table-view">
									<li class="mui-table-view-cell" 
										v-for="themeTip in themeContent"
										:class="themeTip.isSelected ? 'selected' : '' "
										@click="addThemeTip($parent.$index,$index)">{{themeTip.text}}</li>
								</ul>
							</div>
						</div>
						<div style="clear: both;"></div>
					</div>
				</div>
			</div>
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
				isAddThemeTips:false,
				newProduct:window.newProduct,
				themeTitleList:window.themeTitleList,
				themeContentList:window.themeContentList
			}
		},
		computed:{
			themeList:function(){
				return this.$data.newProduct.themeArray.join(",");
			}
		},
		methods:{
			saveNewProductInfo:function(){
				var _=this;
				if(!_.validate()) return ;
		// 		_.$http.post({
    	// 			url: '',
    	// 			method: 'POST',
    	// 			data:{
    	// 				postData:JSON.stringify({
    	// 					themeArray:_.$data.newProduct.themeArray,
    	// 					introduce:_.$data.newProduct.introduce,
    	// 					headerPics:_.$data.newProduct.headerPics
    	// 				})
    	// 			},
    	// 			beforeSend: function(){
					// 	_.$parent.$data.showLoading = true
					// }
    	// 		}).then(function(res){
    	// 			_.$parent.$data.showLoading = false;

    	// 			var _data = res.data;

					// if (_data && _data.success && _data.data && _data.data.success) {
					// 	Dialog({
					// 		type: 'info',
					// 		message: '保存成功~'
					// 	});

						router.go({path: 'step3longLine'});
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
				var _=this;
				var themeLenth=_.$data.newProduct.themeArray.length;
				if(themeLenth ==0){
					Dialog({
						type: 'info',
						colorType: 'white',
						message: '请添加主题标签'
					});
					return false;
				}
				var introduceLength=_.$data.newProduct.introduce.length;
				if(introduceLength<10 || introduceLength>500){
					Dialog({
						type: 'info',
						colorType: 'white',
						message: '玩法简介不规范，请修改'
					});
					return false;
				}
				var headerPicsLength=_.$data.newProduct.headerPics.length;
				if(headerPicsLength==0){
					Dialog({
						type: 'info',
						colorType: 'white',
						message: '请添加产品封面图片'
					});
					return false;
				}
				return true;
			},
			addHeadPic:function(){
				var _ = this;
				$("#upload-icon").click();
				$("#upload-icon").fileupload({
			        url: "http://www.tuniu.com/explorer/guideService/uploadimage",
			        dataType: 'json',
			        done: function (e, data) {
			            if(data.result.success){
			            	_.$data.newProduct.headerPics.push({url:data.result.url});
			            }else{
			                Dialog({
								type: 'info',
								message: data.result.msg
							});
			            }
			        }
			    });
			},
			removeHeadPic:function(pic){
				this.$data.newProduct.headerPics.$remove(pic);
			},
			addThemeTips:function(){
				if(this.$data.newProduct.themeArray.length!=0){
					this.$data.isAddThemeTips=!this.$data.isAddThemeTips;
				}else{
					Dialog({
						type: 'info',
						message: '请至少添加一个标签'
					});
				}
			},
			removeproductTip:function(productTip){
				var _=this;
				_.$data.newProduct.themeArray.$remove(productTip);
				_.$data.themeContentList.map(function(v,i){
					_.$data.themeContentList[i].map(function(ve,io){
						if(ve.text==productTip){
							ve.isSelected=false;
						}
					})
				})
			},
			changeThemeTitle:function(index){
				var _=this;
				_.$data.themeTitleList.map(function(v,i){
					v.isActive=false;
					if(i==index){
						v.isActive=true;
					}
				})
			},
			addThemeTip:function(parentindex,index){
				var _=this;
				var themeArray=_.$data.newProduct.themeArray;
				var themeArrayMaxLenth=_.$data.newProduct.themeArrayMaxLenth;

					_.$data.themeContentList.map(function(v,i){
						if(i==parentindex){
							_.$data.themeContentList[i].map(function(ve,io){
								if(io==index){
									if(!ve.isSelected){
										if(themeArray.length > themeArrayMaxLenth-1){
											Dialog({
												type: 'info',
												message: '最多添加3个标签'
											});
										}else{
											ve.isSelected=true;
											_.$data.newProduct.themeArray.push(ve.text);
										}
									}else{
										ve.isSelected=false;
										_.$data.newProduct.themeArray.$remove(ve.text);
									}
								}
							})
						}
					})
				
				
			}
		},
		template:'__template__'
	})

</script>