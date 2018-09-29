<template>
	<div class="leaveSpeak">
	<div class="oHeader clearfix">
		<div class="leftA fl" @click="back">
			<i class="icon iconfont icon-jiantou-copy"></i>
			<span>留言</span>
		</div>
	</div>
	
	<div class="content">
		<div class="titleBox">留言给该供应商</div>
		<div class="inputBox">
			<input type="text" placeholder="称呼" v-model="form.name" class="inputCss" maxlength="10" @blur="blurName"/>
			<div class="error" v-if="errorName">请填写1~10个字的名称</div>
		</div>
		<div class="inputBox">
			<input type="tel" placeholder="联系方式" class="inputCss" v-model="form.tel" maxlength="11" @blur="blur"/>
			<div class="error" v-if="errorTip">请填写11位数字的手机号码</div>
		</div>
		<div class="inputBox">
			<textarea  placeholder="请输入您的问题描述" class="inputCss" v-model="form.depict" maxlength="200" @blur="blurTextarea"></textarea>
			<div class="error" v-if="errorTextarea">请填写1~200字的问题描述</div>
		</div>

	</div>
	
	<div class="endSave">
	 	<div @click="save">
	 		<div class="btn">提交</div>
	 	</div>
	</div>
	</div>
</template>

<script>
	
	import axios from 'axios'
	import {cookie} from 'vux';
	import {lastPage} from '@/assets/commonjs/util.js'
	
	export default{
		data(){
			return {
				form:{
					name:'',
					tel:'',
					depict:''
				},
				errorName:false,
				errorTip:false,
				errorTextarea:false,
				show2:false,
				loadText:'正在留言请稍后'
//				show1:false,
//				endError:''
			}
		},
		methods:{
			back(){
				lastPage()
			},
			blurName(){
				if(!this.form.name){
					this.errorName = true
				}else{
					this.errorName = false
				}
			},
			blur(){
				var telReg= /^1\d{10}$/;;
				if(!telReg.test(this.form.tel)){
					this.errorTip = true
				}else{
					this.errorTip = false
				}
			},
			blurTextarea(){
				if(!this.form.depict){
					this.errorTextarea = true
				}else{
					this.errorTextarea = false
				}
			},
			save(){
				
//				如果都为空全部错误信息提示,如果有其中一个错了则不往下执行
				if(!this.form.name && !this.form.tel && !this.form.depict){
					this.errorName = true
					this.errorTip = true
					this.errorTextarea = true
					
//					this.show1 = true
//					this.endError = "留言错误，请重新填写"
					return 
				}else if(this.errorName || this.errorTip || this.errorTextarea){
//					this.show1 = true
//					this.endError = "留言错误，请重新填写"
					return
				}
				
				this.$vux.loading.show({
 					text: '正在留言请稍后'
				})
				var content = "" + this.form.name + ',' + this.form.tel +","+ this.form.depict
				axios.get(this.$root.urlPath.MC + '/wap/store.do?storeOpinion', {
						params:{
							storeId:this.$route.query.shopId,
							text:content
						}
					})
					.then(res => {
						this.$vux.loading.hide()
						if(res.data.success) {
							this.$vux.toast.show({
 								text: '提交成功',
 								type:'success',
							})
							lastPage()
						} else {
							this.$vux.toast.show({
 								text: '提交失败，请稍后重试',
 								type:'cancel',
// 								width:'120px'
							})
						}
					})
					.catch(function(error) {
						alert(error)
					});
				
				
				
				
				
				
			},
			
		}
	}
</script>

<style scoped>
	.leaveSpeak .content{
		font-size: 0.28rem;
		margin accelerator: 1.2rem 0 1rem 0;
		background: #fff;
		padding: 0 0.3rem 0.15rem 0.3rem;
		margin-top: 1rem;
	}
	.leaveSpeak .content input,.leaveSpeak .content textarea{
		width: 100%;
		height: 0.66rem;
		border: solid 0.001rem #d2d2d2;
		padding-left: 0.18rem;
		box-sizing: border-box;
	}
	.leaveSpeak .content textarea{
		height: 2.92rem;
		padding-top: 0.22rem;
	}
	.leaveSpeak .content .titleBox{
		padding: 0.35rem 0 0.33rem;
	}
	.leaveSpeak .content .inputBox{
		margin-bottom: 0.15rem;
	}
	.leaveSpeak .content .error{
		color:red;
		font-size:0.22rem
		
	}
</style>