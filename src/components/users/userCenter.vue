<template>
	<div class="userCenter">
		<!--login top-->
		<div class="login_top" v-show="loginShow">
			<div align="center">
				<img class="iconfont headImg" src="../../../static/img/user/portrait.png">
				<!-- <img class="sett" src="../../../static/img/user2.0/personal/setting.png" alt="" v-show="shezhiShow" @click="appPopWindow()" /> -->
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
				<i class="iconfont icon-jiantou-copy fl" @click="back"></i>
				<div class="fr">
					<img class="sett" src="../../../static/img/user2.0/personal/setting.png" alt="" v-show="shezhiShow" @click="appPopWindow()" />
					<span class="toggle" @click="go_Eetcentsr('0')">切换为企业</span>
				</div>
			</div>
			<div class="info clearfix">
				<img class="headImg fl" :src="headImg" @click="goModify()">
				<div class="user_con fl">
					<div class="user_name">{{userName |subStr(15)}}</div>
					<div><span class="goShop"><a :href="linkTo.member">{{this.vipLevel==0?'铜牌会员':(this.vipLevel==2?'白银会员':(this.vipLevel==3?'黄金会员':(this.vipLevel==4?'钻石会员':(this.vipLevel==1?'铜牌会员':'铜牌会员'))))}}
								></a></span><i class="iconfont icon-yduibianxie" @click="goModify()"></i></div>
				</div>
			</div>
		</div>
		<!--个人con-->
		<!--认证企业   开店-->
		<div class="shop clearfix" v-show="shopShow">
			<div class="fl">
				<img src="../../../static/img/user2.0/personal/ent.png" class="ent">
				<span>去开旗舰店，认证为企业用户？</span>
			</div>
			<div class="fr"><img src="../../../static/img/user2.0/personal/more.png" class="ent" @click="go_Eetcentsr('1')" /></div>
		</div>
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
							<p>我的消息<span class="badge" v-if="newsNum>0">{{newsNum > 99?'…':newsNum}}</span></p>
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
					<grid-item :link="linkTo.address">
						<img slot="icon" src="../../../static/img/user2.0/personal/address.png">
						<div class="mtool_con">
							<p>收货地址</p>
							<span>管理收货地址</span>
						</div>
					</grid-item>
					<grid-item :link="linkTo.proposal">
						<img slot="icon" src="../../../static/img/user2.0/personal/feedback.png">
						<div class="mtool_con">
							<p>意见反馈</p>
							<span>我的反馈与建议</span>
						</div>
					</grid-item>
				</grid>

			</div>
			<div class="mtool" @click="call">
				<grid :show-lr-borders="false" :show-vertical-dividers="true">
					<grid-item>
						<img slot="icon" src="../../../static/img/user2.0/personal/phone.png">
						<div class="mtool_con">
							<p>客服电话</p>
							<span>400-819-6985</span>
						</div>
					</grid-item>
				</grid>
			</div>
		</div>
	</div>
