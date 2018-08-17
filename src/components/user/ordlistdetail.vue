<template>
	<div class="ordlistDet">
		<!--头部-->
		<div class="fix">
			<div class="oHeader clearfix">
				<div class="leftA fl" @click="back">
					<i class="icon iconfont icon-jiantou-copy"></i>
					<span>订单详情</span>
				</div>
			</div>
		</div>
		<div class="detCon">
			<div class="detStatus">{{title}}</div>
			<div>

				<div class="address clearfix">
					<div class="addImg clearfix">
						<i class="iconfont icon-shouhuodizhi fl"></i>						
					</div>
					<div class="addressr">
						<div class="name"><span>{{detlist.userName=='null'?'':detlist.userName}}</span><span>{{detlist.userMob=='null'?'':detlist.userMob}}</span></div>
						<div class="url">{{detlist.userAddress=='null'?'':detlist.userAddress}}</div>
					</div>
				</div>
				<div class="ordInfo">
					<div class="code clearfix">
						<div class="ordCode fl">清蓝矿业圈</div>
					</div>
					<!--商品-->
					<div>
						<div class="ordDet ordDets clearfix" v-for="(item,index) in detlist.orderItems">
							<div class="detImg fl"><img :src="item.productImg" /> </div>
							<div class="detTit fl">{{item.productName}}</div>
							<div class="detPri fr" align="right">{{item.price}}</div>
							<div class="delNum fr">x<span>{{detlist.orderItems[index].number}}</span></div>
							<div class="cancel fr" v-show="canShow"><span class="">已取消</span></div>
						</div>
						<!--付款-->
						<div class="payDet clearfix">
							<div class="totPri clearfix"><span class="fl">商品总价</span><span class="fr">&yen;{{totalPri[0]}}</span></div>
							<div class="freight clearfix"><span class="fl">运费</span><span class="fr">&yen;0.00</span></div>
							<div class="discount clearfix"><span class="fl">店铺优惠</span><span class="fr">-&yen;0.00</span></div>
							<div class="realPay clearfix"><span class="fl">实付款（含运费）</span><span class="fr colff4">&yen;{{totalPri[0]}}</span></div>
						</div>
					</div>
					<div class="invoice clearfix"><span class="fl">发票抬头</span><span class="fr">{{detlist.invoiceTitle=='null'?'':detlist.invoiceTitle}}</span></div>
					<div class="clearfix paymentCode" v-show="payCodeBox" v-bind:style="payCodeBoxStyle">
						<div class="paymentCode1 clearfix" v-show="payCodeShow"><span class="fl">支付单号</span><span class="fr">{{detlist.payId}}</span></div>
						<div class="logisticsCode clearfix" v-show="logisticsCodeShow"><span class="fl">物流单号</span><span class="fr">{{msg}}</span></div>
					</div>
					<div class="ordinfo fs-12">
						<div class="ordCode clearfix"><span class="fl col3">订单号</span>
							<div class="fr ordCoder col7"><span>{{detlist.orderNumber}}</span>
								<button class="col3 tag-read" type="botton" v-clipboard:copy="detlist.orderNumber" v-clipboard:success="onCopy" v-clipboard:error="onError">复制</button>
							</div>
						</div>
						<div class="ordTime clearfix"><span class="fl col3">下单时间</span><span class="fr col7">{{detlist.createTiem|convertTime}}</span></div>
					</div>
				</div>
				<div class="ordb" v-show="ordbShow" v-bind:style="styleObject">
					<span>{{pay}}<span class="fs-12">(含运费)&nbsp;</span></span><span class="colff4">&yen;{{totalPri[0]}}</span>
					<button type="button" class="payBtn" v-show="payShow" @click="settlement()">付款</button>
					<button type="button" class="payBtn" v-show="collShow">确认收货</button>
					<button class="payBtn delivery" v-show="delivery" @click="showPlugin3">发货</button>
				</div>
			</div>
			<divider v-show="blshow">我是有底线的</divider>
		</div>

	</div>
</template>

