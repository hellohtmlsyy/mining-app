<template>
	<div class="pay">
		<!--头-->
		<div class="oHeader clearfix">
			<div class="leftA fl" @click="back">
				<i class="icon iconfont icon-jiantou-copy"></i>
				<span>订单支付</span>
			</div>
		</div>
		<div class="list clearfix">
			<div class="priceBox fr">
				<label>需支付:</label>
				<span class="price">{{orderInfo.amount | converAmount(2)}}元</span>
			</div>
			<div class="type">
				<div class="clearfix bgcolor">
					<div class="fl">
						<i class="icon iconfont icon-weixinzhifu"></i>
					</div>
					<div class="rowm">
						<div class="fl">
							<div class="title">微信支付</div>
							<div class="smtitle">仅安装微信6.0.2及以上版本客户端使用</div>
						</div>
						<input type="radio" value="1" v-model="check" class="radio fr"/>
					</div>
				</div>
			</div>
		</div>
		<div class="endSave">
			<div @click="pay" v-show="orderInfo.amount && !curPay">
				<div class="btn">微信支付{{orderInfo.amount}}元</div>
			</div>
			<div class="btn btn1" v-show="!orderInfo.amount">
				支付
			</div>
			<div @click="pay" v-show="curPay">
				<button class="btn">正在支付</button>
			</div>
		</div>
		<div>
			<confirm @on-cancel="onCancel" @on-confirm="onConfirm"  v-model="show1" >
					<p style="text-align:center;">1、请在微信内完成支付，如果您已支付成功，请点击“已完成支付”按钮</p>
					<br />
					<p style="text-align:center;">2、如果您未安装微信6.0.2及以上版本客户端，请点击“取消”并选择其他支付方式付款</p>
			</confirm>
			<toast v-model="show2" :time="3000" type="warn" width="2rem">您的订单还未完成支付，请重新支付</toast>
		</div>
	</div>
</template>

<script>
	import { } from 'vux'
	import axios from 'axios'
	import {isDevice,lastPage} from '@/assets/commonjs/util.js'


	export default {
		components: {

		},
		data() {
			return {
				price:'',
				check:'1',
				orderInfo:'',
				show1:false,
				show2:false,
				success:true,
				curPay:false,
				success:false,
			}
		},
		mounted(){
			this.getOderInfo()
		},
		methods: {
			change() {

			},
			getOderInfo(){
				axios.get(this.$root.urlPath.MC + '/wap/trade.do?paybill',{
					params:{
						payType:this.$route.query.payType
					}
				})
					.then(res => {

						if(res.data.success) {

							this.orderInfo = res.data.data
						} else {
							console.log(res.data.errMsg)
						}
					})
					.catch(function(error) {
						console.log(error)
					});
			},
			pay() {

				var ua = navigator.userAgent.toLowerCase()
				var u = navigator.userAgent
				if(ua.match(/MicroMessenger/i) == 'micromessenger') {
//					跳转公众号支付
					window.location.href = 'http://www.miningcircle.com/user/mn.do?rechargeBank=&v_amount='+this.orderInfo.amount + '&shopno='+ this.orderInfo.id + '&resnum=1&bank_pay=wxpay&resremark=' + this.orderInfo.resremark

				} else if(ua.indexOf('/mcapp') >= 0){
//					alert("app")
					if(u.indexOf('Android') > -1 || u.indexOf('Adr') > -1){
//						跳转app支付
//						alert("安卓设备")
					}else if(!!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)){
//						跳转app支付
//						alert("ios设备")
					}
				}else {
//					调h5支付
					this.curPay = true
					this.show1 = true

				}
			},
			back() {
				this.$router.go(-2)
			},
			onCancel(){
				this.show1 = false
				this.curPay = false
			},
			onConfirm(){
				//调h5的支付成功与否的接口
				if(this.success){
					window.location.href=this.$root.urlPath.MCM + "/mall/orderCom_list?newpage=newpage";
				}else{

					this.show1 = false
					this.show2 = true
					this.curPay = false
				}
			}
		},

	}
</script>

<style>
	.pay .list{
		margin: 1rem 0;
	}
	.pay .list .priceBox{
		font-size: 0.28rem;
		line-height: 0.7rem;
	}
	.pay .list .price{
		color: red;
	}
	.pay .list .type{

	}
	.pay .list .type .rowm{
		padding:0.2rem;
		/*border: 1px solid #ccc;*/
	}
	.pay .list .type .icon-weixinzhifu{
		font-size: 0.38rem;
		color: #00C800;
		margin: 0 0.2rem;
		line-height: 1.1rem;
	}
	.pay .list .type .title{
		font-size: 0.28rem;
	}
	.pay .list .type .smtitle{
		font-size: 0.26rem;
		color:#ccc
	}
	.pay .list  .type .radio{
		width: 0.3rem;
		height: 0.3rem;
		margin-top: 0.2rem;
	}
	.pay .endSave .btn1{
		background-color:#ccc
	}
</style>
