<template>
	<div class="orderConfirm">
		<!--头-->
		<div class="oHeader clearfix">
			<div class="leftA fl" @click="back">
				<i class="icon iconfont icon-jiantou-copy"></i>
				<span>{{title ? title : '结算页'}}</span>
			</div>
		</div>
		<!--地址-->
		<div class="content">
		<div class="addressBox clearfix bgcolor" @click="goWriteAddress">
			<div class="fl dituicoBox">
				<i class="icon iconfont icon-dizhi"></i>
			</div>
			<div class="writeAddress" v-if="curAddress == null">
				请填写您的收货地址
			</div>
			<div v-else >
				<div class="curAddress fl">
					<div class="namePhoneBox">
						<span>{{curAddress.name}}</span><span>{{curAddress.tel}}</span>
					</div>
					<div class="address">{{curAddress.province}}&nbsp;{{curAddress.city}}&nbsp;{{curAddress.county}}&nbsp;{{curAddress.addr}}</div>
				</div>
				<div class="fr">
					<i class="icon iconfont icon-jiantou"></i>
				</div>
			</div>
		</div>
		<!--商品信息-->
		<div class="mallInfo bgcolor">
			<div v-for="(item,index) in balanceInfo" :key="index">
				<div class="compony">
					{{item.name}}
				</div>
				<div class="mall" v-for="(item,index) in balanceInfo[index].res" :key="index">
					<div class="imgTitleBox clearfix">
						<div class="fl">
							<img :src="item.img" />
						</div>
						<div class="mallName fl">
							<p>{{item.title}}</p>
							<span class="priceType">{{item.title2}}</span>
						</div>
					</div>
					<div>
						<div class="priceBox1 clearfix">
							<div class="fl">
								<span>单价：</span>
								<span class="spanVal">{{item.price | converAmount(2)}}</span>
							</div>
							<div class="fr">
								<span class="price">{{item.price * item.quantity | converAmount(2)}}</span>
							</div>
						</div>
						<div class="priceBox2 clearfix">
							<div class="fr">
								<span class="spanVal">*{{item.quantity}}</span>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div>
				<div class="cellM">
					<x-input title="发票抬头" placeholder="请填写" placeholder-align="right" v-model="bill">
					</x-input>
				</div>
				<cell is-link value="暂无优惠">
					<span slot="title"><span style="vertical-align:middle;">店铺优惠</span>
					</span>
				</cell>
				<cell value="快递免邮">
					<span slot="title"><span style="vertical-align:middle;">配送方式</span>
					</span>
				</cell>
			</div>
		</div>
		<!--优惠-->
		<div class="allDiscount bgcolor">
			<cell is-link value="暂无优惠">
				<span slot="title"><span style="vertical-align:middle;">全场优惠</span>
				</span>
			</cell>
		</div>
		</div>
		<div class="bottomM clearfix">
			<div class="fr">
				<div class="fl">
					<span class="total">合计：</span>
					<!--{{item.res[index].price * item.res[index].quantity | converAmount(2)}}-->
					<span class="totalPrice">{{totalPrice | converAmount(2)}}</span>
				</div>
				<div class="submitBtn fl" @click="balance">结算</div>
			</div>
		</div>

		<!--提示框-->
		<div>
			<confirm v-model="showAddress" @on-cancel="onCancel" @on-confirm="onConfirm" @on-show="onShow" @on-hide="onHide">
				<p style="text-align:center;">请填写您的收货地址</p>
			</confirm>

		</div>
	</div>
</template>

