<template>
	<div class="databaseDetails">
		<com-header :title="details.name">
			<div slot="rightA" @click="share">
				<i class="icon iconfont icon-tubiao212"></i>
			</div>
		</com-header>
		<div class="clearfix">
			<sticky scroll-box="vux_view_box_body" :check-sticky-support="false" :offset="46">
				<div ref="tabBoxOuter" class="tab fl" style="width:100%;overflow:scroll;-webkit-overflow-scrolling:touch;">
					<tab ref="tabBox" style="background-color: #f2f4f5;font-size: 0.28rem" active-color="rgb(225, 158, 36)" :line-width="3">
						<tab-item v-for="(item,index) in column" :key="index" @on-item-click="tabClick(item, index)" :selected="index===0">{{item}}
						</tab-item>
					</tab>
				</div>
			</sticky>
		</div>

		<div v-show="showType == 0">
			<div class="card">
				<div class="title">
					行情
				</div>
				<div class="content">
					<div class="cellM">
						<label>交易所：</label>{{details.market_exchange}}
					</div>
					<div class="cellM">
						<label>股票代码：</label>{{details.symbol}}
					</div>
					<div class="cellM">
						<label>股价：</label>{{shareMap.price}}
					</div>
					<div class="cellM">
						<label>币种：</label>{{details.currency}}
					</div>
					<div class="cellM">
						<label>总市值：</label>{{changeMarketValue}}
					</div>
				</div>
			</div>

			<div class="card">
				<div class="title">
					简介
				</div>
				<div class="content">
					<div class="cellM">
						<label>矿种：</label>{{details.supplyUp}}
					</div>
					<div class="cellM">
						<label>阶段：</label>{{details.status}}
					</div>
					<div class="cellM">
						<label>地区：</label>{{details.country}}
					</div>
					<div class="cellM">
						<label>总部位置：</label>{{details.address}}
					</div>
				</div>
			</div>

			<div class="card">
				<div class="title">公司介绍</div>
				<div class="content intro">
					{{details.introduction}}
				</div>
			</div>
		</div>

		<!--股票动态-->
		<div class="shares" v-show="showType == 1">
			<div class="baseInfo">
				<div class="title">{{details.name}} -{{shareMap.market_exchange}}</div>
				<div class="content">
					<span class="num">{{shareMap.price}}</span>
					<span :class="showGoIco ? 'colorL' : 'colorH'">
						<span v-if="showGoIco">↑</span>
						<span class="downJiantou" v-if="!showGoIco">↓</span>
						{{shareMap.rise}}({{shareMap.rise_ratio}}%)
					</span>
					<span class="date">{{changeDate}}</span>
				</div>
				<div class="btnBox">
					<div class="btn1 btn">
						<a :href="shareMap.symbol_link">雅虎财经</a></div>
					<div class="btn2 btn"><a :href="shareMap.price_link">股票走势图</a></div>
				</div>
			</div>
			<div class="details">
				<div class="rowM clearfix">
					<label class="fl">昨收：</label><span class="fr">{{shareMap.close}}</span>
				</div>
				<div class="rowM clearfix">
					<label class="fl">今开：</label><span class="fr">{{shareMap.open}}</span>
				</div>
				<div class="rowM clearfix">
					<label class="fl">买入价：</label><span class="fr">{{shareMap.bid}}</span>
				</div>
				<div class="rowM clearfix">
					<label class="fl">卖出价：</label><span class="fr">{{shareMap.ask}}</span>
				</div>
				<div class="rowM clearfix">
					<label class="fl">一年股价预测：</label><span class="fr">N/A</span>
				</div>
				<div class="rowM clearfix">
					<label class="fl">Beta：</label><span class="fr">N/A</span>
				</div>
				<div class="rowM clearfix">
					<label class="fl">Next Earning Date：</label><span class="fr">N/A</span>
				</div>
				<div class="rowM clearfix">
					<label class="fl">今日价格幅度：</label><span class="fr">{{shareMap.low}} - {{shareMap.high}}</span>
				</div>
				<div class="rowM clearfix">
					<label class="fl">52周股价变化：</label><span class="fr">{{shareMap.low52}} - {{shareMap.high52}}</span>
				</div>
				<div class="rowM clearfix">
					<label class="fl">成交量：</label><span class="fr">{{shareMap.vol}}</span>
				</div>
				<div class="rowM clearfix">
					<label class="fl">平均日交易量：</label><span class="fr">{{shareMap.avgdailyvol}}</span>
				</div>
				<div class="rowM clearfix">
					<label class="fl">市值：</label><span class="fr">{{details.market_value}}</span>
				</div>
				<div class="rowM clearfix">
					<label class="fl">市盈率PE：</label><span class="fr">N/A</span>
				</div>
				<div class="rowM clearfix">
					<label class="fl">EPS：</label><span class="fr">N/A</span>
				</div>
				<div class="rowM clearfix">
					<label class="fl">Div&Yield：</label><span class="fr">N/A</span>
				</div>
			</div>
		</div>

		<!--项目列表-->
		<div v-show="showType == 2">
			<div class="card" v-for="(item,index) in project">
				<div class="title">
					{{item.title}}
				</div>
				<div class="content">
					<div class="cellM">
						<div>
						<label>矿种：</label>{{item.commodities}}
						</div>
						<div>
						<label>阶段：</label>{{item.programstatus}}
						</div>
						<div>
						<label>地区：</label>{{item.address}}
						</div>
						<div>
						<label>资产类型：</label>{{item.assettype}}
						</div>
						<div>
						<label>开采方式：</label>{{item.typework}}
						</div>
					</div>
				</div>
			</div>
		</div>
		<!--主页演示-->
		<div v-show="showType == 3">
			<!--{{details.website}}-->
			<iframe :src="details.website" style="width: 100%;height:700px"></iframe>
		</div>
		<!--联系方式-->
		<div class="contact" v-show="showType == 4" v-html="contact.content">
			<!--<div class="rowM">
				{{contact.name}}
			</div>
			<div class="rowM">
				{{contact.}}
			</div>
			<div class="rowM">
				地点
			</div>
			<div class="numBox">
			<div class="rowM">
				<span class="tel num">+18631238272</span>
			</div>
			<div class="rowM">
				<span class="phone num">+18631238272</span>
			</div>-->
			</div>
		</div>
	</div>
