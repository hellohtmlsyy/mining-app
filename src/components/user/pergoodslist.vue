<template>
	<div>
		<!--头部-->
		<div class="fix">
			<div class="oHeader clearfix">
				<div class="leftA fl" @click="back">
					<i class="icon iconfont icon-jiantou-copy"></i>
					<span>我的采购</span>
				</div>
			</div>
		</div>
		<div class="pergoodsCon">
			<!--普通商品-->
			<div class="ordList" v-for="(item,index) in list1" :key="index" v-show="tabcommShow">
				<div class="ordCode clearfix"><span class="fl">{{item.ordpVO.serialno}}</span>
					<div class="ordStatus fr">{{item.ordpVO.status==0 ? '待付款' : (item.ordpVO.status==1 ? '卖家已付款' : (item.ordpVO.status==2 ? '待收货' : (item.ordpVO.status==-2 ? '交易关闭' : '交易关闭'))) }}</div>
				</div>
				<router-link :to="{path:'/user/ordlistdetail?newpage=newpage',query:{id:item.ordpVO.id,purtit:item.ordpVO.status}}" style="display: block;">
					<div v-for="(item1,index1) in list1[index].list" :key="index1">
						<div class="ordDet clearfix">
							<div class="detImg fl"><img :src="item1.rimg" /></div>
							<div class="detTit fl">{{item1.rtitle}}</div>
							<div class="detPri fr" align="right">{{item1.rprice|converAmount(2)|subStr(9)}}</div>
							<div class="delNum fr">x<span>{{item1.roquantity}}</span></div>
						</div>
					</div>
					<div class="totalPri">共<span class="num">{{nums[index]}}</span>件商品，合计：<span class="tpri">{{totalPri[index]|converAmount(2)}}</span></div>
				</router-link>
				<div class="oth" v-show="item.ordpVO.status==0">
					<button type="button" class="ocancel" @click="cancelOrd(item.ordpVO.serialno)">取消订单</button>
					<button type="button" class="opay" @click="settlement(list1[index].list.length,totalPri[index],item)">付款</button>
				</div>
				<div class="conf" v-show="item.ordpVO.status==2">
					<button type="button" class="oconf">确认收货</button>
				</div>
				<div class="ycancel" v-show="item.ordpVO.status==-2">
					<button type="button" class="oycancel">已取消</button>
				</div>
			</div>
			<divider v-show="blshow">暂无数据</divider>
		</div>
	</div>
</template>

