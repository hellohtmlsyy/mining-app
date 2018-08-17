<template>
	<div class="miForm">
		<!--头部-->
		<div class="oHeader clearfix">
			<div class="leftA fl" @click="back">
				<i class="icon iconfont icon-jiantou-copy"></i>
				<span>预约投资</span>
			</div>
		</div>
		<div class="form">
			<group>
				<div class="xinghao fl">*</div>
				<x-input title="姓名" placeholder="请填写" placeholder-align="right" required v-model="form.realname" :is-type="nameVail" ref="refVal">
				</x-input>
			</group>
			<group>
				<div class="xinghao fl">*</div>
				<x-input title="总投资额" placeholder="请填写" type="number" placeholder-align="right" required v-model="form.money" ref="refVal">
				</x-input>
			</group>
			<group>
				<div class="xinghao fl">*</div>
				<selector ref="defaultValueRef" title="币种" :options="currencylist" v-model="form.cncurrency" required></selector>
			</group>
			<!--<group>
				<x-input title="联系方式" placeholder="请填写"  placeholder-align="right"  style="padding-left:0.2rem" v-model="form.tel">
				</x-input>
			 </group>-->
		</div>
		<div class="endSave">
			<div @click="save">
				<button>预约</button>
			</div>
		</div>
		<alert v-model="show1" @on-hide="hideAlert1">预约投资成功！</alert>
		<toast v-model="show2" type="warn" :time="1000" is-show-mask>输入有误</toast>
	</div>
</template>

<script>
	import axios from 'axios'
	import { CheckIcon } from 'vux'
	import {isDevice} from '@/assets/commonjs/util.js'
	export default {
		components: {
			CheckIcon
		},
		data() {
			return {
				show1: false,
				show2: false,
				nameVail: function(val) {
					var patt1 = new RegExp("([\\u4e00-\\u9fa5]{1}[\\u4e00-\\u9fa5\.·。]{" + 0 + "," + 20 + "}[\\u4e00-\\u9fa5]{1}$)|([a-zA-Z]{1}[a-zA-Z\\-]{" + 0 + "," + 20 + "}[a-zA-Z]{1}$)")
					return {
						valid: patt1.test(val),
						msg: '输入姓名格式有误'
					}
				},
				form: {
					realname: '',
					money: '',
					cncurrency: '',
					
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

			}
		},
		mounted() {

		},
		methods: {
			back() {
				if(isDevice() == 'adr') {
					adwebkit.callApp("BACK", '');
				} else if(isDevice() == 'ios') {
					oswebkit.callApp("BACK", '');
				} else {
					this.$router.go(-1)
				}
				
			},
			save() {
				
				if(this.$refs.refVal.valid == true && this.form.cncurrency !== '' && this.form.realname != '') {

				} else {
					this.show2 = true
					return
				}
				this.form.pid = this.$route.query.id
				var params = this.form
				axios.get(this.$root.urlPath.MC + '/wap/yitrade.do?tradeInvestMent', {
						params: params
					})
					.then(res => {
						if(res.data.success) {
							this.show1 = true
							
						} else {

						}
					})
					.catch(function(error) {

					});
			},
			hideAlert1(){
				window.location.href=this.$root.urlPath.MCM + "/mineral/projectDetails?newpage=newpage&id=" + this.$route.query.id;
			}
		}
	}
</script>

<style>
	.miForm .form{
		margin:1rem 0
	}
	.miForm .form .vux-no-group-title {
		margin: 0;
		height: 1rem;
		line-height: 1rem;
		font-size: 0.28rem;
		padding-left: 0.15rem;
	}
	
	.miForm .form .xinghao {
		color: red;
		line-height: 1rem;
	}
	
	.miForm .form .vux-x-input {
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
	
	.miForm .weui-toast__content {
		text-align: center;
	}
	
	.miForm .weui-cell_select .weui-cell__bd:after {
		width: 0.2rem;
		height: 0.2rem;
		margin-top: -0.1rem;
	}
</style>