</template>

<script>
	import comHeader from '@/components/base/comHeader'
	import { Tab, TabItem, Sticky } from 'vux'
	import { getAppShare, isDevice,getTime} from '@/assets/commonjs/util.js';

	export default {
		components: {
			comHeader,
			Tab,
			TabItem,
			Sticky
		},
		data() {
			return {
				column: ["基本信息", "股票动态", "项目列表", "主页演示", "联系方式"],
				selected: "基本信息",
				index: 0,
				showType: 0,
				id: this.$route.query.id,
				details: "",
				project:"",
				contact:'',
				shareMap:'',
				iframeHeight:""
			}
		},
		mounted() {
			this.getDetails()
			this.getProject()
			this.iframeHeight = document.body.clientHeight
		},
		computed:{
			changeDate(){
				return getTime(this.shareMap.deadline_time)
			},
			showGoIco(){
				if(this.shareMap.rise_ratio >= 0){
					return true
				}else{
					return false
				}
			},
			changeMarketValue(){
				return this.details.market_value / 1000000   + '百万'
			}
		},
		methods: {
			share() {
				if(isDevice() == '其他浏览器') {
					//					this.show1 = true
				} else if(isDevice() == 'adr' || isDevice() == 'ios') {
					getAppShare(window.location.href, this.details.name, this.details.logo, this.details.introduction, "")
				}
			},
			tabClick(item, index) {
				this.showType = index
			},
			getDetails() {
				this.$axios.get(this.$root.urlPath.MC + '/wap/globalDb.do?globalDbDetail', {
						params: {
							id: this.id
						}
					})
					.then(res => {
						console.log(res)
						var data = res.data

						if(data.success) {
							this.details = data.data.detail
							this.contact = data.data.contact
							this.shareMap = data.data.shareMap
							console.log(this.shareMap)
						}
					})
					.catch(function(error) {
						alert(error)
					});
			},
			getProject() {
				this.$axios.get(this.$root.urlPath.MC + '/wap/globalDb.do?itemList', {
						params: {
							id: this.id
						}
					}).then(res => {
						
						var data = res.data
						if(data.success){
							this.project = data.data.list
						}
					})
					.catch(function(error) {
						alert(error)
					});
			}
		}
	}