<script>
	import axios from 'axios'
	import { Cell } from 'vux'
	import { isDevice } from '@/assets/commonjs/util.js'
	export default {
		components: {
			Cell
		},
		props: ['title'],
		data() {
			return {
				showAddress: false,
				balanceInfo: [],
				mallInfo: [],
				curAddress: '',
				bill: '',
				ggid: '', //全场优惠id
				cgid: '',
				ogid: '',
				totalPrice: 0
			}
		},
		mounted() {
			this.getBalance()
			this.getAddress()
			this.getBill()
		},
		methods: {
			goWriteAddress() {

				window.location.href = this.$root.urlPath.MCM + "/mall/order_addressList?newpage=newpage&id=" + this.$route.query.id;
			},
			getAddress() {

				var shop = localStorage.getItem("shop")
				var curAddressIdx = JSON.parse(shop).curAddressIdx
				axios.get(this.$root.urlPath.MC + '/wap/trade.do?addressList')
					.then(res => {

						if(res.data.success) {

							if(res.data.data == null) {
								this.showAddress = true
								this.curAddress = null
							} else {
								this.curAddress = res.data.data[0]
							}
						} else {
							console.log(res.data.errMsg)
						}
					})
					.catch(function(error) {
						alert(error)
					});
			},
			getBill() {
				axios.get(this.$root.urlPath.MC + '/wap/trade.do?taxInvoiceInfo')
					.then(res => {

						if(res.data.success) {
							if(res.data.value) {
								this.bill = res.data.data.value
							}
						} else {
							alert(res.data.errMsg)
						}
					})
					.catch(function(error) {
						alert(error)
					});
			},
			balance() {
				if(isDevice() !== '微信浏览器' && isDevice() !== 'ios' && isDevice() !== 'adr') {
					this.$vux.alert.show({
						title: '提示',
						content: '请前往官网电脑端结算http://www.miningcircle.com',
						onHide() {

						}
					})
					return
				}

				var orderIds = localStorage.getItem("shop")
				var parseOrderIds = JSON.parse(orderIds).orderId
				var resultOrderIds = parseOrderIds.split(",")
				var para = "{";
				//				//拼入全场 优惠券
				para += '"ggid":"' + this.ggid + '",';
				//
				//				//开始店铺信息
				para += '"store":[';
				for(var i in this.balanceInfo) {
					para += '{';
					para += '"cgid":"' + this.cgid + '",';

					//					//商品插入
					para += '"order":[';

					for(var j = 0; j < this.balanceInfo[i].res.length; j++) {

						para += '{';
						para += '"oid":"' + resultOrderIds[j] + '",';
						if(j == this.balanceInfo[i].res.length - 1) {
							resultOrderIds.splice(0, this.balanceInfo[i].res.length)
						}
						para += '"ogid":"' + this.ogid + '"';
						para += '}';

						if(j != resultOrderIds.length - 1) {
							para += ',';
						}
					}
					para += ']';
					para += '}';
					if(i != this.balanceInfo.length - 1) {
						para += ',';
					}
				}
				para += ']';
				para += '}';

				axios.get(this.$root.urlPath.MC + '/wap/trade.do?paySettlement', {
						params: {
							para: para, //最后提交订单数据组合
							taxInvoice: this.bill, //发票抬头
							name: this.curAddress.name, //收货人姓名
							tel: this.curAddress.tel, //电话
							addr: this.curAddress.province + this.curAddress.city + this.curAddress.county + this.curAddress.addr, //收货地址
							postCode: this.curAddress.postCode //邮编
						}
					})
					.then(res => {
						if(res.data.success) {
							this.showaddCart = true
							if(isDevice() == 'ios' || isDevice() == 'adr') {

								axios.get(this.$root.urlPath.MC + '/wap/trade.do?paybill', {
										params: {
											payType: 'normal'
										}
									})
									.then(res => {
										if(res.data.success) {
											var data = res.data.data

											let quantity = 0
											this.balanceInfo.forEach((item) => {
												item.res.forEach((item1) => {
													quantity += Number(item1.quantity)
												})
											})
											let mallName = ''

											if(this.balanceInfo.length = 1) {

												mallName = this.balanceInfo[0].res[0].title
											} else if(this.balanceInfo.length > 1) {
												mallName = this.balanceInfo[0].res[0].title + '等商品'
											}
											window.location.href = "http://www.miningcircle.com/user/mn.do?rechargeBank&shopno=" + data.serialno + "&resnum=" + quantity + "&resremark=" + mallName + "&v_amount=" + this.totalPrice + "&bank_pay=wxpay"

										} else {
											//alert(res.data.errMsg)
										}
									})
									.catch(function(error) {
										alert(error)
									});

							} else if(isDevice == '微信浏览器') {
								if(this.$route.query.where == 'meeting') {
									window.location.href = this.$root.urlPath.MCM + "/mall/pay?newpage=newpage&payType=normal&where=meeting&id=" + this.$route.query.id;
								} else {
									window.location.href = this.$root.urlPath.MCM + "/mall/pay?newpage=newpage&payType=normal&id=" + this.$route.query.id;
								}
							}
						} else {
							console.log(res.data.errMsg)
						}
					})
					.catch(function(error) {
						alert(error)
					});

			},
			getBalance() {
				var orderIds = localStorage.getItem("shop")
				var resultOrderIds = JSON.parse(orderIds).orderId
				axios.get(this.$root.urlPath.MC + '/wap/trade.do?normalPurchaseSettleList', {
						params: {
							orderIds: resultOrderIds
						}
					})
					.then(res => {

						if(res.data.success) {
							var result = JSON.parse(res.data.data)
							this.balanceInfo = result.store

							for(var i in this.balanceInfo) {
								for(var j in this.balanceInfo[i].res) {
									this.totalPrice += this.balanceInfo[i].res[j].quantity * this.balanceInfo[i].res[j].price

								}
							}
						} else {
							console.log(res.data.errMsg)
						}
					})
					.catch(function(error) {
						alert(error)
					});
			},
			onCancel() {

			},
			onConfirm() {
				window.location.href = this.$root.urlPath.MCM + "/mall/order_address?newpage=newpage";
			},
			onShow() {

			},
			onHide() {

			},
			back() {
				if(isDevice() == 'adr') {
					adwebkit.callApp("BACK", '');
				} else if(isDevice() == 'ios') {
					oswebkit.callApp("BACK", '');
				} else {
//					if(this.$route.query.where == 'meeting') {
//						window.location.href = this.$root.urlPath.MCM + "/mall/orderCom_list?newpage=newpage&where=meeting&id=" + this.$route.query.id;
//					} else {
//						window.location.href = this.$root.urlPath.MCM + "/mall/orderCom_list?newpage=newpage&id=" + this.$route.query.id;
//					}
					this.$router.go(-1)
				}
			},

		},
		watch: {}
	}
