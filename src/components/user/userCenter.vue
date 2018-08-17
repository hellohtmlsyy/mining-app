<template>
	<div class="userCenter">
		<div class="login_top" v-show="logTopShow">			
			<img class="icon-shezhi1" src="../../../static/img/user/setup.png" @click="appPopWindow" v-show="shezhiShow">
			<i class="iconfont icon-jiantou-copy" v-show="homeShow" @click="goHome()"></i>
			<img src="../../../static/img/user/not_login_bg.png" class="bg_img">
			<img class="iconfont icon-wode-F" src="../../../static/img/user/portrait.png">
			<div class="login_btn" @click="appLogin()">
				<a href="javascript:;">登录</a>
				<a href="javascript:;">/</a>
				<a href="javascript:;">注册</a>
			</div>			
		</div>
		<!--个人top-->
		<div class="entaccount_top perTopShow " v-show="perTopShow">			
			<img class="icon-shezhi1" src="../../../static/img/user/setup.png" @click="appPopWindow" v-show="shezhiShow">			
			<i class="iconfont icon-jiantou-copy" v-show="homeShow" @click="goHome()"></i>
			<img src="../../../static/img/user/already_login_bg.png" class="bg_img">
			<img class="icon-wode-F" :src='this.headImg'>
			<div class="user_name">{{this.userName|subStr(4)}}</div>
			<div class="user_con log_userCon">
				<p class="total_assets">总 资 产：{{this.freezingBalance}}</p>
				<p class="usable_balance">可用余额：<span>{{this.availableBalance}}</span></p>
				<p class="vip_leval">
					<img :src="this.vipLevelImgs" />
					{{this.vipLevel==0?'铜牌会员':(this.vipLevel==2?'白银会员':(this.vipLevel==3?'黄金会员':(this.vipLevel==4?'钻石会员':(this.vipLevel==1?'铜牌会员':'铜牌会员'))))}}
				</p>
			</div>
		</div>
		<div class="entaccount_topb" v-show="topbShow">
			<!--<grid :show-lr-borders="false" :show-vertical-dividers="true">
				<grid-item :label="grid_label.bill">
					<img slot="icon" src="../../../static/img/user/bill.png">
				</grid-item>
				<grid-item :label="grid_label.put_forward">
					<img slot="icon" src="../../../static/img/user/put_forward.png">
				</grid-item>
				<grid-item :label="grid_label.recharge">
					<img slot="icon" src="../../../static/img/user/recharge.png">
				</grid-item>
			</grid>-->
		</div>
		<!--login con-->
		<div class="content log" v-show="logShow">
			<div class="mtool">
				<p>我的工具</p>
				<grid :show-lr-borders="false" :show-vertical-dividers="false">					
					<grid-item :label="grid_label.goods" style="width:25%">
						<img slot="icon" src="../../../static/img/user/goods.png">
					</grid-item>
					<grid-item :label="grid_label.exhibition" style="width:25%">
						<img slot="icon" src="../../../static/img/user/exhibition.png">
					</grid-item>
				</grid>				
			</div>
		</div>
		<!--个人用户con-->
		<div class="content per perShow" v-show="perShow">
			<div class="mtool">
				<p>我的工具</p>
				<grid :show-lr-borders="false" :show-vertical-dividers="false">					
					<grid-item link="http://m.miningcircle.com/user/pergoodslist?newpage=newpage" :label="grid_label.goods">
						<img slot="icon" src="../../../static/img/user/goods.png">
					</grid-item>
					<grid-item link="" :label="grid_label.exhibition">
						<img slot="icon" src="../../../static/img/user/exhibition.png" @click="exhcli()">
					</grid-item>
					<grid-item link="" :label="grid_label.ent_ser">
						<img slot="icon" src="../../../static/img/user/ent_ser.png"  @click="ent_ser">
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
	import { cookie } from 'vux';
