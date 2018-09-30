<template>
	<div class="entcenter">
		<!--企业top-->
		<div class="entaccount_top entTopShow">
			<div class="head clearfix">
				<i class="iconfont icon-jiantou-copy fl" @click="appBack"></i>
				<div class="fr">
					<img class="sett" src="../../../static/img/user2.0/enterprise/setting.png" alt="" v-show="shezhiShow" @click="appPopWindow()"/>
					<span class="toggle" @click="goUser()">切换为个人</span>
				</div>
			</div>
			<div class="info clearfix">
				<img class="icon-wode-F fl" :src="headImg">
				<div class="user_con fl">
					<div class="user_name">{{name |subStr(11)}}</div>
					<div class="goShop" @click="goshop()">查看店铺 ></div>
				</div>
			</div>
		</div>
		<!--企业con-->
		<!-- 订单管理 -->
		<div class="content ent entShow">
			<div class="mtool">
				<div class="tit">
					<p>订单管理</p>
				</div>
				<grid :show-lr-borders="false" :show-vertical-dividers="true">
					<grid-item :link="linkTo.supordlist">
						<img slot="icon" src="../../../static/img/user2.0/enterprise/supply.png">
						<div class="mtool_con">
							<p>我的供应</p>
							<span>供应的商品订单</span>
						</div>
					</grid-item>
					<grid-item :link="linkTo.purordlist">
						<img slot="icon" src="../../../static/img/user2.0/enterprise/purchase.png">
						<div class="mtool_con">
							<p>我的采购</p>
							<span>采购的商品订单</span>
						</div>
					</grid-item>
				</grid>
			</div>
			<div class="mtool">
				<div class="tit">
					<p>求购管理</p>
				</div>
				<grid :show-lr-borders="false" :show-vertical-dividers="true">
					<grid-item :link="linkTo.purchase">
						<img slot="icon" src="../../../static/img/user2.0/enterprise/buy.png">
						<div class="mtool_con">
							<p>我的求购</p>
							<span>发布的求购单</span>
						</div>
					</grid-item>
					<grid-item :link="linkTo.offer">
						<img slot="icon" src="../../../static/img/user2.0/enterprise/offer.png">
						<div class="mtool_con">
							<p>我的报价</p>
							<span>我进行的报价</span>
						</div>
					</grid-item>
				</grid>
			</div>
			<!-- 投资管理 -->
			<div class="mtool mtool_ser">
				<div class="tit">
					<p>投资管理</p>
				</div>
				<grid :show-lr-borders="false" :show-vertical-dividers="true">
					<grid-item :link="linkTo.inv">
						<img slot="icon" src="../../../static/img/user2.0/enterprise/invest.png">
						<div class="mtool_con">
							<p>预约投资</p>
							<span>预约的投资项目</span>
						</div>
					</grid-item>
				</grid>
			</div>
			<!-- 我的钱包 -->
			<div class="mtool mtool_ser">
				<div class="tit">
					<p>资金管理</p>
				</div>
				<grid :show-lr-borders="false" :show-vertical-dividers="true">
					<grid-item :link="linkTo.entpurse">
						<img slot="icon" src="../../../static/img/user2.0/enterprise/wallet.png">
						<div class="mtool_con">
							<p>我的钱包</p>
							<span>我的矿业圈钱包</span>
						</div>
					</grid-item>
				</grid>
			</div>
		</div>
	</div>
</template>
<script>
	import { cookie } from 'vux'
	import {lastPage} from '@/assets/commonjs/util.js';
	export default {		
		data() {
			return {
				//企业
				name: '',
				headImg: this.$root.urlPath.MCM + '/static/img/user2.0/enterprise/head.png',
				equi:navigator.userAgent,
				isInapp:navigator.userAgent.indexOf('/mcapp')>=0,//判断是否在app打开
				linkTo: {
					purordlist: this.$root.urlPath.MCM + '/user/purordlist?newpage=newpage',
					supordlist: this.$root.urlPath.MCM + '/user/supordlist?newpage=newpage',
					purchase: 'http://member0.miningcircle.com/man_purchase',
					offer: 'http://member0.miningcircle.com/man_quote',
					inv: this.$root.urlPath.MCM + '/invest?newpage=newpage',
					entpurse: this.$root.urlPath.MCM + '/entPurse?newpage=newpage',
				},
				shezhiShow: false,
				companyId: '',
			}
		},
		methods: {			
			appBack() {		
				lastPage()
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
			getInfo(){
				this.$axios.get(this.$root.urlPath.MCT+'/wap/company/comInfo', {
					headers:{
						'MC_UID': cookie.get('MC_UID')
					},
				})
				.then(res => {
					this.name = res.data.name;
					this.companyId = res.data.companyId; 
					if(res.data.logo !='' && res.data.logo != null){
						this.headImg = res.data.logo
					}
				}).catch(err => console.log('个人账户异常', err));	
			},
			goUser(){
				location.href = this.$root.urlPath.MCM + "/users/center?newpage=newpage"
			},
			goshop(){
				location.href = this.$root.urlPath.MCM + "/flagship?shopId=" + this.companyId + '&newpage=newpage'
			}
		},	
		mounted() {	
			if(this.isInapp){				
				if(this.equi.indexOf('Android') > -1 || this.equi.indexOf('Adr') > -1) {//						
					this.shezhiShow=true;
				} else if(!!this.equi.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {		
					this.shezhiShow=false;
				}	
			}else{
				this.shezhiShow=false;
			}	
			this.getInfo()
		},		
	}
</script>
<style>
@import url("../../static/css/user2.0.css");	
/*.per .mtool .weui-grid,.per .mtool .weui-grids,.per .mtool .weui-grids:before,.weui-grids:after{
	border: none!important;
}*/
.entaccount_top .icon-zuojt{
	width: 0.25rem !important;
}
</style>