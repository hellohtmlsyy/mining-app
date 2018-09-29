<template>
	<div>
		<!--企业top-->
		<div class="entaccount_top entTopShow">
			<i class="iconfont icon-jiantou-copy" @click="appBack"></i>
			<img src="../../../static/img/user/already_login_bg.png" class="bg_img">
			<img class="icon-wode-F" src="../../../static/img/user/default_headImg.png">
			<div class="user_name">{{userName|subStr(4)}}</div>
			<div class="user_con">
				<p class="firstp">{{user_name2|subStr(10)}}</p>
				<p class="total_assets">总 资 产：{{this.freezingBalance}}</p>
				<p class="usable_balance">可用余额：<span>{{this.availableBalance}}</span></p>
				<p class="vip_leval">
					<img :src="this.vipLevelImgs"/>
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
		<!--企业con-->
		<!-- 订单管理 -->
		<div class="content ent entShow">
			<div class="mtool">
				<div class="tit">
					<p>订单管理</p>
				</div>
				<grid :show-lr-borders="false" :show-vertical-dividers="true">
					<grid-item link="http://m.miningcircle.com/user/purordlist?newpage=newpage">
						<img slot="icon" src="../../../static/img/user/m_purchase.png">
						<div class="mtool_con">
							<p>我的采购</p>
							<span>所有采购的订单</span>
						</div>
					</grid-item>
					<grid-item link="http://m.miningcircle.com/user/supordlist?newpage=newpage">
						<img slot="icon" src="../../../static/img/user/m_supply.png">
						<div class="mtool_con">
							<p>我的供应</p>
							<span>所有供应的订单</span>
						</div>
					</grid-item>
				</grid>
			</div>
			<div class="mtool">
				<div class="tit">
					<p>商城管理</p>
				</div>
				<grid :show-lr-borders="false" :show-vertical-dividers="true">
					<grid-item link="">
						<img slot="icon" src="../../../static/img/user/publish_goods.png">
						<div class="mtool_con">
							<p>发布商品</p>
							<span>添加新商品</span>
						</div>
					</grid-item>
					<grid-item link="">
						<img slot="icon" src="../../../static/img/user/shelf_manage.png">
						<div class="mtool_con">
							<p>货架管理</p>
							<span>商品上下架管理</span>
						</div>
					</grid-item>
				</grid>
			</div>
			<!-- 矿权交易 -->
			<div class="mtool">
				<div class="tit">
					<p>矿权交易</p>
				</div>
				<grid :show-lr-borders="false" :show-vertical-dividers="true">
					<grid-item link="">
						<img slot="icon" src="../../../static/img/user/m_invest.png">
						<div class="mtool_con">
							<p>我的投资</p>
							<span>领投和跟投的项目</span>
						</div>
					</grid-item>
					<grid-item link="">
						<img slot="icon" src="../../../static/img/user/m_transfer.png">
						<div class="mtool_con">
							<p>我的转让</p>
							<span>发布的转让项目</span>
						</div>
					</grid-item>
				</grid>
			</div>
			<!-- 服务中心 -->
			<div class="mtool mtool_ser">
				<div class="tit">
					<p>服务中心</p>
				</div>
				<grid :show-lr-borders="false" :show-vertical-dividers="true">
					<grid-item link="">
						<img slot="icon" src="../../../static/img/user/ser_manage.png">
						<div class="mtool_con">
							<p>我的服务</p>
							<span>发布的服务及服务管理</span>
						</div>
					</grid-item>
					<grid-item link="">
						<img slot="icon" src="../../../static/img/user/exhibition.png">
						<div class="mtool_con">
							<p>我的会展</p>
							<span>发布的会展及会展管理</span>
						</div>
					</grid-item>
				</grid>
			</div>
		</div>
	</div>
</template>
<script>
	import { cookie } from 'vux'
	export default {		
		data() {
			return {
				entTopShow: true, //企业头部				
				topbShow: true, //账单	
				entShow: false, //企业 con
				grid_label: {
					authentication: "企业认证",
					goods: "普通商品",
					exhibition: "我的会展",
					ent_ser:'企业服务',
					bill: "账单",
					put_forward: "提现",
					recharge: "充值",
				},				
				vipLevelImgs:'../../../static/img/user/copper.png',					
				freezingBalance: "0.00 ",
				availableBalance: "0.00 ",
				userName: this.$route.query.un,
				status: 1,
				headImg: '../../../static/img/user/default_headImg.png',
				//企业
				user_name2: '',
				equi:navigator.userAgent,
				vipLevel:this.$route.query.vip,
				isInapp:navigator.userAgent.indexOf('/mcapp')>=0,//判断是否在app打开
//				homeShow: true,
			}
		},
		methods: {			
			appLogin() {
				if(this.equi.indexOf('Android') > -1 || this.equi.indexOf('Adr') > -1) {//						
						adwebkit.callApp("LOGIN", "登录的参数");
				} else if(!!this.equi.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {		
						oswebkit.callApp("LOGIN", "登录的参数");
				}					
			},
			appBack() {					
				if(this.isInapp){				
					if(this.equi.indexOf('Android') > -1 || this.equi.indexOf('Adr') > -1) {
						adwebkit.callApp("BACK", '');
					} else if(!!this.equi.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
						oswebkit.callApp("BACK", '');
					}					
				}else{
					this.$router.go(-1);
					return;
				}
			},	
			goHome(){
				this.$router.push({
					name:'home'
				});
			},
		},	
		mounted() {	
			//用户信息
			this.$axios.get(this.$root.urlPath.MCT+'/wap/company/comInfo', {
				headers:{
					'MC_UID': cookie.get('MC_UID')
				},
			})
			.then(res => {
				let data = res.data;						
				if(data.logo) {
					this.headImg = data.logo;
				}
				if(data.name) {
					this.user_name2 = data.name;
				}				
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
//			if(!this.isInapp){
//				this.homeShow=true;
//			}else if(this.isInapp){
//				if(this.$route.query.back==0){
//					this.homeShow=true;
//				}
//			}else{
//				this.homeShow=false;
//			}
		},		
	}
</script>
<style>
@import url("../../static/css/user.css");	
.entaccount_top .icon-zuojt{
	width: 0.25rem !important;
}
</style>