<script>
	import Oheader from '@/components/common/header/Oheader';
	import { cookie } from 'vux'
	import { isDevice } from '@/assets/commonjs/util.js'
	export default {
		components: {
			Oheader
		},
		data() {
			return {
				title: '我的采购',
				off_on: false,
				list1: [],
				dealAmount: '',
				pageNum: 1,
				numPerPage: 10,
				status: 0,
				totalCount: '',
				blshow: false,
				tabShow: true,
				tabcommShow: true,
				ordStatus: '',
				totalPri: [],
				nums: [],
				isInapp: navigator.userAgent.indexOf('/mcapp') >= 0, //判断是否在app打开
				equi: navigator.userAgent,
			}
		},
		methods: {
			back() {
				if(this.isInapp) {
					if(this.equi.indexOf('Android') > -1 || this.equi.indexOf('Adr') > -1) {
						adwebkit.callApp("BACK", '');
					} else if(!!this.equi.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
						oswebkit.callApp("BACK", '');
					}
				} else {
					this.$router.go(-1);
					return;
				}
			},
			scrollValue() {
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
					document.documentElement.scrollTop || document.body.scrollTop
					if(document.body.clientHeight && document.documentElement.clientHeight) {
						clientHeight1 = Math.min(document.body.clientHeight, document.documentElement.clientHeight);
					} else {
						clientHeight1 = Math.max(document.body.clientHeight, document.documentElement.clientHeight);
					}
					//获取文档完整的高度 
					let pergoodsConHeight = document.getElementsByClassName('pergoodsCon');
					let scrollHeight1 = pergoodsConHeight[0].scrollHeight;
					//滚动事件触发
					$(window).bind('scroll', function() {
						if(scrollTop1 + clientHeight1 >= scrollHeight1 + 10) {
							if(that.off_on) {
								that.off_on = false;
								that.pageNum++;
								that.getcommGoodslist();
							}
						}
					})
					if(that.list1.length == that.totalCount) {
						that.off_on = false;
						that.blshow = true;
					}
				});
			},
			getcommGoodslist() {
				this.$axios.get(this.$root.urlPath.MCT + '/generalGoodsOrderList/generalGoodsOrder?', {
						params: {
							pageNum: this.pageNum,
							numPerPage: this.numPerPage,
							status: this.status,
						},
						headers: {
							'MC_UID': cookie.get('MC_UID')
						},
					})
					.then(res => {
						if(res.data.success) {
							let data = res.data.data;
							this.totalCount = data.totalCount;
							if(data.arrayList.length == 0) {
								this.blshow = true;
							}
							for(var i in data.arrayList) {
								this.list1.push(data.arrayList[i]);
								let upri = 0;
								let num = 0;
								//每个订单总价
								for(var j in data.arrayList[i].list) {
									num += data.arrayList[i].list[j].roquantity *1;
									upri += data.arrayList[i].list[j].roquantity * data.arrayList[i].list[j].rprice;
									if(j == data.arrayList[i].list.length - 1) {
										this.totalPri.push(upri)
										this.nums.push(num);
									}
								}
							}
							this.off_on = true;
						}
					})
					.catch(err => console.log('获取数据失败', err))
			},
			cancelOrd(id) {
				this.$axios.get(this.$root.urlPath.MCT + '/generalGoodsOrderList/cancelOrder?', {
						params: {
							serialno: id,
							status: this.status,
						},
						headers: {
							'MC_UID': cookie.get('MC_UID')
						},
					})
					.then(res => {
						if(res.data.success) {
							location.reload();
						}
					})
					.catch(err => console.log('获取数据失败', err))
			},
			settlement(num, totalPrice, item) {
				if(isDevice() !== '微信浏览器' && isDevice() !== 'ios' && isDevice() !== 'adr') {
					this.$vux.alert.show({
						title: '提示',
						content: '请前往官网电脑端结算http://www.miningcircle.com',
						onHide() {}
					})
					return
				}

				if(isDevice() == 'ios' || isDevice() == 'adr') {
					this.$axios.get(this.$root.urlPath.MC + '/wap/trade.do?paybill', {
						params: {
							payType: 'normal'
						}
					})
					.then(res => {
						if(res.data.success) {
							var data = res.data.data
							let id = item.list[0].id;
							let rtitle = item.list[0].rtitle;
							window.location.href = "http://www.miningcircle.com/user/mn.do?rechargeBank&shopno=" + data.serialno + "&resnum=" + num + "&resremark=" + rtitle + "&v_amount=" + totalPrice + "&bank_pay=wxpay"
						} else {
							//alert(res.data.errMsg)
						}
					})
					.catch(function(error) {
						alert(error)
					});
					

				} else if(isDevice == '微信浏览器') {
					location.href = this.$root.urlPath.MCM + "/mall/pay?newpage=newpage&payType=normal";
				}
			}
		},
		mounted() {
			this.getcommGoodslist();
			this.scrollValue();
		},
	}
</script>

<style>
	@import url("../../static/css/ordlist.css");
	.pergoodsCon {
		position: absolute;
		left: 0;
		top: 0.88rem;
		width: 100%;
	}
	/*订单列表*/
	
	.ordList .oth,
	.ordList .conf,
	.ordList .ycancel {
		padding: 0.15rem;
		text-align: right;
	}
	
	.ordList .oth button {
		padding: 0.1rem 0.3rem;
		border-radius: 0.08rem;
	}
	
	.ordList .oth .ocancel {
		color: #757575;
		border: 0.02rem solid #aaa;
		background: #fff;
		margin-right: 0.15rem;
	}
	
	.ordList .oth .opay,
	.ordList .conf .oconf {
		color: #fff;
		background: #FF4F54;
		border: none;
		border: 0.02rem solid #FF4F54;
		border-radius: 0.08rem;
		padding: 0.1rem 0.3rem;
	}
	
	.ordList .ycancel .oycancel {
		border-radius: 0.08rem;
		padding: 0.1rem 0.3rem;
		background: #e5e5e5;
		color: #505050;
		border: none
	}
</style>