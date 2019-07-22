<template>
	<div class="addressList ">
		<!--头部-->
		<div class="oHeader clearfix">
			<div class="leftA fl" @click="back">
				<i class="icon iconfont icon-jiantou-copy"></i>
				<span>收货地址</span>
			</div>
			<div class="rightA fr" @click="add">
				<i class="icon iconfont icon-iconfontadd"></i> 添加
			</div>
		</div>
		<!--表单-->

		<div class="table" :class="where ? 'tableMg2' : 'tableMg1'">
			<table>
				<div class="list" style="width:7.5rem" v-for="(item,index) in addressList" :key="index">
					<tr>
						<td>
							<input type="radio" :value="index" v-model="check"  class="checkbox"/>
						</td>
						<td style="width:34%;padding-left: 0.2rem;">
							{{item.name}}
						</td>
						<td style="width:82%">
							{{item.tel}}
						</td>
						<td @click="change(index)">
							<i class="icon iconfont icon-yduibianxie"></i>
						</td>
						<td @click="del(item.id)">
							<i class="icon iconfont icon-icon7" @click="del()"></i>
						</td>
					</tr>
					<div>
						<tr class="address">
							<td style="
    padding-left: 0.75rem;
">
								<p>{{item.province}} {{item.city}} {{item.county}} {{item.addr}}</p>
							</td>
						</tr>
					</div>
				</div>
			</table>
		</div>
		<div class="endSave" @click="save" v-show="!where">
			<button>确定并使用</button>
		</div>
		<toast v-model="show1" type="warn" :time="1000" is-show-mask>{{toastText}}</toast>
		<!--<div>
			<alert v-model="showAlertSU" @on-hide="onHideAlert">恭喜您，报名成功!随后会务组会和您联系。</alert>
			<alert v-model="showAlertSUS">报名完成，请到购物车进行结算</alert>
			<alert v-model="show1">请添加购票人</alert>
		</div>-->
	</div>
</template>

<script>
	import axios from 'axios'
	import { } from 'vux'
	import {isDevice} from '@/assets/commonjs/util.js'
	export default {
		components: {

		},
		data() {
			return {
				check:"",
				addressList:[],
				toastText:'',
				show1:false,
				where:this.$route.query.where
			}
		},
		mounted(){
			this.getAddress()
			var shop = localStorage.getItem('shop', shop);
			this.check = JSON.parse(shop).curAddressIdx
		},
		methods:{
			del(id){
				axios.get(this.$root.urlPath.MC + '/wap/trade.do?delAddress', {
						params: {
							id: id
						}
					})
					.then(res => {

						if(res.data.success) {
							this.getAddress()
						} else {

						}
					})
					.catch(function(error) {
						console.log(error)
					});
			},
			change(idx){


				window.location.href=this.$root.urlPath.MCM + "/mall/order_address?newpage=newpage&urlType=1&idx=" + idx;

			},
			getAddress(){
				axios.get(this.$root.urlPath.MC + '/wap/trade.do?addressList')
					.then(res => {

						if(res.data.success) {
							this.addressList = res.data.data
						} else {
							console.log(res.data.errMsg)
						}
					})
					.catch(function(error) {
						console.log(error)
					});
			},
			back(){
				if(isDevice() == 'adr') {
					adwebkit.callApp("BACK", '');
				} else if(isDevice() == 'ios') {
					oswebkit.callApp("BACK", '');
				} else {
//					window.location.href=this.$root.urlPath.MCM + "/mall/orderCom_balance?newpage=newpage&id=" + this.$route.query.id;
					this.$router.go(-1)
				}


			},
			add(){
				window.location.href=this.$root.urlPath.MCM + "/mall/order_address?newpage=newpage&id=" + this.$route.query.id;

			},
			save(){
				if(this.check == undefined){
					this.toastText = '请选择地址'
					this.show1 = true
					return
				}

				axios.get(this.$root.urlPath.MC + '/wap/trade.do?confirmAddress', {
						params: {
							id: this.addressList[this.check].id
						}
					})
					.then(res => {

						if(res.data.success) {
												window.location.href=this.$root.urlPath.MCM + "/mall/orderCom_balance?newpage=newpage";
						}
					})
					.catch(function(error) {
						console.log(error)
					});

			},

		}
	}
</script>

<style>
	.addressList input:checked{
		-webkit-appearance:none;
		background: url(../../../static/img/ico8.png);
		background-size: 100% 100%;
	}
	.addressList .tableMg1{
		margin: 1rem 0;
	}
	.addressList .tableMg2{
		margin:1rem 0 0 0;
	}
	.addressList .table,
	.addBtn {
		background: #fff;
	}

	.addressList table {
		font-size: 0.28rem;
	}
	.addressList table .checkbox{

	    margin-left: 0.2rem;
	    width: 0.38rem;
	    height: 0.38rem;
	    vertical-align: middle;
	    background-color: #FF4E56;

	}
	.addressList table .list {
		border-bottom:0.01rem solid #E4E4E4;
		padding: 0.2rem 0;
	}
	.addressList table .address{
		font-size: 0.24rem;
		color: rgb(93,93,93);
		line-height: 0.5rem;
	}
	.addressList .icon-icon7,.icon-yduibianxie{
		font-size: 0.36rem;
		color: #A2A2A2;
    	margin-right: 0.2rem;
	}

	.addressList .vux-check-icon>.weui-icon-success:before,
	.vux-check-icon>.weui-icon-success-circle:before {
		color: #FB5250;
	}

	.endSave {
		position: fixed;
		bottom: 0;
		width: 100%;
	}

	.endSave button {
		background-color: #FF5155;
		color: #fff;
		text-align: center;
		font-size: 0.28rem;
		height: 1rem;
		line-height: 1rem;
		width: 100%;
	}

	.addressList .weui-toast__content {
		text-align: center;
	}
</style>
