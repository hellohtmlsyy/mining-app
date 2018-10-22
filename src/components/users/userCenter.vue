<template>
	<div class="userCenter">
		<!--login top-->
		<div class="login_top" v-show="loginShow">			
			<!--<img class="icon-shezhi1" src="../../../static/img/user/setup.png" @click="appPopWindow" v-show="shezhiShow">-->
			<i class="iconfont icon-jiantou-copy" v-show="homeShow" @click="goHome()"></i>
			<!--<img src="../../../static/img/user/not_login_bg.png" class="bg_img">-->
			<div align="center">
				<img class="iconfont headImg" src="../../../static/img/user/portrait.png">
			</div>
			<div align="center">
				<div class="login_btn" @click="appLogin()">
					<a href="javascript:;">登录</a>
					<a href="javascript:;">/</a>
					<a href="javascript:;">注册</a>
				</div>			
			</div>
		</div>
		<!--login con-->
		<div class="content log" v-show="loginShow">
			<div class="mtool">
				<p>我的工具</p>
				<grid :show-lr-borders="false" :show-vertical-dividers="false">					
					<grid-item :label="grid_label.goods" style="width:25%">
						<img slot="icon" src="../../../static/img/user/goods.png" @click="Nlogin()">
					</grid-item>
					<grid-item :label="grid_label.exhibition" style="width:25%">
						<img slot="icon" src="../../../static/img/user/exhibition.png" @click="Nlogin()">
					</grid-item>
				</grid>				
			</div>
		</div>
		<!--个人top-->
		<div class="peraccount_top perTopShow" v-show="!loginShow">
			<div class="head clearfix">
				<i class="iconfont icon-jiantou-copy fl" @click="back" v-show="homeShow"></i>
				<div class="fr">
					<img class="sett" src="../../../static/img/user2.0/personal/setting.png" alt="" v-show="shezhiShow" @click="appPopWindow()"/>
					<span class="toggle" @click="ent_ser">切换为企业</span>
				</div>
			</div>
			<div class="info clearfix">
				<img class="headImg fl" :src="headImg" @click="goModify()">
				<div class="user_con fl">
					<div class="user_name">{{userName |subStr(15)}}</div>
					<div><span class="goShop">{{this.vipLevel==0?'铜牌会员':(this.vipLevel==2?'白银会员':(this.vipLevel==3?'黄金会员':(this.vipLevel==4?'钻石会员':(this.vipLevel==1?'铜牌会员':'铜牌会员'))))}} ></span><i class="iconfont icon-yduibianxie" @click="goModify()"></i></div>
				</div>
			</div>
		</div>
		<!--个人con-->
		<!-- 订单管理 -->
		<div class="content per perShow" v-show="!loginShow">
			<div class="mtool">
				<div class="tit">
					<p>订单管理</p>
				</div>
				<grid :show-lr-borders="false" :show-vertical-dividers="true">
					<grid-item :link="linkTo.supordlist">
						<img slot="icon" src="../../../static/img/user2.0/personal/goods.png">
						<div class="mtool_con">
							<p>我的采购</p>
							<span>采购的商品订单</span>
						</div>
					</grid-item>
				</grid>
			</div>
			<!-- 关注消息 -->
			<div class="mtool">
				<div class="tit">
					<p>关注消息</p>
				</div>
				<grid :show-lr-borders="false" :show-vertical-dividers="true">
					<grid-item :link="linkTo.follow">
						<img slot="icon" src="../../../static/img/user2.0/personal/follow.png">
						<div class="mtool_con">
							<p>我的关注</p>
							<span>我关注的消息</span>
						</div>
					</grid-item>
					<grid-item :link="linkTo.news">
						<img slot="icon" src="../../../static/img/user2.0/personal/news.png">
						<div class="mtool_con">
							<p>我的消息<badge :text="newsNum" v-if="newsNum>0"></badge></p>
							<span>我收到的消息</span>
						</div>
					</grid-item>
				</grid>
			</div>
			
			<div class="mtool mtool2">
				<grid :show-lr-borders="false" :show-vertical-dividers="true">
					<grid-item :link="linkTo.perPurse">
						<img slot="icon" src="../../../static/img/user2.0/personal/wallet.png">
						<div class="mtool_con">
							<p>我的钱包</p>
							<span>我的矿业圈钱包</span>
						</div>
					</grid-item>
					<grid-item :link="linkTo.problem">
						<img slot="icon" src="../../../static/img/user2.0/personal/problem.png">
						<div class="mtool_con">
							<p>常见问题</p>
							<span>使用中常见问题</span>
						</div>
					</grid-item>
				</grid>
				<grid :show-lr-borders="false" :show-vertical-dividers="true">
					<grid-item :link="linkTo.proposal">
						<img slot="icon" src="../../../static/img/user2.0/personal/feedback.png">
						<div class="mtool_con">
							<p>意见反馈</p>
							<span>我的反馈与建议</span>
						</div>
					</grid-item>
					<grid-item link="">
						<img slot="icon" src="../../../static/img/user2.0/personal/phone.png">
						<div class="mtool_con">
							<p>客服电话</p>
							<span>400-819-6985</span>
						</div>
					</grid-item>
				</grid>
			</div>
		</div>
		<confirm v-model="showAuth" @on-cancel="onCancel" @on-confirm="toAuth" @on-show="onShow" @on-hide="onHide">
			<p style="text-align:center;">您的账户未认证企业！是否现在前去认证？</p>
		</confirm>
	</div>
