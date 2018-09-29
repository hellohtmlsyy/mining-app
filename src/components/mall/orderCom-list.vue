<template>
	<div class="orderList comlist">
		<!--头部-->
		<div class="oHeader clearfix">
			<div class="leftA fl" @click="back">
				<i class="icon iconfont icon-jiantou-copy"></i>
				<span>购物车({{this.orderList.length}})</span>
			</div>
		</div>
		<div class="listBox">
		<div class="list clearfix bgcolor" v-for="(item,index) in orderList" :key="index">
			<div class="fl">
				<input type="checkbox" class="checkbox" :value='index' v-model="item.checked" @click="checkMall(item)" />
			</div>
			<div class="fl">
				<img :src="item.img" />
			</div>
			<div class="fl">
				<div>
					<div class="name fl clamp2">
						{{item.title}}
					</div>
					<div class="fr">
						<i class="icon iconfont icon-icon7 fr" @click="del(item.oid,index)"></i>
					</div>
				</div>
				<div>
					<div class="fl" v-show="item.cat_id !== 8100">
						<inline-x-number width="50px" :min="1" v-model="item.deal_quantity" @on-change="changeCount(index)"></inline-x-number>

					</div>
					<div class="fr">
						<!--<span class="numb">共{{item.deal_quantity}}</span>-->
						<span class="price">{{item.deal_amount * item.deal_quantity | converAmount(2)}}</span>
					</div>
				</div>
			</div>
		</div>
		</div>
		<div class="bottomM  bgcolor">
			<div class="clearfix">
				<div class="priceBox fl">
					<span class="total">订单总计：</span>
					<span class="totalPrice">{{payment.price | converAmount(2)}}</span>
				</div>
				<div class="submitBtn fr" @click="goBalance">订单确认</div>
			</div>
		</div>

		<toast v-model="show1" :time="2000" type="text" width="2rem">您还没有选择商品哦</toast>
	</div>
</template>

<script>
	import axios from 'axios'
	import { InlineXNumber } from 'vux'
	import {isDevice} from '@/assets/commonjs/util.js'
	
	export default {
		components: {
			InlineXNumber
		},
		data() {
			return {
				check: [],
				orderList: [],
				//				totalPrice:0,
				type: '', //1点击删除,0点击数量加减
				show1: false,
				equi: navigator.userAgent,
				isInapp: navigator.userAgent.indexOf('/mcapp') >= 0, //判断是否在app打开				
				show2: false,
			}
		},
		mounted() {
			this.getCartList()
		},
		computed: {
			payment() {
				let num = 0;
				let price = 0;
				//遍历数组				
				this.orderList.forEach(ele => {
					if(ele.checked) {
						//						num += ele.num;
						price += ele.deal_quantity * ele.deal_amount;
					}
				});

				return {
					num,
					price
				};
			}
		},
		methods: {
			checkMall(orderObj) {
				if(orderObj.isChecked == void 0) {
					this.$set(orderObj, "isChecked", false)
				} else {
					orderObj.isChecked = !orderObj.isChecked;
				}
			},
			goBalance() {
				let checkOrderId = '';
				this.orderList.forEach(ele => {
					if(!ele.checked) {
						this.show1 = true;
						return;
					} else {
						if(ele.checked) {
							this.show1 = false;
							checkOrderId += ele.oid + ',';
							let resultCheckOrderId = checkOrderId.slice(0, checkOrderId.length - 1);
							if(typeof(Storage) !== "undefined") {
								var shop = {
									orderId: resultCheckOrderId
								}
								shop = JSON.stringify(shop)
								localStorage.setItem('shop', shop);
								location.href = this.$root.urlPath.MCM + "/mall/orderCom_balance?newpage=newpage"

							} else {
								alert("抱歉! 您的浏览器不支持 web 存储。")
							}
//							if(this.$route.query.where == 'meeting') {
//								window.location.href = this.$root.urlPath.MCM + "/mall/orderCom_balance?newpage=newpage&where=meeting&id=" + this.$route.query.id;
//							} else {
								window.location.href = this.$root.urlPath.MCM + "/mall/orderCom_balance?newpage=newpage&id=" + this.$route.query.id;
//							}
						}
					}
				})

			},
			changeCount(idx) {
				//				this.type = 0
				if(this.type !== 1) {
					axios.get(this.$root.urlPath.MC + '/wap/trade.do?normalPurchaseQuantityChange', {
							params: {
								orderId: this.orderList[idx].oid,
								dealQuantity: this.orderList[idx].deal_quantity
							}
						})
						.then(res => {
							if(res.data.success) {

							} else {
								console.log(res.data.errMsg)
							}
						})
						.catch(function(error) {
							//						
						});
				} else {

				}
			},
			getCartList() {
				axios.get(this.$root.urlPath.MC + '/wap/trade.do?normalPurchaseCartList')
					.then(res => {
						if(res.data.success) {
							this.orderList = res.data.data
							this.orderList.forEach(ele => {
								this.$set(ele, 'checked', false); //							
							});
						} else {
							console.log(res.data.errMsg)
						}
					})
					.catch(function(error) {
						//						alert(error)
					});
			},
			back() {
				if(isDevice() == 'adr') {
					adwebkit.callApp("BACK", '');
				} else if(isDevice() == 'ios') {
					oswebkit.callApp("BACK", '');
				} else {
//					window.location.href = this.$root.urlPath.MCM + "/exhibition/details?newpage=newpage&id=" + this.$route.query.id;
//					if(this.$route.query.where == 'meeting') {
//						window.location.href = this.$root.urlPath.MCM + "/exhibition/details?newpage=newpage&id=" + this.$route.query.id;
//					} else {
//						window.location.href = this.$root.urlPath.MCM + "/mallCom/details?newpage=newpage&id=" + this.$route.query.id;
//					}
					this.$router.go(-1)

				}
			},
			del(orderId, idx) {
				this.orderList.splice(idx, 1)

				this.type = 1

				axios.get(this.$root.urlPath.MC + '/wap/trade.do?delNormalPurchaseOrder', {
						params: {
							orderId: orderId
						}
					})
					.then(res => {
						if(res.data.success) {
							this.$vux.toast.text('删除成功', 'center');
						} else {
							this.$vux.toast.text('删除失败', 'center');
							return
						}
					})
					.catch(function(error) {});
			}
		}
	}
