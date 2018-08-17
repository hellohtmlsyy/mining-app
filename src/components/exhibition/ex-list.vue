<template>
	<div class="exForm comlist">
		<!--头部-->
		<div class="oHeader clearfix">
			<div class="leftA fl" @click="back">
				<i class="icon iconfont icon-jiantou-copy"></i>
				<span>报名</span>
			</div>
			<div class="rightA fr" @click="add">
				<i class="icon iconfont icon-iconfontadd"></i> 添加
			</div>
		</div>
		<!--表单-->
		<div class="table">
			<table>
				<tr v-for="(item,index) in infoList" :key="index">
					<td>
						<input type="checkbox" v-model="check" :value='item.id' class="checkbox" />
					</td>
					<td style="width: 30%;padding-left: 0.1rem;">
						{{item.name}}
					</td>
					<td style="width: 30%;">
						{{item.mobile}}
					</td>
					<td style="width: 28.8%;">
						{{item.email}}
					</td>
					<td>
						<i class="icon iconfont icon-icon7" @click="del(item.id)"></i>
					</td>
				</tr>
			</table>
		</div>
		<div class="endSave" @click="save">
			<div class="btn">确定</div>
		</div>
		<div>
			<alert v-model="showAlertSU" @on-hide="onHide1" >恭喜您，报名成功!随后会务组会和您联系。</alert>
			<alert v-model="showAlertSUS" @on-hide="goShop">报名完成，请到购物车进行结算</alert>
			<alert v-model="show1">请添加购票人</alert>
		</div>
	</div>
</template>

<script>
	import axios from 'axios'
	
	import { XInput, Group, CheckIcon } from 'vux'
	import {isDevice} from '@/assets/commonjs/util.js'
	export default {
		components: {
			XInput,
			Group,
			CheckIcon
		},
		data() {
			return {
				show: true,
				checkPeo: false,
				showToast: false,
				toastText: '',
				infoList: [],
				check: [],
				showAlertSU: false,
				orderId: '',
				showAlertSUS: false, //收费弹框
				show1: false,
				title: '',
				status: '',
				singUpInfo: ''
			}
		},
		mounted() {
			this.infoLink()
			var singUp = localStorage.getItem('singUp', singUp);
			this.singUpInfo = JSON.parse(singUp)
			this.status = JSON.parse(singUp).status
		},
		methods: {
			onHide1(){
				window.location.href = this.$root.urlPath.MCM + "/exhibition?newpage=newpage";
			},
			goShop() {
				window.location.href = this.$root.urlPath.MCM + "/mall/orderCom_list?newpage=newpage&where=meeting&id=" + this.$route.query.id;

			},
			onHideAlert() {

			},
			add() {
				window.location.href = this.$root.urlPath.MCM + "/exhibition/exform?newpage=newpage&id=" + this.$route.query.id;

			},
			back() {
				if(isDevice() == 'adr') {
					adwebkit.callApp("BACK", '');
				} else if(isDevice() == 'ios') {
					oswebkit.callApp("BACK", '');
				} else {
					this.$router.go(-1)
				}
				

			},
			onHide() {

			},
			onShow() {

			},
			infoLink() {
				axios.get(this.$root.urlPath.MC + '/meeting.do?infolink', {
						params: {
							rid: this.$route.query.id
						}
					})
					.then(res => {
						if(res.data.success) {
							this.infoList = res.data.obj

						} else {

						}
					})
					.catch(function(error) {

					});
			},
			save() {
				
				//先检查剩余票数
				//再将商品添加购物车
				//剩余票数
				//最后保存购票人
				if(this.check.length == 0) {
					this.show1 = true
				} else {
					this.isTicket()
				}
			},
			del(id) {
				axios.get(this.$root.urlPath.MC + '/meeting.do?dellink', {
						params: {
							linkid: id
						}
					})
					.then(res => {

						if(res.data.success) {
							this.showToast = true
							this.toastText = '删除成功'
							this.infoLink()
						} else {

						}
					})
					.catch(function(error) {

					});
			},
			//保存购票人,结算到购物车
			saveContack(linkid) {

				axios.get(this.$root.urlPath.MC + '/meeting.do?savecontack', {
						params: {
							orderid: this.orderId,
							cotid: this.singUpInfo.pid,
							linkid: linkid
						}
					})
					.then(res => {

						if(res.data.success) {
							if(this.status == '免费') {
								this.showAlertSU = true
							} else {
								this.showAlertSUS = true
							}
						} else {

						}
					})
					.catch(function(error) {

					});

			},
			//1.剩余票数
			isTicket() {
				axios.get(this.$root.urlPath.MC + '/meeting.do?isticket', {
						params: {
							tid: this.singUpInfo.pid
						}
					})
					.then(res => {

						if(res.data.success) {
							this.addCart()
						} else {

						}
					})
					.catch(function(error) {

					});
			},
			//添加购物车
			addCart() {
				var singUp = localStorage.getItem('singUp', singUp);
				var meetTitle = JSON.parse(singUp).meetTitle
				var status = JSON.parse(singUp).status
				axios.get(this.$root.urlPath.MC + '/wap/meeting.do?addCart', {
						params: {
							id: this.$route.query.id,
							type: 8100,
							ticketId: this.singUpInfo.pid,
							quantity: this.check.length,
						}
					})
					.then(res => {

						if(res.data.success) {
							this.orderId = res.data.data
							axios.get(this.$root.urlPath.MC + '/meeting.do?isticket', {
									params: {
										tid: this.singUpInfo.pid
									}
								})
								.then(res => {

									if(res.data.success) {
										for(var i in this.check) {
											this.saveContack(this.check[i])
										}

									} else {

									}
								})
								.catch(function(error) {

								});
						} else {

						}
					})
					.catch(function(error) {

					});
			}
		}
	}
</script>

<style>

</style>