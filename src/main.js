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
import {
	appLogin
} from '@/assets/commonjs/util.js';
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
	Badge,
	XHeader,
	Tab,
	TabItem,
	Swipeout,
	SwipeoutItem,
	SwipeoutButton
} from 'vux'
Vue.use(AlertPlugin) // vux alert组件

import comHeader from '@/components/base/comHeader'
Vue.component('com-header', comHeader)

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
Vue.component('badge', Badge)
Vue.component('x-header', XHeader)
Vue.component('tab', Tab)
Vue.component('tab-item', TabItem)
Vue.use(ToastPlugin);
Vue.use(ConfirmPlugin);
Vue.use(LoadingPlugin)
Vue.component('swipeout', Swipeout)
Vue.component('swipeout-item', SwipeoutItem)
Vue.component('swipeout-button', SwipeoutButton)

Vue.filter('fomatDate', function(timeStamp, fmt) {
	let date = new Date(timeStamp)
	if (/(y+)/.test(fmt)) {
		fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
	}

	let o = {
		"M+": date.getMonth() + 1,
		"d+": date.getDate(),
		"h+": date.getHours(),
		"m+": date.getMinutes(),
		"s+": date.getSeconds()
	}

	for (let k in o) {
		if (new RegExp(`(${k})`).test(fmt)) {
			let str = o[k] + ''
			fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : ('00' + str).substr(str.length))
		}
	}

	return fmt;
});

//保留几位小数
Vue.filter('smallN', function(num, bit) {
	if (num) return num.toFixed(bit)

})
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
	if (to.meta.requireAuth) { // 判断该路由是否需要登录权限
		if (cookie.get('MC_UID')) { // 通过vuex state获取当前的token是否存在
			next();
		} else {
			appLogin()
			next({
				//              path: 'http://member.miningcircle.com/login',
				query: {
					redirect: to.fullPath
				} // 将跳转的路由path作为参数，登录成功后跳转到该路由
			})
		}
	} else {
		next();
	}
})

router.beforeEach((to, from, next) => {
	/* 路由发生变化修改页面meta */
	if (to.meta.content) {
		let head = document.getElementsByTagName('head');
		let meta = document.createElement('meta');
		meta.content = to.meta.content;
		head[0].appendChild(meta)
	}
	/* 路由发生变化修改页面title */
	if (to.meta.title) {
		document.title = to.meta.title;
	}
	next()
});

import store from './store/store.js'

/* eslint-disable no-new */
const vm = new Vue({
	el: '#app',
	router,
	store, //使用store
	components: {
		App
	},
	data: {
		urlPath: rootPath.pathUrl() // 通过api.js 控制 开发 和线上环境
	},
	//font-awesome,
	template: '<App/>'
});
