<template>
	<div class=" authForm comform">
		<!--头部-->
		<div class="oHeader clearfix">
			<div class="leftA fl" @click="back">
				<i class="icon iconfont icon-jiantou-copy"></i>
				<span>认证投资</span>
			</div>
		</div>
		<div class="form">
			<group>
				<div class="xinghao fl">*</div>
				<x-input title="可投金额" placeholder="请填写" placeholder-align="right" required v-model="form.amount" is-type="valid" ref="refVal">
				</x-input>
			</group>
			<group>
				<div class="xinghao fl">*</div>
				<x-input title="投资方式" placeholder="请填写" placeholder-align="right" v-model="form.mode" ref="refVal">
				</x-input>
			</group>
			<group class="priceType">
				<!--<div class="xinghao fl">*</div>-->
				<selector ref="defaultValueRef" placeholder="请选择" title="币种" :options="currencylist" v-model="form.currency"></selector>
				</x-input>
			</group>
			<div class="type bgcolor" style="position:relative">
				<div class="xinghao fl ">*</div>
				<div class="kzerror" style="position:absolute;right:0.1rem;top: 0.35rem;font-size: 0.28rem;color:rgb(169, 169, 169);display: none;">必填哦
					<i class="vux-input-icon weui-icon weui_icon_warn weui-icon-warn" title="必填哦"></i>
				</div>
				<checklist ref="demoObject" title="矿种：" :label-position="labelPosition" required :options="objectList" v-model="objectListValue" @on-change="change"></checklist>

			</div>
			<!--</group>-->
			<group class="addressBox">
				<div class="xinghao fl addressxinghao">*</div>
				<div class="dzerror" style="position:absolute;right:0.3rem;top: 0.1rem;font-size: 0.28rem;color:rgb(169, 169, 169);display: none;">必填哦
					<i class="vux-input-icon weui-icon weui_icon_warn weui-icon-warn" title="必填哦"></i>
				</div>
				<popup-picker title="项目所在地" :data="list3" :columns="3" v-model="addval" @on-shadow-change="locaChange" @on-hide="addChange" show-name @on-show="showAddress"></popup-picker>
			</group>

			<group class="ask">
				<div class="xinghao fl">*</div>
				<div class="error" style="position:absolute;right:0.3rem;top: 0.1rem;font-size: 0.28rem;color:rgb(169, 169, 169);display: none;z-index:500">必填哦
					<i class="vux-input-icon weui-icon weui_icon_warn weui-icon-warn" title="必填哦"></i>
				</div>
				<x-textarea placeholder="项目要求" @on-focus="onEvent('focus')" @on-blur="onEvent('blur')" :max="20" v-model="form.requirement"></x-textarea>
			</group>

			<toast v-model="show1" type="warn" :time="1000" is-show-mask>输入有误</toast>
		</div>
		<div class="endSave">
				<div @click="save">
					<button>确认并保存</button>
				</div>
		</div>
	</div>