</template>
<script>
	import { cookie } from 'vux'
	import {lastPage,appLogin} from '@/assets/commonjs/util.js';
	export default {		
		data() {
			return {
				equi:navigator.userAgent,
				loginShow: true,
				shezhiShow:false,
				homeShow: false,
				grid_label: {
					authentication: "企业认证",
					goods: "普通商品",
					exhibition: "我的会展",
					ent_ser:'企业服务',
					bill: "账单",
					put_forward: "提现",
					recharge: "充值",
				},
				newsNum: '',
				linkTo: {
					problem: this.$root.urlPath.MCM + '/problem?newpage=newpage',
					perPurse: this.$root.urlPath.MCM + '/perPurse?newpage=newpage',
					proposal: this.$root.urlPath.MCM + '/proposal?newpage=newpage',
					follow: this.$root.urlPath.MCM + '/follow?newpage=newpage',
					news: this.$root.urlPath.MCM + '/users/news?newpage=newpage',
					supordlist: this.$root.urlPath.MCM + '/user/pergoodslist?newpage=newpage',
				},
				isInapp:navigator.userAgent.indexOf('/mcapp')>=0,//判断是否在app打开
				userName: '04499847abb2c',
				headImg: this.$root.urlPath.MCM + '/static/img/user2.0/personal/head.png',
				status: '',	
				vipLevel: 0,
				showAuth:false,
				userId: '',
			}
		},
		methods: {
			back() {	
				lastPage()
			},	
			goModify(){
				location.href = this.$root.urlPath.MCM + '/modifyInfo?newpage=newpage';
			},
			appPopWindow() {	
				if(this.isInapp){
					var a = '[{"act": "#set","ico": "http://www.miningcircle.com/img/m/app/set.png","id": 110,"title": "设置"},{"act": "#about","ico": "http://www.miningcircle.com/img/m/app/about.png","id": 130,"title": "关于我们"},{"act": "#out","ico": "http://www.miningcircle.com/img/m/app/out.png","id": 140,"title": "退出"}]';
					if(this.equi.indexOf('Android') > -1 || this.equi.indexOf('Adr') > -1) {
						adwebkit.callApp("POP_WINDOW", a);
					} else if(!!this.equi.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
						oswebkit.callApp("POP_WINDOW", a);
					}
				}else{
					return;
				}
			},
			appLogin() {
				appLogin()						
			},
			goHome(){
				if(this.isInapp){					
					if(this.equi.indexOf('Android') > -1 || this.equi.indexOf('Adr') > -1) {//						
						adwebkit.callApp("BACK", "");
					} else if(!!this.equi.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {		
						oswebkit.callApp("BACK", "");
					}	
				}else{
					this.$router.push({
						name:'home'
					});
				}					
			},
			Nlogin(){
				this.$vux.toast.text('未登录，请先登录', 'center');
				return;
			},
			ent_ser(){	
				if(this.status==1){
					this.$axios.get(this.$root.urlPath.MCT+'/wap/company/comInfo', {
						headers:{
							'MC_UID': cookie.get('MC_UID')
						},
					})
					.then(res => {
						let mstatus = res.data.status;
						if(mstatus==1){
							this.showAuth=false;
							this.$vux.toast.text('您的企业正在申请中<br/>客服：400-819-6985', 'center');
							return;
						}else if(mstatus==0||mstatus==3){
							this.showAuth=true;					
						}else if(mstatus==2){
							this.showAuth=false;
							window.location.href=this.$root.urlPath.MCM+'/users/entcenter?newpage=newpage';						
						}else if(mstatus==4){
							this.showAuth=false;
							this.$vux.toast.text('您的企业已冻结<br/>客服：400-819-6985', 'center');
							return;
						}
					}).catch(err => console.log('个人账户异常', err));		
				}else{
					this.showAuth=true;
				}
			},
			toAuth(){
				window.location.href = 'http://trade.miningcircle.com/cert?newpage=newpage';
			},
			onCancel(){},
			onShow(){},
			onHide(){},
			getUserinfo(){
				this.$axios.get(this.$root.urlPath.MCT+'/wap/user/userInfo', {
					headers: {
						'MC_UID': cookie.get('MC_UID')
					},
				})
				.then(res => {
					var data = res.data;
					data.headImg && data.headImg != null && data.headImg != '' ? this.headImg = data.headImg : this.headImg = this.headImg;
					data.userName && data.userName != null && data.userName != '' ? this.userName = data.userName : this.userName = this.userName;
					this.vipLevel = data.vipLevel;
					this.userId = data.userId;
					if(data.userCompanyStatus==4||data.userCompanyStatus==2){
						this.status=1;
					}else if(data.userCompanyStatus==3||data.userCompanyStatus==1){
						this.status=0;
					}
					this.$axios.get(this.$root.urlPath.MC+'/api.do?noteNoReadNum', {
						headers:{
							'MC_UID': cookie.get('MC_UID')
						},
						params: {
							userId: this.userId,
						}
					})
					.then(res => {
						this.newsNum = res.data.data;
					}).catch(err => console.log('个人账户异常', err));	
				}).catch(err => console.log('个人账户异常', err));
			},
			getNews(){
				this.$axios.get(this.$root.urlPath.MC+'/api.do?noteNoReadNum', {
					headers:{
						'MC_UID': cookie.get('MC_UID')
					},
					params: {
						userId: this.userId,
					}
				})
				.then(res => {
//					console.log(res.data)
				}).catch(err => console.log('个人账户异常', err));	
			}
		},	
		mounted() {	
			if(cookie.get('MC_UID')) {
				this.loginShow = false;
				this.getUserinfo();
//				this.getNews();
			}
			if(!this.isInapp){
				this.homeShow =true;
				this.shezhiShow =false;
			}else{
				if(this.equi.indexOf('Android') > -1 || this.equi.indexOf('Adr') > -1) {//						
					this.shezhiShow=true;
				} else if(!!this.equi.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {		
					this.shezhiShow=false;
				}	
				this.homeShow=false;
			}			
		},	
		
	}
</script>
<style>
	/*@import url("../../static/css/user.css");*/	
	@import url("../../static/css/user2.0.css");	
	.peraccount_top .icon-zuojt{
		width: 0.25rem !important;
	}
	.userCenter .vux-badge{
		vertical-align: inherit;
		color: #fff!important;
		margin-left: 0.1rem;
	}
	.per .mtool2 .weui-grid{
	    padding: 0.3rem 0.2rem 0.2rem;
	}
	
	.weui-grids:before,.weui-grid:after{
		border: none!important;
	}
	/*login top*/
	.userCenter .login_top{
		height: 4rem;
		background: url(../../../static/img/user/not_login_bg.png);
	    background-size: 100% 100%;
	    padding: 0.1rem 0.2rem;
	}
	.userCenter .login_top .icon-jiantou-copy{
		color: #fff;
		font-size: 0.5rem;
		display: block;
	}
	.userCenter .login_top .headImg{
		width: 1.7rem;
		color: #fff;
		margin-top: 0.2rem;
	}
/*	/*
	.login_top .icon-shezhi1 {
		color: #fff;
		width: 0.6rem;
		position: absolute;
		right: 0.2rem;
		top: 0.2rem;
	}*/
	.userCenter .login_top .login_btn {
		padding: 0.15rem 0.25rem;
		border: 0.02rem solid #fff;
		border-radius: 0.06rem;
		width: 1.5rem;
		margin-top: 0.3rem;
	}
	.userCenter .login_btn a {
		color: #fff;
		font-size: 0.3rem;
	}
	.userCenter .login_top .icon-jiantou-copy{
		color: #fff;
		font-size: 0.5rem;
	}
	/*login con*/
	.userCenter .log .mtool {
		padding: 0.25rem 0.2rem;
	}
	.userCenter .log .mtool p {
		color: #757575;
		font-size: 0.28rem;
	}
	.userCenter .log .mtool .weui-grid__icon{
		width: 0.8rem;
		height: 0.8rem
	}
	.userCenter .log .mtool .weui-grid {
		padding: 18px 10px;
		width: 25%;
	}
	.userCenter .log{
		background-color: #fff;
	}
</style>