</script>

<style>
	.orderConfirm .content{
		margin-top: 1rem;
	}
	.orderConfirm .writeAddress {
		font-size: 0.28rem;
	}
	
	.orderConfirm .addressBox {
		padding: 0.34rem 0.2rem;
		line-height: 0.88rem
	}
	
	.orderConfirm .dituicoBox {
		margin-right: 0.28rem;
	}
	
	.orderConfirm .dituicoBox .icon-dizhi {
		font-size: 0.36rem;
		color: rgb(117, 117, 117)
	}
	
	.orderConfirm .addressBox .namePhoneBox {
		font-size: 0.28rem;
		line-height: 0.6rem;
	}
	
	.orderConfirm .addressBox .namePhoneBox span {
		margin-right: 0.2rem;
	}
	
	.orderConfirm .addressBox .address {
		font-size: 0.24rem;
		color: #323232;
		line-height: 0.4rem;
	}
	
	.orderConfirm .addressBox .icon-jiantou {
		font-size: 0.36rem;
		color: #323232;
	}
	.orderConfirm .addressBox .curAddress{
		width: 6rem;
	}
	/*商品信息*/
	
	.orderConfirm .mallInfo {
		margin: 0.15rem 0;
	}
	
	.orderConfirm .mallInfo .compony {
		font-size: 0.28rem;
		line-height: 0.7rem;
		padding: 0.2rem;
	}
	
	.orderConfirm .mallInfo .mall {
		padding: 0 0.2rem;
		background: #F5F5F5;
	}
	
	.orderConfirm .mallInfo .mall .imgTitleBox {
		padding: 0.2rem 0;
	}
	
	.orderConfirm .mallInfo .mall img {
		width: 1.45rem;
		height: 1.45rem;
		margin-right: 0.25rem;
	}
	
	.orderConfirm .mallInfo .mall .mallName {
		width: 5.4rem;
	}
	
	.orderConfirm .mallInfo .mall .mallName {
		font-size: 0.26rem;
	}
	
	.orderConfirm .mallInfo .mall .priceType {
		margin-top: 0.2rem;
	}
	
	.orderConfirm .mallInfo .mall span {
		font-size: 0.24rem;
		color: #979797;
	}
	
	.orderConfirm .mallInfo .mall .priceBox2 {
		padding-bottom: 0.2rem;
	}
	
	.orderConfirm .mallInfo .mall .spanVal {
		color: #313131;
	}
	
	.orderConfirm .mallInfo .mall .price {
		font-size: 0.3rem;
		color: red;
	}
	
	.orderConfirm .mallInfo .cellM {
		line-height: 0.8rem;
		font-size: 0.28rem;
	}
	
	.orderConfirm .weui-cell {
		height: 0.6rem;
		font-size: 0.28rem;
	}
	
	.orderConfirm .weui-cell .vux-cell-bd .vux-label span {
		margin-top: 0.17rem;
	}
	
	.orderConfirm .weui-cell_access .weui-cell__ft:after {
		width: 0.15rem;
		height: 0.15rem;
	}
	
	.orderConfirm .weui-cell .weui-cell__ft {
		padding-right: 0.3rem;
	}
	
	.orderConfirm .allDiscount {
		height: 2.2rem;
	}
	
	.orderConfirm .bottomM {
		height: 0.8rem;
		line-height: 0.8rem;
	}
	
	.orderConfirm .bottomM .total {
		font-size: 0.28rem;
	}
	
	.orderConfirm .bottomM .totalPrice {
		font-size: 0.3rem;
		color: red;
	}
	
	.orderConfirm .bottomM .submitBtn {
		font-size: 0.32rem;
		color: #fff;
		background: #FF5155;
		padding: 0 0.4rem;
		margin-left: 0.2rem;
	}
</style>