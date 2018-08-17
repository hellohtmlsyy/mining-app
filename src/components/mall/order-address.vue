<template>
	<div class="orderAddress comform">
		<!--头部-->
		<div class="oHeader clearfix">
			<div class="leftA fl" @click="back">
				<i class="icon iconfont icon-jiantou-copy"></i>
				<span v-show="!$route.query.urlType == 1">新建收货地址</span>
				<span v-show="$route.query.urlType == 1">修改收货地址</span>
			</div>
		</div>
		<div class="form">
			<group>
				<!--<div class="xinghao fl">*</div>-->
				<x-input title="姓名" placeholder="请填写" placeholder-align="right" required v-model="form.name" :is-type="nameVail" ref="refVal">
				</x-input>
			</group>
			<group>
				<!--<div class="xinghao fl">*</div>-->
				<x-input title="手机" placeholder="请填写" placeholder-align="right" required v-model="form.tel" is-type="china-mobile" ref="refVal">
				</x-input>
			</group>
			<group>
				<x-input title="邮箱" placeholder="请填写" placeholder-align="right" required v-model="form.postCode" is-type="email" ref="refVal">
				</x-input>
			</group>
			<group class="address">
				<x-address title="地区" v-model="addressValue" raw-value :list="addressData" @on-shadow-change="addressChange"></x-address>
			</group>
			<!--<group>-->
			<!-- <x-textarea placeholder="请填写详细地址" @on-focus="onEvent('focus')" @on-blur="onEvent('blur')" :max="20" v-model="form.addr"></x-textarea>-->
			<!--</group>-->
			<textarea v-model="form.addr" class="textarea" placeholder="请填写详细地址" @blur.prevent="checkUp()"></textarea>
		</div>
		<div class="endSave">
			<div @click="save">
				<div class="btn">保存并使用</div>
			</div>
		</div>
		<toast v-model="show1" type="warn" :time="2000" is-show-mask>{{toastText}}</toast>
	</div>
</template>

<script>
	import axios from 'axios'
	import { ChinaAddressData, XAddress, XTextarea } from 'vux'
	import { isDevice } from '@/assets/commonjs/util.js'

	export default {
		components: {
			XAddress,
			XTextarea
		},
		data() {
			return {
				show1: false,
				addressData: ChinaAddressData,
				addressValue: ['广东省', '深圳市', '南山区'],
				form: {
					name: '',
					tel: '',
					postCode: '',
					addr: '',
				},
				nameVail: function(val) {
					var patt1 = new RegExp("(^[\u4e00-\u9fa5]{1}[\u4e00-\u9fa5\.·。]{0,8}[\u4e00-\u9fa5]{1}$)|(^[a-zA-Z]{1}[a-zA-Z\s]{0,8}[a-zA-Z]{1}$)")
					return {
						valid: patt1.test(val),
						msg: '输入姓名格式有误'
					}
				},
				toastText: ""
			}
		},
		mounted() {
			if(this.$route.query.urlType == 1) {
				this.getAddress()
			}
		},
		methods: {
			getAddress() {
				axios.get(this.$root.urlPath.MC + '/wap/trade.do?addressList')
					.then(res => {

						if(res.data.success) {

							this.form = res.data.data[this.$route.query.idx]
							this.form.postCode = this.form.postcode
							this.addressValue = [this.form.province, this.form.city, this.form.county]

						} else {
							console.log(res.data.errMsg)
						}
					})
					.catch(function(error) {
						alert(error)
					});
			},
			addressChange(ids, names) {
				//				console.log(ids, names)
				this.form.province = names[0]
				this.form.city = names[1]
				this.form.county = names[2]
			},
			back() {
				if(isDevice() == 'adr') {
					adwebkit.callApp("BACK", '');
				} else if(isDevice() == 'ios') {
					oswebkit.callApp("BACK", '');
				} else {
					//					window.location.href=this.$root.urlPath.MCM + "/mall/order_addressList?newpage=newpage&id=" + this.$route.query.id;
					this.$router.go(-1)
				}
			},
			save() {

				//				全部不为空且验证正确且详细地址长度不超过50
				if(this.$refs.refVal.valid == true && this.form.name != '' && this.form.tel !== '' && this.form.postCode !== "" && this.addressValue.length !== 0 && this.form.addr.length <= 50) {

				} else {
					if(this.form.name != '' && this.form.tel !== '' && this.form.postCode !== "" && this.addressValue.length !== 0 && this.form.addr.length > 50) {
						this.show1 = true
						this.toastText = '详细地址不能超过50个字'
						return
					} else {

						this.show1 = true
						this.toastText = '输入有误'
						return
					}
				}

				var params = this.form
				axios.get(this.$root.urlPath.MC + '/wap/trade.do?operateAddress', {
						params: params
					})
					.then(res => {

						if(res.data.success) {
							window.location.href = this.$root.urlPath.MCM + "/mall/orderCom_balance?newpage=newpage&id=" + this.$route.query.id;
						} else {
							console.log(res.data.errMsg)
						}
					})
					.catch(function(error) {
						alert(error)
					});
			},
			checkUp() {
				if(this.form.addr.length > 50) {
					this.toastText = '详细地址不能超过50个字'
					this.show1 = true
				}
			},
			onEvent(event) {

			}
		},
		watch: {}
	}
</script>

<style>
	.orderAddress .form {
		margin: 1rem 0;
	}
	
	.orderAddress .textarea {
		width: 100%;
		height: 2rem;
		border: none;
		font-size: 0.28rem;
		padding-left: 0.2rem;
		box-sizing: border-box;
	}
</style>