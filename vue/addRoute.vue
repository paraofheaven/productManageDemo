<template>
	<div class="page1" v-show="pageType=='main'">
		<header class="product-header" data-type="1">
		    <span class="header-left" onclick="javascript:history.go(-1);">
		        <i class="icon-title-back effect-active"></i>
		    </span>
		    <span class="header-center"><p>{{routeInfo.headTitle}}</p></span>
		</header>
		<div class="product-wrap">
			<div class="card-container">
				<div class="mui-card mui-card-no-line">
					<div class="mui-card-header">目的地</div>
					<div class="mui-card-content">
						<div class="mui-card-content-inner">
							<li class="mui-table-view-cell mui-table-view-cell-inline"
								@click="chooseContinent">
								<div class="mui-table-view-cell-column" style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">{{routeInfo.area}}</div>
								<div class="mui-table-view-cell-column">
									<div class="mui-btn-arrow-right-icon"></div>
								</div>
							</li>
						</div>
					</div>
				</div>
				<div class="mui-card mui-card-no-line">
					<div class="mui-card-header">项目名称</div>
					<div class="mui-card-content">
						<div class="mui-card-content-inner">
							<p class="prompt-title">提醒旅行者旅途前后需要注意的一些事项</p>
							<form class="mui-input-group mui-input-border">
								<div class="mui-input-row">
									<input type="text" placeholder="项目名称" v-model="routeInfo.title"></div>
							</form>
						</div>
					</div>
				</div>
				<div class="mui-card mui-card-no-line">
					<div class="mui-card-header">项目类型</div>
					<div class="mui-card-content">
						<div class="mui-card-content-inner">
							<li class="mui-table-view-cell mui-table-view-cell-inline" @click="pageType='routeType'">
								<div class="mui-table-view-cell-column">{{routeInfo.type}}</div>
								<div class="mui-table-view-cell-column">
									<div class="mui-btn-arrow-right-icon"></div>
								</div>
							</li>
						</div>
					</div>
				</div>
				<div class="mui-card mui-card-no-line">
					<div class="mui-card-header">项目详情</div>
					<div class="mui-card-content">
						<div class="mui-card-content-inner">
							<p class="prompt-title">请概括介绍项目服务内容，10-500字</p>
							<form class="mui-input-group">
								<div class="mui-form-row">
									<textarea rows="9" style="height:182px" placeholder="途牛产品棒棒哒" v-model="routeInfo.detail" maxlength="500"></textarea>
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
									<p v-for="pic in routeInfo.wanfaPics">
										<img :src="pic.url" alt="图片正在路上呢"> <i class="icon-delete" @click="deleteWanfaPic(pic)"></i>
									</p>
								</div>
								<div>
									<a class="click-add" @click="addWanfaPic" 
										v-show="routeInfo.wanfaPics.length < routeInfo.wanfaPicsMaxLenth">点击添加</a>
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
										<i data-index="1" class="check-icon " :class="routeInfo.hasCar?'icon-select' : 'icon-no-select'"></i>
									</div>
									<div class="mui-input-row mui-checkbox" @click="cancelHasCar">
										<label>没有车</label>
										<i data-index="2" class="check-icon" :class="routeInfo.hasCar?'icon-no-select' : 'icon-select'"></i>
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>
				<div class="mui-card mui-card-no-line" v-show="routeInfo.hasCar">
					<div class="mui-card-header">请填写车辆型号</div>
					<div class="mui-card-content">
						<div class="mui-card-content-inner">
							<form class="mui-input-group mui-input-border">
								<div class="mui-input-row">
									<input type="text" placeholder="请输入车型号" v-model="routeInfo.carNum"></div>
							</form>
						</div>
					</div>
				</div>
				<div class="mui-card mui-card-no-line" v-show="routeInfo.hasCar">
					<div class="mui-card-header">请上传车辆图片</div>
					<div class="mui-card-content">
						<div class="mui-card-content-inner">
							<p class="prompt-title">支持JPG,PNG,GIF格式图片，每张不超过1.5M，</p>
							<p class="prompt-title">图片不超过3张</p>
							<div class="carImages">
								<div class="mui-content-padded">
									<p v-for="cpic in routeInfo.carPics">
										<img :src="cpic.url" alt="图片正在路上呢"> <i class="icon-delete" @click="deleteCarPic(cpic)"></i>
									</p>
								</div>
								<div>
									<a class="click-add" @click="addCarPic"
										v-show="routeInfo.carPics.length < routeInfo.carPicsMaxLength">点击添加</a>
									<input type="file" style="display: none;" id="upload-icon2" name="Filedata"></div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<footer>
			<a class="footer-button footer-button-next" @click="addRoute">完成</a>
		</footer>
	</div>

	<!-- 洲国省市 -->
	<div class="page3" v-show="pageType=='continent'">
		<header class="product-header">
		    <span class="header-left" @click="pageType='main';">
		        <i class="icon-title-back effect-active"></i>
		    </span>
		    <span class="header-center"><p>请选择洲</p></span>
		</header>
		<div class="product-wrap">
			<div class="card-container">
				<div class="mui-card mui-card-list">
					<div class="mui-card-content">
						<div class="mui-card-content-inner query-result">
							<ul class="mui-table-view">
								<li class="mui-table-view-cell" 
									v-for="continent in continents"
									@click="chooseCountry(continent)">
									<a>{{continent.name}}  {{continent.english_name}}</a> 
									<i class="arrow-right icon-arrow-left"></i>
								</li>
							</ul>
						</div>
						<div class="mui-card-content-inner search-result" style="display:none"></div>
						<div class="mui-card-content-inner no-search-result" style="display:none">暂无搜索结果</div>
					</div>
				</div>


			</div>
		</div>
	</div>

	<div class="page3" v-show="pageType=='country'">
		<header class="product-header">
		    <span class="header-left" @click="pageType='continent';">
		        <i class="icon-title-back effect-active"></i>
		    </span>
		    <span class="header-center"><p>请选择国家</p></span>
		</header>
		<div class="product-wrap">
			<div class="card-container">
				<div class="mui-card mui-card-list">
					<div class="mui-card-header">
						<div class="search_main">
							<input type="text" id="search-input" class="search-input" placeholder="请选择或输入国家名称" v-model="countryName">			
							<span class="search-button icon-search4"></span>
						</div>
					</div>
					<div class="mui-card-content">
						<div class="mui-card-content-inner query-result">
							<ul class="mui-table-view">
								<li class="mui-table-view-cell" 
									v-for="country in countries | filterBy countryName in 'name' 'english_name'"
									@click="chooseProvince(country)">
									<a>{{country.name}}  {{country.english_name}}</a> 
									<i class="arrow-right icon-arrow-left"></i>
								</li>
							</ul>
						</div>
						<div class="mui-card-content-inner no-search-result" style="display:none">暂无搜索结果</div>
					</div>
				</div>


			</div>
		</div>
	</div>
		<div class="page3" v-show="pageType=='province'">
		<header class="product-header">
		    <span class="header-left" @click="pageType='country';">
		        <i class="icon-title-back effect-active"></i>
		    </span>
		    <span class="header-center"><p>请选择省</p></span>
		</header>
		<div class="product-wrap">
			<div class="card-container">
				<div class="mui-card mui-card-list">
					<div class="mui-card-header">
						<div class="search_main">
							<input type="text" id="search-input" class="search-input" placeholder="请选择或输入省名称" v-model="provinceName">			
							<span class="search-button icon-search4"></span>
						</div>
					</div>
					<div class="mui-card-content">
						<div class="mui-card-content-inner query-result">
							<ul class="mui-table-view">
								<li class="mui-table-view-cell" 
									v-for="province in provinces |filterBy provinceName in 'name' 'english_name'"
									@click="chooseCity(province)">
									<a>{{province.name}}  {{province.english_name}}</a> 
									<i class="arrow-right icon-arrow-left"></i>
								</li>
							</ul>
						</div>
						<div class="mui-card-content-inner search-result" style="display:none"></div>
						<div class="mui-card-content-inner no-search-result" style="display:none">暂无搜索结果</div>
					</div>
				</div>
			</div>
		</div>
	</div>

	<div class="page3" v-show="pageType=='city'">
		<header class="product-header">
		    <span class="header-left" @click="pageType='province';">
		        <i class="icon-title-back effect-active"></i>
		    </span>
		    <span class="header-center"><p>请选择城市</p></span>
		</header>
		<div class="product-wrap">
			<div class="card-container">
				<div class="mui-card mui-card-list">
					<div class="mui-card-header">
						<div class="search_main">
							<input type="text" id="search-input" class="search-input" placeholder="请选择或输入城市名称" v-model="cityName">			
							<span class="search-button icon-search4"></span>
						</div>
					</div>
					<div class="mui-card-content">
						<div class="mui-card-content-inner query-result">
							<ul class="mui-table-view">
								<li class="mui-table-view-cell" 
									v-for="city in citys | filterBy cityName in 'name' 'english_name'"
									@click="changeArea(city)">
									<a>{{city.name}}  {{city.english_name}}</a> 
									<i class="arrow-right icon-arrow-left"></i>
								</li>
							</ul>
						</div>
						<div class="mui-card-content-inner search-result" style="display:none"></div>
						<div class="mui-card-content-inner no-search-result" style="display:none">暂无搜索结果</div>
					</div>
				</div>


			</div>
		</div>
	</div>

	<!-- 项目类型 -->
	<div class="page3" v-show="pageType=='routeType'">
		<header class="product-header">
		    <span class="header-left" @click="pageType='main';">
		        <i class="icon-title-back effect-active"></i>
		    </span>
		    <span class="header-center"><p>请选择项目类型</p></span>
		</header>
		<div class="product-wrap">
			<div class="card-container">
				<div class="mui-card mui-card-list">
					<div class="mui-card-content">
						<div class="mui-card-content-inner query-result">
							<ul class="mui-table-view">
								<li class="mui-table-view-cell" 
									v-for="typeName in TypeNameList | filterBy routeTypeName in 'typeName'"
									@click="changeRouteType(typeName)">
									<a>{{typeName}}</a> 
									<i class="arrow-right icon-arrow-left"></i>
								</li>
							</ul>
						</div>
						<div class="mui-card-content-inner search-result" style="display:none"></div>
						<div class="mui-card-content-inner no-search-result" style="display:none">暂无搜索结果</div>
					</div>
				</div>
			</div>
		</div>
	</div>