</script>

<style>
	
	
	
	.databaseDetails .icon-tubiao212 {
		font-size: 0.36rem;
	}
	.databaseDetails .intro{
		line-height: 0.5rem;
	}
	.databaseDetails .tab {
		margin-top: 1rem;
	}
	
	.databaseDetails .shares .baseInfo {
		background: url(../../../static/img/sharesBg.png) no-repeat;
		background-size: 7.5rem 2.5rem;
		padding: 0.2rem;
		margin-top: 0.15rem
	}
	
	.databaseDetails .shares .baseInfo .title {
		font-size: 0.24rem;
		color: #fff;
		line-height: 0.3rem;
	}
	
	.databaseDetails .shares .baseInfo .content {
		color: #fff;
		line-height: 0.5rem;
	}
	.databaseDetails .shares .baseInfo .num {
		font-size: 0.36rem;
		margin-right: 0.3rem;
	}
	
	.databaseDetails .shares .baseInfo .date {
		font-size: 0.24rem;
		margin-left: 1rem;
	}
	
	.databaseDetails .shares .baseInfo .content .colorL {
		color: #11d251;
		font-size: 0.3rem;
	}
	.databaseDetails .shares .baseInfo .content .colorH{
		color: red;
		font-size: 0.3rem;
	}
	.databaseDetails .shares .baseInfo .btnBox {
		display: flex;
		margin: 0.04rem 0;
	}
	
	.databaseDetails .shares .baseInfo .btn1 {
		background-color: #F28C10;
		margin-right: 0.3rem;
	}
	
	.databaseDetails .shares .baseInfo .btn2 {
		background-color: #1B50CE;
	}
	
	.databaseDetails .shares .baseInfo .btn {
		font-size: 0.28rem;
		color: #fff;
		padding: 0.16rem 0.3rem;
		border-radius: 0.05rem;
	}
	
	.databaseDetails .shares .details {
		background-color: #fff;
		padding: 0 0.24rem;
	}
	
	.databaseDetails .shares .details label {
		font-size: 0.26rem;
	}
	
	.databaseDetails .shares .details span {
		font-size: 0.24rem;
	}
	
	.databaseDetails .shares .rowM {
		border-bottom: 0.01rem solid rgb(230, 230, 230);
		height: 0.74rem;
		line-height: 0.74rem;
	}
	
	/*联系方式*/
	.databaseDetails .contact{
		font-size: 0.24rem;
		background-color:#fff ;
		margin-top: 0.15rem;
		padding: 0.24rem;
	}
	.databaseDetails .contact .rowM{
		line-height: 0.48rem;
	}
	/*.databaseDetails .contact .fa-phone:before{
		background:url(../../../static/img/tel.png) no-repeat; 
	}
	.databaseDetails .contact .phone:before{
		background:url(../../../static/img/phone.png) no-repeat; 

	}

	.databaseDetails .contact .fa:before{
		content:"";
		display: inline-block;
		width: 0.2rem;
		height: 0.35rem;
		background-size: 0.35rem;
		vertical-align: top;
    	margin-top: 0.08rem;
	}*/
		
	.databaseDetails .contact .numBox{
		margin-top: 0.15rem;
	}
</style>