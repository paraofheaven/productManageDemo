<template>
	<div class="page2" style="display: block;">
		<header class="product-header" data-type="1">
		    <span class="header-left" onclick="javascript:history.go(-1)">
		        <i class="icon-title-back effect-active"></i>
		    </span>
		    <span class="header-center"><p>选择项目</p></span>
		    <span class="header-right">
				<a href="javascript:;" v-link="{path:'addRoute'}" class="header-right-button mui-btn-add-middle"></a>
		    </span>
		</header>
		<div class="product-wrap">
			<div class="card-container">
				<div class="mui-card mui-card-no-pad">
					<div class="mui-card-content">
						<div class="mui-card-content-inner">
							<ul class="mui-table-view">
								<li class="mui-table-view-cell mui-transitioning mui-listItem"
									v-touch:swipeleft="swiperSlide"
									v-for="route in routeArray">
									<div class="mui-slider-right mui-disabled"
										@click.stop="deleteRoute(route)">
										<a class="mui-btn mui-btn-red" style="transform: translate(0px, 0px);">删除</a>
									</div>
									<div class="mui-slider-handle" style="transform: translate(0px, 0px);">
										<div class="mui-table-view-cell-inline">
											<a class="mui-table-view-cell-column" v-link="{path:'addRoute',query:{id:route.id}}">
												<div class="mui-btn-edit-icon"></div>
											</a>
											<div class="mui-table-view-cell-column" style="width: 85%;">{{route.title}}</div>
											<div class="mui-table-view-cell-column">
												<div class="_checkbox" 
													:class="route.isSelected ?'active':''"
													@click="route.isSelected =!route.isSelected"
													></div>
											</div>
										</div>
									</div>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>
		<footer>
			<a class="footer-button footer-button-next" @click="selectWanfa">完成</a>
		</footer>
	</div>
</template>
<script>
	var Vue=require('vue');
	var router=require('router');
	var Dialog=require('dialog');
	var $=require("zepto");
	var swiperMaker=window.SwiperMaker;

	module.exports=Vue.extend({
		data:function(){
			return {
				routeArray:[]
			}
		},
		ready:function(){
			var _=this;
			var isNewDay=_.$route.query.new;
			var index=_.$route.query.index;
			/*新增一天*/
			if(isNewDay=='true' || isNewDay==true){
				_.$data.routeArray=[];
				window.routeArrays[0].map(function(v,i){
					v.isSelected=false;
					_.$data.routeArray.push(v);
				})
			}else{
				_.$data.routeArray=[];
				window.routeArrays[index].map(function(v,i){
					_.$data.routeArray.push(v);
				});
				_.$data.routeArray.map(function(v,i){
					v.isSelected=false;
					for(var io=0;io<window.newProduct.routeManageArray[index].wanfaArray.length;io++){
						if(v.id==window.newProduct.routeManageArray[index].wanfaArray[io].id){
							v.isSelected=true;
							break;
						}
					}
				})
			}
		},
		methods:{
			/*vue-touch事件（依赖hammerjs）*/
			swiperSlide:function(){
				for(var i=0;i<$(".mui-listItem").length;i++){
					new swiperMaker({bind:$(".mui-listItem").eq(i), dire_h: true, backfn: function(o) {
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
			deleteRoute:function(route){
				var _ =this;
				Dialog({
				    type: 'confirm',
				    message: '确定删除',
				    okText: '确定',
				    cancelText: '取消',
				    okCallback: function () {
						_.$data.routeArray.$remove(route);
						window.routeArrays.map(function(v,i){
							v.$remove(route);
						});
						/*删除所有选中的项目，应该是服务器端做的事*/
						window.newProduct.routeManageArray.map(function(v,i){
							v.wanfaArray.map(function(ve,io){
								if(ve.id==route.id){
									v.wanfaArray.$remove(ve);
								}
							})
						});
				    }
				});
			},
			selectWanfa:function(){
				var _=this;
				var selectWanfaFlag=false;
				var isNewDay=_.$route.query.new;
				var index=parseInt(_.$route.query.index);
				_.$data.routeArray.map(function(v,i){
					if(v.isSelected){
						selectWanfaFlag=true;
					}
				});
				if(selectWanfaFlag){
					/*新增一天*/
					if(isNewDay=='true' || isNewDay==true){
						var newWanfaArray=[];
						_.$data.routeArray.map(function(v,i){
							if(v.isSelected){
								newWanfaArray.push(v);
							}
						});
						newWanfaArray={
							wanfaArray:newWanfaArray
						}
						window.routeArrays.push(_.$data.routeArray);
						window.newProduct.routeManageArray.push(newWanfaArray);
						_.$data.routeArray=[];
					}else{
						window.newProduct.routeManageArray[index].wanfaArray=[];
						_.$data.routeArray.map(function(v,i){
							if(v.isSelected){
								window.newProduct.routeManageArray[index].wanfaArray.push(v);
							}
						});
						_.$data.routeArray=[];
					}
					router.go({path:'step3longLine'});
				}else{
					Dialog({
						type: 'info',
						colorType: 'white',
						message: '请至少选择一种玩法'
					});
				}
			}
		},
		template:'__template__'
	});
</script>