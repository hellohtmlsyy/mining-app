<template>
	<div class="proposal">
		<com-header bgcolor="#0094E8">
			<div slot="centerA">投诉建议</div>
		</com-header>
		<div class="info">
			<div class="tit">您的关注是矿业圈前进的动力，说说您对矿业圈的看法：</div>
			<div class="form">
				<input type="text" placeholder="姓名" v-model.trim="info.name"/>
				<input type="text" placeholder="电话" v-model.trim="info.tel"/>
				<textarea name="" rows="7" cols="" placeholder="请留下您宝贵的意见建议" v-model.trim="info.pro"></textarea>
				<button type="button" @click="sub()" :disabled="disable">提交</button>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data(){
			return{
				info: this.$route.query.info,
				info:{
					name: '',
					tel: '',
					pro: '',
				},
				nameError: false,
				telError: false,
				proError: false,
				disable: false,
			}
		},
		methods:{
			sub(){
				this.proError = this.info.pro.length >0 && this.info.pro.length < 200 ? false : true;
				if( this.proError ){
					if( this.info.pro.length > 0){
						this.$vux.toast.text('反馈字数不能超过200字', 'default')
					}else{
						this.$vux.toast.text('请输入您的反馈', 'default')
					}
				}
				this.telError = this.info.tel.length == 11 && /^1[34578]\d{9}$/.test(this.info.tel) ? false : true;
				if( this.telError ){
					if( this.info.tel.length > 0){
						this.$vux.toast.text('请输入正确手机号', 'default')
					}else{
						this.$vux.toast.text('请输入手机号', 'default')
					}
				}
				this.nameError = this.info.name.length > 0 && this.info.name.length < 8 && /^[\u4E00-\u9FA5A-Za-z]+$/.test(this.info.name) ? false : true;
				if( this.nameError ){
					if( this.info.name.length > 0){
						this.$vux.toast.text('请输入正确姓名', 'default')
					}else{
						this.$vux.toast.text('请输入姓名', 'default')
					}
				}
				
				if( !this.nameError && !this.telError && !this.proError ){
					this.disable = true;
					this.$axios.get( this.$root.urlPath.MCT+'/wapCP/wapFeedBack', {
						params: {
							name: this.info.name,
							feedback: this.info.pro,	
							contact: this.info.tel,
						}
					})
					.then(res => {
						this.disable = false;
						if(res.data.success){
							this.info.name = '';
							this.info.pro = '';
							this.info.tel = '';
							this.$vux.toast.text('您的建议已提交成功', 'center')
						}
						console.log(res)	
					}).catch(err => console.log('个人账户异常', err));		
				}
			},
		},
	}
</script>

<style>
	@import url("../../../static/css/user2.0.css");	
</style>