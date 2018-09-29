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
			<my-scroll ref="scroll" @loadmore='getcommGoodslist' :isTab="isTab" :total="total" >
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
			</my-scroll>
		</div>
	</div>
</template>

<script>
	import Oheader from '@/components/common/header/Oheader';
	import { cookie } from 'vux'
	import { isDevice,lastPage } from '@/assets/commonjs/util.js'
	import myScroll from '@/components/base/myScroll'
	export default {
		components: {
			Oheader,
			myScroll
		},
		data() {
			return {
				total: 0,
				isTab:false,
				title: '我的采购',
				list1: [],
				dealAmount: '',
				pageNum: 1,
				numPerPage: 10,
				status: 0,
				tabShow: true,
				tabcommShow: true,
				ordStatus: '',
				totalPri: [],
				nums: [],
			}
		},
		methods: {
			back() {
				lastPage()
			},
			getcommGoodslist() {
				this.$axios.get(this.$root.urlPath.MCT + '/wapGeneralGoods/wapGeneralGoodsOrder?', {
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
							this.isTab = false;
							this.$refs.scroll.loaded()
							let data = res.data.data;
							this.total = data.totalCount;
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
							if(this.total == this.list1.length && this.total !== 0){
								this.$refs.scroll.complete()
							}else{
								this.pageNum++
							}
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