</script>

<style>
	.orderList .listBox{
		margin: 1rem 0 0.8rem 0;
		border:none
	}
	.orderList .list {
		padding: 0.1rem 0;
	}
	
	.orderList .list img {
		width: 1.2rem;
		height: 1.2rem;
		margin: 0 0.2rem;
	}
	
	.orderList .list .name {
		font-size: 0.26rem;
		margin-bottom: 0.1rem;
		width: 4.8rem;
		height: 0.7rem;
	}
	
	.orderList .list .numb {
		font-size: 0.24rem;
		color: #787878;
		margin-right: 0.1rem;
	}
	
	.orderList .list .price {
		font-size: 0.3rem;
		color: red;
		margin-right: 0.2rem;
	}
	
	.orderList .list .icon-icon7 {
		margin-bottom: 0.4rem;
	}
	
	.orderList .list .vux-number-selector-sub {
		line-height: 0.4rem;
		text-align: center;
		width: 0.4rem;
		height: 0.4rem;
		padding: 0
	}
	
	.orderList .list .vux-number-selector-plus {
		line-height: 0.4rem;
		text-align: center;
		width: 0.4rem;
		height: 0.4rem;
		padding: 0
	}
	
	.orderList .list .vux-number-input {
		height: 0.27rem;
		width: 0.8rem !important;
		font-size: 0.24rem;
	}
	
	.orderList .list .vux-number-selector svg {
		width: 0.2rem;
		fill: #777777;
	}
	
	.orderList .bottomM {
		height: 0.8rem;
		line-height: 0.8rem;
		position: fixed;
		bottom: 0;
		width: 100%;
	}
	
	.orderList .priceBox {
		margin-left: 0.2rem;
	}
	
	.orderList .bottomM .total {
		font-size: 0.28rem;
	}
	
	.orderList .bottomM .totalPrice {
		font-size: 0.3rem;
		color: red;
	}
	
	.orderList .bottomM .submitBtn {
		font-size: 0.32rem;
		color: #fff;
		background: #FF5155;
		padding: 0 0.4rem;
		margin-left: 0.2rem;
	}
	
</style>