//	import { getTime,iosTest} from '@/assets/commonjs/util.js';
	export default {		
		data() {
			return {		
//				iosTest:iosTest(),
				logTopShow: true, //登录头部
				perTopShow: false, //个人头部
				topbShow: false, //账单			
				logShow: true, //login con
				perShow: false, //个人 con
				homeShow:false,
				shezhiShow:false,
				grid_label: {
					authentication: "企业认证",
					goods: "普通商品",
					exhibition: "我的会展",
					ent_ser:'企业服务',
					bill: "账单",
					put_forward: "提现",
					recharge: "充值",
				},
				vip_level: '',
				vipLevelImgs:'../../../static/img/user/copper.png',				
				freezingBalance: "0.00 ",
				availableBalance: "0.00 ",
				userName: '',
				status: '',	
				headImg: '../../../static/img/user/default_headImg.png',
				//企业
				equi:navigator.userAgent,
				vipLevel:0,				
				eurl:this.$root.urlPath.MCM+'/entcenter?newpage=newpage',
				showAuth:false,
				isInapp:navigator.userAgent.indexOf('/mcapp')>=0,//判断是否在app打开
			}
		},
		methods: {	
			appLogin() {
				if(this.isInapp){
					if(this.equi.indexOf('Android') > -1 || this.equi.indexOf('Adr') > -1) {//						
						adwebkit.callApp("LOGIN", "登录的参数");
					} else if(!!this.equi.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {		
						oswebkit.callApp("LOGIN", "登录的参数");
					}	
				}else{
					window.location.href = this.$root.urlPath.MCL;
				}								
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
							this.$vux.toast.text('您的企业正在申请中', 'center');
							return;
						}else if(mstatus==0||mstatus==3){
							this.showAuth=true;					
						}else if(mstatus==2){
							this.showAuth=false;
							let un = this.userName;			
							let vip = this. vipLevel
							window.location.href=this.$root.urlPath.MCM+"/entcenter?newpage=newpage&un="+un+"&vip="+vip;							
						}else if(mstatus==4){
							this.showAuth=false;
							this.$vux.toast.text('您的企业已冻结', 'center');
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
			exhcli(){
				this.$vux.toast.text('您尚未发布会展信息','center');
				return;
			},
		},		
		mounted() {				
			if(cookie.get('MC_UID')) {
				this.logTopShow = false;
				this.logShow = false;
				this.perTopShow = true;
				this.topbShow = true;
				this.perShow = true;			
			//用户信息
			this.$axios.get(this.$root.urlPath.MCT+'/wap/user/userInfo', {
					headers: {
						'MC_UID': cookie.get('MC_UID')
					},
				})
				.then(res => {
					let data = res.data;
					this. vipLevel =data.vipLevel;							
					if(this.vipLevel==0||this.vipLevel==1){
						this.vipLevelImgs='../../../static/img/user/copper.png';
					}else if(this.vipLevel==2){
						this.vipLevelImgs='../../../static/img/user/silver.png';
					}else if(this.vipLevel==3){
						this.vipLevelImgs='../../../static/img/user/gold.png';
					}else if(this.vipLevel==4){
						this.vipLevelImgs='../../../static/img/user/diamonds.png';
					}else{
						this.vipLevelImgs='../../../static/img/user/copper.png';
					}
					if(data.userCompanyStatus==4||data.userCompanyStatus==2){
						this.status=1;
					}else if(data.userCompanyStatus==3||data.userCompanyStatus==1){
						this.status=0;
					}
					if(data.headImg) {
						this.headImg = data.headImg;
					}
					this.userName = data.userName;
					
					//用户资产
			this.$axios.get(this.$root.urlPath.MCT+'/account/account?', {
					params: {
						status: this.status
					},
					headers: {
						'MC_UID': cookie.get('MC_UID')
					},
				})
				.then(res => {
					if(res.data.success) {
						let data = res.data.data;						
						if(data.availableBalance) {
							this.availableBalance = data.availableBalance;
						}
						if(data.freezingBalance) {
							this.freezingBalance = data.freezingBalance;
						}
					}
				}).catch(err => console.log('个人账户异常', err));

				}).catch(err => console.log('个人账户异常', err));	
			}
			if(!this.isInapp){
				this.homeShow=true;
			}else if(this.isInapp){				
				if(this.$route.query.back==0){
					this.homeShow=true;	
				}
			}else{
				this.homeShow=false;
			}			
			if(this.isInapp){				
				if(this.equi.indexOf('Android') > -1 || this.equi.indexOf('Adr') > -1) {//						
					this.shezhiShow=true;
					if(this.$route.query.back==0){
						this.shezhiShow=true;
					}
				} else if(!!this.equi.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {		
					this.shezhiShow=false;
				}	
			}else{
				this.shezhiShow=false;
			}				
		},
	}
</script>
<style>
@import url("../../static/css/user.css");
/*login top*/
.login_top {
	position: relative;
	padding: 0.2rem;
}	
.login_top .icon-shezhi1 {
	color: #fff;
	width: 0.6rem;
	position: absolute;
	right: 0.2rem;
	top: 0.2rem;
}
.bg_img,
.icon-wode-F,
.login_btn {
	position: absolute;
}
.login_top .bg_img {
	width: 100%;
	left: 0;
	top: 0;
	z-index: -1;
	height: 4.2rem;
}
.login_top .icon-wode-F {
	width: 1.7rem;
	color: #fff;
	left: 50%;
	top: 50%;
	margin-top: 0.75rem;
	margin-left: -0.85rem;
}
.login_top .login_btn {
	left: 50%;
	bottom: 0;
	margin-bottom: -3.3rem;
	margin-left: -1rem;
	padding: 0.15rem 0.25rem;
	border: 0.02rem solid #fff;
	border-radius: 0.06rem;
}
.login_btn a {
	color: #fff;
	font-size: 0.3rem;
}

/*login con*/
.log .mtool {
	margin-top: 3.8rem;
	padding: 0.25rem 0.2rem;
}
.log .mtool p {
	color: #757575;
	font-size: 0.28rem;
}
.log .mtool .weui-grid {
	padding: 18px 10px;
	width: 25%;
}
</style>