<script>
	import Clipboard from 'clipboard';
	import Oheader from '@/components/common/header/Oheader';
	import { cookie } from 'vux'
	export default {
		components: {
			Oheader,

		},
		data() {
			return {
				ordbShow: true,
				title: '',
				detlist: [],
				dealAmount: '',
				blshow: false,
				ordStatus: '交易成功',
				canShow: false, //已取消
				message: '20180227114408-9653',
				status: 0,
				orderId: this.$route.query.id,
				payCodeShow: true, //支付单号
				payShow: false, //付款
				collShow: false, //确认收货
				logisticsCodeShow: true, //物流单号
				delivery: false, //发货
				msg: '', //物流单号con
				styleObject: {
					padding: '0.15rem'
				},
				payCodeBoxStyle:{
					padding:'0.3rem 0.15rem'
				},
				pay: '',
				payCodeBox: true,		
				totalPri:[],
				isInapp:navigator.userAgent.indexOf('/mcapp')>=0,//判断是否在app打开
				equi:navigator.userAgent,
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
			onCopy: function(e) {
				this.$vux.toast.text('复制成功', 'center');
				return;
			},
			onError: function(e) {
				this.$vux.toast.text('复制失败', 'center');
				return;
			},
			showPlugin3() {
				const _this = this
				this.$vux.confirm.prompt('请填写您的物流单号', {
					title: '填写单号',
					onShow() {},
					onHide() {},
					onCancel() {},
					onConfirm(msg) {
						_this.msg = msg;
					}
				})
			},
			getGoodsdet() {
				this.$axios.get(this.$root.urlPath.MCT + '/generalGoodsOrderList/getOrderDetails?', {
						params: {
							status: this.status,
							orderId: this.orderId,
						},
						headers: {
							'MC_UID': cookie.get('MC_UID')
						},
					})
					.then(res => {
						if(res.data.success) {
							let data = res.data.data;
							this.detlist = data;
								let upri =0;		
								data.createTiem=parseInt(data.createTiem)
								for(var j in data.orderItems){
								upri += data.orderItems[j].price*data.orderItems[j].number;									
									if(j==data.orderItems.length-1){
										this.totalPri.push(upri);									
									}
								}
						}
					})
					.catch(err => console.log('获取数据失败', err))
			},
			settlement(){
				window.location.href=this.$root.urlPath.MCM+"/mall/pay?newpage=newpage&payType=normal";		
			},
		},
		mounted() {
			this.getGoodsdet();
			if(this.delivery == true) {
				this.styleObject.padding = 0
			}else if(this.payShow==true){
				this.styleObject.padding = 0
			}
		},
		created() {
			if(this.delivery == true) {
				this.styleObject.padding = 0
			}else if(this.payShow==true){
				this.styleObject.padding = 0
			}
			let purtitle = this.$route.query.purtit;
			if(purtitle == 0) {
				this.title = '待付款'
				this.payCodeShow = false;
				this.logisticsCodeShow = false;
				this.payCodeBox = true;
				this.ordbShow = true;
				this.payCodeShow
				this.pay = '应付款';
				this.payShow = true;
				this.payCodeBoxStyle.padding=0;
			} else if(purtitle == 1) {
				this.title = '交易成功'
				this.payCodeShow = true;
				this.logisticsCodeShow = true;
				this.payCodeBox = true;
				this.ordbShow = false;				
			} else if(purtitle == 2) {
				this.title = '待收货'
				this.payCodeShow = true;
				this.logisticsCodeShow = true;
				this.payCodeBox = true;
				this.ordbShow = true;
				this.pay = '已付款';
			} else if(purtitle == -1 || purtitle == -2) {
				this.title = '交易关闭';
				this.ordbShow = false;
				this.payCodeShow = true;
				this.logisticsCodeShow = true;
				this.payCodeBox = true;
				this.canShow = true;
			}
			//供应title/status
			let suptitle = this.$route.query.suptit;
			switch(suptitle) {
				case 0:
					this.title = '待付款'			
					this.payCodeShow = false;
					this.logisticsCodeShow = false;
					this.payCodeBox = false;
					this.pay = '应付款'
//					this.payCodeBoxStyle.padding=0;
					break;
				case 1:
					this.title = '交易成功';
					this.ordbShow = false;
					this.payCodeShow = true;
					this.logisticsCodeShow = true;
					this.payCodeBox = true;
					break;
				case 2:
					this.title = '待收货';
					this.pay = '已付款';
					this.ordbShow = true;
					this.payCodeShow = true;
					this.logisticsCodeShow = true;
					this.payCodeBox = true;
					break;
				case -1:
					this.title = '交易关闭';
					this.ordbShow = false;
					this.payCodeShow = true;
					this.logisticsCodeShow = true;
					this.payCodeBox = true;
					this.canShow = true;
					break;
				case -2:
					this.title = '交易关闭';
					this.ordbShow = false;
					this.payCodeShow = true;
					this.logisticsCodeShow = true;
					this.payCodeBox = true;
					this.canShow = true;
					break;
			}
		},
	}
</script>

<style>
@import url("../../static/css/ordlist.css");
.colff4 {
	color: #FF4F54;
}
.col3 {
	color: #333;
}
.col7 {
	color: #757575;
}
.fs-12 {
	font-size: 0.24rem;
}
.fs-14 {
	font-size: 0.28rem;
}
.detCon {
	position: absolute;
	left: 0;
	top: 0.88rem;
	width: 100%;
}

/*goodstab*/
.detStatus {
	padding: 0.28rem 0.15rem;
	background: #fff;
	border-bottom: 0.15rem solid #ececec;
	color: #ff4f54;
	font-size: 0.32rem;
}

/*地址*/
.ordlistDet .address {
	padding: 0.3rem 0.15rem;
	background: #fff;
	border-bottom: 0.15rem solid #ececec;
	color: #333;
}
.ordlistDet .address .addImg {
	width: 8%;
	display: inline-block;
	height: 0.95rem;
	line-height: 0.95rem
}
.ordlistDet .address .addImg .icon-shouhuodizhi{
	font-size: 0.5rem;
}
.ordlistDet .address .addressr {
	width: 90%;
	display: inline-block;
}
.ordlistDet .address .addImg img {
	width: 0.35rem
}
.ordlistDet .address .name {
	font-size: 0.28rem;
	margin-bottom: 0.25rem;
}
.ordlistDet .address .url {
	font-size: 0.24rem;
}

/*订单列表*/
.ordInfo {
	background: #fff;
}
.ordInfo .code {
	padding: 0.2rem 0.2rem;
	color: #333;
	font-size: 0.24rem;
	border-bottom: 0.02rem solid #eeeeee;
}

/*普通商品状态*/
.ordInfo .ordStatus {
	font-size: 0.28rem;
	color: #ff4f54;
}
.ordlistDet .ordDet {
	padding: 0.2rem;
	border-bottom: 0.02rem solid #eeeeee;
	background: #f5f5f5;
}
.ordDet .cancel {
	width: 80%;
	text-align: right;
    margin-top: 0.1rem;
}
.ordDet .cancel span {
	padding: 0.08rem 0.2rem;
	border-radius: 0.05rem;
	color: rgb(100, 100, 100);
	font-size: 0.24rem;
	margin-top: 0.1rem;
	background: rgb(229, 229, 229);
}
.ordlistDet .ordDet .detImg {
	width: 20%;
	height: 1.2rem;
}

.payDet {
	padding: 0.24rem 0.15rem;
	color: #757575;
	font-size: 0.24rem;
	border-bottom: 0.15rem solid #ececec;
}
.payDet div {
	margin-bottom: 0.1rem;
}
.payDet .realPay {
	color: #333;
	font-size: 0.28rem;
}
.invoice {
	padding: 0.3rem 0.15rem;
	border-bottom: 0.02rem solid #ececec;
	font-size: 0.28rem;
}
.paymentCode {
	font-size: 0.24rem;	
	border-bottom: 0.15rem solid #ececec;
}
.logisticsCode {
	margin-top: 0.1rem;
}
.paymentCode .fr,
.logisticsCode .fr {
	color: #757575;
}
.ordinfo {
	padding: 0.35rem 0.15rem;
}
.ordinfo .ordCode {
	margin-bottom: 0.08rem;
}
.ordinfo .ordCoder button {
	padding: 0.05rem 0.1rem;
	border-radius: 0.08rem;
	background: #fff;
	border: 0.02rem solid #aaa;
	margin-left: 0.1rem;
}
.ordb {
	text-align: right;
	font-size: 0.28rem;
	background: #ececec;
}
.ordb .payBtn {
	background: #FF4F54;
	color: #fff;
	border: none;
	padding: 0.25rem 0.6rem;
	font-size: 0.32rem;
}
</style>