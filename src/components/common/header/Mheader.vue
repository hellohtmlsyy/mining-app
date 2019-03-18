<template>
	<div class="mheader clearfix">
		<div class="logo">
			<img src='../../../../static/img/logo.png' />
		</div>
		<div class="searchBox" @click="toJump">
			<icon type="search"></icon>
			<span>
				搜索
			</span>
		</div>
		<div class="login">
			<a href="#" class="login-box" @click="tologin">
				<i class="icon iconfont icon-xiaoxi2"></i>
				<span class="newsNum" v-if="newsNum > 0">{{newsNum}}</span>
			</a>
		</div>
	</div>
</template>

<script>
	const loginUrl = 'http://member.miningcircle.com/login'
	import { Icon, cookie, Alert } from 'vux'
	import {appLogin} from '@/assets/commonjs/util.js';

	export default {
		components: {
			Icon,
			Alert
		},
		data() {
			return {
				login: true, // 需要登录
				notInapp: "",
				equi: navigator.userAgent,
				newsNum:0,
				userId:''
			}
		},
		created() {
			let userAgent = navigator.userAgent.toLowerCase() // 获取userAgent
			let isInapp = userAgent.indexOf('/mcapp') >= 0 // 判断是否从app打开
			if(isInapp) {
				this.notInapp = false
			} else {
				this.notInapp = true
			}
			if(cookie.get('MC_UID')) {
				this.login = false;
				this.getUserinfo(()=>{
					this.getNewsNum()
				})
			} else {
				this.login = true;
			}

		},
		methods: {
			toJump() {
				location.href = this.$root.urlPath.MCM + "/search?newpage=newpage";
			},
//			goMe() {
//				if(this.notInapp) {
//					if(this.equi.indexOf('Android') > -1 || this.equi.indexOf('Adr') > -1) { //
//						location.href = this.$root.urlPath.MCM + "/user/center?newpage=newpage&back=0";
//					} else if(!!this.equi.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
//						location.href = this.$root.urlPath.MCM + "/user/center?newpage=newpage&back=0";
//					}
//				} else {
//					location.href = this.$root.urlPath.MCM + "/user/center?newpage=newpage&back=0";
//				}
//
//
//			},
			tologin() {
//				if(this.notInapp) {
//					window.location.href = this.$root.urlPath.MCL
//				} else {
//					if(this.equi.indexOf('Android') > -1 || this.equi.indexOf('Adr') > -1) { //
//						adwebkit.callApp("LOGIN", "登录的参数");
//					} else if(!!this.equi.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
//						oswebkit.callApp("LOGIN", "登录的参数");
//					}
//				}
				if(cookie.get('MC_UID')) {
					window.location.href = this.$root.urlPath.MCM + '/users/news?newpage=newpage'
				}else{
					appLogin()
				}

		},
		getUserinfo(callback){
				this.$axios.get(this.$root.urlPath.MCT+'/wap/user/userInfo', )
				.then(res => {
					var data = res.data;
					this.userId = data.userId;
					callback()
				}).catch(err => console.log('账户异常', err));
		},
		getNewsNum(){
				this.$axios.get(this.$root.urlPath.MC+'/api.do?noteNoReadNum', {
						params: {
							userId: this.userId,
						}
					})
					.then(res => {
						this.newsNum = res.data.data;
					}).catch(err => console.log('账户异常', err));
			}
		}
	}
</script>

<style>

	.mheader {
		display: flex;
		padding: 0.2rem;
		/*background-color: #0094E8;*/
		display: -webkit-flex;
		/* Safari */
		align-items: center;
		/*指定垂直居中*/
		font-size: 0.36rem;
		height: 0.6rem;
    line-height: 0.6rem;
    box-sizing: content-box;
    width: 100%;
	}
	.mheader .searchBox{
		margin: 0 0.2rem;
		background: #fff;
		border-radius: 2.5rem;
		color: #000;
		padding-left: 0.2rem;
		font-size: 0.3rem;
		width: 4.5rem;
	}
	.mheader .searchBox span{
		color: #757575;
	}
	.mheader .searchBox .weui-icon-search{
		font-size: 0.36rem;
	}
	.mheader .logo {
		float: left;
		height: 0.6rem;
	}

	.mheader .logo img {
		width: 1.53rem;
		height: 0.6rem;
	}
	.mheader .icon-xiaoxi2{
		color:#fff;
		font-size: 0.48rem;
		vertical-align: middle;

	}
	.mheader .login-box{
		position: relative;
	}
	.mheader .newsNum{
		display: inline-block;
		width: 0.35rem;
		height: 0.25rem;
		background: #EB3625;
		color: #fff;
		position: absolute;
		right: -0.1rem;
		top: 0;
		border-radius:0.13rem;
		font-size: 0.2rem;
		line-height: 0.25rem;
    	text-align: center;
	}
	/*.setUpIco {
		position: absolute;
		z-index: 99999;
		left: 0.2rem;
		top: 0.23rem;
		width: 0.5rem;
		height: 0.48rem;
		background: url('../../../../static/img/setup.png') center center no-repeat;
		background-size: 0.5rem 0.48rem
	}*/
	.mheader a {
		text-decoration: none;
		color: rgb(115, 115, 115)
	}

	.mheader .login img {
		width: 0.49rem;
		height: 0.49rem;
		margin-top: 0.15rem;
	}

	.mheader .login p {
		text-align: center;
		color: #fff;
		font-size: 0.16rem;
		margin-top: -0.01rem;
	}
</style>