</template>
<script>
	import axios from 'axios'

	import { ChinaAddressData, XAddress, XTextarea, Checklist, PopupPicker, cookie } from 'vux'
	import { isDevice } from '@/assets/commonjs/util.js'
	export default {
		components: {
			XAddress,
			XTextarea,
			PopupPicker,
			Checklist
		},
		data() {
			return {
				show1: false,
				form: {
					mineral: "",
					country: "",
					province: "",
					city: "",
					county: "",
					currency: "",
					amount: "",
					mode: "",
					requirement: ""
				},
				currencylist: [{
					key: 'CNY人民币',
					value: 'CNY人民币'
				}, {
					key: 'USB美元',
					value: 'USB美元'
				}, {
					key: 'EUR欧元',
					value: 'EUR欧元'
				}, {
					key: 'HKD港币',
					value: 'HKD港币'
				}, {
					key: 'GBP英镑',
					value: 'GBP英镑'
				}, {
					key: 'JPY日元',
					value: 'JPY日元'
				}, {
					key: 'KRW韩元',
					value: 'KRW韩元'
				}],
				requirement: '',
				addressData: ChinaAddressData,
				addressValue: ['广东省', '深圳市', '南山区'],
				objectList: [{
					key: '1',
					value: '金属矿产'
				}, {
					key: '2',
					value: '有色金属'
				}, {
					key: '4',
					value: '黑色金属'
				}, {
					key: '8',
					value: '能源矿产'
				}, {
					key: '16',
					value: '稀土分散'
				}, {
					key: '32',
					value: '非金属'
				}, {
					key: '64',
					value: '矿用设备'
				}, {
					key: '128',
					value: '耗材药剂'
				}, {
					key: '256',
					value: '专业服务'
				}],
				objectListValue: [], //选中的矿种
				labelPosition: '',
				list3: [],
				addval: [],
				error: '',
				first: true //第一次进入
			}
		},
		mounted() {
			this.getAddress()

		},
		methods: {
			valid() {

			},
			change(val, label) {

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
			addressChange() {

			},
			onEvent() {
				if(this.form.requirement == "") {
					$(".authForm .ask .error").css({
						"display": 'block'
					})
				} else {
					$(".authForm .ask .error").css({
						"display": 'none'
					})
				}
			},
			getAddress() {

				axios.get(this.$root.urlPath.MCT + '/area/primaryArea')
					.then(res => {

						if(res.data.success) {
							var addArr = []
							res.data.data.forEach((item, index) => {
								addArr[index] = {
									name: item.areaname,
									value: item.id,
									parent: 0
								}
							})
							this.list3 = addArr

						} else {

						}
					})
					.catch(function(error) {

					});
			},
			getlocation(id) {

				axios.get(this.$root.urlPath.MCT + '/area/subArea', {
						params: {
							pId: id
						}
					})
					.then(res => {

						if(res.data.success) {

							var addArr = []

							if(!res.data.data) {
								return
							}

							res.data.data.forEach((item, index) => {
								addArr[index] = {
									name: item.areaname,
									value: item.id,
									parent: id
								}
							})
							this.list3 = this.list3.concat(addArr)
							console.log(this.list3)
						} else {

						}
					})
					.catch(function(error) {

					});
			},
			locaChange(val) {

				//				val值为[1,111,null]
				//				获取一级菜单的id,二级 菜单的id，是通过上一级的id查找下一级
				var id = ''
				if(val.length === 1) {
					id = val[0]
				}
				if(val.length === 2) {
					id = val[1]
				}
				if(val.length > 2) {

					var index = val.findIndex((item, index) => {
						return item == null
					})
					if(!index) {
						return
					}
					id = val[index - 1]
				}
				this.getlocation(id)
			},
			addChange(e) {
				if(e) {}
			},
			save() {

				this.first = false
				if(this.objectListValue.length == 0) {
					$(".authForm .type .weui-cells__title").css({
						"color": 'red'
					})
					$(".authForm .type .kzerror").css({
						"display": 'block'
					})

				}
				if(this.addval.length == 0) {
					$(".authForm .addressBox .weui-label").css({
						"color": 'red'
					})
					$(".authForm .addressBox .dzerror").css({
						"display": 'block'
					})

				}

				if(this.form.requirement == "") {
					$(".authForm .ask .error").css({
						"display": 'block'
					})
					return
				}
				if(this.form.amount !== "" && this.form.mode !== "") {

				} else {
					this.show1 = true
					return
				}
				this.form.mineral = this.objectListValue.join(",")
				this.form.country = this.addval[0]
				this.form.province = this.addval[1]
				this.form.city = this.addval[2]
				this.form.county = ''
				const params = this.form
				axios.get(this.$root.urlPath.MCT + '/company/saveInvestor', {
						params: params
					})
					.then(res => {
						if(res.data.success) {
							window.location.href = this.$root.urlPath.MCM + "/mineral/projectDetails/form?newpage=newpage&id=" + this.$route.query.id;

						} else {

						}
					})
					.catch(function(error) {

					});
			},
			showAddress() {
				$(".authForm addressBox .weui-label").css({
					"color": 'black'
				})
				$(".authForm addressBox .dzerror").css({
					"display": 'none'
				})
			}
		},
		watch: {
			objectListValue(val) {
				if(!this.first) {
					if(val.length == 0) {
						$(".authForm .weui-cells__title").css({
							"color": 'red'
						})
						$(".authForm .kzerror").css({
							"display": 'block'
						})
					} else {
						$(".authForm .weui-cells__title").css({
							"color": 'black'
						})
						$(".authForm .kzerror").css({
							"display": 'none'
						})
					}
				}
			},
			addval(val) {
				if(!this.first) {

					if(val.length == 0) {
						$(".authForm .type.weui-cells__title").css({
							"color": 'red'
						})
						$(".authForm .type .kzerror").css({
							"display": 'block'
						})
					} else {
						$(".authForm .addressBox .weui-cell__hd .weui-label").css({
							"color": 'black'
						})
						$(".authForm .addressBox .dzerror").css({
							"display": 'none'
						})
					}
				}
			},
		}
	}
</script>
<style>
	.authForm .form{
		margin:1rem 0;
	}
	.exForm .form .vux-no-group-title {
		margin: 0;
		height: 1rem;
		line-height: 1rem;
		font-size: 0.28rem;
		padding-left: 0.15rem;
	}

	.exForm .form .xinghao {
		color: red;
		line-height: 1rem;
	}

	.exForm .form .vux-x-input {
		height: 0.8rem;
		padding-left: 0.1rem;
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

	.exForm .weui-toast__content {
		text-align: center;
	}

	.authForm .weui-cells__title {
		font-size: 0.28rem;
		background: #fff;
		height: 1rem;
		line-height: 1rem;
		color: #000000;
	}

	.authForm .priceType .weui-label {
		margin-left: 0.1rem;
	}

	.authForm .priceType .weui-cell_select .weui-cell__bd:after {
		width: 0.2rem;
		height: 0.2rem;
	}

	.authForm .weui-cells_checkbox {
		font-size: 0.28rem;
	}

	.authForm .weui-cells__title {
		margin: 0;
	}

	.authForm .addressBox .addressxinghao {
		margin-top: 0.1rem;
	}

	.authForm .type .xinghao {
		color: red;
		line-height: 1rem;
		font-size: 0.3rem;
		margin-left: 0.1rem;
		margin-right: 0.05rem;
	}

	.authForm .type .weui-cells__title {
		margin-left: 0.2rem;
	}

	.authForm .vux-checklist-disabled {
		padding-left: 0.2rem;
	}

	.authForm .vux-selector.weui-cell_select-after {
		padding-left: 0.1rem;
	}
</style>
