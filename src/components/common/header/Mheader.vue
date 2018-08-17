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
			<a href="#" v-show="login" @click="tologin">
				<img src="../../../../static/img/login.png" />
			</a>
			<div v-show="!login" @click="goMe">
				<img src="../../../../static/img/login.png" />
			</div>
		</div>
	</div>
</template>

<script>
	const loginUrl = 'http://member.miningcircle.com/login'
	import { Icon, cookie, Alert } from 'vux'
	export default {
		components: {
			Icon,
			Alert
		},
		data() {
			return {
				login: true,
				notInapp: "",
				equi: navigator.userAgent,
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
			} else {

			}
		},
		methods: {
			toJump() {
				location.href = this.$root.urlPath.MCM + "/search?newpage=newpage";
			},
			goMe() {					
				if(this.notInapp) {					
					if(this.equi.indexOf('Android') > -1 || this.equi.indexOf('Adr') > -1) { //						
						location.href = this.$root.urlPath.MCM + "/user/center?newpage=newpage&back=0";
					} else if(!!this.equi.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {						
						location.href = this.$root.urlPath.MCM + "/user/center?newpage=newpage&back=0";
					}
				} else {
					location.href = this.$root.urlPath.MCM + "/user/center?newpage=newpage&back=0";
				}
			},
			tologin() {					
				if(this.notInapp) {
					window.location.href = this.$root.urlPath.MCL
				} else {					
					if(this.equi.indexOf('Android') > -1 || this.equi.indexOf('Adr') > -1) { //						
						adwebkit.callApp("LOGIN", "登录的参数");
					} else if(!!this.equi.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
						oswebkit.callApp("LOGIN", "登录的参数");
					}
				}
			}
		}
	}
</script>

<style>
	
	.mheader {
		display: flex;
		padding: 0.2rem;
		background-color: #333333;
		display: -webkit-flex;
		/* Safari */
		align-items: center;
		/*指定垂直居中*/
		position: relative;
		font-size: 0.36rem;
		height: 0.6rem;
		line-height: 0.6rem;
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
	
	.setUpIco {
		position: absolute;
		z-index: 99999;
		left: 0.2rem;
		top: 0.23rem;
		width: 0.5rem;
		height: 0.48rem;
		background: url('../../../../static/img/setup.png') center center no-repeat;
		background-size: 0.5rem 0.48rem
	}
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