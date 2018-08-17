<template>
	<div>
		<!--头部-->
		<div class="fix">
			<div class="oHeader clearfix">
				<div class="leftA fl" @click="back">
					<i class="icon iconfont icon-jiantou-copy"></i>
					<span>{{title}}</span>
				</div>				
			</div>
		</div>
		<div class="goodsCon">
			<div class="goodTab">
				<ul class="clearfix">
					<li class="active">
						<router-link :to="{path:'/user/supordlist'}">大宗商品</router-link>
					</li>
					<li>
						<router-link :to="{path:'/user/supcommordlist'}">普通商品</router-link>
					</li>
				</ul>
			</div>
			<div class="ordList" v-for="(item,index) in orderVOS" :key="item.id">
				<div class="ordCode">订单号：<span>{{item.orderId}}</span></div>
				<div class="ordDet clearfix">
					<div class="detImg fl"><img :src="item.logo" /> </div>
					<div class="detTit fl">{{item.title}}</div>
					<div class="detPri fr" align="right">{{item.dealAmount|converAmount(2)|subStr(9)}}</div>
					<div class="delNum fr">x<span>{{item.dealQuantity}}</span></div>
				</div>
				<div class="totalPri">共<span class="num">{{item.dealQuantity}}</span>件商品，合计：<span class="tpri">{{item.dealAmount*item.dealQuantity| converAmount(2)}}</span></div>
			</div>
			<!--<divider v-show="blshow">我是有底线的</divider>-->
			<divider v-show="nodata">暂无数据</divider>
		</div>

	</div>
</template>

<script>
	import Oheader from '@/components/common/header/Oheader';
	import { cookie } from 'vux'
	export default {
		components: {
			Oheader,
		},
		data() {
			return {
				title: '我的供应',
				off_on: false,
				orderVOS: [],
				dealAmount: '',
				pageNum: 1,
				numPerPage: 10,
				status: 0,
				function: 'commodityDemandOrderList',
				totalCount: '',
				blshow: false,
				tabShow: true,
				tabcommShow: false,
				isInapp:navigator.userAgent.indexOf('/mcapp')>=0,//判断是否在app打开
				equi:navigator.userAgent,
				nodata:false,
			}
		},
		methods: {
			back() {
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
			getsupGoodsList() {
				this.$axios.get(this.$root.urlPath.MCT + '/order/commdity?', {
						params: {
							pageNum: this.pageNum,
							numPerPage: this.numPerPage,
							status: this.status,
							function: this.function,
						},
						headers: {
							'MC_UID': cookie.get('MC_UID')
						},
					})
					.then(res => {
						if(res.data.success) {
							let data = res.data.data;
							this.totalCount = data.totalCount;
							for(var i in data.orderVOS) {
								this.orderVOS.push(data.orderVOS[i]);
							}
							if(data.orderVOS.length==0){
								this.nodata=true;
							}
							this.off_on = true;

						}
					})
					.catch(err => console.log('获取数据失败', err))
			},

		},
		mounted() {
			this.getsupGoodsList();
			var that = this;
			window.addEventListener('scroll', function() {
				//获取滚动条当前的位置
				let scrollTop1 = 0;
				if(document.documentElement && document.documentElement.scrollTop) {
					scrollTop1 = document.documentElement.scrollTop;
				} else if(document.body) {
					scrollTop1 = document.body.scrollTop;
				}

				//获取当前可视范围的高度 
				let clientHeight1 = 0;
				if(document.body.clientHeight && document.documentElement.clientHeight) {
					clientHeight1 = Math.min(document.body.clientHeight, document.documentElement.clientHeight);
				} else {
					clientHeight1 = Math.max(document.body.clientHeight, document.documentElement.clientHeight);
				}
				//获取文档完整的高度 
				let goodsConHeight = document.getElementsByClassName('goodsCon');
				let scrollHeight1 = goodsConHeight[0].scrollHeight;
				//滚动事件触发
				$(window).bind('scroll', function() {
					if(scrollTop1 + clientHeight1 >= scrollHeight1 + 10) {
						if(that.off_on) {
							that.off_on = false;
							that.pageNum++;
							that.getsupGoodsList();
						}
					}
				})
				if(that.orderVOS.length == that.totalCount) {
					that.off_on = false;
					that.nodata = true;
				}
			});
		},
	}
</script>

<style>
@import url("../../static/css/ordlist.css");
</style>