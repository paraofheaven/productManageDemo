window.fileupload = window.$.fn.fileupload;
window.$ = $;
var Host = 'file:///D:/tuniu_workspace/test/m2015/js/';
// var Host = 'http://img2.tuniucdn.com/mj/201610120001/';
seajs.config({
        base: 'http://img2.tuniucdn.com/mj/201610120001/',
        alias: {
                "vue": "lib/vue/1.0/vue.min.js",
                "jquery": "lib/jquery/1.11.0/jquery.min.js",
                "vue-resource": "lib/vue/vue-resource.min.js",
                "hammer": "plugins/hammer/hammer.min.js",
                "vue-router": "lib/vue-router/0.7.13/vue-router.min.js",
                "vue-touch": "modules/tourguide/product-manager/plugins/vue-touch.js",
                "zepto": "lib/zepto/1.1.6/zepto.min.js",
                "dialog": "plugins/dialog/dialog.min.js",
                "Storage": "plugins/storage/Storage.min.js",
                "TN_cache": "plugins/storage/TN_cache.min.js",
                "verify-set": "plugins/verify/verify-set.min.js",
                "router": Host + "modules/tourguide/product-manager/router.js",
                "util": "modules/tours/addInvoice/util.js",
                "product-list": Host + "modules/tourguide/product-manager/components/product-list.js",
                "product-step1": Host + "modules/tourguide/product-manager/components/product-step1.js",
                "product-step2": Host + "modules/tourguide/product-manager/components/product-step2.js",
                "product-step3": Host + "modules/tourguide/product-manager/components/product-step3.js",
                "product-step3-longLine": Host + "modules/tourguide/product-manager/components/product-step3-longLine.js",
                "wanfa-list": Host + "modules/tourguide/product-manager/components/wanfa-list.js",
                "addRoute": Host + "modules/tourguide/product-manager/components/addRoute.js",
                "product-step4": Host + "modules/tourguide/product-manager/components/product-step4.js",
                "addPrice": Host + "modules/tourguide/product-manager/components/addPrice.js",
                "product-step5": Host + "modules/tourguide/product-manager/components/product-step5.js",
                "areaPlugin": Host +"modules/tourguide/product-manager/plugins/areaPlugin.js"
        }
})