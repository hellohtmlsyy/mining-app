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
				<x-input title="姓名" placeholder="请填写" placeholder-align="right" required v-model="form.name" :is-type="nameVail" ref="myname" @on-change="change">
				</x-input>
			</group>
			<group>
				<x-input title="手机" placeholder="请填写" placeholder-align="right" required v-model="form.tel" is-type="china-mobile" ref="tel" @on-change="change">
				</x-input>
			</group>
			<group>
				<x-input title="邮编" placeholder="请填写" placeholder-align="right" required v-model="form.postCode" :is-type="zipcode" ref="email" @on-change="change">
				</x-input>
			</group>
			<group class="address">
				<x-address title="地区" v-model="addressValue" raw-value :list="addressData" @on-shadow-change="addressChange"></x-address>
			</group>
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
	import { isDevice,lastPage} from '@/assets/commonjs/util.js'

	export default {
		components: {
			XAddress,
			XTextarea
		},
		data() {
			return {
				show1: false,
				addressData: ChinaAddressData,
				addressValue: ['北京市', '市直辖', '东城区'],
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
				zipcode:function(val){
					var patt1 = new RegExp("(^[0-9]{6}$)")
					return {
						valid: patt1.test(val),
						msg: '输入邮编格式有误'
					}
				},
				toastText: "",
				isError:false
			}
		},
		mounted() {
			if(this.$route.query.urlType == 1) {
				this.getAddress()
			}
		},
		methods: {
			change(){
				if(!this.$refs.myname.valid || !this.$refs.tel.valid
				|| !this.$refs.email.valid){
					this.isError = true
				}else{
					this.isError = false
				}
			},
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
						console.log(error)
					});
			},
			addressChange(ids, names) {
				//				console.log(ids, names)
				this.form.province = names[0]
				this.form.city = names[1]
				this.form.county = names[2]
			},
			back() {
        lastPage()
			},
			save() {
//				除了详细地址之外其他的不能为空,提示输入有误
				if(this.form.name == '' || this.form.tel == '' || this.form.postCode == "" || this.addressValue.length == 0){
					this.show1 = true
					this.toastText = '输入有误'
					return
				}
//				姓名\手机/邮箱/验证必须正确,提示输入有误
				if(this.isError){
					this.show1 = true
					this.toastText = '输入有误'
					return
				}
//				详细地址不能超过50个字,提示详细地址不能超过50个字
				if(this.form.addr.length > 50){
					this.show1 = true
					this.toastText = '详细地址不能超过50个字'
					return
				}


				var params = this.form
				axios.get(this.$root.urlPath.MC + '/wap/trade.do?operateAddress', {
						params: params
					})
					.then(res => {

						if(res.data.success) {
              lastPage()
						} else {
							console.log(res.data.errMsg)
						}
					})
					.catch(function(error) {
						console.log(error)
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
