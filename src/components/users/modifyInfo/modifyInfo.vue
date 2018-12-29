<template>
	<div class="modifyInfo" v-if="modify">
		<x-header :left-options="{backText: '',preventGoBack: true}" @on-click-back="goBack()">用户信息</x-header>
		<div class="userInfo">
			<div class="term head clearfix">
				<span class="fl">头像</span>
				<div class="fr">
					<cropper @transferUser="getUrl" :headImg="ruleForm.logo" class="headImg"></cropper>
					<i class="iconfont icon-jiantou5"></i>
				</div>
			</div>
			<div class="term clearfix">
				<span class="fl">用户名</span>
				<div class="fr">
					<span class="name">{{name}}</span>
					<i class="iconfont icon-jiantou5 fr" @click="goModifyName()"></i>
				</div>
			</div>
		</div>
	</div>

	<div class="modifyName" v-else="modify">
		<x-header :left-options="{backText: '取消', showBack : true, preventGoBack: true}" @on-click-back="unedit">编辑用户名<a slot="right" @click="save()">保存</a></x-header>
		<div class="fillIn clearfix">
			<input type="text" placeholder="请输入个人用户名" v-model.trim="user.name"/>
			<i class="iconfont icon-cuohao fr" @click="empty()"></i>
		</div>
		<div style="padding: 0.15rem 0.35rem;color: red;">温馨提示：矿业账号是您在本网唯一的标识，只能修改一次</div>
	</div>
</template>

<script>
	import cropper from '@/components/common/upload-img.vue';
	import { lastPage,appLogin } from '@/assets/commonjs/util.js'
	import { cookie } from 'vux'
	export default{
		components: {
			cropper
		},
		data(){
			return{
				isInapp:navigator.userAgent.indexOf('/mcapp')>=0,//判断是否在app打开
				imgurlObj: '',
				ruleForm:{
					logo: this.$root.urlPath.MCM + '/static/img/user2.0/personal/head.png'
				},
				name: '',
				logoError: false,
				nameError2: false,
				modify: true,
				//name
				user:{
					name: ''
				},
				nameError: false,
			}
		},
		methods: {
			goModifyName(){
				this.modify = false;
			},
			getUrl(msg) {
		      	this.imgurlObj = msg;
		      	this.ruleForm.logo = JSON.parse(this.imgurlObj).path;
		      	this.$axios.get( this.$root.urlPath.MCT+'/wapAccount/WapUpdateHeadImg', {
					params: {
						headImg: this.ruleForm.logo,
					}
				})
				.then(res => {
					if(res.data.success){
						this.$vux.toast.text('修改头像成功', 'default')
					}
				}).catch(err => console.log('个人账户异常', err));
		    },
		    goBack() {
		    	lastPage()
			},
		    //name
			unedit() {
				this.modify = true;
			},
			empty(){
				this.user.name = '';
			},
			save(){
				this.nameError = this.user.name.length > 0 && /^(?![^a-zA-Z]+$)[\w-]{5,24}$/.test(this.user.name) ? false : true;
				if( !this.nameError ){
					this.$axios.get(this.$root.urlPath.MCT+'/wapAccount/WapUpdateUserName', {
						headers:{
							'MC_UID': cookie.get('MC_UID')
						},
						params: {
							userName: this.user.name,
						}
					})
					.then(res => {
						if(res.data.success){
							this.name = this.user.name;
							this.modify = true;
							this.$vux.toast.text('修改用户名成功', 'default')
						}else{
							this.$vux.toast.text(res.data.errMsg, 'default')
						}
					})
					.catch(err => console.log('个人账户异常',err));
				}else{
					if(this.user.name.length <= 0 ){
						this.$vux.toast.text('请输入要修改的用户名', 'default')
					}else{
						this.$vux.toast.text('请输入用户名 (5-24个字符,不能为纯数字，可以包含字母、数字、_、-)', 'default')
					}
				}
			},
		},
		mounted(){
			if(cookie.get('MC_UID')) {
			}else{
				appLogin()
			}
		},
	}
</script>

<style>
	@import url("../../../static/css/user2.0.css");
</style>