</template>
<script>
	var Vue=require('vue');
	var router=require('router');
	var Dialog=require('dialog');

	module.exports=Vue.extend({
		data:function(){
			return {
				routeInfo:{},
				pageType:'main', /*'continent','country','province','city','routeType'*/
				continents:[],
				countries:[],
				provinces:[],
				citys:[],
				areaContext:{},
				TypeNameList:window.TypeNameList
			}
		},
		ready:function(){
			var _=this;
			var id=_.$route.query.id;
			/*编辑信息*/
			if(id || id=="0"){
				// Vue.http.get({
				// 	url:'',
				// 	data:{
				// 		id:id
				// 	},
				// 	beforeSend:function(){
				// 		_.$parent.$data.showLoading = true;
				// 	}
				// }).then(function(res){
				// 	_.$parent.$data.showLoading = false;

				// 	if(res.success && res.success==true){
				// 		window.routeInfo=res.data;
				// 	}
				// });
				_.$data.routeInfo={
					headTitle:'编辑项目',
					area:"北美洲，阿鲁巴，奥拉涅斯塔德",
					title:"测试项目1",
					type:"测试项目类型",
					detail:"测试项目详情需要10个字以上",
					wanfaPics:[
						{
							url:'http://img2.tuniucdn.com/site/m2015/js/modules/tourguide/product-manager/images/muwu.jpg'
						},
						{
							url:'http://img2.tuniucdn.com/site/m2015/js/modules/tourguide/product-manager/images/muwu.jpg'
						},
						{
							url:'http://img2.tuniucdn.com/site/m2015/js/modules/tourguide/product-manager/images/muwu.jpg'
						},

					],
					wanfaPicsMaxLenth:6,
					hasCar:true,
					carNum:'丰田',
					carPics:[
						{
							url:'http://img2.tuniucdn.com/site/m2015/js/modules/tourguide/product-manager/images/muwu.jpg'
						},
						{
							url:'http://img2.tuniucdn.com/site/m2015/js/modules/tourguide/product-manager/images/muwu.jpg'
						}
					],
					carPicsMaxLength:3,
					isSelected:false
				}
			}else{
				_.$data.routeInfo={
					headTitle:'新增项目',
					area:"",
					title:"",
					type:"",
					detail:"",
					wanfaPics:[],
					wanfaPicsMaxLenth:6,
					hasCar:false,
					carNum:'',
					carPics:[],
					carPicsMaxLength:3,
					isSelected:false
				}
			}
		},
		methods:{
			deleteWanfaPic:function(pic){
				this.$data.routeInfo.wanfaPics.$remove(pic);
			},
			deleteCarPic:function(cpic){
				this.$data.routeInfo.carPics.$remove(cpic);
			},
			addWanfaPic:function(){
				var _ = this;
				$("#upload-icon1").click();
				$("#upload-icon1").fileupload({
			        url: "http://www.tuniu.com/explorer/guideService/uploadimage",
			        dataType: 'json',
			        done: function (e, data) {
			            if(data.result.success){
			            	_.$data.routeInfo.wanfaPics.push({url:data.result.url});
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
			            	_.$data.routeInfo.carPics.push({url:data.result.url});
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
				if(_.$data.routeInfo.hasCar) return;
				_.$data.routeInfo.hasCar=!_.$data.routeInfo.hasCar;
			},
			cancelHasCar:function(){
				var _=this;
				if(!_.$data.routeInfo.hasCar) return;
				_.$data.routeInfo.hasCar=!_.$data.routeInfo.hasCar;
			},
			addRoute:function(){
				var _=this;
				if(!_.validate()) return;
		// 		_.$http.post({
    	// 			url: '',
    	// 			method: 'POST',
    	// 			data:{
    	// 				postData:JSON.stringify({
    	// 					routeInfo:_.$data.routeInfo
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
						_.$data.routeInfo.id=Math.random(),
						window.routeArrays.map(function(v,i){
							window.routeArrays[i].push(_.$data.routeInfo);
						})
						// window.routeArrays[0].push(_.$data.routeInfo);
						history.go(-1);// 添加成功跳回项目列表

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
				var _=this,_data=_.$data.routeInfo;
				if(!_data.area){
					Dialog({
						type: 'info',
						colorType: 'white',
						message: '请选择目的地'
					});
					return false;
				}
				if(!_data.title){
					Dialog({
						type: 'info',
						colorType: 'white',
						message: '请填写项目名称'
					});
					return false;
				}
				if(!_data.type){
					Dialog({
						type: 'info',
						colorType: 'white',
						message: '请选择项目类型'
					});
					return false;
				}
				if(!_data.detail || _data.detail.length<10 || _data.detail.length>500){
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
			chooseContinent:function(){
				var _ =this;
				/*清空结果集*/
				_.$data.continents=[];
				_.$http.get({
					url:'http://www.sit.tuniu.org/explorer/guideService/city',
					method:'GET'
				}).then(function(res){
					res.data.map(function(v,i){
						_.$data.continents.push(v);
					});
				});
				_.$data.pageType='continent';
			},
			chooseCountry:function(continent){
				var _=this;
				/*清空结果集*/
				_.$data.countries=[];
				_.$http.get({
					url:'http://www.sit.tuniu.org/explorer/guideService/city',
					method:'GET',
					data:{
						continent:continent.id
					}
				}).then(function(res){
					res.data.map(function(v,i){
						_.$data.countries.push(v);
					});
				});
				_.$data.areaContext.continent={
					id:continent.id,
					name:continent.name
				}
				_.$data.pageType='country';
			},
			chooseProvince:function(country){
				var _=this;
				/*清空结果集*/
				_.$data.provinces=[];
				_.$http.get({
					url:'http://www.sit.tuniu.org/explorer/guideService/city',
					method:'GET',
					data:{
						country:country.id
					}
				}).then(function(res){
					res.data.map(function(v,i){
						_.$data.provinces.push(v);
					});
				});
				_.$data.areaContext.country={
					id:country.id,
					name:country.name
				};
				_.$data.pageType='province';
			},
			chooseCity:function(province){
				var _=this;
				var _areaContext=_.$data.areaContext;
				/*清空结果集*/
				_.$data.citys=[];
				_.$http.get({
					url:'http://www.sit.tuniu.org/explorer/guideService/city',
					method:'GET',
					data:{
						province:province.id
					}
				}).then(function(res){
					_areaContext.province={
						id:province.id,
						name:province.name
					};
					if(res.data.length==0){
						_.$data.routeInfo.area=_areaContext.continent.name+","+_areaContext.country.name+","+_areaContext.province.name;
						_.$data.pageType='main';
					}else{
						res.data.map(function(v,i){
							_.$data.citys.push(v);
						});
						_.$data.pageType='city';
					}
				});
			},
			changeArea:function(city){
				var _=this;
				var _areaContext=_.$data.areaContext;
				_areaContext.city={
					id:city.id,
					name:city.name
				};
				_.$data.routeInfo.area=_areaContext.continent.name+","+_areaContext.country.name+","+_areaContext.province.name+","+_areaContext.city.name;
				_.$data.pageType='main';
			},
			changeRouteType:function(routeType){
				var _ =this;
				_.$data.routeInfo.type=routeType;
				_.$data.pageType='main';
			}
		},
		template:'__template__'
	})
</script>