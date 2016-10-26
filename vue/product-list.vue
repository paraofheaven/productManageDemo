<template>
    <header class="product-header" data-type="1">
        <span class="header-left" onclick="javascript:history.go(-1);" v-show="!isDeleteAll">
            <i class="icon-title-back effect-active"></i>
        </span>
        <span class="header-center" v-show="!isDeleteAll"><p>我的玩法</p></span>
        <span class="header-center" v-show="isDeleteAll"><p>批量删除</p></span>
        <span class="header-right">
            <a href="javascript:;" v-show="!isDeleteAll" 
                @click="isDeleteAll=!isDeleteAll" 
                class="header-right-button batch-delete-product">批量删除</a>
            <a href="javascript:;" v-show="isDeleteAll" 
                @click="isDeleteAll=!isDeleteAll" 
                class="header-right-button batch-delete-product-cancel">取消</a>
        </span>
    </header>
    <div class="product-wrap" v-if="!isDeleteAll">
        <div class="product-item" v-for="product in productList"
                @click="editItemShow($index)">
            <div class="product-detail ">
                <img class="product-media-object pull-left" v-bind:src="product.url" />
                <div class="product-media-body">
                    <h3>{{product.title}}</h3>
                    <p class="tag">特色体验</p>
                    <p class="address">地区：{{product.area}}</p>
                </div>
            </div>
            <div class="item-bottom" v-show="product.isSelected">
                <ul class="buttom-button">
                    <li class="buttom-button-inline" @click="upSaling($index)">申请上架</li>
                    <li class="buttom-button-inline" @click="downSaling($index)">下架</li>
                    <li class="buttom-button-inline" @click="editProduct($index)">编辑</li>
                    <li class="buttom-button-inline buttom-no-active" @click="delectProduct(product)">删除</li>
                </ul>
            </div>
        </div>
    </div>
    <div class="product-wrap" v-else>
        <div class="product-item" v-for="product in productList">
            <div class="product-detail _checkbox" @click="setActiveItem($index)" 
                :class="{'active' : product.isActive}">
                <img class="product-media-object pull-left" v-bind:src="product.url" />
                <div class="product-media-body">
                    <h3>{{product.title}}</h3>
                    <p class="tag">特色体验</p>
                    <p class="address">地区：{{product.area}}</p>
                </div>
            </div>
        </div>
    </div>
    <div class="no-order">
        <h3>没有该状态的订单！</h3>
    </div>
    <footer>
        <a class="footer-button footer-button-add" v-show="!isDeleteAll" v-link="{path:'/step1'}">发布新产品</a>
        <a class="footer-button footer-button-delete" v-show="isDeleteAll" @click="productDelect">删除产品</a>
    </footer>
</template>
<script>
    var Vue = require('vue');
    var router = require('router');
    var Dialog = require('dialog');

    module.exports=Vue.extend({
        data:function(){
            return {
                isDeleteAll:false,
                productList:window.productList
            }
        },
        methods:{
            editItemShow:function(index){
                var _=this;
                for(var i=0;i<_.$data.productList.length;i++){
                    _.$data.productList[i].isSelected=false;
                }
                _.$data.productList[index].isSelected=true;
            },
            upSaling:function(index){

            },
            downSaling:function(index){

            },
            editProduct:function(index){

            },
            delectProduct:function(product){
                this.$data.productList.$remove(product);
            },
            setActiveItem:function(index){
                this.$data.productList.map(function(v,i){
                    if(i==index){
                        v.isActive=!v.isActive;
                    }
                })
            },
            productDelect:function(){
                var _= this;
                var newArray=[];
                this.$data.productList.map(function(v,i){
                    if(!v.isActive){
                        newArray.push(v);
                    }
                });
                this.$data.productList=newArray;
            }
        },
        beforeDestroy:function(){
            this.$parent.$data.showLoading = true
        },
        template: '__template__'
    })
</script>