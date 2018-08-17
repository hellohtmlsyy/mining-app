// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import Vue from 'vue'
import App from './App'
import router from './router'
import "jquery";
import axios from 'axios'
require('es6-promise').polyfill();
import Moment from 'moment';
import api from './assets/config/api.js'
//import store from './store/store.js';
import rootPath from './assets/config/api.js' // 接口路径
import VueClipboard from 'vue-clipboard2'
import {appLogin} from '@/assets/commonjs/util.js';
Vue.use(VueClipboard)
Vue.prototype.$http = axios
const FastClick = require('fastclick')
FastClick.attach(document.body);

import {
    Confirm,
    AlertPlugin,
    LoadingPlugin,
    cookie,
    XImg,
    Flexbox,
    FlexboxItem,
    Grid,
    GridItem,
    Alert,
    XDialog,
    Toast,
    XInput,
    Group,
    Selector,
    Checker,
    CheckerItem,
    Divider, 
    ToastPlugin, 
    ConfirmPlugin,
    Actionsheet,
    LoadMore,
    Icon,
    CellBox,
} from 'vux'

Vue.use(AlertPlugin) // vux alert组件

// 全局组件
Vue.component('confirm', Confirm)
Vue.component('x-img', XImg);
Vue.component('flexbox', Flexbox);
Vue.component('flexbox-item', FlexboxItem);
Vue.component('grid', Grid);
Vue.component('grid-item', GridItem);
Vue.component('alert', Alert);
Vue.component('x-dialog', XDialog)
Vue.component('toast', Toast)
Vue.component('toast', Toast)
Vue.component('x-input', XInput)
Vue.component('group', Group)
Vue.component('selector', Selector)
Vue.component('checker', Checker)
Vue.component('checker-item', CheckerItem)
Vue.component('divider', Divider)
Vue.component('actionsheet', Actionsheet)
Vue.component('load-more', LoadMore)
Vue.component('icon', Icon)
Vue.component('cell-box', CellBox)
Vue.use(ToastPlugin); 
Vue.use(ConfirmPlugin);
Vue.use(LoadingPlugin)
Vue.filter('convertTime', function(timeStr) {
    return Moment(timeStr).format('YYYY-MM-DD');
});
Vue.filter('subStr', function(titleStr, num) {
        if (titleStr.length <= num) return titleStr;
        else
            return titleStr.substr(0, num) + '...';
    })
    //金额转换为用逗号隔开2位小数
Vue.filter('converAmount', function(s, n) {
    n = n > 0 && n <= 20 ? n : 2;
    s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";
    var l = s.split(".")[0].split("").reverse(),
        r = s.split(".")[1];
    var t = "";
    for (var i = 0; i < l.length; i++) {
        t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");
    }
    return '￥' + t.split("").reverse().join("") + "." + r;
})

//Vue.filter('converAmount', function (value) {
//	 value = value.toFixed(2);
//  value = value.toLocaleString();
//  return value;//返回的是字符串23,245.12保留2位小数
//})

Vue.config.productionTip = false
    // 处理axios
import Axios from 'axios';
Vue.prototype.API = '/api'
Object.defineProperty(Vue.prototype, '$axios', {
    get() {
        return Axios;
    }
});
Axios.defaults.withCredentials = true; //让ajax携带cookie

router.beforeEach((to, from, next) => {
    if (to.meta.requireAuth) {  // 判断该路由是否需要登录权限
        if (cookie.get('MC_UID')) {  // 通过vuex state获取当前的token是否存在
            next();
        }
        else {
        	appLogin()
            next({
//              path: 'http://member.miningcircle.com/login',
                query: {redirect: to.fullPath}  // 将跳转的路由path作为参数，登录成功后跳转到该路由
            })
        }
    }
    else {
        next();
    }
})

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
//  store,
    components: { App },
    data: {
   	 urlPath: rootPath.pathUrl() // 通过api.js 控制 开发 和线上环境
  	},
    //font-awesome,
    template: '<App/>'
});;