</template>
<script>
	import {
		cookie
	} from 'vux'
	import {
		lastPage,
		appLogin,
		toPhone,
		isDevice
	} from '@/assets/commonjs/util.js';
	export default {
		data() {
			return {
				equi: navigator.userAgent,
				loginShow: true, //未登录
				shezhiShow: false, //设置按钮
				homeShow: false, //已登录
				newsNum: ' ', //未读消息条数
				grid_label: {
					authentication: "企业认证",
					goods: "普通商品",
					exhibition: "我的会展",
					ent_ser: '企业服务',
					bill: "账单",
					put_forward: "提现",
					recharge: "充值",
				},
				linkTo: {
					problem: this.$root.urlPath.MCM + '/users/problem?newpage=newpage',
					perPurse: this.$root.urlPath.MCM + '/users/perPurse?newpage=newpage',
					proposal: this.$root.urlPath.MCM + '/users/proposal?newpage=newpage',
					follow: this.$root.urlPath.MCM + '/users/follow?newpage=newpage',
					news: this.$root.urlPath.MCM + '/users/news?newpage=newpage',
					supordlist: this.$root.urlPath.MCM + '/user/pergoodslist?newpage=newpage',
					address: this.$root.urlPath.MCM + '/mall/order_addressList?newpage=newpage&where=userCenter',
					member: this.$root.urlPath.MCM + '/vip?newpage=newpage',
				},
				isInapp: navigator.userAgent.indexOf('/mcapp') >= 0, //判断是否在app打开
				userName: '04499847abb2c',
				headImg: this.$root.urlPath.MCM + '/static/img/user2.0/personal/head.png',
				status: '',
				vipLevel: 0,
				shopShow: false, //认证企业横条
				userId: '',
			}
		},
		methods: {
			call() {
				toPhone("4008196985")
			},
			back() {
				lastPage()
			},
			goModify() {
				location.href = this.$root.urlPath.MCM + '/users/modifyInfo?newpage=newpage';
			},
			appPopWindow() {
				if (this.isInapp) {
					var a =
						'[{"act": "#set","ico": "http://www.miningcircle.com/img/m/app/set.png","id": 110,"title": "设置"},{"act": "#about","ico": "http://www.miningcircle.com/img/m/app/about.png","id": 130,"title": "关于我们"},{"act": "#out","ico": "http://www.miningcircle.com/img/m/app/out.png","id": 140,"title": "退出"}]';
					if (this.equi.indexOf('Android') > -1 || this.equi.indexOf('Adr') > -1) {
						adwebkit.callApp("POP_WINDOW", a);
					} else if (!!this.equi.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
						oswebkit.callApp("POP_WINDOW", a);
					}
				} else {
					return;
				}
			},
			appLogin() {
				appLogin()
			},
			Nlogin() {
				this.$vux.toast.text('未登录，请先登录', 'center');
				return;
			},
			go_Eetcentsr(num) {
				this.$axios.get(this.$root.urlPath.MCT + '/wap/company/comInfo', {
					headers: {
						'MC_UID': cookie.get('MC_UID')
					},
				})
				.then(res => {
					let mstatus = res.data.status;
					if (mstatus == 1) { //审核中
						this.$vux.toast.text('您的企业需审核1~3个工作日', 'center');
					} else if (mstatus == 0 || mstatus == 3) { //未认证
						location.href = this.$root.urlPath.MCMHALL + '/cert?newpage=newpage';
					} else if (mstatus == 2) { //正常
						if (num != 1) {
							location.href = this.$root.urlPath.MCM + '/users/entcenter?newpage=newpage';
						} else {}
					} else if (mstatus == 4) { //冻结
						this.$vux.toast.text('企业信息有误，请联系客服', 'center');
					} else if (res.data.errCode == '001002140' || res.data.errCode == '001002137') {
						location.href = this.$root.urlPath.MCMHALL + '/cert?newpage=newpage';
					}else{
						this.$vux.toast.text(res.data.errMsg, 'center')
					}

				}).catch(err => this.$vux.toast.text(err, 'center'));
			},
			getUserinfo() {
				this.$axios.get(this.$root.urlPath.MCT + '/wap/user/userInfo', {
					headers: {
						'MC_UID': cookie.get('MC_UID')
					},
				})
				.then(res => {
					var data = res.data;
					data.headImg && data.headImg != null && data.headImg != '' ? this.headImg = data.headImg : this.headImg = this.headImg;
					data.userName && data.userName != null && data.userName != '' ? this.userName = data.userName : this.userName =	this.userName;
					this.vipLevel = data.vipLevel;
					this.userId = data.userId;
					this.$axios.get(this.$root.urlPath.MCT + '/wap/company/comInfo', {
						headers: {
							'MC_UID': cookie.get('MC_UID')
						},
					})
					.then(res => {
						let mstatus = res.data.status;
						if (mstatus == 0 || mstatus == 1 || mstatus == 3 || mstatus == 4 || res.data.errCode == '001002140' || res.data.errCode == '001002137') {
							this.shopShow = true;
						}
					}).catch(err => this.$vux.toast.text('账户异常' + err, 'center'));
					this.$axios.get(this.$root.urlPath.MC + '/api.do?noteNoReadNum', {
						headers: {
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
		},
		mounted() {
			if (cookie.get('MC_UID')) {
				this.loginShow = false;
				this.getUserinfo();
			}
		},
		created() {
			if (isDevice() == 'adr') {
				this.shezhiShow = true;
			} else {
				this.shezhiShow = false;
			}
		},
	}
</script>
<style>
	@import url("../../static/css/user2.0.css");

	.peraccount_top .icon-zuojt {
		width: 0.25rem !important;
	}

	.userCenter .badge {
		vertical-align: inherit;
		color: #fff !important;
		margin-left: 0.1rem;
		display: inline-block;
		text-align: center;
		background: #f74c31;
		color: #fff;
		font-size: 12px;
		border-radius: 50%;
		padding: 1px 4px;
		background-clip: padding-box;
	}

	.per .mtool2 .weui-grid {
		padding: 0.3rem 0.2rem 0.2rem;
	}

	.weui-grids:before,
	.weui-grid:after {
		border: none !important;
	}

	/*login top*/
	.userCenter .login_top {
		height: 4rem;
		background: url(../../../static/img/user/not_login_bg.png);
		background-size: 100% 100%;
		padding: 0.1rem 0.2rem;
	}

	.userCenter .login_top .icon-jiantou-copy {
		color: #fff;
		font-size: 0.5rem;
		display: block;
	}

	.userCenter .login_top .headImg {
		width: 1.7rem;
		color: #fff;
		margin-top: 0.6rem;
	}

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

	.userCenter .login_top .icon-jiantou-copy {
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

	.userCenter .log .mtool .weui-grid__icon {
		width: 0.8rem;
		height: 0.8rem
	}

	.userCenter .log .mtool .weui-grid {
		padding: 18px 10px;
		width: 25%;
	}

	.userCenter .log {
		background-color: #fff;
	}
</style>
