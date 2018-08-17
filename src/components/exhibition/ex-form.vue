<template>
	<div class="exForm comform">
		<!--头部-->
		<div class="oHeader clearfix">
			<div class="leftA fl" @click="back">
				<i class="icon iconfont icon-jiantou-copy"></i>
				<span>添加报名信息</span>
			</div>
		</div>
		<div class="form">
			<group>
				<div class="xinghao fl">*</div>
				<x-input title="姓名" placeholder="请填写" placeholder-align="right" required v-model="form.mtiname" :is-type="nameVail" ref="refVal">
				</x-input>
			</group>
			<group>
				<div class="xinghao fl">*</div>
				<x-input title="手机" placeholder="请填写" placeholder-align="right" required v-model="form.mtimobile" is-type="china-mobile" ref="refVal">
				</x-input>
			</group>
			<group>
				<x-input title="邮箱" placeholder="请填写" placeholder-align="right" style="padding-left:0.2rem" v-model="form.mtiemail" is-type="email">
				</x-input>
			</group>
			<group>
				<x-input title="单位" placeholder="请填写" placeholder-align="right" style="padding-left:0.2rem" v-model="form.mticompany">
				</x-input>
			</group>
			<group>
				<x-input title="职位" placeholder="请填写" placeholder-align="right" style="padding-left:0.2rem" v-model="form.mtijob">
				</x-input>
			</group>
		</div>
		<div class="endSave">
			<div @click="saveLink">
				<div class="btn">确认并保存</div>
			</div>
		</div>
		<toast v-model="show1" type="warn" :time="1000" is-show-mask>输入有误</toast>
	</div>
</template>

<script>
	import axios from 'axios'
	import { CheckIcon } from 'vux'
	import {isDevice} from '@/assets/commonjs/util.js';

	

	export default {
		components: {
			CheckIcon
		},
		data() {
			return {
				show1: false,
				form: {
					mtiname: '',
					mtimobile: '',
					mticompany: '',
					mtijob: '',
					mtiemail: ''
				},
				disabled: true,
				nameVail: function(val) {
					var patt1 = new RegExp("(^[\u4e00-\u9fa5]{1}[\u4e00-\u9fa5\.·。]{0,8}[\u4e00-\u9fa5]{1}$)|(^[a-zA-Z]{1}[a-zA-Z\s]{0,8}[a-zA-Z]{1}$)")
					return {
						valid: patt1.test(val),
						msg: '输入姓名格式有误'
					}
				}
			}
		},
		mounted() {

		},
		methods: {

			saveLink() {
				if(this.$refs.refVal.valid == true && this.form.mtiname != '' && this.form.mtimobile !== '') {

				} else {
					this.show1 = true
					return
				}

				var params = this.form
				axios.get(this.$root.urlPath.MC + '/meeting.do?savelink', {
						params: params
					})
					.then(res => {

						if(res.data.success) {

							window.location.href = this.$root.urlPath.MCM + "/exhibition/exlist?newpage=newpage&id=" + this.$route.query.id;

							this.infoLink()
						} else {

						}
					})
					.catch(function(error) {

					});
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
		}
	}
</script>

<style>
	
	.exForm .form{
		margin:1rem 0 ;
	}
</style>